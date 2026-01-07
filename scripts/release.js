const { execSync } = require('child_process');
const chalk = require('chalk');

console.log(chalk.blue('🚀 Preparing release...'));

// 检查是否有未提交的更改
try {
  const status = execSync('git status --porcelain').toString();
  if (status.trim()) {
    console.error(chalk.red('❌ Error: You have uncommitted changes. Please commit them first.'));
    console.log(status);
    process.exit(1);
  }
} catch (error) {
  console.error(chalk.red('❌ Error checking git status:'), error.message);
  process.exit(1);
}

// 获取当前版本
const packageJson = require('../package.json');
const version = packageJson.version;
const tag = `v${version}`;

console.log(chalk.gray(`   Current version: ${version}`));
console.log(chalk.gray(`   Tag: ${tag}`));

// 检查标签是否已存在
try {
  execSync(`git rev-parse ${tag} 2>/dev/null`, { stdio: 'ignore' });
  console.error(chalk.red(`❌ Error: Tag ${tag} already exists.`));
  process.exit(1);
} catch (error) {
  // 标签不存在，可以继续
}

// 创建标签
console.log(chalk.yellow(`🏷️  Creating tag ${tag}...`));
try {
  execSync(`git tag -a ${tag} -m "Release ${tag}"`, { stdio: 'inherit' });
  console.log(chalk.green(`✅ Tag ${tag} created successfully!`));
} catch (error) {
  console.error(chalk.red('❌ Error creating tag:'), error.message);
  process.exit(1);
}

// 推送标签
console.log(chalk.yellow('⬆️  Pushing tag to remote...'));
try {
  execSync(`git push origin ${tag}`, { stdio: 'inherit' });
  console.log(chalk.green('✅ Tag pushed successfully!'));
} catch (error) {
  console.error(chalk.red('❌ Error pushing tag:'), error.message);
  process.exit(1);
}

console.log(chalk.green('\n🎉 Release ready!'));
console.log(chalk.yellow('GitHub Actions will now build and create the release.'));
console.log(chalk.gray(`📍 Monitor the progress at: https://github.com/xiaozhuang0433/markdown-viewer-mermaid-plus/actions`));
