module.exports = {
  '*.js': () => 'npm run lint:script:fix',
  '*.css': () => 'npm run lint:style:fix',
};
