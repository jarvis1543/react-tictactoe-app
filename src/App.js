import { useState } from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  // flash back
  const [history, setHistory] = useState([
    {squares: Array(9).fill(null)}
  ])
  // 시간여행을 위한 번호 데이터 저장
  const [stepNumber, setStepNumber] = useState(0)
  // 가장 최신의 보드를 가져온다
  const current = history[stepNumber]
  // [getter, setter] = useState(...)
  // state: 렌더링 결과물에 영향을 주는 데이터를 가지고 있는 객체
  // 데이터 변경시 re-rendering
  const [xIsNext, setXIsNext] = useState(true)

  let status = `Next player : ${xIsNext ? 'X' : 'O'}`
  
  // 승자 결정 함수
  const CalculatorWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && 
          squares[a] === squares[b] && 
          squares[a] === squares[c]) {
        return squares[a] // X or O
      }
    }
    return null
  }

  // 클릭 함수
  const handleClick = (i) => {
    if ( winner ) {
      return
    }
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice()
    
    newSquares[i] = xIsNext ? 'X' : 'O'
    setHistory([...newHistory, {squares: newSquares}])
    // (prev => !prev)
    // true를 !true로 셋팅
    setXIsNext(prev => !prev)
    setStepNumber(newHistory.length)
  }

  const winner = CalculatorWinner(current.squares)
  if (winner) {
    status = `winner winner chicken dinner ${winner}`
  }

  // 시가여행하는 함수
  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }
  
  // 히스토리 그리기
  const moves = history.map((step, move) => {
    const desc = move 
    ? `GO to move #${move}` 
    : `Go to game start`
    return (
      // 리액트에서 리스트를 나열할떈 key를 사용해야함 (unique)
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board 
          squares={current.squares}
          onClick={(i) => {handleClick(i)}}/>
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol className='history'>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default App;

