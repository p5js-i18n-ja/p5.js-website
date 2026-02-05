import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const ORIGINAL_ROOT = path.resolve(
  PROJECT_ROOT,
  ".original/p5.js-website-main",
);
const LOG_FILE = path.join(PROJECT_ROOT, "pending_updates.md");

const CONTENT_REL_PATH = "src/content";
const TARGET_SUBDIRS = ["reference"]; // Focusing on reference first as per status check

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
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

function syncBaselines() {
  console.log(`Syncing English baselines...`);
  fs.writeFileSync(LOG_FILE, "# Pending Translation Updates\n\n");

  let count = 0;

  TARGET_SUBDIRS.forEach((subdir) => {
    const originalDir = path.join(ORIGINAL_ROOT, CONTENT_REL_PATH, subdir);
    const projectDir = path.join(PROJECT_ROOT, CONTENT_REL_PATH, subdir);

    if (!fs.existsSync(originalDir)) return;

    const originalEnDir = path.join(originalDir, "en");
    if (!fs.existsSync(originalEnDir)) return;

    const originalFiles = getFilesRecursively(originalEnDir);

    originalFiles.forEach((originalFilePath) => {
      const relPathConfig = path.relative(originalEnDir, originalFilePath);
      const localEnPath = path.join(projectDir, "en", relPathConfig);

      // Check if outdated
      if (fs.existsSync(localEnPath)) {
        const originalContent = fs.readFileSync(originalFilePath, "utf-8");
        const localContent = fs.readFileSync(localEnPath, "utf-8");

        if (originalContent !== localContent) {
          console.log(`Updating: ${relPathConfig}`);

          // Generate Diff
          try {
            // Use git diff --no-index to get a nice diff
            // We swallow the error because diff returns exit code 1 on differences
            const diff = execSync(
              `diff -u "${localEnPath}" "${originalFilePath}"`,
              { encoding: "utf-8" },
            ).catch((e) => e.stdout);

            fs.appendFileSync(
              LOG_FILE,
              `## ${relPathConfig}\n\n\`\`\`diff\n${diff}\n\`\`\`\n\n`,
            );
          } catch (e) {
            console.error("Diff failed", e);
          }

          // Copy file
          fs.copyFileSync(originalFilePath, localEnPath);
          count++;
        }
      }
    });
  });

  console.log(`Updated ${count} files. Diffs saved to pending_updates.md`);
}

syncBaselines();
