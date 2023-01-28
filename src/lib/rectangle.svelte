<script lang="ts">
  export let target: RECTANGLE

  let cssString = {
    'left': `${target.x}px`,
    'top': `${target.y}px`,
    'background-color': target.color
  }

  $: style = Object.entries(cssString)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
</script>

<canvas width={target.width} height={target.height} style={style}></canvas>

<style>
  canvas {
    position: absolute;
  }
</style>