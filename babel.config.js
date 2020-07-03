module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['last 2 versions']
      },
      'exclude': [
        'transform-regenerator'
      ]
    }]
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
}
