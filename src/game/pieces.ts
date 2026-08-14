import type { Piece, Point } from './types'
export const SHAPES: Point[][] = [
  [{row:0,col:0}], [{row:0,col:0},{row:0,col:1}], [{row:0,col:0},{row:1,col:0}],
  [{row:0,col:0},{row:0,col:1},{row:0,col:2}], [{row:0,col:0},{row:1,col:0},{row:2,col:0}],
  [{row:0,col:0},{row:0,col:1},{row:1,col:0},{row:1,col:1}],
  [{row:0,col:0},{row:1,col:0},{row:1,col:1}], [{row:0,col:0},{row:0,col:1},{row:1,col:1}],
  [{row:0,col:0},{row:1,col:0},{row:2,col:0},{row:2,col:1}]
]
const LETTERS = 'AAAAAAAAAAAAEEEEEEEEEEEEIIIIOOOOOUUUUUSSSRRNNLLTTCMDPBGVYQHFZJXK'
export const randomLetter = (random = Math.random) => LETTERS[Math.floor(random() * LETTERS.length)]
export function makePiece(random = Math.random): Piece {
  const shape = SHAPES[Math.floor(random() * SHAPES.length)]
  return { id: crypto.randomUUID(), cells: shape.map(p => ({...p, letter: randomLetter(random)})) }
}
export const makeTray = (random = Math.random) => [makePiece(random), makePiece(random), makePiece(random)]
