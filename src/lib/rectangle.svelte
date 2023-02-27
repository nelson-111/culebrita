<script lang="ts">
	export let target: Being

	let cssString = {
		'left': `${target.x}px`,
		'top': `${target.y}px`,
		'background-color': `hsl(${target.color.hue} ${target.color.saturation}% ${target.color.lightness}%)`
	}

	let style = Object.entries(cssString)
	.map(([key, value]) => `${key}:${value}`)
	.join(';')

	setInterval(() => {
		cssString = {
			'left': `${target.x}px`,
			'top': `${target.y}px`,
			'background-color': `hsl(${target.color.hue} ${target.color.saturation}% ${target.color.lightness}%)`
		}

		style = Object.entries(cssString)
		.map(([key, value]) => `${key}:${value}`)
		.join(';')
	})
</script>

<canvas width={target.width} height={target.height} style={style}></canvas>

<style>
	canvas {
		position: absolute;
	}
</style>