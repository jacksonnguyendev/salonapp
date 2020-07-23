module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./srcs/'],
        alias: {
          assets: './srcs/assets',
          constants: './srcs/constants',
          components: './srcs/components',
          core: './srcs/core',
          navigation: './srcs/navigation',
          reactHooks: './srcs/reactHooks',
          screens: './scrs/screens',
          theme: './srcs/theme',
        },
      },
    ],
  ],
};
