import { useState } from 'react';
import './App.css';

function Square({valor, onSquareClick}){
  return(<button className='square' onClick={onSquareClick}>{valor}</button>)
}

 function Tabuleiro({xIsNext, squares, onPlay}){
  function handleClick(i){

    if(squares[i] || haVencedor(squares)){ // Se squares[i] é null o if não executa o return!!!
       return 
      };
      // O handleClick continua a execução pois o return não foi executado, o squares[i] era NULL!!
      
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares) // ! inverte a variavel booleana (true ou false)
  }

  const vencedor = haVencedor(squares);
  let status;
  if(vencedor){
    status = "Vencedor " + vencedor;
  }
  else{
    status = "Próximo a jogar: " + (xIsNext ? "X" : "O")
  }

  return(
    <div> 
      <div className='status'>{status}</div>
        <div>
          <Square valor={squares[0]} onSquareClick={()=>{handleClick(0)}}/>
          <Square valor={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
          <Square valor={squares[2]} onSquareClick={()=>{handleClick(2)}}/>
        </div>
        <div>
          <Square valor={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
          <Square valor={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
          <Square valor={squares[5]} onSquareClick={()=>{handleClick(5)}}/>
        </div>
        <div>
          <Square valor={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
          <Square valor={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
          <Square valor={squares[8]} onSquareClick={()=>{handleClick(8)}}/>
        </div>
      <div>
    </div>  
        <p id='alertaP'></p>
      </div>
  );
}
 
 // Componente Game
 export default function Game(){
  const [history, setHistory] = useState ([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);

  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares,move) => {
    let description;
    if (move >0) {
      description = "Vai para o movimento #" + move;
    }else{
      description = "Vai para o inicio do jogo!"
    }
    return(
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return(
    <div className='game'>
      <div className='game-board'>
        <Tabuleiro xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Tabuleiro>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );

 };

 


function haVencedor(squares){ // Função para comparar as sequências da vitoria
  if(squares[6] && squares[6] === squares[7] && squares[7] === squares[8]){ // Compara os 3 squares para a vitoria
    return squares[6]; // Retorna no square 6 para ocorrer a vitoria
  }
  else if(squares[3] && squares[3] === squares[4] && squares[4] === squares[5]){
    return squares[3];
  }
  else if(squares[0] && squares[0] === squares[1] && squares[1] === squares[2]){
    return squares[0];
  }
  else if(squares[0] && squares[0] === squares[3] && squares[3] === squares[6]){
    return squares[0];
  }
  else if(squares[1] && squares[1] === squares[4] && squares[4] === squares[7]){
    return squares[1];
  }
  else if(squares[2] && squares[2] === squares[5] && squares[5] === squares[8]){
    return squares[2];
  }
  else if(squares[0] && squares[0] === squares[4] && squares[4] === squares[8]){
    return squares[0];
  }
  else if(squares[2] && squares[2] === squares[4] && squares[4] === squares[6]){
    return squares[2];
  }
}