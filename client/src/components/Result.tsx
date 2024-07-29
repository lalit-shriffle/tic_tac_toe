import React from "react";

type Props = {
    winner:string | null;
    opponateWinnerName:string | null;
};

const Result = ({winner,opponateWinnerName}: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {winner && <span className="text-green-800">You Won The Game</span>}

      {opponateWinnerName && <span className="text-red-800">{opponateWinnerName + " "} won the game</span>}
    </div>
  );
};

export default Result;
