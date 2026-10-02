#!/usr/bin/env node

import { mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FRAMES = join(ROOT, 'social', 'instagram', 'kitchen-builder-sq', 'frames');
const OUTPUT_DIR = join(ROOT, 'social', 'instagram', 'kitchen-builder-sq');
const FRAMES_DIR = join(OUTPUT_DIR, 'frames-gemini-v2');
const COVER_PATH = join(OUTPUT_DIR, 'kitchen-builder-sq-cover-gemini-v2.jpg');

const WIDTH = 1080;
const HEIGHT = 1920;
const COLOR = {
  ink: '#15130f',
  paper: '#faf8f4',
  linen: '#f0ebe3',
  clay: '#8b4a2e',
  sand: '#e8b894',
  body: '#3a352c',
  line: '#d8d0c5',
  sage: '#788476',
};

const SANS = 'Avenir Next, Avenir, sans-serif';
const SERIF = 'Baskerville, Georgia, serif';

function asset(relativePath) {
  return join(ROOT, 'public', relativePath);
}

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function textLines({
  x,
  y,
  lines,
  size,
  fill,
  family = SANS,
  weight = 400,
  style = 'normal',
  lineHeight = 1.15,
  anchor = 'start',
  letterSpacing = 0,
  opacity = 1,
}) {
  const values = Array.isArray(lines) ? lines : [lines];
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${style}" text-anchor="${anchor}" letter-spacing="${letterSpacing}" opacity="${opacity}">${values
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : size * lineHeight}">${esc(line)}</tspan>`)
    .join('')}</text>`;
}

function svg(body, defs = '') {
  return Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs}</defs>
    ${body}
  </svg>`);
}

async function cropImage(relativePath, width, height, position = 'centre') {
  return sharp(asset(relativePath))
    .resize(width, height, { fit: 'cover', position })
    .sharpen({ sigma: 0.45 })
    .toBuffer();
}

async function logo(width, color) {
  return sharp(asset('logo.svg'))
    .resize({ width })
    .tint(color)
    .png()
    .toBuffer();
}

async function writeScene(name, background, composites, body, defs = '') {
  const prepared = await Promise.all(composites.map(async (item) => ({
    input: item.input ?? (await cropImage(item.path, item.width, item.height, item.position)),
    left: item.left,
    top: item.top,
    blend: item.blend ?? 'over',
  })));

  const output = join(FRAMES_DIR, `${name}.png`);
  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background },
  })
    .composite([...prepared, { input: svg(body, defs) }])
    .png({ compressionLevel: 9 })
    .toFile(output);
  return output;
}

function chrome(stepIndex, dark = false) {
  const ink = dark ? COLOR.paper : COLOR.ink;
  const future = dark ? 'rgba(250,248,244,0.25)' : COLOR.line;
  let bars = '';
  for (let index = 0; index < 5; index += 1) {
    const fill = index === stepIndex ? COLOR.clay : index < stepIndex ? ink : future;
    bars += `<rect x="${64 + index * 172}" y="190" width="160" height="7" fill="${fill}"/>`;
  }
  return `${textLines({ x: 64, y: 122, lines: 'ROAL', size: 34, fill: ink, family: SERIF, weight: 600, letterSpacing: 4 })}
    ${textLines({ x: 1016, y: 120, lines: 'PARA SE TË POROSITNI', size: 18, fill: dark ? COLOR.sand : COLOR.clay, weight: 600, anchor: 'end', letterSpacing: 2.4 })}
    ${bars}`;
}

function header(stepIndex, title, question, dark = false) {
  const ink = dark ? COLOR.paper : COLOR.ink;
  return `${chrome(stepIndex, dark)}
    ${textLines({ x: 64, y: 280, lines: `VENDIMI 0${stepIndex + 1}`, size: 20, fill: COLOR.clay, weight: 600, letterSpacing: 3 })}
    ${textLines({ x: 64, y: 374, lines: title, size: 66, fill: ink, family: SERIF })}
    ${textLines({ x: 64, y: 444, lines: question, size: 31, fill: dark ? COLOR.paper : COLOR.body, family: SERIF, style: 'italic', opacity: dark ? 0.72 : 1 })}
    ${textLines({ x: 1000, y: 365, lines: `0${stepIndex + 1}`, size: 156, fill: COLOR.clay, family: SERIF, style: 'italic', anchor: 'end', opacity: 0.13 })}`;
}

async function copyFrame(sourceName, outputName = sourceName) {
  const output = join(FRAMES_DIR, `${outputName}.png`);
  await sharp(join(SOURCE_FRAMES, `${sourceName}.png`)).png({ compressionLevel: 9 }).toFile(output);
  return output;
}

async function reheadFrame(sourceName, outputName, background, stepIndex, title, question) {
  const overlay = `<rect x="0" y="0" width="1080" height="520" fill="${background}"/>${header(stepIndex, title, question)}`;
  const output = join(FRAMES_DIR, `${outputName}.png`);
  await sharp(join(SOURCE_FRAMES, `${sourceName}.png`))
    .composite([{ input: svg(overlay) }])
    .png({ compressionLevel: 9 })
    .toFile(output);
  return output;
}

function footer(stepNumber, text = 'PLANIFIKONI PARA SE TË ZGJIDHNI') {
  return `<rect x="64" y="1645" width="952" height="120" fill="${COLOR.ink}"/>
    ${textLines({ x: 104, y: 1718, lines: `${stepNumber} / 5`, size: 24, fill: COLOR.sand, family: SERIF, style: 'italic' })}
    ${textLines({ x: 976, y: 1718, lines: text, size: 16, fill: COLOR.paper, weight: 600, anchor: 'end', letterSpacing: 1.8 })}`;
}

async function renderPlanGrid() {
  const cards = [
    { x: 64, label: 'LINEARE', note: 'Një mur', icon: '<rect x="108" y="674" width="208" height="82" rx="5" fill="none" stroke="#15130f" stroke-width="6"/><line x1="160" y1="674" x2="160" y2="756" stroke="#8b4a2e" stroke-width="5"/><line x1="212" y1="674" x2="212" y2="756" stroke="#8b4a2e" stroke-width="5"/><line x1="264" y1="674" x2="264" y2="756" stroke="#8b4a2e" stroke-width="5"/>' },
    { x: 382, label: 'NË FORMË L', note: 'Dy drejtime', icon: '<path d="M433 638 H628 V814 H554 V714 H433 Z" fill="none" stroke="#15130f" stroke-width="6" stroke-linejoin="round"/><line x1="497" y1="638" x2="497" y2="714" stroke="#8b4a2e" stroke-width="5"/><line x1="554" y1="758" x2="628" y2="758" stroke="#8b4a2e" stroke-width="5"/>' },
    { x: 700, label: 'ME ISHULL', note: 'Zonë qendrore', icon: '<rect x="752" y="634" width="192" height="72" rx="5" fill="none" stroke="#15130f" stroke-width="6"/><rect x="790" y="766" width="116" height="72" rx="8" fill="none" stroke="#8b4a2e" stroke-width="6"/><path d="M838 722v28" stroke="#15130f" stroke-width="5" stroke-linecap="round"/>' },
  ];

  let cardBody = '';
  for (const card of cards) {
    cardBody += `<rect x="${card.x}" y="545" width="296" height="430" fill="${COLOR.linen}" stroke="rgba(21,19,15,0.14)"/>
      ${card.icon}
      ${textLines({ x: card.x + 148, y: 890, lines: card.label, size: 21, fill: COLOR.ink, weight: 700, anchor: 'middle', letterSpacing: 1.6 })}
      ${card.note ? textLines({ x: card.x + 148, y: 928, lines: card.note, size: 23, fill: COLOR.body, family: SERIF, style: 'italic', anchor: 'middle' }) : ''}`;
  }

  const body = `${header(0, 'Planimetria e kuzhinës', 'Ku nis rrjedha e punës?')}
    ${cardBody}
    <rect x="64" y="1045" width="952" height="470" fill="${COLOR.linen}"/>
    ${textLines({ x: 108, y: 1140, lines: 'Forma vjen nga hapësira.', size: 53, fill: COLOR.ink, family: SERIF })}
    <line x1="108" y1="1200" x2="972" y2="1200" stroke="${COLOR.line}" stroke-width="2"/>
    ${textLines({ x: 108, y: 1280, lines: '01', size: 18, fill: COLOR.clay, weight: 700 })}
    ${textLines({ x: 154, y: 1280, lines: 'QARKULLIMI', size: 18, fill: COLOR.ink, weight: 700, letterSpacing: 1.8 })}
    ${textLines({ x: 154, y: 1320, lines: 'Kalime të lira', size: 24, fill: COLOR.body, family: SERIF, style: 'italic' })}
    ${textLines({ x: 398, y: 1280, lines: '02', size: 18, fill: COLOR.clay, weight: 700 })}
    ${textLines({ x: 444, y: 1280, lines: 'DISTANCAT', size: 18, fill: COLOR.ink, weight: 700, letterSpacing: 1.8 })}
    ${textLines({ x: 444, y: 1320, lines: 'Pa hapa të tepërt', size: 24, fill: COLOR.body, family: SERIF, style: 'italic' })}
    ${textLines({ x: 710, y: 1280, lines: '03', size: 18, fill: COLOR.clay, weight: 700 })}
    ${textLines({ x: 756, y: 1280, lines: 'ZONAT', size: 18, fill: COLOR.ink, weight: 700, letterSpacing: 1.8 })}
    ${textLines({ x: 756, y: 1320, lines: 'Punë e organizuar', size: 24, fill: COLOR.body, family: SERIF, style: 'italic' })}
    ${textLines({ x: 108, y: 1450, lines: 'Zgjidhni planin; pastaj vendosni elementet.', size: 29, fill: COLOR.clay, family: SERIF, style: 'italic' })}
    ${footer(1)}`;
  return writeScene('01-planimetria-grid', COLOR.paper, [], body);
}

async function renderPlanSelected() {
  const body = `${header(0, 'Planimetria e kuzhinës', 'Vendosni funksionin para pamjes')}
    <rect x="84" y="530" width="912" height="935" fill="${COLOR.linen}" stroke="rgba(21,19,15,0.14)"/>
    <rect x="164" y="638" width="752" height="150" fill="${COLOR.paper}" stroke="${COLOR.ink}" stroke-width="4"/>
    <rect x="164" y="638" width="150" height="580" fill="${COLOR.paper}" stroke="${COLOR.ink}" stroke-width="4"/>
    <rect x="430" y="1055" width="440" height="178" rx="12" fill="${COLOR.paper}" stroke="${COLOR.ink}" stroke-width="4"/>
    <rect x="183" y="662" width="112" height="185" rx="5" fill="${COLOR.sage}" opacity="0.9"/>
    <line x1="183" y1="724" x2="295" y2="724" stroke="${COLOR.paper}" stroke-width="4"/>
    <rect x="530" y="1110" width="150" height="76" rx="12" fill="none" stroke="${COLOR.clay}" stroke-width="6"/>
    <path d="M605 1110v-45c0-34 50-34 50 0v17" fill="none" stroke="${COLOR.clay}" stroke-width="7" stroke-linecap="round"/>
    <rect x="654" y="668" width="150" height="92" rx="5" fill="none" stroke="${COLOR.clay}" stroke-width="6"/>
    <circle cx="691" cy="697" r="17" fill="none" stroke="${COLOR.clay}" stroke-width="5"/><circle cx="766" cy="697" r="17" fill="none" stroke="${COLOR.clay}" stroke-width="5"/><circle cx="691" cy="735" r="17" fill="none" stroke="${COLOR.clay}" stroke-width="5"/><circle cx="766" cy="735" r="17" fill="none" stroke="${COLOR.clay}" stroke-width="5"/>
    <path d="M239 756 L605 1148 L729 713 Z" fill="rgba(139,74,46,0.06)" stroke="${COLOR.clay}" stroke-width="6" stroke-dasharray="18 13"/>
    <circle cx="239" cy="756" r="18" fill="${COLOR.clay}"/><circle cx="605" cy="1148" r="18" fill="${COLOR.clay}"/><circle cx="729" cy="713" r="18" fill="${COLOR.clay}"/>
    ${textLines({ x: 216, y: 888, lines: 'FRIGORIFERI', size: 17, fill: COLOR.ink, weight: 700, anchor: 'middle', letterSpacing: 1.5 })}
    ${textLines({ x: 605, y: 1288, lines: 'LAVAMANI', size: 17, fill: COLOR.ink, weight: 700, anchor: 'middle', letterSpacing: 1.5 })}
    ${textLines({ x: 729, y: 825, lines: 'PIANURA', size: 17, fill: COLOR.ink, weight: 700, anchor: 'middle', letterSpacing: 1.5 })}
    ${textLines({ x: 540, y: 1390, lines: 'Lëvizje e shkurtër. Punë më e lehtë.', size: 29, fill: COLOR.body, family: SERIF, style: 'italic', anchor: 'middle' })}
    <rect x="84" y="1510" width="912" height="236" fill="${COLOR.ink}"/>
    ${textLines({ x: 126, y: 1572, lines: 'RRJEDHA  ·  DISTANCAT  ·  QARKULLIMI', size: 17, fill: COLOR.sand, weight: 700, letterSpacing: 2 })}
    ${textLines({ x: 126, y: 1655, lines: 'Planifikoni lëvizjen,', size: 45, fill: COLOR.paper, family: SERIF })}
    ${textLines({ x: 126, y: 1703, lines: 'pastaj zgjidhni stilin.', size: 45, fill: COLOR.paper, family: SERIF })}`;
  return writeScene('01-planimetria-selected', COLOR.paper, [], body);
}

async function renderInstallationsGrid() {
  const cardWidth = 464;
  const imageHeight = 300;
  const cardHeight = 410;
  const coords = [[64, 545], [552, 545], [64, 985], [552, 985]];
  const images = [
    await cropImage('images/kitchen-catalogue/hero.webp', cardWidth, imageHeight, 'centre'),
    null,
    await cropImage('images/kitchen-catalogue/lighting/under-cabinet.webp', cardWidth, imageHeight),
    await cropImage('images/kitchen-catalogue/lighting/gola-led.webp', cardWidth, imageHeight),
  ];
  const labels = ['Pajisjet', 'Prizat', 'Drita e punës', 'Drita e integruar'];
  const composites = images.flatMap((input, index) => input ? [{ input, left: coords[index][0], top: coords[index][1] }] : []);
  let cards = '';
  coords.forEach(([x, y], index) => {
    cards += `<rect x="${x}" y="${y + imageHeight}" width="${cardWidth}" height="${cardHeight - imageHeight}" fill="${COLOR.paper}"/>
      <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" fill="none" stroke="rgba(21,19,15,0.14)"/>
      ${textLines({ x: x + 24, y: y + 363, lines: labels[index], size: 29, fill: COLOR.ink, family: SERIF, weight: 500 })}
      ${textLines({ x: x + cardWidth - 24, y: y + 363, lines: `0${index + 1}`, size: 17, fill: COLOR.clay, weight: 700, anchor: 'end' })}`;
  });
  cards += `<rect x="552" y="545" width="464" height="300" fill="${COLOR.ink}"/>
    <rect x="712" y="610" width="144" height="150" rx="18" fill="none" stroke="${COLOR.paper}" stroke-width="7"/>
    <circle cx="757" cy="675" r="12" fill="${COLOR.sand}"/><circle cx="811" cy="675" r="12" fill="${COLOR.sand}"/>
    <path d="M784 717v44" stroke="${COLOR.paper}" stroke-width="7" stroke-linecap="round"/>
    ${textLines({ x: 784, y: 805, lines: 'PLANIFIKOHEN HERËT', size: 15, fill: COLOR.sand, weight: 700, anchor: 'middle', letterSpacing: 1.5 })}`;

  const body = `${header(4, 'Pajisjet dhe instalimet', 'Çfarë duhet lidhur që në fillim?')}
    ${cards}
    ${textLines({ x: 64, y: 1505, lines: 'PAJISJE  ·  PRIZA  ·  NDRIÇIM', size: 18, fill: COLOR.clay, weight: 700, letterSpacing: 2.5 })}
    ${textLines({ x: 1016, y: 1505, lines: 'VENDOSINI PARA PRODHIMIT', size: 18, fill: COLOR.body, weight: 600, anchor: 'end', letterSpacing: 2, opacity: 0.72 })}
    ${footer(5, 'INSTALIMET NUK LIHEN PËR NË FUND')}`;
  return writeScene('05-instalimet-grid', COLOR.linen, composites, body);
}

async function renderInstallationsSelected() {
  const hero = await cropImage('images/kitchen-catalogue/hero.webp', 880, 840, 'centre');
  const body = `${header(4, 'Pajisjet dhe instalimet', 'Koordinojini para se të prodhohet')}
    <rect x="100" y="525" width="880" height="840" fill="none" stroke="rgba(21,19,15,0.16)"/>
    <circle cx="500" cy="695" r="24" fill="${COLOR.clay}"/>
    ${textLines({ x: 500, y: 702, lines: '01', size: 15, fill: COLOR.paper, weight: 700, anchor: 'middle' })}
    <circle cx="794" cy="785" r="24" fill="${COLOR.clay}"/>
    ${textLines({ x: 794, y: 792, lines: '02', size: 15, fill: COLOR.paper, weight: 700, anchor: 'middle' })}
    <circle cx="690" cy="1010" r="24" fill="${COLOR.clay}"/>
    ${textLines({ x: 690, y: 1017, lines: '03', size: 15, fill: COLOR.paper, weight: 700, anchor: 'middle' })}
    <circle cx="540" cy="912" r="24" fill="${COLOR.clay}"/>
    ${textLines({ x: 540, y: 919, lines: '04', size: 15, fill: COLOR.paper, weight: 700, anchor: 'middle' })}
    <rect x="100" y="1365" width="880" height="310" fill="${COLOR.ink}"/>
    ${textLines({ x: 144, y: 1426, lines: '01  NDRIÇIMI', size: 16, fill: COLOR.sand, weight: 700, letterSpacing: 1.6 })}
    ${textLines({ x: 550, y: 1426, lines: '02  ENERGJIA', size: 16, fill: COLOR.sand, weight: 700, letterSpacing: 1.6 })}
    ${textLines({ x: 144, y: 1466, lines: '03  UJI', size: 16, fill: COLOR.sand, weight: 700, letterSpacing: 1.6 })}
    ${textLines({ x: 550, y: 1466, lines: '04  VENTILIMI', size: 16, fill: COLOR.sand, weight: 700, letterSpacing: 1.6 })}
    ${textLines({ x: 144, y: 1550, lines: 'Lidhjet planifikohen', size: 48, fill: COLOR.paper, family: SERIF })}
    ${textLines({ x: 144, y: 1605, lines: 'para prodhimit.', size: 48, fill: COLOR.paper, family: SERIF })}
    ${textLines({ x: 144, y: 1650, lines: 'Më pak ndërhyrje. Më shumë qartësi.', size: 23, fill: COLOR.paper, opacity: 0.65 })}`;
  return writeScene('05-instalimet-selected', COLOR.linen, [{ input: hero, left: 100, top: 525 }], body);
}

async function renderSummary() {
  const whiteLogo = await logo(230, COLOR.paper);
  const items = [
    ['PLANIMETRIA', 'Rrjedha dhe qarkullimi'],
    ['PANELET', 'Stil dhe mirëmbajtje'],
    ['SYPRINA', 'Nxehtësi dhe njolla'],
    ['MEKANIZMAT', 'Akses dhe organizim'],
    ['INSTALIMET', 'Pajisje, priza dhe dritë'],
  ];
  let rows = '';
  items.forEach(([label, value], index) => {
    const y = 650 + index * 150;
    rows += `<line x1="64" y1="${y - 54}" x2="1016" y2="${y - 54}" stroke="rgba(250,248,244,0.14)"/>
      ${textLines({ x: 64, y, lines: `0${index + 1}`, size: 18, fill: COLOR.sand, weight: 700 })}
      ${textLines({ x: 130, y, lines: label, size: 17, fill: COLOR.paper, weight: 700, letterSpacing: 2, opacity: 0.46 })}
      ${textLines({ x: 1016, y: y + 2, lines: value, size: value.length > 24 ? 24 : 29, fill: COLOR.paper, family: SERIF, weight: 500, anchor: 'end' })}`;
  });
  rows += '<line x1="64" y1="1346" x2="1016" y2="1346" stroke="rgba(250,248,244,0.14)"/>';
  const body = `${textLines({ x: 64, y: 235, lines: 'PRAKTIKJA VJEN E PARA', size: 18, fill: COLOR.sand, weight: 700, letterSpacing: 2.8 })}
    ${textLines({ x: 64, y: 345, lines: ['Një kuzhinë e bukur', 'duhet të punojë mirë.'], size: 67, fill: COLOR.paper, family: SERIF, lineHeight: 1.04 })}
    <circle cx="925" cy="325" r="83" fill="none" stroke="rgba(232,184,148,0.38)" stroke-width="2"/>
    ${textLines({ x: 925, y: 330, lines: '5/5', size: 37, fill: COLOR.sand, family: SERIF, style: 'italic', anchor: 'middle' })}
    ${rows}
    <rect x="64" y="1438" width="952" height="210" fill="${COLOR.clay}"/>
    ${textLines({ x: 108, y: 1510, lines: 'PARA SE TË POROSITNI', size: 16, fill: COLOR.sand, weight: 700, letterSpacing: 2.5 })}
    ${textLines({ x: 108, y: 1588, lines: 'Kontrolloni këto pesë pika', size: 39, fill: COLOR.paper, family: SERIF, weight: 500 })}
    ${textLines({ x: 64, y: 1750, lines: 'PLAN  •  FUNKSION  •  QARTËSI', size: 17, fill: COLOR.paper, weight: 500, letterSpacing: 2.1, opacity: 0.48 })}`;
  return writeScene('06-summary', COLOR.ink, [{ input: whiteLogo, left: 64, top: 70 }], body);
}

async function renderCta() {
  const portrait = await cropImage('images/kitchen-catalogue/trends-rounded.webp', WIDTH, HEIGHT);
  const whiteLogo = await logo(260, COLOR.paper);
  const defs = `<linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15130f" stop-opacity="0.18"/><stop offset="0.42" stop-color="#15130f" stop-opacity="0.06"/><stop offset="1" stop-color="#15130f" stop-opacity="0.92"/></linearGradient>`;
  const body = `<rect width="1080" height="1920" fill="url(#shade)"/>
    ${textLines({ x: 64, y: 1125, lines: ['Nga ideja', 'te një kuzhinë', 'që funksionon.'], size: 66, fill: COLOR.paper, family: SERIF, lineHeight: 1.03 })}
    ${textLines({ x: 64, y: 1398, lines: ['Projektim, konsultë dhe realizim', 'sipas hapësirës suaj.'], size: 26, fill: COLOR.paper, lineHeight: 1.45, opacity: 0.76 })}
    <rect x="64" y="1520" width="952" height="128" fill="${COLOR.paper}"/>
    ${textLines({ x: 108, y: 1580, lines: 'NA SHKRUANI NË', size: 16, fill: COLOR.clay, weight: 700, letterSpacing: 2.4 })}
    ${textLines({ x: 108, y: 1614, lines: 'WHATSAPP OSE INSTAGRAM', size: 24, fill: COLOR.ink, weight: 700, letterSpacing: 1.5 })}
    ${textLines({ x: 972, y: 1602, lines: '→', size: 34, fill: COLOR.clay, weight: 600, anchor: 'end' })}
    ${textLines({ x: 64, y: 1780, lines: '@roal_mobileri', size: 19, fill: COLOR.paper, weight: 500, letterSpacing: 2, opacity: 0.7 })}`;
  return writeScene('07-cta', COLOR.ink, [{ input: portrait, left: 0, top: 0 }, { input: whiteLogo, left: 64, top: 80 }], body, defs);
}

async function main() {
  await mkdir(FRAMES_DIR, { recursive: true });
  const framePaths = [];
  framePaths.push(await copyFrame('00-intro'));
  framePaths.push(await renderPlanGrid());
  framePaths.push(await renderPlanSelected());
  framePaths.push(await reheadFrame('01-materiali-grid', '02-materiali-grid', COLOR.paper, 1, 'Materiali dhe ngjyra', 'Si do të duket dhe mirëmbahet?'));
  framePaths.push(await reheadFrame('01-materiali-selected', '02-materiali-selected', COLOR.paper, 1, 'Materiali dhe ngjyra', 'Shihni përtej ngjyrës'));
  framePaths.push(await reheadFrame('02-syprina-grid', '03-syprina-grid', COLOR.linen, 2, 'Syprina', 'Përballoje nxehtësinë, pa lënë njolla'));
  framePaths.push(await reheadFrame('02-syprina-selected', '03-syprina-selected', COLOR.linen, 2, 'Syprina', 'Përballoje nxehtësinë, pa lënë njolla'));
  framePaths.push(await reheadFrame('04-blum-grid', '04-mekanizmat-grid', COLOR.linen, 3, 'Mekanizmat', 'Si duhet të lëvizë kuzhina?'));
  framePaths.push(await reheadFrame('04-blum-selected', '04-mekanizmat-selected', COLOR.linen, 3, 'Mekanizmat', 'Si duhet të lëvizë kuzhina?'));
  framePaths.push(await renderInstallationsGrid());
  framePaths.push(await renderInstallationsSelected());
  framePaths.push(await renderSummary());
  framePaths.push(await renderCta());

  await sharp(framePaths[0])
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
    .toFile(COVER_PATH);

  console.log(`Rendered ${framePaths.length} v2 frames in ${FRAMES_DIR}`);
}

await main();
