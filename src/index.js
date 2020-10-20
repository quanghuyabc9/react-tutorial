import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const nRowDefault = 3;
const nColDefault = 3;
const nWinConditionDefault = 3;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function MarkedSquare(props) {
  return (
    <button style={{ color: 'red' }} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Board(props) {
  const renderSquare = (i) => {
    if (props.winner && isMarked(i, props.winner)) {
      return <MarkedSquare value={props.squares[i]} onClick={() => props.onClick(i)} iddd={i} />
    }
    else
      return <Square value={props.squares[i]} onClick={() => props.onClick(i)} iddd={i} />
  }
  let boardRowItems = [];
  for (let i = 0; i < props.gameConfig.nRow; i++) {
    let squareItems = [];
    for (let j = 0; j < props.gameConfig.nCol; j++) {
      squareItems.push(renderSquare(props.gameConfig.nCol * i + j));
    }
    boardRowItems.push(
      <div className="board-row">
        {squareItems}
      </div>
    );
  }
  return (
    <div>
      {boardRowItems}
    </div>
  );
}


function Game() {
  const [gameConfig, setGameConfig] = useState({
    nRow: nRowDefault,
    nCol: nColDefault,
    nWinCondition: nWinConditionDefault
  });

  const [history, setHistory] = useState([{
    squares: Array(gameConfig.nRow * gameConfig.nCol).fill(null),
    position: { col: -1, row: -1 },
    stepNumber: 0,
    isDraw: false,
    isWin: false,
    latestSquareIndex: -1
  }]);

  const [stepNumber, setStepNumber] = useState(0);

  const [xIsNext, setXIsNext] = useState(true);

  const [isAsc, setIsAsc] = useState(true);



  const handleClickOnSquare = (i) => {
    const historyHandle = history.slice(0, stepNumber + 1);
    const current = historyHandle[historyHandle.length - 1];
    const squares = current.squares.slice();
    if (current.isWin || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    let isWin = false;
    let isDraw = false;
    if (calculateWinner(squares, i, gameConfig)) {
      isWin = true;
    } else if (checkDraw(squares)) {
      isDraw = true;
    }
    setStepNumber(historyHandle.length);
    setHistory(historyHandle.concat([{
      squares: squares,
      position: {
        col: Math.floor(i % gameConfig.nCol) + 1,
        row: Math.floor(i / gameConfig.nCol) + 1
      },
      stepNumber: historyHandle.length,
      isWin: isWin,
      isDraw: isDraw,
      latestSquareIndex: i
    }]));
    setXIsNext(!xIsNext);
  };

  const handleClickOnSwitchBtn = () => {
    setIsAsc(!isAsc);
  };

  const asc = (a, b) => {
    return a.stepNumber - b.stepNumber;
  }
  const desc = (a, b) => {
    return b.stepNumber - a.stepNumber;
  }
  let renderedHistory = history.slice(0, history.length);
  if (isAsc) {
    renderedHistory.sort(asc);
  }
  else {
    renderedHistory.sort(desc);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const handleInputChange = (target) => {
    if (target.name === "nCol") {
      setGameConfig({
        nRow: gameConfig.nRow,
        nCol: target.value,
        nWinCondition: gameConfig.nWinCondition
      });
    } else if (target.name === "nRow") {
      setGameConfig({
        nRow: target.value,
        nCol: gameConfig.nCol,
        nWinCondition: gameConfig.nWinCondition
      });
    } else if (target.name === "nWinCondition") {
      setGameConfig({
        nRow: gameConfig.nRow,
        nCol: gameConfig.nCol,
        nWinCondition: target.value
      });
    }
    setHistory([{
      squares: Array(gameConfig.nRow * gameConfig.nCol).fill(null),
      position: { col: -1, row: -1 },
      stepNumber: 0,
      isDraw: false,
      isWin: false,
      latestSquareIndex: -1
    }]
    );
    setStepNumber(0);
    setXIsNext(true);
    setIsAsc(true);
  };

  const moves = renderedHistory.map((step, move) => {
    const description = step.stepNumber ?
      `Go to move #${step.stepNumber} (col: ${step.position.col}), row: ${step.position.row})` :
      'Go to game start';

    if (step.stepNumber === stepNumber) {
      return <BoldMoveItem i={step.stepNumber} description={description} />
    }
    else {
      return <MoveItem i={step.stepNumber} description={description} onClick={() => jumpTo(step.stepNumber)} />
    }
  });
  let status;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, current.latestSquareIndex, gameConfig);
  if (current.isWin) {
    status = 'Winner: ' + winner.square;
  } else if (current.isDraw)
    status = 'Draw !';
  else
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClickOnSquare(i)}
          winner={winner}
          gameConfig={gameConfig}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="game-info">
        <div>
          <label class="switch">
            <input type="checkbox" onClick={() => handleClickOnSwitchBtn()} />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div className="game-info">
        <GameConfigForm gameConfig={gameConfig} handleInputChange={handleInputChange} />
      </div>
    </div>
  );
}

function GameConfigForm(props) {
  const handleInputChange = (event) => {
    const target = event.target;
    props.handleInputChange(target);
  }
  return (
    <form>
      <legend>Number of rows:</legend>
      <input
        name="nRow"
        type="number"
        value={props.gameConfig.nRow}
        onChange={handleInputChange} />
      <br />
      <br />
      <legend>Number of rows:</legend>
      <input
        name="nCol"
        type="number"
        value={props.gameConfig.nCol}
        onChange={handleInputChange} />
      <br />
      <br />
      <legend>Length to win:</legend>
      <input
        name="nWinCondition"
        type="number"
        value={props.gameConfig.nWinCondition}
        onChange={handleInputChange} />
    </form>
  );
}

function MoveItem(props) {
  return (
    <li key={props.i}>
      <button onClick={() => props.onClick()}>{props.description}</button>
    </li>
  )
}


function BoldMoveItem(props) {
  return (
    <li key={props.i}>
      <button><b>{props.description}</b></button>
    </li>
  )
}


function calculateWinner(squares, latestSquareIndex, gameConfig) {
  // const lines = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];
  // for (let i = 0; i < lines.length; i++) {
  //   const [a, b, c] = lines[i];
  //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

  //     const winner = {
  //       square: squares[a],
  //       line: [a, b, c]
  //     };
  //     return winner;
  //   }
  // }
  // return null;

  const di = [0, 0, 1, -1, -1, 1, -1, 1];
  const dj = [1, -1, 0, 0, -1, 1, 1, -1];

  let i = Math.floor(latestSquareIndex / gameConfig.nCol);
  let j = latestSquareIndex % gameConfig.nCol;

  for (let k = 0; k < di.length; k += 2) {
    let log = [];
    let tmpI = i, tmpJ = j;
    let tmpSquareIndex = tmpI * gameConfig.nCol + tmpJ;
    let count1 = 0;
    while (tmpI >= 0 && tmpI <= gameConfig.nRow - 1 && tmpJ >= 0 && tmpJ <= gameConfig.nCol - 1 && squares[tmpSquareIndex] === squares[latestSquareIndex]) {
      log.push(tmpSquareIndex);
      count1++;
      tmpI = tmpI + di[k];
      tmpJ = tmpJ + dj[k];
      tmpSquareIndex = tmpI * gameConfig.nCol + tmpJ;
    }
    tmpI = i;
    tmpJ = j;
    tmpSquareIndex = tmpI * gameConfig.nCol + tmpJ;
    let count2 = 0;
    while (tmpI >= 0 && tmpI <= gameConfig.nRow - 1 && tmpJ >= 0 && tmpJ <= gameConfig.nCol - 1 && squares[tmpSquareIndex] === squares[latestSquareIndex]) {
      log.push(tmpSquareIndex);
      count2++;
      tmpI = tmpI + di[k + 1];
      tmpJ = tmpJ + dj[k + 1];
      tmpSquareIndex = tmpI * gameConfig.nCol + tmpJ;
    }
    if (count1 + count2 - 1 === gameConfig.nWinCondition) {
      const winner = {
        square: squares[latestSquareIndex],
        line: log
      }
      return winner;
    }
  }
  return null;
}

function checkDraw(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null)
      return false;
  }
  return true;
}

function isMarked(squareIndex, winner) {
  for (let i = 0; i < winner.line.length; i++) {
    if (squareIndex === winner.line[i])
      return true;
  }
  return false;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//         col: null,
//         row: null,
//         move: 0,
//       }],
//       stepNumber: 0,
//       xIsNext: true,
//       sortType: 1, // 1: asc, 0: desc
//     }
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//         col: Math.floor(i % 3),
//         row: Math.floor(i / 3),
//         move: history.length,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,
//       sortType: this.state.sortType,
//     });
//     if (calculateWinner(squares)) {
//       this.setState({

//       })
//     }
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];

//     let historySorted = history.slice();

//     if (this.state.sortType === 1) {
//       historySorted.sort(function (a, b) {
//         if (a.move < b.move) return -1;
//         else if (a.move > b.move) return 1;
//         else return 0;
//       });
//     } else {
//       historySorted.sort(function (a, b) {
//         if (a.move < b.move) return -1;
//         else if (a.move > b.move) return 1;
//         else return 0;
//       });
//       historySorted.reverse();
//     }
//     const moves = historySorted.map((step, move) => {
//       const desc = step.move ?
//         `Go to move #${step.move} (col:${step.col}, row:${step.row})` :
//         'Go to game start';
//       if (step.move === this.state.stepNumber) {
//         return (
//           <li key={step.move}>
//             <button onClick={() => this.jumpTo(step.move)}><b>{desc}</b></button>
//           </li>
//         )
//       }
//       else {
//         return (
//           <li key={step.move}>
//             <button onClick={() => this.jumpTo(step.move)}>{desc}</button>
//           </li>
//         )
//       }

//     });
//     const winner = calculateWinner(current.squares);
//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner.square;
//     } else {
//       if (checkDraw(current.squares)) {
//         status = "No winner! Draw!";
//       }
//       else
//         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//             winner={winner}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <div>Toggle button for sorting:</div>
//           <div>
//             <label class="switch">
//               <input type="checkbox" onClick={() => this.sortMove()} />
//               <span class="slider round"></span>
//             </label>
//           </div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }


// sortMove() {
//   this.setState({
//     history: this.state.history,
//     stepNumber: this.state.stepNumber,
//     xIsNext: this.state.xIsNext,
//     sortType: 1 - this.state.sortType,
//   });
// }

// ========================================

// class Board extends React.Component {
//   renderSquare(i) {
//     let isHighlight = false;
//     if (this.props.winner)
//       if (i === this.props.winner.line[0] || i === this.props.winner.line[1] || i === this.props.winner.line[2])
//         isHighlight = true;
//     return <Square
//       value={this.props.squares[i]}
//       onClick={() => this.props.onClick(i)}
//       isHighlight={isHighlight} />;
//   }

//   render() {
//     const numbers = [0, 1, 2];
//     let boardRowItems = [];
//     for (const i of numbers) {
//       let squareItems = [];
//       for (const j of numbers) {
//         squareItems.push(this.renderSquare(3 * i + j));
//       }
//       boardRowItems.push(
//         <div className="board-row">
//           {squareItems}
//         </div>)
//     }
//     return (
//       <div>
//         {boardRowItems}
//       </div>
//     );
//   }
// }
