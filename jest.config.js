module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./src/__mocks__/client.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
