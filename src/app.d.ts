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

interface RECTANGLE {
	x: number
	y: number
	width: number
	height: number
	color: string
}

interface Bitmap {
	x: number
	y: number
	rows: number
	columns: number
}