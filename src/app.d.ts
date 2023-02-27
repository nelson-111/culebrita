// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

type state = "pause" | "playing" | "lose" | "win" | "tutorial"

interface hslColor {
	hue: number
	saturation: number
	lightness: number
}

interface Being {
	x: number
	y: number
	width: number
	height: number
	color: hslColor
	speed: number
	health: number
}

interface Projectile extends Being {
	xDirection: number
	yDirection: number
}

interface BricksSet {
	x: number
	y: number
	rows: number
	columns: number
	padding: number
}