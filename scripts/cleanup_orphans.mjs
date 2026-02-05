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
const TARGET_SUBDIRS = ["examples", "libraries", "tutorials", "reference"];

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
      if (
        file.endsWith(".mdx") ||
        file.endsWith(".yaml") ||
        file.endsWith(".json")
      ) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function cleanupOrphans() {
  console.log("Scanning for orphaned Japanese files...");
  let deletedCount = 0;

  TARGET_SUBDIRS.forEach((subdir) => {
    const originalDir = path.join(ORIGINAL_ROOT, CONTENT_REL_PATH, subdir);
    const projectDir = path.join(PROJECT_ROOT, CONTENT_REL_PATH, subdir);

    const originalEnDir = path.join(originalDir, "en");
    const localJaDir = path.join(projectDir, "ja");

    if (fs.existsSync(localJaDir) && fs.existsSync(originalEnDir)) {
      const jaFiles = getFilesRecursively(localJaDir);
      jaFiles.forEach((jaFilePath) => {
        const relPath = path.relative(localJaDir, jaFilePath);
        const enFilePath = path.join(originalEnDir, relPath);

        if (!fs.existsSync(enFilePath)) {
          console.log(`Deleting ORPHAN: ${relPath}`);
          fs.unlinkSync(jaFilePath);
          deletedCount++;

          // Try to remove parent directory if empty
          const parentDir = path.dirname(jaFilePath);
          try {
            if (fs.readdirSync(parentDir).length === 0) {
              fs.rmdirSync(parentDir);
              console.log(
                `Removed empty directory: ${path.relative(localJaDir, parentDir)}`,
              );
            }
          } catch (e) {
            // Ignore if directory not empty or other error
          }
        }
      });
    }
  });

  console.log(`\nDeleted ${deletedCount} orphaned Japanese files.`);
}

cleanupOrphans();
