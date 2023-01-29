/**
 * Create a new map according to bitmap properties and a rectangle
 * @param template A bitmap
 * @param r A rectangle
 * @returns 
 */
export function map (template: Bitmap, r: RECTANGLE) {
  let newMap: RECTANGLE[] = [] satisfies RECTANGLE[]
  let {x, y, color, height, width} = r
  let columnIndex = 0
  while (columnIndex < template.columns) {
    let rowIndex = 0
    while (rowIndex < template.rows) {
      let example = {color: color, height: height, width: width, x: x, y: y} satisfies RECTANGLE
      example.x = template.x + example.width * rowIndex
      example.y = template.y + example.height * columnIndex
      newMap.push(example)
      rowIndex += 1
    }
    columnIndex += 1
  }
  return newMap
}