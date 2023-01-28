<script lang="ts">
  import Rectangle from "../lib/rectangle.svelte";

  let example = {
    color: '#ff0000',
    height: 300,
    width: 300,
    x: 300,
    y: 200
  } satisfies RECTANGLE
</script>

<Rectangle target={example} />