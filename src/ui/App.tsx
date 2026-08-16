import { useCallback,useEffect,useRef,useState } from 'react'
import { canPlace,canPlaceAny,centeredOrigin,emptyBoard,isBoardEmpty,key,multiplierAt,place,resolve,scoreResolution,SIZE } from '../game/engine'
import { makeTray } from '../game/pieces'
import type { Board,Piece,Point } from '../game/types'
type Drag={piece:Piece;index:number;origin:Point|null;x:number;y:number}
const VERSION='v0.1.8'
const RESOLUTION_MS=1100
const INITIAL_TIME=Date.now()
export default function App(){
 const [board,setBoard]=useState<Board>(emptyBoard);const [pieces,setPieces]=useState<Piece[]>(makeTray);const [score,setScore]=useState(0);const [cycle,setCycle]=useState(INITIAL_TIME);const [now,setNow]=useState(INITIAL_TIME);const [drag,setDrag]=useState<Drag|null>(null);const [toast,setToast]=useState<string[]>([]);const [recentWords,setRecentWords]=useState<string[]>([]);const [palette,setPalette]=useState(0);const [removing,setRemoving]=useState(new Set<string>());const boardRef=useRef<HTMLDivElement>(null);const multiplier=multiplierAt(now-cycle);const gameOver=!canPlaceAny(board,pieces);const dragging=drag!==null
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),200);return()=>clearInterval(id)},[])
 useEffect(()=>{document.body.classList.toggle('drag-active',dragging);return()=>document.body.classList.remove('drag-active')},[dragging])
 const locate=useCallback((x:number,y:number,piece:Piece)=>{const board=boardRef.current,first=board?.children[0]?.getBoundingClientRect(),right=board?.children[1]?.getBoundingClientRect(),below=board?.children[SIZE]?.getBoundingClientRect();if(!first||!right||!below)return null;const col=(x-(first.left+first.width/2))/(right.left-first.left),row=(y-(first.top+first.height/2))/(below.top-first.top);return centeredOrigin({row,col},piece)},[])
 const start=(e:React.PointerEvent,index:number)=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);const p=pieces[index];setDrag({piece:p,index,origin:locate(e.clientX,e.clientY-70,p),x:e.clientX,y:e.clientY})}
 const move=(e:React.PointerEvent)=>{e.preventDefault();setDrag(d=>d?{...d,x:e.clientX,y:e.clientY,origin:locate(e.clientX,e.clientY-70,d.piece)}:null)}
 const finish=()=>{
  if(!drag)return
  const {piece,index,origin}=drag;setDrag(null)
  if(!origin||!canPlace(board,piece,origin))return
  const placed=place(board,piece,origin),result=resolve(placed),m=multiplier
  const nextPieces=pieces.filter((_,i)=>i!==index)
  if(result.baseScore){
   const cleared=isBoardEmpty(result.board)
   setScore(points=>points+scoreResolution(result,m));setCycle(Date.now());setNow(Date.now())
   setToast([`×${m}`])
   if(cleared)setPalette(color=>(color+1)%5)
   if(result.words.length)setRecentWords(words=>[...result.words.map(w=>w.word),...words].slice(0,6))
   setRemoving(new Set(result.removed.map(key)));setBoard(placed)
   setTimeout(()=>{setBoard(result.board);setRemoving(new Set());setToast([])},RESOLUTION_MS)
  }else setBoard(placed)
  setPieces(nextPieces.length?nextPieces:makeTray())
 }
 const reset=()=>{setBoard(emptyBoard());setPieces(makeTray());setScore(0);setCycle(Date.now());setNow(Date.now());setToast([]);setRecentWords([]);setPalette(0)}
 const preview=new Set<string>();if(drag?.origin)drag.piece.cells.forEach(c=>preview.add(key({row:drag.origin!.row+c.row,col:drag.origin!.col+c.col})));const valid=!!(drag?.origin&&canPlace(board,drag.piece,drag.origin))
 return <main className={`${removing.size?'resolving ':''}palette-${palette}`}>
  <header><div><span className="eyebrow">WORD PUZZLE</span><h1>LETTER <b>BLAST</b></h1></div><span className="version">{VERSION}</span></header>
  <section className="hud"><div><small>PUNTOS</small><strong>{String(score).padStart(4,'0')}</strong></div><div className="mult"><small>MULTIPLICADOR</small><strong>×{multiplier}</strong><i style={{transform:`scaleX(${multiplier===1?0:Math.max(0,1-(now-cycle)%3000/3000)})`}}/></div></section>
  <section className="word-history" aria-live="polite"><small>ÚLTIMAS PALABRAS</small><div>{recentWords.length?recentWords.map((word,i)=><span key={`${word}-${i}`}>{word}</span>):<em>—</em>}</div></section>
  <div className="stage"><div className="board" ref={boardRef}>{board.flatMap((row,r)=>row.map((cell,c)=><div key={`${r}-${c}`} className={`cell ${cell?'filled':''} ${preview.has(`${r}:${c}`)?(valid?'preview valid':'preview invalid'):''} ${removing.has(`${r}:${c}`)?'removing':''}`}>{cell?.letter}</div>))}</div>{toast.length>0&&<div className="toasts" aria-live="assertive">{toast.map((t,i)=><span key={i}>{t}</span>)}</div>}</div>
  <div className="tray">{pieces.map((p,i)=><div className={`piece-slot ${drag?.index===i?'dragging':''}`} key={p.id} onPointerDown={e=>start(e,i)} onPointerMove={move} onPointerUp={finish} onPointerCancel={()=>setDrag(null)} onDragStart={e=>e.preventDefault()}><PieceView piece={p}/></div>)}</div><p className="hint">ARRASTRA UNA FIGURA AL TABLERO</p>
  {drag&&<div className="drag-ghost" style={{left:drag.x,top:drag.y-70}}><PieceView piece={drag.piece}/></div>}{gameOver&&<div className="modal"><div><span>FIN DE LA PARTIDA</span><h2>GAME OVER</h2><p>PUNTUACIÓN FINAL</p><strong>{score}</strong><button onClick={reset}>NUEVA PARTIDA</button></div></div>}<footer>Forma palabras · Completa líneas · Mantén el ×5</footer>
 </main>
}
function PieceView({piece}:{piece:Piece}){const rows=Math.max(...piece.cells.map(c=>c.row))+1,cols=Math.max(...piece.cells.map(c=>c.col))+1;return <div className="piece" style={{gridTemplateColumns:`repeat(${cols},var(--piece-cell))`,gridTemplateRows:`repeat(${rows},var(--piece-cell))`}}>{piece.cells.map((c,i)=><div className="mini" key={i} style={{gridRow:c.row+1,gridColumn:c.col+1}}>{c.letter}</div>)}</div>}
