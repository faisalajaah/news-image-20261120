// Entry for the news-image-20261120 bounty (Node 22, stdlib only).
// The deliverable is one finished front page, entry.png, drawn for Friday
// 20 November 2026: Kyiv under overnight attack, markets sliding worldwide,
// Riyadh hit again, Pete Rose pardoned, Kenya's last Ebola patient going
// home, and students striking across Europe, with the rest of the day's
// news along the bottom. This script's only job is to hand that image to
// the grader in the directory it asks for.
//
// Try it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const source = new URL("./entry.png", import.meta.url);

// The grader sets MAKEFUN_OUTPUT_DIR; default to /output when it does not.
function resolveOutDir() {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

const outDir = resolveOutDir();
const target = join(outDir, "entry.png");

// Bail out loudly instead of copying nothing if the image is absent.
if (!existsSync(source)) {
  throw new Error(`entry.png is missing next to main.ts (${source})`);
}

// Make sure the output directory exists, so the program also works
// when the caller did not create it first.
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Report the copied size and enforce the competition's 1 MiB image cap.
const bytes = statSync(target).size;
const ONE_MIB = 1024 * 1024;
if (bytes > ONE_MIB) {
  throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB cap`);
}
console.log(`wrote ${target} (${bytes} bytes)`);
