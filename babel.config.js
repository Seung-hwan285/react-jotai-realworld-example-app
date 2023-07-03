module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],

  plugins: [
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-spread',
  ],
};
