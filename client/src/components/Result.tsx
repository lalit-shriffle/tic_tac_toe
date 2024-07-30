import React from "react";
import RestartGame from "./RestartGame.tsx";

type Props = {
    winner:string | null;
    opponateWinnerName:string | null;
    setRequestAccepted: (requsetAccepted: boolean)=> void;
};

const Result = ({winner,opponateWinnerName,setRequestAccepted}: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {winner && <span className="text-green-800">You Won The Game</span>}

      {opponateWinnerName && <span className="text-red-800">{opponateWinnerName + " "} won the game</span>}

      {(winner || opponateWinnerName) && <RestartGame setRequestAccepted={setRequestAccepted}/>}
    </div>
  );
};

export default Result;
