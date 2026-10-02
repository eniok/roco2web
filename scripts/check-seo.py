#!/usr/bin/env python3
"""Check rendered SEO output against a running build, without JavaScript.

Usage: python3 scripts/check-seo.py http://localhost:3100
"""
import json
import re
import sys
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.request import urlopen
import xml.etree.ElementTree as ET

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3100').rstrip('/')
SITE = 'https://roal.design'
PATHS = ['/', '/kuzhina', '/garderoba', '/dhoma-gjumi', '/dhoma-ndenje', '/ambiente-pune', '/hoteleri-lokale']


def normalize(value):
    return ' '.join(value.split())


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.meta, self.schemas, self.visible, self.h1, self.main = [], {}, [], [], 0, []
        self.script = None
        self.script_text = []
        self.ignored = 0
        self.feed(html)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'link':
            self.links.append(attrs)
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property'))] = attrs.get('content', '')
        if tag == 'h1':
            self.h1 += 1
        if tag == 'main':
            self.main.append(attrs)
        if tag == 'script':
            self.script = attrs.get('type', '')
            self.script_text = []
        if tag in ('script', 'style'):
            self.ignored += 1

    def handle_endtag(self, tag):
        if tag == 'script':
            if self.script == 'application/ld+json':
                self.schemas.append(json.loads(''.join(self.script_text)))
            self.script = None
        if tag in ('script', 'style'):
            self.ignored -= 1

    def handle_data(self, data):
        if self.script is not None:
            self.script_text.append(data)
        if not self.ignored:
            self.visible.append(data)


def fetch(path):
    with urlopen(BASE + path, timeout=30) as response:
        assert response.status == 200, (path, response.status)
        return response.read().decode('utf-8')


for base_path in PATHS:
    for lang in ['sq', 'en']:
        path = base_path if lang == 'sq' else '/en' + ('' if base_path == '/' else base_path)
        page = Page(fetch(path))
        assert page.h1 == 1, (path, 'expected one h1')
        assert len(page.main) == 1 and page.main[0].get('lang') == lang, (path, 'main language')
        assert [link['href'].rstrip('/') for link in page.links if link.get('rel') == 'canonical'] == [(SITE + path).rstrip('/')], (path, 'canonical')
        alternates = {link['hreflang']: link['href'].rstrip('/') for link in page.links if 'hreflang' in link}
        assert alternates == {
            'sq': (SITE + base_path).rstrip('/'),
            'en': SITE + '/en' + ('' if base_path == '/' else base_path),
            'x-default': (SITE + base_path).rstrip('/'),
        }, (path, 'language alternates', alternates)
        assert page.meta.get('og:url', '').rstrip('/') == (SITE + path).rstrip('/'), (path, 'Open Graph URL')
        assert page.meta.get('description') and 'noindex' not in page.meta.get('robots', ''), (path, 'indexability')
        assert page.meta.get('twitter:description') == page.meta['description'], (path, 'social description')
        nodes = [node for schema in page.schemas for node in schema.get('@graph', [schema])]
        web_page = next(node for node in nodes if node.get('@type') == 'WebPage')
        assert web_page['inLanguage'] == lang and web_page['url'] == SITE + path, (path, 'WebPage schema')
        faq = next(node for node in nodes if node.get('@type') == 'FAQPage')
        assert faq['inLanguage'] == lang, (path, 'FAQ language')
        visible = normalize(' '.join(page.visible))
        for question in faq['mainEntity']:
            assert normalize(question['name']) in visible, (path, 'question missing from HTML', question['name'])
            assert normalize(question['acceptedAnswer']['text']) in visible, (path, 'answer missing from HTML')
        budget_word = 'budget' if lang == 'en' else 'buxhet'
        assert budget_word in visible.lower(), (path, 'budget copy missing')
        if base_path == '/':
            heading = 'Beautiful furniture.' if lang == 'en' else 'Mobilje të bukura.'
            assert heading in visible, (path, 'home language mismatch')
        print('PASS', path, '— canonical, alternates, initial HTML, metadata, schema and visible FAQs')

sitemap = ET.fromstring(fetch('/sitemap.xml'))
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
entries = {item.find('s:loc', ns).text: item for item in sitemap}
for path in PATHS:
    for lang in ['sq', 'en']:
        url = SITE + (path if lang == 'sq' else '/en' + ('' if path == '/' else path))
        entry = entries[url]
        assert len(entry.findall('x:link', ns)) == 3, (url, 'sitemap alternates')
        assert entry.find('s:lastmod', ns) is None, (url, 'static page has synthetic lastmod')
print('PASS sitemap — all 14 language URLs, reciprocal alternates and no synthetic static dates')

robots = fetch('/robots.txt')
assert re.search(r'User-agent: OAI-SearchBot\s+Allow: /', robots), 'OpenAI search crawling is blocked'
assert 'Sitemap: ' + SITE + '/sitemap.xml' in robots
assert '\nLLM-Content:' not in robots
summary = fetch('/llms.txt')
for path in PATHS:
    assert SITE + '/en' + ('' if path == '/' else path) in summary
print('PASS robots and business summary')

try:
    fetch('/en/not-a-service')
    raise AssertionError('Unknown English service should return 404')
except HTTPError as error:
    assert error.code == 404, error.code
print('PASS unknown English service returns 404')
