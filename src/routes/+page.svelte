<script lang="ts">
	import Rectangle from "../lib/rectangle.svelte";
	import {map} from '$lib/functions'

	let ratio = window.innerHeight < window.innerWidth
	? window.innerHeight
	: window.innerWidth

	let example = {
		color: '#999',
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

	/*
	culebrita movement:
	up: index - someBitmap.columns
	down: index + someBitmap.columns
	left: index - 1
	right: index + 1
	*/
	let culebritaColor = '#00ff00'
	let culebrita: CulebritaPart[] = [
		{color: culebritaColor, index: 2},
		{color: culebritaColor, index: 1}
	] satisfies CulebritaPart[]
	culebrita.forEach((p, index) => bitmap[index].color = p.color)
</script>

{#each bitmap as rectangle}
	<Rectangle target={rectangle} />
{/each}