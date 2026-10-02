#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = join(ROOT, 'social', 'instagram', 'kitchen-builder-sq');
const FRAMES_DIR = join(OUTPUT_DIR, 'frames');
const AUDIO_PATH = join(OUTPUT_DIR, 'kitchen-builder-sq-original-audio.wav');
const VIDEO_PATH = join(OUTPUT_DIR, 'kitchen-builder-sq.mp4');
const COVER_PATH = join(OUTPUT_DIR, 'kitchen-builder-sq-cover.jpg');

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const TRANSITION = 0.18;

const COLOR = {
  ink: '#15130f',
  ink2: '#201c16',
  paper: '#faf8f4',
  linen: '#f0ebe3',
  clay: '#8b4a2e',
  sand: '#e8b894',
  body: '#3a352c',
  moss: '#5e8b66',
  line: '#d8d0c5',
};

const SANS = 'Avenir Next, Avenir, sans-serif';
const SERIF = 'Baskerville, Georgia, serif';

const steps = [
  {
    id: 'materiali',
    title: 'Materiali i paneleve',
    nav: 'Materiali',
    question: 'Çfarë doni të ndjeni çdo ditë?',
    bg: COLOR.paper,
    options: [
      ['Melaminë', 'images/kitchen-catalogue/materials/melamine.webp'],
      ['PET / Akrilik', 'images/kitchen-catalogue/materials/pet-acrylic.webp'],
      ['MDF me lyerje', 'images/kitchen-catalogue/materials/lacquered-mdf.webp'],
      ['Rimeso druri', 'images/kitchen-catalogue/materials/wood-veneer.webp'],
    ],
    selected: [3],
    selectedTitle: 'Mos shihni vetëm ngjyrën',
    badge: 'REZISTENCË  ·  PREKJE  ·  MIRËMBAJTJE',
    desc: ['Krahasoni materialet nga afër.', 'Prekini dhe shihni si kapin dritën.'],
  },
  {
    id: 'syprina',
    title: 'Syprina',
    nav: 'Syprina',
    question: 'Përballoje nxehtësinë, pa lënë njolla',
    bg: COLOR.linen,
    options: [
      ['Laminat', 'images/kitchen-catalogue/worktops/laminate-postforming.webp'],
      ['Kompakt HPL', 'images/kitchen-catalogue/worktops/compact-hpl.webp'],
      ['Kuarc', 'images/kitchen-catalogue/worktops/quartz.webp'],
      ['Granit / Mermer', 'images/kitchen-catalogue/worktops/granite-porcelain.webp'],
    ],
    selected: [2],
    selectedTitle: 'Mendoni për përdorimin',
    badge: 'NJOLLA  ·  NXEHTËSI  ·  LAGËSHTIRË',
    desc: ['Trashësia dhe skajet kanë rëndësi.', 'Zgjidhni sipas mënyrës si gatuani.'],
  },
  {
    id: 'dorezat',
    title: 'Mënyra e hapjes',
    nav: 'Hapja',
    question: 'Dëshironi ta shihni dorezën?',
    bg: COLOR.paper,
    options: [
      ['Dorezë shirit', 'images/kitchen-catalogue/handles/bar-handle.webp'],
      ['Profil Gola', 'images/kitchen-catalogue/handles/gola-profile.webp'],
      ['J-pull', 'images/kitchen-catalogue/handles/j-pull.webp'],
      ['Push-to-open', 'images/kitchen-catalogue/handles/push-to-open.webp'],
    ],
    selected: [1],
    selectedTitle: 'Detaji që ndryshon pamjen',
    badge: 'KAPJE  ·  PASTRIM  ·  BUXHET',
    desc: ['Doreza ndryshon ritmin e fasadës.', 'Provoni kapjen para se të vendosni.'],
  },
  {
    id: 'blum',
    title: 'Mekanizmat',
    nav: 'Mekanizmat',
    question: 'Si duhet të lëvizë kuzhina?',
    bg: COLOR.linen,
    options: [
      ['LEGRABOX', 'images/kitchen-catalogue/mechanisms/legrabox-tandembox.webp'],
      ['AVENTOS', 'images/kitchen-catalogue/mechanisms/aventos.webp'],
      ['SPACE TOWER', 'images/kitchen-catalogue/mechanisms/space-tower.webp'],
      ['TIP-ON', 'images/kitchen-catalogue/mechanisms/tip-on-servo-drive.webp'],
    ],
    selected: [0, 2],
    selectedTitle: 'Funksioni është brenda',
    badge: 'AKSES  ·  PESHË  ·  ORGANIZIM',
    desc: ['Sirtarët e plotë kursejnë kohë.', 'Planifikoni qilarin dhe peshat.'],
  },
  {
    id: 'ndricimi',
    title: 'Ndriçimi i integruar',
    nav: 'Drita',
    question: 'Çfarë pune duhet të bëjë drita?',
    bg: COLOR.paper,
    options: [
      ['LED nën dollapë', 'images/kitchen-catalogue/lighting/under-cabinet.webp'],
      ['LED në Gola', 'images/kitchen-catalogue/lighting/gola-led.webp'],
      ['Dritë me sensor', 'images/kitchen-catalogue/lighting/sensor-drawer.webp'],
      ['LED te bazamenti', 'images/kitchen-catalogue/lighting/plinth-led.webp'],
    ],
    selected: [0, 2],
    selectedTitle: 'Mos e lini dritën për në fund',
    badge: 'PUNË  ·  SENSOR  ·  NATË',
    desc: ['Ndriçoni syprinën pa hije.', 'Mendoni edhe për sirtarët dhe natën.'],
  },
];

const scenes = [
  { name: '00-intro', duration: 2.8 },
  ...steps.flatMap((step, index) => [
    { name: `${String(index + 1).padStart(2, '0')}-${step.id}-grid`, duration: 1.1 },
    { name: `${String(index + 1).padStart(2, '0')}-${step.id}-selected`, duration: 2.1 },
  ]),
  { name: '06-summary', duration: 3.2 },
  { name: '07-cta', duration: 4.0 },
];

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

async function writeScene(name, background, composites, overlay) {
  const output = join(FRAMES_DIR, `${name}.png`);
  const prepared = await Promise.all(
    composites.map(async (item) => ({
      input: item.input ?? (await cropImage(item.path, item.width, item.height, item.position)),
      left: item.left,
      top: item.top,
      blend: item.blend ?? 'over',
    })),
  );

  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background },
  })
    .composite([...prepared, { input: svg(overlay.body, overlay.defs) }])
    .png({ compressionLevel: 9 })
    .toFile(output);

  return output;
}

function chrome(stepIndex, dark = false) {
  const ink = dark ? COLOR.paper : COLOR.ink;
  const future = dark ? 'rgba(250,248,244,0.25)' : COLOR.line;
  const segmentWidth = 160;
  const gap = 12;
  let bars = '';
  for (let index = 0; index < 5; index += 1) {
    const fill = index === stepIndex ? COLOR.clay : index < stepIndex ? ink : future;
    bars += `<rect x="${64 + index * (segmentWidth + gap)}" y="190" width="${segmentWidth}" height="7" fill="${fill}"/>`;
  }
  return `${textLines({ x: 64, y: 122, lines: 'ROAL', size: 34, fill: ink, family: SERIF, weight: 600, letterSpacing: 4 })}
    ${textLines({ x: 1016, y: 120, lines: 'PARA SE TË POROSITNI', size: 18, fill: dark ? COLOR.sand : COLOR.clay, weight: 600, anchor: 'end', letterSpacing: 2.4 })}
    ${bars}`;
}

function gridHeader(step, index) {
  return `${chrome(index)}
    ${textLines({ x: 64, y: 280, lines: `VENDIMI 0${index + 1}`, size: 20, fill: COLOR.clay, weight: 600, letterSpacing: 3 })}
    ${textLines({ x: 64, y: 374, lines: step.title, size: 66, fill: COLOR.ink, family: SERIF, weight: 400 })}
    ${textLines({ x: 64, y: 444, lines: step.question, size: 31, fill: COLOR.body, family: SERIF, style: 'italic' })}
    ${textLines({ x: 1000, y: 365, lines: `0${index + 1}`, size: 156, fill: COLOR.clay, family: SERIF, style: 'italic', anchor: 'end', opacity: 0.13 })}`;
}

async function renderIntro() {
  const hero = await cropImage('images/kitchen-catalogue/hero.webp', 952, 790, 'centre');
  const whiteLogo = await logo(270, COLOR.paper);
  const body = `
    <rect x="64" y="699" width="952" height="790" fill="#000" opacity="0.18"/>
    <rect x="64" y="699" width="952" height="790" fill="none" stroke="rgba(250,248,244,0.16)"/>
    ${textLines({ x: 64, y: 280, lines: ['Po planifikoni', 'një kuzhinë?'], size: 86, fill: COLOR.paper, family: SERIF, weight: 400, lineHeight: 0.98 })}
    ${textLines({ x: 64, y: 488, lines: 'Vendosni këto 5 gjëra.', size: 68, fill: COLOR.sand, family: SERIF, style: 'italic' })}
    ${textLines({ x: 64, y: 585, lines: ['Një kuzhinë e bukur duhet së pari të funksionojë.', 'Ja çfarë duhet të mendoni para porosisë.'], size: 27, fill: COLOR.paper, lineHeight: 1.5, opacity: 0.72 })}
    <rect x="64" y="1580" width="952" height="1" fill="rgba(250,248,244,0.18)"/>
    ${textLines({ x: 64, y: 1644, lines: '5 VENDIME', size: 20, fill: COLOR.sand, weight: 600, letterSpacing: 2.6 })}
    ${textLines({ x: 540, y: 1644, lines: 'PARA POROSISË', size: 20, fill: COLOR.paper, weight: 600, anchor: 'middle', letterSpacing: 2.6, opacity: 0.75 })}
    ${textLines({ x: 1016, y: 1644, lines: 'PËR ÇDO DITË', size: 20, fill: COLOR.paper, weight: 600, anchor: 'end', letterSpacing: 2.6, opacity: 0.75 })}
    ${textLines({ x: 64, y: 1770, lines: 'ROAL  ·  KUZHINA ME POROSI', size: 18, fill: COLOR.paper, weight: 500, letterSpacing: 2.8, opacity: 0.45 })}`;

  return writeScene('00-intro', COLOR.ink, [
    { input: hero, left: 64, top: 699 },
    { input: whiteLogo, left: 64, top: 70 },
  ], { body });
}

async function renderGrid(step, index) {
  const cardWidth = 464;
  const imageHeight = 330;
  const cardHeight = 432;
  const coords = [
    [64, 545],
    [552, 545],
    [64, 1005],
    [552, 1005],
  ];
  const images = await Promise.all(step.options.map((option) => cropImage(option[1], cardWidth, imageHeight)));

  let cards = '';
  for (let optionIndex = 0; optionIndex < step.options.length; optionIndex += 1) {
    const [x, y] = coords[optionIndex];
    cards += `<rect x="${x}" y="${y + imageHeight}" width="${cardWidth}" height="${cardHeight - imageHeight}" fill="${index % 2 === 0 ? COLOR.linen : COLOR.paper}"/>
      <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" fill="none" stroke="rgba(21,19,15,0.14)"/>
      <rect x="${x}" y="${y}" width="45" height="42" fill="${COLOR.paper}"/>
      ${textLines({ x: x + 22.5, y: y + 28, lines: `0${optionIndex + 1}`, size: 16, fill: COLOR.ink, weight: 600, anchor: 'middle', letterSpacing: 1 })}
      ${textLines({ x: x + 24, y: y + 382, lines: step.options[optionIndex][0], size: 28, fill: COLOR.ink, family: SERIF, weight: 500 })}
      ${textLines({ x: x + cardWidth - 24, y: y + 382, lines: '→', size: 26, fill: COLOR.clay, anchor: 'end' })}`;
  }

  const body = `${gridHeader(step, index)}
    ${cards}
    ${textLines({ x: 64, y: 1545, lines: 'SHIHNI ALTERNATIVAT', size: 18, fill: COLOR.clay, weight: 600, letterSpacing: 2.6 })}
    ${textLines({ x: 1016, y: 1545, lines: 'VLERËSONI SI DO TA PËRDORNI', size: 18, fill: COLOR.body, weight: 500, anchor: 'end', letterSpacing: 2.1, opacity: 0.7 })}
    <rect x="64" y="1645" width="952" height="120" fill="${COLOR.ink}"/>
    ${textLines({ x: 104, y: 1718, lines: `${index + 1} / 5`, size: 24, fill: COLOR.sand, family: SERIF, style: 'italic' })}
    ${textLines({ x: 976, y: 1718, lines: 'PYETJET E DUHURA PARANDALOJNË GABIME', size: 16, fill: COLOR.paper, weight: 600, anchor: 'end', letterSpacing: 1.8 })}`;

  return writeScene(`${String(index + 1).padStart(2, '0')}-${step.id}-grid`, step.bg, images.map((input, optionIndex) => ({
    input,
    left: coords[optionIndex][0],
    top: coords[optionIndex][1],
  })), { body });
}

async function renderSelected(step, index) {
  const multi = step.selected.length > 1;
  const bodyParts = [gridHeader(step, index)];
  const composites = [];

  if (!multi) {
    const choice = step.options[step.selected[0]];
    composites.push({
      input: await cropImage(choice[1], 820, 820),
      left: 130,
      top: 540,
    });
    bodyParts.push(`
      <rect x="130" y="540" width="820" height="820" fill="none" stroke="rgba(21,19,15,0.16)"/>
      <circle cx="899" cy="591" r="31" fill="${COLOR.clay}"/>
      ${textLines({ x: 899, y: 602, lines: `0${index + 1}`, size: 22, fill: COLOR.paper, weight: 600, anchor: 'middle' })}
      <rect x="130" y="1360" width="820" height="300" fill="${COLOR.ink}"/>
      ${textLines({ x: 176, y: 1425, lines: step.badge, size: 17, fill: COLOR.sand, weight: 600, letterSpacing: 2.2 })}
      ${textLines({ x: 176, y: 1506, lines: step.selectedTitle, size: 48, fill: COLOR.paper, family: SERIF, weight: 500 })}
      ${textLines({ x: 176, y: 1570, lines: step.desc, size: 24, fill: COLOR.paper, lineHeight: 1.38, opacity: 0.7 })}
      ${textLines({ x: 905, y: 1614, lines: 'ÇFARË TË VLERËSONI', size: 17, fill: COLOR.sand, weight: 600, anchor: 'end', letterSpacing: 2.1 })}`);
  } else {
    const cardWidth = 438;
    const cardTop = 565;
    const imageSize = 438;
    const xPositions = [78, 564];
    step.selected.forEach((selectedIndex, order) => {
      const choice = step.options[selectedIndex];
      composites.push({
        path: choice[1],
        width: imageSize,
        height: imageSize,
        left: xPositions[order],
        top: cardTop,
      });
      bodyParts.push(`
        <rect x="${xPositions[order]}" y="${cardTop}" width="${cardWidth}" height="438" fill="none" stroke="rgba(21,19,15,0.16)"/>
        <circle cx="${xPositions[order] + 391}" cy="${cardTop + 47}" r="29" fill="${COLOR.clay}"/>
        ${textLines({ x: xPositions[order] + 391, y: cardTop + 57, lines: `0${index + 1}`, size: 20, fill: COLOR.paper, weight: 600, anchor: 'middle' })}
        <rect x="${xPositions[order]}" y="1003" width="${cardWidth}" height="185" fill="${COLOR.ink}"/>
        ${textLines({ x: xPositions[order] + 26, y: 1076, lines: choice[0], size: choice[0].length > 16 ? 26 : 32, fill: COLOR.paper, family: SERIF, weight: 500 })}
        ${textLines({ x: xPositions[order] + 26, y: 1130, lines: 'PËR T’U MENDUAR', size: 15, fill: COLOR.sand, weight: 600, letterSpacing: 1.8 })}`);
    });
    bodyParts.push(`
      ${textLines({ x: 78, y: 1275, lines: step.badge, size: 17, fill: COLOR.clay, weight: 600, letterSpacing: 2.2 })}
      ${textLines({ x: 78, y: 1400, lines: step.selectedTitle, size: 63, fill: COLOR.ink, family: SERIF, weight: 500 })}
      ${textLines({ x: 78, y: 1490, lines: step.desc, size: 30, fill: COLOR.body, lineHeight: 1.45 })}
      <rect x="78" y="1650" width="924" height="114" fill="${COLOR.ink}"/>
      ${textLines({ x: 118, y: 1720, lines: `${index + 1} / 5`, size: 23, fill: COLOR.sand, family: SERIF, style: 'italic' })}
      ${textLines({ x: 962, y: 1720, lines: 'FUNKSIONI VJEN I PARI', size: 17, fill: COLOR.paper, weight: 600, anchor: 'end', letterSpacing: 2.1 })}`);
  }

  return writeScene(`${String(index + 1).padStart(2, '0')}-${step.id}-selected`, step.bg, composites, { body: bodyParts.join('') });
}

async function renderSummary() {
  const whiteLogo = await logo(230, COLOR.paper);
  const selections = [
    ['PËRDORIMI', 'Sa dhe si gatuani?'],
    ['MIRËMBAJTJA', 'Sa kohë doni t’i kushtoni?'],
    ['MAGAZINIMI', 'Çfarë duhet të jetë pranë?'],
    ['LËVIZJA', 'Si hapet dhe si qarkulloni?'],
    ['DRITA', 'Ku punoni dhe ku duhen priza?'],
  ];
  let rows = '';
  selections.forEach(([label, value], index) => {
    const y = 650 + index * 150;
    rows += `<line x1="64" y1="${y - 54}" x2="1016" y2="${y - 54}" stroke="rgba(250,248,244,0.14)"/>
      ${textLines({ x: 64, y, lines: `0${index + 1}`, size: 18, fill: COLOR.sand, weight: 600 })}
      ${textLines({ x: 130, y, lines: label, size: 17, fill: COLOR.paper, weight: 600, letterSpacing: 2, opacity: 0.45 })}
      ${textLines({ x: 1016, y: y + 2, lines: value, size: value.length > 20 ? 25 : 30, fill: COLOR.paper, family: SERIF, weight: 500, anchor: 'end' })}`;
  });
  rows += `<line x1="64" y1="1346" x2="1016" y2="1346" stroke="rgba(250,248,244,0.14)"/>`;

  const body = `
    ${textLines({ x: 64, y: 235, lines: 'KONTROLLI PARA POROSISË', size: 18, fill: COLOR.sand, weight: 600, letterSpacing: 2.8 })}
    ${textLines({ x: 64, y: 345, lines: ['Pesë pyetje që', 'kursejnë gabime.'], size: 69, fill: COLOR.paper, family: SERIF, weight: 400, lineHeight: 1.04 })}
    <circle cx="925" cy="325" r="83" fill="none" stroke="rgba(232,184,148,0.38)" stroke-width="2"/>
    ${textLines({ x: 925, y: 330, lines: '5/5', size: 37, fill: COLOR.sand, family: SERIF, style: 'italic', anchor: 'middle' })}
    ${textLines({ x: 925, y: 365, lines: 'PYETJE', size: 12, fill: COLOR.paper, weight: 600, anchor: 'middle', letterSpacing: 1.5, opacity: 0.5 })}
    ${rows}
    <rect x="64" y="1438" width="952" height="210" fill="${COLOR.clay}"/>
    ${textLines({ x: 108, y: 1510, lines: 'PARA SE TË VENDOSNI', size: 16, fill: COLOR.sand, weight: 600, letterSpacing: 2.5 })}
    ${textLines({ x: 108, y: 1588, lines: 'Ruajeni këtë listë', size: 42, fill: COLOR.paper, family: SERIF, weight: 500 })}
    ${textLines({ x: 965, y: 1588, lines: '⌑', size: 42, fill: COLOR.paper, anchor: 'end' })}
    ${textLines({ x: 64, y: 1750, lines: 'MATERIALE  •  FUNKSION  •  DRITË', size: 17, fill: COLOR.paper, weight: 500, letterSpacing: 2.1, opacity: 0.48 })}`;

  return writeScene('06-summary', COLOR.ink, [{ input: whiteLogo, left: 64, top: 70 }], { body });
}

async function renderCta() {
  const portrait = await cropImage('images/kitchen-catalogue/trends-rounded.webp', WIDTH, HEIGHT, 'centre');
  const whiteLogo = await logo(260, COLOR.paper);
  const defs = `<linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#15130f" stop-opacity="0.18"/>
      <stop offset="0.42" stop-color="#15130f" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#15130f" stop-opacity="0.92"/>
    </linearGradient>`;
  const body = `
    <rect width="1080" height="1920" fill="url(#shade)"/>
    ${textLines({ x: 64, y: 1125, lines: ['Kuzhina juaj nis', 'me një plan', 'të mirë.'], size: 68, fill: COLOR.paper, family: SERIF, weight: 400, lineHeight: 1.03 })}
    ${textLines({ x: 64, y: 1395, lines: ['Nga matja te projekti 3D dhe instalimi —', 'e mendojmë për mënyrën tuaj të jetesës.'], size: 26, fill: COLOR.paper, lineHeight: 1.45, opacity: 0.74 })}
    <rect x="64" y="1520" width="952" height="128" fill="${COLOR.paper}"/>
    ${textLines({ x: 108, y: 1600, lines: 'PO PLANIFIKONI KUZHINË?', size: 19, fill: COLOR.clay, weight: 600, letterSpacing: 2.4 })}
    ${textLines({ x: 972, y: 1600, lines: 'NA SHKRUANI  →', size: 20, fill: COLOR.ink, weight: 600, anchor: 'end', letterSpacing: 1.7 })}
    ${textLines({ x: 64, y: 1780, lines: '@roal_mobileri', size: 19, fill: COLOR.paper, weight: 500, letterSpacing: 2, opacity: 0.64 })}`;

  return writeScene('07-cta', COLOR.ink, [
    { input: portrait, left: 0, top: 0 },
    { input: whiteLogo, left: 64, top: 80 },
  ], { body, defs });
}

function writeWav(path, samples, sampleRate) {
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let index = 0; index < samples.length; index += 1) {
    const value = Math.max(-1, Math.min(1, samples[index]));
    buffer.writeInt16LE(Math.round(value * 32767), 44 + index * bytesPerSample);
  }
  return writeFile(path, buffer);
}

function synthesizeAudio(duration, sceneStarts) {
  const sampleRate = 48000;
  const length = Math.ceil(duration * sampleRate);
  const samples = new Float64Array(length);
  const chords = [
    [110, 130.81, 164.81],
    [87.31, 110, 130.81],
    [65.41, 98, 130.81],
    [98, 123.47, 146.83],
  ];
  let seed = 0x5eed1234;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };

  for (let index = 0; index < length; index += 1) {
    const t = index / sampleRate;
    const chord = chords[Math.floor(t / 4) % chords.length];
    const padEnvelope = 0.55 + 0.45 * Math.sin(Math.PI * ((t % 4) / 4));
    let value = 0;
    chord.forEach((frequency, noteIndex) => {
      value += 0.014 * padEnvelope * Math.sin(2 * Math.PI * frequency * t + noteIndex * 0.7);
      value += 0.004 * padEnvelope * Math.sin(2 * Math.PI * frequency * 2 * t + noteIndex * 0.3);
    });
    value += (random() * 2 - 1) * 0.0012;
    samples[index] = value;
  }

  const addTone = (start, lengthSeconds, frequency, amplitude, decay, harmonic = 0.25) => {
    const startSample = Math.floor(start * sampleRate);
    const endSample = Math.min(length, startSample + Math.floor(lengthSeconds * sampleRate));
    for (let index = startSample; index < endSample; index += 1) {
      const t = (index - startSample) / sampleRate;
      const envelope = Math.exp(-decay * t);
      samples[index] += amplitude * envelope * (
        Math.sin(2 * Math.PI * frequency * t) +
        harmonic * Math.sin(2 * Math.PI * frequency * 2 * t)
      );
    }
  };

  const arpeggio = [220, 261.63, 329.63, 392, 329.63, 261.63, 196, 246.94];
  for (let beat = 0, t = 0.35; t < duration - 0.5; beat += 1, t += 0.75) {
    addTone(t, 0.46, arpeggio[beat % arpeggio.length], 0.035, 8.5, 0.18);
    if (beat % 2 === 0) {
      const startSample = Math.floor(t * sampleRate);
      const endSample = Math.min(length, startSample + Math.floor(0.25 * sampleRate));
      for (let index = startSample; index < endSample; index += 1) {
        const dt = (index - startSample) / sampleRate;
        const phase = 2 * Math.PI * (78 * dt - 35 * dt * dt);
        samples[index] += 0.075 * Math.exp(-14 * dt) * Math.sin(phase);
      }
    }
  }

  sceneStarts.slice(1).forEach((start, index) => {
    const startSample = Math.floor((start + 0.03) * sampleRate);
    const endSample = Math.min(length, startSample + Math.floor(0.055 * sampleRate));
    let previousNoise = 0;
    for (let sampleIndex = startSample; sampleIndex < endSample; sampleIndex += 1) {
      const dt = (sampleIndex - startSample) / sampleRate;
      const noise = random() * 2 - 1;
      const highPassed = noise - previousNoise * 0.88;
      previousNoise = noise;
      samples[sampleIndex] += highPassed * 0.025 * Math.exp(-60 * dt);
    }
    if (index % 2 === 0) addTone(start + 0.03, 0.12, 720, 0.025, 28, 0.1);
  });

  const fadeSeconds = 0.7;
  let peak = 0;
  for (let index = 0; index < length; index += 1) {
    const t = index / sampleRate;
    const fadeIn = Math.min(1, t / fadeSeconds);
    const fadeOut = Math.min(1, (duration - t) / fadeSeconds);
    samples[index] *= Math.max(0, Math.min(fadeIn, fadeOut));
    peak = Math.max(peak, Math.abs(samples[index]));
  }
  const gain = peak > 0 ? 0.72 / peak : 1;
  for (let index = 0; index < length; index += 1) samples[index] *= gain;

  return { samples, sampleRate };
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}`);
}

async function renderVideo(framePaths) {
  const sceneStarts = [];
  let cursor = 0;
  scenes.forEach((scene, index) => {
    sceneStarts.push(cursor);
    cursor += scene.duration;
    if (index < scenes.length - 1) cursor -= TRANSITION;
  });
  const totalDuration = cursor;
  const audio = synthesizeAudio(totalDuration, sceneStarts);
  await writeWav(AUDIO_PATH, audio.samples, audio.sampleRate);

  const args = ['-y'];
  framePaths.forEach((framePath) => args.push('-i', framePath));
  args.push('-i', AUDIO_PATH);

  const filters = [];
  scenes.forEach((scene, index) => {
    const frames = Math.round(scene.duration * FPS);
    const direction = index % 2 === 0 ? 1 : -1;
    const xExpression = direction > 0
      ? "iw/2-(iw/zoom/2)+3*sin(on/22)"
      : "iw/2-(iw/zoom/2)-3*sin(on/22)";
    filters.push(
      `[${index}:v]zoompan=z='min(1.0+on*0.00018,1.018)':x='${xExpression}':y='ih/2-(ih/zoom/2)':d=${frames}:s=${WIDTH}x${HEIGHT}:fps=${FPS},settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v${index}]`,
    );
  });

  let previous = 'v0';
  let elapsed = scenes[0].duration;
  for (let index = 1; index < scenes.length; index += 1) {
    const output = index === scenes.length - 1 ? 'outv' : `x${index}`;
    const offset = elapsed - TRANSITION;
    filters.push(
      `[${previous}][v${index}]xfade=transition=fade:duration=${TRANSITION}:offset=${offset.toFixed(3)}[${output}]`,
    );
    previous = output;
    elapsed = elapsed + scenes[index].duration - TRANSITION;
  }

  args.push(
    '-filter_complex', filters.join(';'),
    '-map', '[outv]',
    '-map', `${scenes.length}:a`,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-profile:v', 'high',
    '-level', '4.1',
    '-pix_fmt', 'yuv420p',
    '-r', String(FPS),
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ar', '48000',
    '-movflags', '+faststart',
    '-shortest',
    VIDEO_PATH,
  );

  run('ffmpeg', args);
  return { totalDuration, sceneStarts };
}

async function writeFableCutProject(renderInfo, framePaths) {
  const imageMedia = framePaths.map((framePath, index) => ({
    id: `m_scene_${String(index).padStart(2, '0')}`,
    name: framePath.split('/').at(-1),
    kind: 'image',
    src: `/media/frames/${framePath.split('/').at(-1)}`,
    width: WIDTH,
    height: HEIGHT,
  }));
  const audioMedia = {
    id: 'm_original_audio',
    name: 'kitchen-builder-sq-original-audio.wav',
    kind: 'audio',
    src: '/media/kitchen-builder-sq-original-audio.wav',
    duration: Number(renderInfo.totalDuration.toFixed(3)),
  };
  const clips = scenes.map((scene, index) => ({
    id: `c_scene_${String(index).padStart(2, '0')}`,
    mediaId: imageMedia[index].id,
    kind: 'image',
    track: 'V1',
    start: Number(renderInfo.sceneStarts[index].toFixed(3)),
    in: 0,
    duration: scene.duration,
    name: scene.name,
    props: { fit: 'cover' },
    keyframes: {
      scale: [
        { t: 0, v: 1 },
        { t: scene.duration, v: 1.018, ease: 'linear' },
      ],
    },
    ...(index > 0 ? { transitionIn: { type: 'fade', duration: TRANSITION } } : {}),
    ...(index < scenes.length - 1 ? { transitionOut: { type: 'fade', duration: TRANSITION } } : {}),
  }));
  clips.push({
    id: 'c_original_audio',
    mediaId: audioMedia.id,
    kind: 'audio',
    track: 'A1',
    start: 0,
    in: 0,
    duration: Number(renderInfo.totalDuration.toFixed(3)),
    name: 'Original ambient bed',
    props: { volume: 1 },
  });

  const project = {
    name: 'ROAL — 5 vendime para se të porositni kuzhinën',
    width: WIDTH,
    height: HEIGHT,
    fps: FPS,
    background: COLOR.ink,
    revision: 1,
    markers: renderInfo.sceneStarts.map((start, index) => ({
      t: Number(start.toFixed(3)),
      label: scenes[index].name,
    })),
    media: [...imageMedia, audioMedia],
    clips,
  };

  await writeFile(
    join(OUTPUT_DIR, 'fablecut-project.json'),
    `${JSON.stringify(project, null, 2)}\n`,
  );
  await writeFile(
    join(OUTPUT_DIR, 'FABLECUT.md'),
    `# FableCut handoff\n\nCopy the \`frames/\` folder and \`kitchen-builder-sq-original-audio.wav\` into FableCut's \`media/\` folder, then replace its \`project.json\` with \`fablecut-project.json\`. Start FableCut with \`node server.js\` and open \`http://127.0.0.1:7777\`.\n`,
  );
}

async function main() {
  await mkdir(FRAMES_DIR, { recursive: true });

  const framePaths = [];
  framePaths.push(await renderIntro());
  for (let index = 0; index < steps.length; index += 1) {
    framePaths.push(await renderGrid(steps[index], index));
    framePaths.push(await renderSelected(steps[index], index));
  }
  framePaths.push(await renderSummary());
  framePaths.push(await renderCta());

  await sharp(framePaths[0])
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
    .toFile(COVER_PATH);

  const renderInfo = await renderVideo(framePaths);
  await writeFableCutProject(renderInfo, framePaths);
  await writeFile(join(OUTPUT_DIR, 'render.json'), `${JSON.stringify({
    width: WIDTH,
    height: HEIGHT,
    fps: FPS,
    duration: Number(renderInfo.totalDuration.toFixed(3)),
    scenes: scenes.map((scene, index) => ({ ...scene, start: Number(renderInfo.sceneStarts[index].toFixed(3)) })),
    video: 'kitchen-builder-sq.mp4',
    cover: 'kitchen-builder-sq-cover.jpg',
    audio: 'kitchen-builder-sq-original-audio.wav',
    fableCutProject: 'fablecut-project.json',
  }, null, 2)}\n`);

  console.log(`Rendered ${VIDEO_PATH}`);
}

await main();
