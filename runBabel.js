// 수동으로 바벨 돌려보기
// Running babel manually

const babel = require('@babel/core');
const fs = require('fs');

// 파일 추가
// Add file
const filename = './src/App.js';

const source = fs.readFileSync(filename, 'utf8');

const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-destructuring',
  '@babel/plugin-transform-spread',
];

const { code } = babel.transformSync(source, {
  filename,
  plugins,
  configFile: false,
});

// Terminal view
console.log(code);
