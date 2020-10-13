import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  if (props.isHighlight)
    return (
      <button style={{ color: 'red' }} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  else
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    let isHighlight = false;
    if (this.props.winner)
      if (i === this.props.winner.line[0] || i === this.props.winner.line[1] || i === this.props.winner.line[2])
        isHighlight = true;
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      isHighlight={isHighlight} />;
  }

  render() {
    const numbers = [0, 1, 2];
    let boardRowItems = [];
    for (const i of numbers) {
      let squareItems = [];
      for (const j of numbers) {
        squareItems.push(this.renderSquare(3 * i + j));
      }
      boardRowItems.push(
        <div className="board-row">
          {squareItems}
        </div>)
    }
    return (
      <div>
        {boardRowItems}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: null,
        row: null,
        move: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortType: 1, // 1: asc, 0: desc
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        col: Math.floor(i % 3),
        row: Math.floor(i / 3),
        move: history.length,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      sortType: this.state.sortType,
    });
    if (calculateWinner(squares)) {
      this.setState({

      })
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let historySorted = history.slice();

    if (this.state.sortType === 1) {
      historySorted.sort(function (a, b) {
        if (a.move < b.move) return -1;
        else if (a.move > b.move) return 1;
        else return 0;
      });
    } else {
      historySorted.sort(function (a, b) {
        if (a.move < b.move) return -1;
        else if (a.move > b.move) return 1;
        else return 0;
      });
      historySorted.reverse();
    }
    const moves = historySorted.map((step, move) => {
      const desc = step.move ?
        `Go to move #${step.move} (col:${step.col}, row:${step.row})` :
        'Go to game start';
      if (step.move === this.state.stepNumber) {
        return (
          <li key={step.move}>
            <button onClick={() => this.jumpTo(step.move)}><b>{desc}</b></button>
          </li>
        )
      }
      else {
        return (
          <li key={step.move}>
            <button onClick={() => this.jumpTo(step.move)}>{desc}</button>
          </li>
        )
      }

    });
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner.square;
    } else {
      if (checkDraw(current.squares)) {
        status = "No winner! Draw!";
      }
      else
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>Toggle button for sorting:</div>
          <div>
            <label class="switch">
              <input type="checkbox" onClick={() => this.sortMove()} />
              <span class="slider round"></span>
            </label>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }


  sortMove() {
    this.setState({
      history: this.state.history,
      stepNumber: this.state.stepNumber,
      xIsNext: this.state.xIsNext,
      sortType: 1 - this.state.sortType,
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winner = {
        square: squares[a],
        line: [a, b, c]
      };
      return winner;
      // return squares[a];
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