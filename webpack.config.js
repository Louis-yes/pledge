const path = require('path');

module.exports = {
mode: 'development',
  entry: '/src/scripts/thepledge.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  resolve: {
    alias: {
      'vue$': "vue/dist/vue.esm-bundler.js",
    },
  },
};