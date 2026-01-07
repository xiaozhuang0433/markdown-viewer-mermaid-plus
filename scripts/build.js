const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const chalk = require('chalk');

// 读取版本号
const version = process.env.VERSION || require('../package.json').version;

console.log(chalk.blue(`📦 Building Markdown Viewer Mermaid Plus v${version}...`));

// 创建 dist 目录
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 创建输出文件
const outputFile = path.join(distDir, 'markdown-viewer-mermaid-plus.zip');
const output = fs.createWriteStream(outputFile);
const archive = archiver('zip', { zlib: { level: 9 } });

// 监听完成事件
output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(chalk.green(`✅ Build complete!`));
  console.log(chalk.gray(`   Size: ${sizeInMB} MB`));
  console.log(chalk.gray(`   Location: ${outputFile}`));
});

archive.on('error', (err) => {
  console.error(chalk.red('❌ Build failed:'), err);
  process.exit(1);
});

// 管道输出
archive.pipe(output);

// 添加需要打包的文件
const filesToInclude = [
  'manifest.json',
  'content.js',
  'styles.css',
  'LICENSE',
  'README.md',
  'INSTALL.md'
];

filesToInclude.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    archive.file(filePath, { name: file });
    console.log(chalk.gray(`   Added: ${file}`));
  } else {
    console.warn(chalk.yellow(`   Warning: ${file} not found`));
  }
});

// 完成打包
archive.finalize();
