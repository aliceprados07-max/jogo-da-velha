import { useState } from 'react';
import "./App.css"

function Square ({valor, onSquareClick}){
  
  return(
    <button className="square" onClick={onSquareClick}>
          {valor}</button>
  )
}

export default function Tabuleiro(){
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(Array(9).fill(null));
  function handleClick(i){
    if(squares[i] || haVencedor(squares)){
      return};
      //o handleClick continua a execução pois o return não foi executado o squares[i] era null
      const nextSquares = squares.slice();
      if(xIsNext)
      {nextSquares[i] = "X";}
    else
      {nextSquares[i] = "O";}
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const vencedor = haVencedor(squares);  
  const empate = !vencedor && squares.every(square => square !== null);
  return(
    <div>
      <h2>
        {vencedor
          ? `Vencedor: ${vencedor}`
          : empate
          ? "Empate!"
          : `Próximo jogador: ${xIsNext ? "X" : "O"}`}
      </h2>
      <div>
        <Square valor={squares[0]} onSquareClick = {() => {handleClick(0)}}/>
         <Square valor={squares[1]} onSquareClick = {() => {handleClick(1)}}/>
         <Square valor={squares[2]} onSquareClick = {() => {handleClick(2)}}/>
    </div>
    <div>
      <Square valor={squares[3]} onSquareClick = {() => {handleClick(3)}}/>
      <Square valor={squares[4]} onSquareClick = {() => {handleClick(4)}}/>
      <Square valor={squares[5]} onSquareClick = {() => {handleClick(5)}}/>
    </div>
    <div>
      <Square valor={squares[6]}onSquareClick = {() => {handleClick(6)}}/>
      <Square valor={squares[7]}onSquareClick = {() => {handleClick(7)}}/>
      <Square valor={squares[8]}onSquareClick = {() => {handleClick(8)}}/>
    </div>
    </div>
  )
}

function haVencedor(squares)
{
   // Todas as combinações vencedoras possíveis
  const linhasVencedoras = [
    [0, 1, 2], // linha 1
    [3, 4, 5], // linha 2
    [6, 7, 8], // linha 3
    [0, 3, 6], // coluna 1
    [1, 4, 7], // coluna 2
    [2, 5, 8], // coluna 3
    [0, 4, 8], // diagonal principal
    [2, 4, 6]  // diagonal secundária
  ];

  for (let combinacao of linhasVencedoras) { //array com com todas as combinações para ganhar
    const [a, b, c] = combinacao; //pega os três números da combinação e guarda em a, b, c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //garante que todos tem o mesmo valor 
      return squares[a]; // Retorna "X" ou "O"
    }
  }
  return null; // Nenhum vencedor ainda
}


