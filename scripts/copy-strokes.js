const fs = require('fs');
const path = require('path');

const STROKE_SRC = path.join(__dirname, '..', 'node_modules', 'hanzi-writer-data');
const STROKE_DST = path.join(__dirname, '..', 'src', 'data', 'strokes');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function extractChars(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const chars = [];
  const regex = /char:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    chars.push(match[1]);
  }
  return chars;
}

const allChars = new Set();
['preschool.js', 'elementary.js', 'advanced.js'].forEach(f => {
  extractChars(path.join(DATA_DIR, f)).forEach(c => allChars.add(c));
});

console.log(`字库中共 ${allChars.size} 个不重复汉字`);
console.log(`笔画源目录: ${STROKE_SRC}`);
console.log(`目标目录: ${STROKE_DST}`);

let copied = 0;
let missing = 0;

for (const char of allChars) {
  const srcFile = path.join(STROKE_SRC, `${char}.json`);
  const dstFile = path.join(STROKE_DST, `${char}.json`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, dstFile);
    copied++;
  } else {
    missing++;
  }
}

console.log(`已复制: ${copied} 个笔画文件`);
console.log(`缺失: ${missing} 个 (无笔画数据)`);
console.log('完成!');
