import path from "path";
import fs from "fs";

export const getDirectoryFileList = (
  dir: string,
  baseDir: string = dir,
): string => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const result: string[] = [];

  for (const file of files) {
    if (["node_modules", ".git"].includes(file.name)) continue;
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      result.push(...getDirectoryFileList(fullPath, baseDir));
    } else {
      result.push(path.relative(baseDir, fullPath));
    }
  }

  return JSON.stringify(result.sort(), null, 2);
};
