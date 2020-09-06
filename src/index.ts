import Svelte from "./index.svelte";

new Svelte({
  target: document.body,
  props: {
    message: "Hello, "
  }
});
