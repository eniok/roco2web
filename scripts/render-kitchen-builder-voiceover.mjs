#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { access, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = join(ROOT, 'social', 'instagram', 'kitchen-builder-sq');
const MUSIC_PATH = join(OUTPUT_DIR, 'kitchen-builder-sq-original-audio.wav');

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const TRANSITION = 0.18;

const anilaScenes = [
  { name: '00-intro', duration: 3.305 },
  { name: '01-materiali-grid', duration: 1.3 },
  { name: '01-materiali-selected', duration: 3.779 },
  { name: '02-syprina-grid', duration: 1.3 },
  { name: '02-syprina-selected', duration: 4.022 },
  { name: '03-dorezat-grid', duration: 1.25 },
  { name: '03-dorezat-selected', duration: 3.459 },
  { name: '04-blum-grid', duration: 1.25 },
  { name: '04-blum-selected', duration: 3.562 },
  { name: '05-ndricimi-grid', duration: 1.2 },
  { name: '05-ndricimi-selected', duration: 3.088 },
  { name: '06-summary', duration: 2.846 },
  { name: '07-cta', duration: 2.951 },
];

// The Gemini timings follow the long pauses between its eight sentences.
// Each decision's grid begins with the matching sentence, then crossfades to
// the selected-detail frame while that same sentence continues.
const geminiScenes = [
  { name: '00-intro', duration: 3.799 },
  { name: '01-materiali-grid', duration: 1.3 },
  { name: '01-materiali-selected', duration: 4.629 },
  { name: '02-syprina-grid', duration: 1.3 },
  { name: '02-syprina-selected', duration: 4.624 },
  { name: '03-dorezat-grid', duration: 1.25 },
  { name: '03-dorezat-selected', duration: 4.429 },
  { name: '04-blum-grid', duration: 1.25 },
  { name: '04-blum-selected', duration: 3.503 },
  { name: '05-ndricimi-grid', duration: 1.2 },
  { name: '05-ndricimi-selected', duration: 3.378 },
  { name: '06-summary', duration: 3.234 },
  { name: '07-cta', duration: 2.584 },
];

const geminiV2Scenes = [
  { name: '00-intro', duration: 4.13 },
  { name: '01-planimetria-grid', duration: 1.2 },
  { name: '01-planimetria-selected', duration: 3.692 },
  { name: '02-materiali-grid', duration: 1.2 },
  { name: '02-materiali-selected', duration: 3.488 },
  { name: '03-syprina-grid', duration: 1.2 },
  { name: '03-syprina-selected', duration: 3.889 },
  { name: '04-mekanizmat-grid', duration: 1.2 },
  { name: '04-mekanizmat-selected', duration: 3.809 },
  { name: '05-instalimet-grid', duration: 1.2 },
  { name: '05-instalimet-selected', duration: 3.651 },
  { name: '06-summary', duration: 3.675 },
  { name: '07-cta', duration: 3.586 },
];

const variants = {
  anila: {
    framesDir: 'frames',
    voiceFile: 'kitchen-builder-sq-voiceover-anila.mp3',
    videoFile: 'kitchen-builder-sq-voiceover.mp4',
    projectFile: 'fablecut-project-voiceover.json',
    voiceLabel: 'Anila — Albanian narration',
    projectName: 'ROAL — 5 vendime para porosisë — voiceover',
    scenes: anilaScenes,
  },
  gemini: {
    framesDir: 'frames',
    voiceFile: 'kitchen-builder-sq-voiceover-gemini-sulafat.wav',
    videoFile: 'kitchen-builder-sq-voiceover-gemini-sulafat.mp4',
    projectFile: 'fablecut-project-voiceover-gemini-sulafat.json',
    voiceLabel: 'Gemini 3.1 Sulafat — Albanian narration',
    projectName: 'ROAL — 5 vendime para porosisë — Gemini voiceover',
    scenes: geminiScenes,
  },
  'gemini-v2': {
    framesDir: 'frames-gemini-v2',
    voiceFile: 'kitchen-builder-sq-voiceover-gemini-v2.wav',
    videoFile: 'kitchen-builder-sq-voiceover-gemini-v2.mp4',
    projectFile: 'fablecut-project-voiceover-gemini-v2.json',
    voiceLabel: 'Gemini 3.1 Sulafat — revised Albanian narration',
    projectName: 'ROAL — 5 elemente para porosisë — Gemini v2',
    scenes: geminiV2Scenes,
  },
};

const variantName = process.argv.find((argument) => argument.startsWith('--variant='))?.split('=')[1] ?? 'anila';
const variant = variants[variantName];
if (!variant) {
  throw new Error(`Unknown variant "${variantName}". Use --variant=anila, --variant=gemini or --variant=gemini-v2.`);
}

const { scenes } = variant;
const FRAMES_DIR = join(OUTPUT_DIR, variant.framesDir);
const VOICE_PATH = join(OUTPUT_DIR, variant.voiceFile);
const VIDEO_PATH = join(OUTPUT_DIR, variant.videoFile);
const PROJECT_PATH = join(OUTPUT_DIR, variant.projectFile);

function run(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}`);
}

function timeline() {
  const starts = [];
  let cursor = 0;
  scenes.forEach((scene, index) => {
    starts.push(cursor);
    cursor += scene.duration;
    if (index < scenes.length - 1) cursor -= TRANSITION;
  });
  return { starts, duration: cursor };
}

async function writeFableCutProject(framePaths, starts, duration) {
  const imageMedia = framePaths.map((framePath, index) => ({
    id: `m_vo_scene_${String(index).padStart(2, '0')}`,
    name: framePath.split('/').at(-1),
    kind: 'image',
    src: `/media/${variant.framesDir}/${framePath.split('/').at(-1)}`,
    width: WIDTH,
    height: HEIGHT,
  }));
  const media = [
    ...imageMedia,
    {
      id: 'm_vo_music',
      name: 'kitchen-builder-sq-original-audio.wav',
      kind: 'audio',
      src: '/media/kitchen-builder-sq-original-audio.wav',
      duration: 23.84,
    },
    {
      id: 'm_vo_narration',
      name: variant.voiceFile,
      kind: 'audio',
      src: `/media/${variant.voiceFile}`,
      duration,
    },
  ];
  const clips = scenes.map((scene, index) => ({
    id: `c_vo_scene_${String(index).padStart(2, '0')}`,
    mediaId: imageMedia[index].id,
    kind: 'image',
    track: 'V1',
    start: Number(starts[index].toFixed(3)),
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
  clips.push(
    {
      id: 'c_vo_music_1',
      mediaId: 'm_vo_music',
      kind: 'audio',
      track: 'A1',
      start: 0,
      in: 0,
      duration: 23.84,
      name: 'Ambient bed',
      props: { volume: 0.2 },
    },
    {
      id: 'c_vo_music_2',
      mediaId: 'm_vo_music',
      kind: 'audio',
      track: 'A1',
      start: 23.66,
      in: 0,
      duration: Number((duration - 23.66).toFixed(3)),
      name: 'Ambient bed loop',
      props: { volume: 0.2 },
      transitionIn: { type: 'fade', duration: TRANSITION },
    },
    {
      id: 'c_vo_narration',
      mediaId: 'm_vo_narration',
      kind: 'audio',
      track: 'A2',
      start: 0,
      in: 0,
      duration,
      name: variant.voiceLabel,
      props: { volume: 1 },
    },
  );

  const project = {
    name: variant.projectName,
    width: WIDTH,
    height: HEIGHT,
    fps: FPS,
    background: '#15130f',
    revision: 1,
    markers: starts.map((start, index) => ({
      t: Number(start.toFixed(3)),
      label: scenes[index].name,
    })),
    media,
    clips,
  };
  await writeFile(PROJECT_PATH, `${JSON.stringify(project, null, 2)}\n`);
}

async function main() {
  const framePaths = scenes.map((scene) => join(FRAMES_DIR, `${scene.name}.png`));
  await Promise.all([...framePaths, MUSIC_PATH, VOICE_PATH].map((path) => access(path)));

  const { starts, duration } = timeline();
  const args = ['-y'];
  framePaths.forEach((framePath) => args.push('-i', framePath));
  args.push('-stream_loop', '-1', '-i', MUSIC_PATH, '-i', VOICE_PATH);

  const filters = [];
  scenes.forEach((scene, index) => {
    const frames = Math.round(scene.duration * FPS);
    const direction = index % 2 === 0 ? 1 : -1;
    const xExpression = direction > 0
      ? "iw/2-(iw/zoom/2)+3*sin(on/22)"
      : "iw/2-(iw/zoom/2)-3*sin(on/22)";
    filters.push(
      `[${index}:v]zoompan=z='min(1.0+on*0.00014,1.018)':x='${xExpression}':y='ih/2-(ih/zoom/2)':d=${frames}:s=${WIDTH}x${HEIGHT}:fps=${FPS},settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v${index}]`,
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
    elapsed += scenes[index].duration - TRANSITION;
  }

  const musicIndex = scenes.length;
  const voiceIndex = scenes.length + 1;
  filters.push(
    `[${musicIndex}:a]aresample=48000,atrim=0:${duration.toFixed(3)},asetpts=PTS-STARTPTS,volume=0.22[bed]`,
    `[${voiceIndex}:a]aresample=48000,aformat=sample_rates=48000:channel_layouts=mono,atrim=0:${duration.toFixed(3)},asetpts=PTS-STARTPTS,highpass=f=90,lowpass=f=11000,acompressor=threshold=0.15:ratio=2.5:attack=5:release=120:makeup=1.35,asplit=2[voice_sc][voice_mix]`,
    '[bed][voice_sc]sidechaincompress=threshold=0.018:ratio=10:attack=12:release=260[ducked]',
    '[ducked][voice_mix]amix=inputs=2:duration=longest:dropout_transition=0:normalize=0,alimiter=limit=0.92,loudnorm=I=-16:TP=-1.5:LRA=9[aout]',
  );

  args.push(
    '-filter_complex', filters.join(';'),
    '-map', '[outv]',
    '-map', '[aout]',
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
    '-t', duration.toFixed(3),
    VIDEO_PATH,
  );

  run('ffmpeg', args);
  await writeFableCutProject(framePaths, starts, duration);
  console.log(`Rendered ${VIDEO_PATH}`);
}

await main();
