import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

process.env.SITE_URL ||= "https://doodle.day";
await import("./build-tutorials.mjs");

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });

const copy = (from, to = from) => cp(
  new URL(`../${from}`, import.meta.url),
  new URL(`../dist/${to}`, import.meta.url),
  { recursive: true }
);

for (const entry of [
  "assets",
  "tutorials",
  "index.html",
  "library.html",
  "styles.css",
  "script.js",
  "favicon.ico",
  "feed.xml",
  "sitemap.xml",
  "robots.txt",
]) {
  await copy(entry);
}

const distFiles = await readdir(dist);
console.log(`Prepared Doodle.day production build in ${join(root.pathname, "dist")} with ${distFiles.length} top-level entries.`);
