<script lang="ts">
  export let message = "";

  const a: string = "Svelte",
    b: string = "Typescript",
    c: string = "Sass",
    d: string = "Rollup",
    e: string = "Livereload";
</script>

<style lang="sass">
  :global(body)
    appearance: none
</style>

<template>
  <h1>{message} {a} + {b} + {c} + {d} + {e}</h1>
</template>
