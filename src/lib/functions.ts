/**
 * Compute a pseudo random number with a range and an adjuster
 * @param range Maximum random number
 * @param adjuster Minimum random number
 * @returns A pseudo random number
 */
export function random (range: number, adjuster = 0) {
	return Math.floor(Math.random() * range + adjuster)
}

/**
 * Clone a rectangle
 * @param example Rectangle to copy
 * @returns A rectangle copy
 */
function copyRectangle (example: Being) {
	let {x, y, color, height, width, health, speed} = example
	let copy = {
		color: color,
		height: height,
		width: width,
		x: x,
		y: y,
		health: health,
		speed: speed
	} satisfies Being

	return copy
}

/**
 * Create a new map according to bricks properties and a rectangle
 * @param template A bricks
 * @param brickExample A rectangle
 * @returns 
 */
export function spawnBricks (template: BricksSet, brickExample: Being) {
	let newMap: Being[] = [] satisfies Being[]
	let columnIndex = 0
	while (columnIndex < template.columns) {
		let rowIndex = 0
		while (rowIndex < template.rows) {
			let example = copyRectangle(brickExample)
			example.x = template.x + example.width * rowIndex + template.padding * rowIndex
			example.y = template.y + example.height * columnIndex + template.padding * columnIndex
			newMap.push(example)
			rowIndex += 1
		}
		columnIndex += 1
	}
	return newMap
}

/**
 * Get the intersection of two rectangles when these overlaps
 * @param a A rectangle
 * @param b Another rectangle
 * @returns The intersection width and height
 */
export function getIntersection(a: Being, b: Being) {
	let xMin = Math.max(a.x, b.x)
	let xMax = Math.min(a.x + a.width, b.x + b.width)
	let width = xMax - xMin

	let yMin = Math.max(a.y, b.y)
	let yMax = Math.min(a.y + a.height, b.y + b.height)
	let height = yMax - yMin

	if (width <= 0 || height <= 0) {return {width: 0, height: 0}}
	return {width: width, height: height}
}

/**
 * Checks if the intersection of two rectangles is wider or higher
 * @param a A rectangle
 * @param b Another rectangle
 * @returns An object that 
 */
export function overlap (a: Being, b: Being) {
	let intersection = getIntersection(a, b)
	let areNotZero = 0 < intersection.height * intersection.width
	return {
		vertical: areNotZero && intersection.height <= intersection.width,
		horizontal: areNotZero && intersection.width <= intersection.height
	}
}