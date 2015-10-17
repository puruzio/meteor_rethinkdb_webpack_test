var webpack = require('webpack');

var babelSettings = { stage: 0 };

if (process.env.NODE_ENV !== 'production') {
  babelSettings.plugins = ['react-transform'];
  babelSettings.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
      // redbox-react is breaking the line numbers :-(
      // you might want to disable it
    }
  };
}

var plugins = [];

if (process.env.NODE_ENV === 'production' && !Meteor.isCordova) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.web.js'));
}

module.exports = {
  entry: './entry',
  plugins: plugins,
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: 'file' }
    ]
  }
};
