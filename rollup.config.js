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

const isDevelopment = process.env.NODE_ENV === "development",
  dist = isDevelopment ? "./dev" : "./prod",
  useSvelteDev = !isDevelopment,
  useSourceMap = !isDevelopment,
  useTerser = isDevelopment,
  useServe = !!process.env.ROLLUP_WATCH,
  useLivereload = !!process.env.ROLLUP_WATCH,
  useMinify = !isDevelopment;

export default {
  input: "./src/index.ts",
  output: {
    name: "index",
    file: `${dist}/index.js`,
    format: "iife",
    sourcemap: useSourceMap,
  },
  plugins: [
    typescript({
      sourceMap: useSourceMap
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    svelte({
      dev: useSvelteDev,
      preprocess: sveltePreprocessor({
        // postcss: {
        //   plugins: [require("autoprefixer")],
        // },
      }),
    }),
    html2({
      fileName: "index.html",
      template: "./template/template.html",
      minify: useMinify && {
        removeComments: true,
        collapseWhitespace: true,
        // keepClosingSlash: true,
      }
    }),
    useTerser && terser(),
    useServe && serve(dist),
    useLivereload && livereload(dist),
  ],
  watch: {
    clearScreen: false,
  },
};
