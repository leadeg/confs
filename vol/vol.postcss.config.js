const autoprefixer = require('autoprefixer');
const postCssFilters = require('pleeease-filters');
const postCssPixrem = require('pixrem');
const postCssInlineSvg = require('postcss-inline-svg');

module.exports = {
  plugins() {
    return [
      postCssInlineSvg({path: __dirname + '/src/assets/images/'}),
      postCssPixrem(),
      postCssFilters(),
      autoprefixer
    ];
  }
};
