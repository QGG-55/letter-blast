import { isValidWord } from './dictionary'
import type { Board, Cell, Piece, Point, Resolution, WordEvent } from './types'
export const SIZE = 8
export const emptyBoard = (): Board => Array.from({length:SIZE}, () => Array<Cell>(SIZE).fill(null))
export const key = ({row,col}: Point) => `${row}:${col}`
export function canPlace(board: Board, piece: Piece, origin: Point) {
  return piece.cells.every(p => { const row=origin.row+p.row, col=origin.col+p.col; return row>=0 && row<SIZE && col>=0 && col<SIZE && !board[row][col] })
}
export function place(board: Board, piece: Piece, origin: Point): Board {
  if (!canPlace(board,piece,origin)) throw new Error('Invalid placement')
  const next=board.map(row=>[...row]); piece.cells.forEach((p,i)=>{ const row=origin.row+p.row,col=origin.col+p.col; next[row][col]={letter:p.letter,id:`${piece.id}-${i}`} }); return next
}
export function completedLines(board: Board): Point[][] {
  const lines: Point[][]=[]
  board.forEach((row,r)=>{if(row.every(Boolean)) lines.push(row.map((_,c)=>({row:r,col:c})))})
  for(let c=0;c<SIZE;c++) if(board.every(row=>row[c])) lines.push(board.map((_,r)=>({row:r,col:c})))
  return lines
}
function runs(board: Board): WordEvent[] {
  const out: WordEvent[]=[]
  const scan=(pts:Point[])=>{let cells:Point[]=[];const flush=()=>{if(cells.length>=3){const word=cells.map(p=>board[p.row][p.col]?.letter).join('');if(isValidWord(word))out.push({word,cells:[...cells]})}cells=[]};pts.forEach(p=>board[p.row][p.col]?cells.push(p):flush());flush()}
  for(let r=0;r<SIZE;r++)scan(Array.from({length:SIZE},(_,c)=>({row:r,col:c})))
  for(let c=0;c<SIZE;c++)scan(Array.from({length:SIZE},(_,r)=>({row:r,col:c})))
  return out
}
export function resolve(board: Board): Resolution {
  const words=runs(board), lines=completedLines(board)
  const removedMap=new Map<string,Point>(); [...words.flatMap(w=>w.cells),...lines.flat()].forEach(p=>removedMap.set(key(p),p))
  const next=board.map(row=>[...row]); removedMap.forEach(p=>next[p.row][p.col]=null)
  return {board:next,words,lines,baseScore:words.reduce((n,w)=>n+w.cells.length*10,0)+lines.length*20,removed:[...removedMap.values()]}
}
export const multiplierAt = (elapsedMs:number) => Math.max(1,5-Math.floor(elapsedMs/3000))
export const scoreResolution = (result:Resolution,multiplier:number) => result.baseScore*multiplier
export function canPlaceAny(board:Board,pieces:Piece[]){return pieces.some(piece=>Array.from({length:SIZE},(_,r)=>r).some(row=>Array.from({length:SIZE},(_,c)=>c).some(col=>canPlace(board,piece,{row,col}))))}
