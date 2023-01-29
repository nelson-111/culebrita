<script lang="ts">
  import Rectangle from "../lib/rectangle.svelte";
  import {map} from '$lib/functions'

  let ratio = window.innerHeight < window.innerWidth
  ? window.innerHeight
  : window.innerWidth

  let example = {
    color: '#ff0000',
    width: 20, //ratio / 80,
    height: 20, //ratio / 80,
    x: 300,
    y: 200
  } satisfies RECTANGLE

  let someBitmap = {
    x: 0, y: 0, columns: 32, rows: 32
  } satisfies Bitmap
  someBitmap.x = window.innerWidth / 2 - someBitmap.rows * example.width / 2
  someBitmap.y = window.innerHeight / 2 - someBitmap.columns * example.height / 2

  let bitmap = map(someBitmap, example) satisfies RECTANGLE[]
</script>

{#each bitmap as rectangle}
  <Rectangle target={rectangle} />
{/each}