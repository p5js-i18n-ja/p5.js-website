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
const TARGET_SUBDIRS = ["libraries"]; // Focused on libraries

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
      if (file.endsWith(".yaml")) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function syncMissingJa() {
  console.log(`Syncing missing Japanese files...`);
  let count = 0;

  TARGET_SUBDIRS.forEach((subdir) => {
    const originalDir = path.join(ORIGINAL_ROOT, CONTENT_REL_PATH, subdir);
    const projectDir = path.join(PROJECT_ROOT, CONTENT_REL_PATH, subdir);

    if (!fs.existsSync(originalDir)) return;

    // original structure for libraries is src/content/libraries/en/FILE.yaml
    const originalEnDir = path.join(originalDir, "en");
    if (!fs.existsSync(originalEnDir)) return;

    const originalFiles = getFilesRecursively(originalEnDir);

    originalFiles.forEach((originalFilePath) => {
      const relPathConfig = path.relative(originalEnDir, originalFilePath);
      const localJaPath = path.join(projectDir, "ja", relPathConfig);

      if (!fs.existsSync(localJaPath)) {
        console.log(`Copying to JA: ${relPathConfig}`);

        // Ensure dir exists
        fs.mkdirSync(path.dirname(localJaPath), { recursive: true });

        // Copy
        fs.copyFileSync(originalFilePath, localJaPath);
        count++;
      }
    });
  });

  console.log(`Copied ${count} missing files to Japanese directory.`);
}

syncMissingJa();
