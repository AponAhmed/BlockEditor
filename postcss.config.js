import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3, // Customize the stage if needed
    }),
  ],
};
