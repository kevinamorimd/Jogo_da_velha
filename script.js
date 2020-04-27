class Quadrado extends React.Component {
  render() {
    return (
      <button
        className="quadrado"
        onClick={() => {
        this.props.onClick();}}>
        {this.props.value}
      </button>
    );
  }
}

class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xlsNext: true
    };
  }
  renderizarQuadrado(i) {
    return (
      <Quadrado
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert("Jogo já acabou");
      return;
    }
    if (quadrados[i]) {
      alert("Quadrado ocupado!");
      return;
    }

    quadrados[i] = this.state.xlsNext ? "X" : "O";
    this.setState({
      quadrados: quadrados,
      xlsNext: !this.state.xlsNext
    });
  }

  jogadaRandom() {
    let r = random();
    const quadrado = this.state.quadrados;

    if (calculateWinner(quadrado)) {
      alert("Jogo já acabou");
      return;
    }

    if (quadradosPreenchidos(quadrado)) {
      alert("O tabuleiro esta cheio");
      return;
    }

    let x = jogadaInteligente(quadrado);
    if (x >= 0) {
      quadrado[x] = this.state.xlsNext ? "X" : "O";
      this.setState({ quadrados: quadrado, xlsNext: !this.state.xlsNext });

      return;
    }
    while (quadrado[r]) {
      r = random();
    }

    quadrado[r] = this.state.xlsNext ? "X" : "O";
    this.setState({ quadrados: quadrado, xlsNext: !this.state.xlsNext });
  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    let status;
    if (vencedor) {
      status = "Vencedor: " + vencedor;
      alert("Vencedor"+ vencedor)
    } else {
      status = "Jogador: " + (this.state.xlsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>
        <div>
          <table>
            <tr>
              <button onClick={() =>  
                this.jogadaRandom()}> 
                {"Jogar Aleatório"}     
              </button>
            </tr>
            <tr>
              <button
                onClick={() =>
                this.setState({quadrados: 
                 Array(9).fill(null),
                 xlsNext: true})}>
                {"Recomeçar jogo!"}
              </button>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

class Jogo extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Tabuleiro
            quadrados={Array(9).fill()
            .map((value, pos) => pos)}/>
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function jogadaInteligente(square) {
  const lines = [
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
    [3, 4, 5],
    [4, 5, 3],
    [3, 5, 4],
    [6, 7, 8],
    [7, 8, 6],
    [6, 8, 7],
    [0, 3, 6],
    [3, 6, 0],
    [0, 6, 3],
    [1, 4, 7],
    [4, 7, 1],
    [1, 7, 4],
    [2, 5, 8],
    [5, 8, 2],
    [2, 8, 5],
    [0, 4, 8],
    [4, 8, 0],
    [0, 8, 4],
    [2, 4, 6],
    [4, 6, 2],
    [2, 6, 4]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[b] && square[a] === square[b] && !square[c]) {
      return c;
    }
  }

  return -1;
}

function quadradosPreenchidos(quadrados) {
  const x = 1;
  for (let j = 0; j < quadrados.length; j++) {
    if (!quadrados[j]) {
      return null;
    }
  }

  return x;
}

function random() {
  let r;
  return (r = getRandomInt(0, 9));
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

ReactDOM.render(<Jogo />, document.getElementById("root"));
