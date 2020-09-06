import {
  terser
} from "rollup-plugin-terser";
import html2 from "rollup-plugin-html2";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

const isProduction = process.env.NODE_ENV === "production";
const dist = isProduction ? "./prod" : "./dev";
const minify = isProduction ? {
    removeComments: true,
    collapseWhitespace: true,
    // keepClosingSlash: true,
  } :
  false;

export default {
  input: "./src/index.ts",
  output: {
    name: "index",
    file: `${dist}/index.js`,
    format: "iife",
    sourcemap: !isProduction,
  },
  plugins: [
    typescript({
      sourceMap: !isProduction
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    svelte({
      dev: !isProduction,
      preprocess: sveltePreprocessor({
        // postcss: {
        //   plugins: [require("autoprefixer")],
        // },
      }),
    }),
    html2({
      fileName: "index.html",
      template: "./template/template.html",
      minify,
    }),
    isProduction && terser(),
    !isProduction && serve(dist),
    !isProduction && livereload(dist),
  ],
  watch: {
    clearScreen: false,
  },
};
