import React from "react";
import RestartGame from "./RestartGame.tsx";

type Props = {
  winner: string | null;
  opponateWinnerName: string | null;
  player: string | null;
  playerNo: string | null;
  steps: number;
  setRequestAccepted: (requsetAccepted:boolean)=> void;
};

const PlayerTurn = ({
  winner,
  opponateWinnerName,
  player,
  playerNo,
  steps,
  setRequestAccepted
}: Props) => {



  return (
    <div className="flex items-center justify-center">
      {!winner && !opponateWinnerName && (
        <>
        {/* is game tied or not */}
          {steps >= 9 ? (
            <>
              <div className="flex flex-col gap-2">
              <span className="bg-white border-red-900 p-1 border text-red-900">
                Game Tied
              </span>
              <RestartGame setRequestAccepted={setRequestAccepted}/>
              </div>
            </>
          ) : (
            // indication current move
            <span>
              {playerNo !== player ? (
                <span className="text-yellow-500">Wait for your turn</span>
              ) : (
                <span className="text-blue-500">Choose your move</span>
              )}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default PlayerTurn;
