const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// 读取当前版本
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);
const manifestPath = path.join(__dirname, '..', 'manifest.json');
const manifest = require(manifestPath);

console.log(chalk.blue('📝 Updating version numbers...'));

// 获取新版本号（从命令行参数或提示）
const newVersion = process.argv[2];

if (!newVersion) {
  console.error(chalk.red('❌ Error: Please provide a version number (e.g., npm run version 1.0.1)'));
  process.exit(1);
}

// 验证版本号格式
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error(chalk.red('❌ Error: Version must be in format X.Y.Z (e.g., 1.0.1)'));
  process.exit(1);
}

console.log(chalk.gray(`   Current version: ${packageJson.version}`));
console.log(chalk.gray(`   New version: ${newVersion}`));

// 更新 package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// 更新 manifest.json
manifest.version = newVersion;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(chalk.green('✅ Version updated successfully!'));
console.log(chalk.yellow('💡 Don\'t forget to commit and push the changes:'));
console.log(chalk.gray('   git add package.json manifest.json'));
console.log(chalk.gray('   git commit -m "chore: bump version to ' + newVersion + '"'));
console.log(chalk.gray('   git push'));
console.log(chalk.gray('   git tag v' + newVersion));
console.log(chalk.gray('   git push origin v' + newVersion));
