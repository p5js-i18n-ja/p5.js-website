const fs = require("fs");
const path = require("path");

const contentDir =
  "/Users/shibomb/Documents/projects/_opensource_contribute/p5.js-website/src/content";
const targetDirs = ["tutorials", "contributor-docs"]; // Add other dirs if needed

function getHeaders(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    return lines
      .filter((line) => line.trim().startsWith("#"))
      .map((line) => line.trim().replace(/^#+\s*/, ""));
  } catch (e) {
    return null;
  }
}

function scanDirectory(dir) {
  const enDir = path.join(contentDir, dir, "en");
  const jaDir = path.join(contentDir, dir, "ja");

  if (!fs.existsSync(enDir)) return;

  const enFiles = fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  console.log(`\n--- Scanning ${dir} ---\n`);

  enFiles.forEach((file) => {
    const enFilePath = path.join(enDir, file);
    const jaFilePath = path.join(jaDir, file);

    if (!fs.existsSync(jaFilePath)) {
      console.log(`[MISSING FILE] ${dir}/ja/${file}`);
      return;
    }

    const enHeaders = getHeaders(enFilePath);
    const jaHeaders = getHeaders(jaFilePath);

    if (enHeaders && jaHeaders) {
      // Simple check: are there headers in EN that are conceptually missing in JA?
      // Since translation changes the text, we can't do exact match.
      // But we can check count and maybe structure?
      // Actually, for "section level syncing", simply checking for *count* mismatch of significant headers (##) might be a good heuristic.
      // Or, listing the headers side-by-side for manual review is better for the agent?
      // Let's try to detect if JA has *fewer* headers of level 2 (##) than EN.

      const enH2 = enHeaders.filter(
        (h) =>
          !h.toLowerCase().includes("prerequisites") &&
          !h.toLowerCase().includes("next steps"),
      ); // filter common ones optionally
      // actually, let's just dump files where header counts differ significantly

      const enRawHeaders = fs
        .readFileSync(enFilePath, "utf8")
        .split("\n")
        .filter((l) => l.startsWith("## "))
        .map((l) => l.trim());
      const jaRawHeaders = fs
        .readFileSync(jaFilePath, "utf8")
        .split("\n")
        .filter((l) => l.startsWith("## "))
        .map((l) => l.trim());

      if (enRawHeaders.length > jaRawHeaders.length) {
        console.log(`[POSSIBLE MISSING CONTENT] ${dir}/${file}`);
        console.log(`  EN Headers (${enRawHeaders.length}):`, enRawHeaders);
        console.log(`  JA Headers (${jaRawHeaders.length}):`, jaRawHeaders);
        const missingCount = enRawHeaders.length - jaRawHeaders.length;
        console.log(`  Difference: ${missingCount} section(s)`);
      }
    }
  });
}

targetDirs.forEach(scanDirectory);
