module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-proposal-private-property-in-object'
  ]
};
