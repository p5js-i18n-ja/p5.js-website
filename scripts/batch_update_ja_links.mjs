import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const JA_REF_DIR = path.join(PROJECT_ROOT, "src/content/reference/ja");

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file === ".DS_Store" || file.startsWith(".")) return;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      if (file.endsWith(".mdx")) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function batchUpdateLinks() {
  console.log("Starting batch link update...");
  const files = getFilesRecursively(JA_REF_DIR);
  let count = 0;

  files.forEach((file) => {
    let content = fs.readFileSync(file, "utf-8");
    // Replace /reference/p5/p5.Element/ with #/p5.Element
    const regex = /href="\/reference\/p5\/p5\.Element\/"?/g;

    if (regex.test(content)) {
      const newContent = content.replace(regex, 'href="#/p5.Element"');
      fs.writeFileSync(file, newContent);
      console.log(`Updated: ${path.relative(PROJECT_ROOT, file)}`);
      count++;
    }
  });

  console.log(`Finished. Updated ${count} files.`);
}

batchUpdateLinks();
