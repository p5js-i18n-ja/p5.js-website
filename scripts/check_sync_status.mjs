import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const ORIGINAL_ROOT = path.resolve(
  PROJECT_ROOT,
  ".original/p5.js-website-main",
);

const CONTENT_REL_PATH = "src/content";
const TARGET_SUBDIRS = ["examples", "libraries", "tutorials", "reference"]; // Focus on these for now

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file.startsWith(".") || file === ".DS_Store") return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      // Filter only relevant files (ignore .DS_Store, etc.)
      if (
        !file.startsWith(".") &&
        (file.endsWith(".mdx") ||
          file.endsWith(".yaml") ||
          file.endsWith(".json"))
      ) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function checkSync() {
  console.log(`Checking sync status...`);

  let stats = {
    missingJa: 0,
    outdatedEn: 0,
    ok: 0,
    total: 0,
    orphanedJa: 0,
  };

  TARGET_SUBDIRS.forEach((subdir) => {
    const originalDir = path.join(ORIGINAL_ROOT, CONTENT_REL_PATH, subdir);
    const projectDir = path.join(PROJECT_ROOT, CONTENT_REL_PATH, subdir);

    if (!fs.existsSync(originalDir)) {
      console.warn(
        `${colors.yellow}Skipping ${subdir}: Not found in .original${colors.reset}`,
      );
      return;
    }

    // We assume 'en' is a subdirectory for these content types.
    // For 'homepage' it might be flat files, but let's stick to subdirs for examples/libraries first as per plan.
    // Actually, we need to handle the structure: src/content/examples/en/...
    // So we look for `en` inside the subdir.

    const originalEnDir = path.join(originalDir, "en");
    if (!fs.existsSync(originalEnDir)) {
      // Some directories might not have 'en' subdir if they are structured differently?
      // Let's check if 'en' exists.
      // If not, maybe it's the other structure type (like yaml in root of subdir).
      // But for Examples, checks showed `src/content/examples/en`.
      console.warn(
        `${colors.yellow}Skipping ${subdir}: 'en' directory not found in .original${colors.reset}`,
      );
      return;
    }

    console.log(`\nScanning ${colors.blue}${subdir}${colors.reset}...`);

    const originalFiles = getFilesRecursively(originalEnDir);

    originalFiles.forEach((originalFilePath) => {
      stats.total++;
      const relPathConfig = path.relative(originalEnDir, originalFilePath);

      const localEnPath = path.join(projectDir, "en", relPathConfig);
      const localJaPath = path.join(projectDir, "ja", relPathConfig);

      let status = [];

      // 1. Check if Local EN matches Original EN
      if (!fs.existsSync(localEnPath)) {
        // Technically MISSING_EN_BASELINE but practically implies we need to copy it
        status.push(`${colors.red}[MISSING EN]${colors.reset}`);
        stats.outdatedEn++;
      } else {
        const originalContent = fs.readFileSync(originalFilePath, "utf-8");
        const localContent = fs.readFileSync(localEnPath, "utf-8");
        if (originalContent !== localContent) {
          status.push(`${colors.yellow}[OUTDATED EN]${colors.reset}`);
          stats.outdatedEn++;
        }
      }

      // 2. Check if Local JA exists
      if (!fs.existsSync(localJaPath)) {
        status.push(`${colors.red}[MISSING JA]${colors.reset}`);
        stats.missingJa++;
      }

      if (status.length > 0) {
        console.log(`${relPathConfig} -> ${status.join(" ")}`);
      } else {
        stats.ok++;
      }
    });

    // Inverse check: Find Orphaned JA files
    const localJaDir = path.join(projectDir, "ja");
    if (fs.existsSync(localJaDir)) {
      const jaFiles = getFilesRecursively(localJaDir);
      jaFiles.forEach((jaFilePath) => {
        const relPath = path.relative(localJaDir, jaFilePath);
        const enFilePath = path.join(originalEnDir, relPath);

        if (!fs.existsSync(enFilePath)) {
          console.log(
            `${relPath} -> ${colors.red}[ORPHANED JA]${colors.reset} (Exists in JA but not in Original EN)`,
          );
          stats.orphanedJa++;
        }
      });
    }
  });

  console.log(`\n${colors.blue}Summary:${colors.reset}`);
  console.log(`Total Files Checked (EN Source): ${stats.total}`);
  console.log(`OK: ${colors.green}${stats.ok}${colors.reset}`);
  console.log(
    `Outdated English Baselines: ${colors.yellow}${stats.outdatedEn}${colors.reset}`,
  );
  console.log(
    `Missing Japanese Translations: ${colors.red}${stats.missingJa}${colors.reset}`,
  );
  console.log(
    `Orphaned Japanese Files: ${colors.red}${stats.orphanedJa || 0}${colors.reset}`,
  );
}

checkSync();
