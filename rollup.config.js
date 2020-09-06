import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import html2 from "rollup-plugin-html2";
import sveltePreprocessor from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";
const dist = isProduction ? "prod" : "dev";

export default {
  input: "./src/index.ts",
  output: {
    name: "index",
    file: `./${dist}/index.js`,
    format: "iife",
    sourcemap: !isProduction,
  },
  plugins: [
    typescript({
      sourceMap: !isProduction,
    }),
    resolve(),
    svelte({
      dev: !isProduction,
      extensions: [".svelte"],
      preprocess: sveltePreprocessor({
        postcss: {
          plugins: [require("autoprefixer")],
        },
      }),
    }),
    html2({
      template: "./template/template.html",
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
          }
        : false,
    }),
    isProduction && terser(),
  ],
};
