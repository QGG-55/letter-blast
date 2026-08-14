export type Cell = { letter: string; id: string } | null
export type Board = Cell[][]
export type Point = { row: number; col: number }
export type Piece = { id: string; cells: (Point & { letter: string })[] }
export type WordEvent = { word: string; cells: Point[] }
export type Resolution = { board: Board; words: WordEvent[]; lines: Point[][]; baseScore: number; removed: Point[] }
