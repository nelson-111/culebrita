<script lang="ts">
	import Rectangle from "../lib/rectangle.svelte";
	import {spawnBricks, overlap, random} from '$lib/functions'

	let ratio = window.innerHeight < window.innerWidth
	? window.innerHeight
	: window.innerWidth

	let brickExample: Being = {
		width: ratio / 9,
		height: ratio / 39,
		x: 0,
		y: window.innerHeight * 0.9,
		health: 1,
		speed: 0,
		color: {hue: random(360), saturation: 60, lightness: 70}
	} satisfies Being

	let bricksSet: BricksSet = {
		x: 0,
		y: 0,
		columns: 10,
		rows: 12,
		padding: 12
	} satisfies BricksSet
	bricksSet.x =
	window.innerWidth / 2 - bricksSet.rows * brickExample.width / 2 - bricksSet.padding * bricksSet.rows / 2
	bricksSet.y = window.innerHeight / 15

	let bricks = spawnBricks(bricksSet, brickExample) satisfies Being[]

	let player: Being = {
		x: 0,
		y: window.innerHeight * 0.9,
		health: 3,
		width: ratio / 8,
		height: ratio / 36,
		speed: 3,
		color: {hue: 0, saturation: 100, lightness: 60}
	} satisfies Being
	player.x = window.innerWidth / 2 - player.width / 2

	let projectile: Projectile = {
		x: 0,
		y: 0,
		color: {hue: 0, saturation: 0, lightness: 100},
		health: 1,
		speed: 2,
		width: ratio / 36,
		height: ratio / 36,
		xDirection: 1,
		yDirection: 1
	} satisfies Projectile
	projectile.x = window.innerWidth / 2 - projectile.width / 2
	projectile.y = player.y - projectile.height

	let pressedKeys: {[key: string]: boolean} = {
		' ': false,
		'a': false,
		'd': false,
		'ArrowLeft': false,
		'ArrowRight': false
	}

	let state: state = "tutorial"

	setInterval(() => update(), 1)

	function update () {
		updatePlayingState()
		updateTutorialState()
		updatePauseState()
		updateLoseAndWinState()
	}

	function restartGame () {
		bricks = spawnBricks(bricksSet, brickExample)
		player = {
			x: 0,
			y: window.innerHeight * 0.9,
			health: 3,
			speed: 3,
			height: ratio / 36,
			width: ratio / 8,
			color: {hue: 0, saturation: 100, lightness: 60}
		}
		player.x = window.innerWidth / 2 - player.width / 2
		projectile = {
			x: 0,
			y: 0,
			health: 1,
			speed: 2,
			width: ratio / 36,
			height: ratio / 36,
			xDirection: 1,
			yDirection: 1,
			color: {hue: 0, saturation: 0, lightness: 100},
		}
		projectile.x = window.innerWidth / 2 - projectile.width / 2
		projectile.y = player.y - projectile.height
		state = "playing"
	}

	function updateLoseAndWinState () {
		if (state !== "lose" && state !== "win") {return}
		if (pressedKeys[' ']) restartGame()
	}

	function updatePauseState () {
		if (state !== "pause") {return}
		if (pressedKeys[' ']) state = "playing"
	}

	function updateTutorialState () {
		if (state !== "tutorial") {return}
		if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.x -= player.speed
		if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.x += player.speed
		if (pressedKeys[' ']) state = "playing"
		if (player.x < 0) player.x = 0
		if (player.x + player.width > window.innerWidth) player.x = window.innerWidth - player.width

		projectile.x = player.x + player.width / 2 - projectile.width / 2
	}

	function updatePlayingState () {
		if (state !== "playing") {return}
		// player conditions
		let playerProjectilePosibleCollision = player.y < projectile.y + projectile.height
		&& projectile.y < player.y + player.height
		let predictLeftSidePlayerProjectileCollision =
		player.x - player.speed < projectile.x + projectile.width + projectile.speed && playerProjectilePosibleCollision
		let predictRightSidePlayerProjectileCollision =
		projectile.x - projectile.speed < player.x + player.width + player.speed && playerProjectilePosibleCollision

		if (player.health < 1) state = "lose"
		if (pressedKeys['ArrowUp'] || pressedKeys['w']) state = "pause"
		if (pressedKeys['a'] || pressedKeys['ArrowLeft']) {
			player.x -= player.speed
			if (predictLeftSidePlayerProjectileCollision) player.x += player.speed
			if (overlap(projectile, player).vertical) projectile.xDirection = -1
		}
		if (pressedKeys['d'] || pressedKeys['ArrowRight']) {
			player.x += player.speed
			if (predictRightSidePlayerProjectileCollision) player.x -= player.speed
			if (overlap(projectile, player).vertical) projectile.xDirection = 1
		}
		if (player.x < 0) player.x = 0
		if (player.x + player.width > window.innerWidth) player.x = window.innerWidth - player.width

		// projectile conditions
		let horizontalProjectileCollisions = overlap(player, projectile).horizontal
		|| projectile.x < 0 || projectile.x + projectile.width > window.innerWidth

		let verticalProjectileCollisions = overlap(player, projectile).vertical
		|| projectile.y < 0 || projectile.y + projectile.height > window.innerHeight

		if (horizontalProjectileCollisions) projectile.xDirection *= -1
		if (verticalProjectileCollisions) projectile.yDirection *= -1
		if (projectile.y + projectile.height > window.innerHeight) player.health -= 1
		projectile.x += projectile.speed * projectile.xDirection
		projectile.y += projectile.speed * projectile.yDirection

		// bricks conditions
		let damagedBricks = bricks.filter(
			brick => overlap(projectile, brick).horizontal || overlap(projectile, brick).vertical
		)
		let horizontalDirectionChanged = false
		let verticalDirectionChanged = false

		damagedBricks.forEach(brick => {
			brick.health -= 1
			let collisions = overlap(projectile, brick)
			if (collisions.horizontal && !horizontalDirectionChanged) {
				projectile.xDirection *= -1
				horizontalDirectionChanged = true
			}
			if (collisions.vertical && !verticalDirectionChanged) {
				projectile.yDirection *= -1
				verticalDirectionChanged = true
			}
		})
		bricks = bricks.filter(brick => 0 < brick.health)
		if (bricks.length < 1) state = "win"
	}
</script>

{#if state === "tutorial"}
	<ul class="tutorial-text">
		<p>Press 'A' and 'D', or left and right arrows to move around</p>
		<p>Press 'W' or up arrow to pause the game, to resume, press space</p>
		<p>Press space to start</p>
	</ul>
{/if}

{#if state === "pause"}
	<p class="pause-text">PAUSE</p>
{/if}

{#if state === "lose"}
	<p class="end-game-text">GAME OVER</p>
	<p class="tutorial-lose-text">Press space to restart</p>
{/if}

{#if state === "win"}
	<p class="end-game-text">YOU WIN</p>
	<p class="tutorial-lose-text">Press space to restart</p>
{/if}

{#if state !== "lose" && state !== "win"}
	<div class="player-health">
		<p>{player.health}</p>
		<img src="heart-svgrepo-com.svg" alt="Player health" width="{window.innerWidth / 25}">
	</div>
{/if}

{#if state !== "lose" && state !== "win"}
	{#each bricks as brick}
		<Rectangle target={brick} />
	{/each}

	<Rectangle target={player} />
	<Rectangle target={projectile} />
{/if}

<svelte:window
on:keydown={event => pressedKeys[event.key] = true}
on:keyup={event => pressedKeys[event.key] = false} />

<style>
	* {
		font-family: 'Saira';
	}

	.tutorial-text {
		margin-top: 66vh;
		text-align: center;
		color: white;
		font-size: 1.5vmax;
	}

	.tutorial-lose-text {
		text-align: center;
		color: white;
		font-size: 1.5vmax;
	}

	.pause-text {
		margin-top: 55vh;
		text-align: center;
		color: white;
		font-size: 3vmax;
	}

	.end-game-text {
		margin-top: 40vh;
		text-align: center;
		color: white;
		font-size: 4vmax;
	}

	.player-health {
		position: absolute;
		display: flex;
		align-items: center;
		top: 1vh;
		left: 93vw;
		font-size: 3vmax;
		color: white;
	}
</style>