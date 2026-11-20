// news-image-20261120 entry (Node 22, standard library only).
// The entry is a single finished image, entry.png, composed for this bounty:
// a front page summing up the world news of Friday 20 November 2026.
// Russia's overnight missile-and-drone attack on Kyiv, the global market
// sell-off (Nikkei -4.8%, SoftBank -16%), fresh Houthi attacks on Riyadh,
// Trump's posthumous pardon of Pete Rose, Kenya discharging its last Ebola
// patient, and the Europe-wide youth strike — plus the day's other headlines
// in the footer. This program just places that image where the grader reads it.
//
// Run it outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const source = new URL("./entry.png", import.meta.url);

// The grader sets MAKEFUN_OUTPUT_DIR; default to /output when it does not.
function resolveOutDir() {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

const outDir = resolveOutDir();
const target = join(outDir, "entry.png");

// Make sure the output directory exists, so the program also works
// when the caller did not create it first.
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target}`);
