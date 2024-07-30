import React, { useContext, useEffect, useState } from "react";
import GameInfo from "./GameInfo.tsx";
import { socket } from "../socket.ts";
import { gameContext } from "../context/gameContext.ts";
import { userContext } from "../context/userContext.ts";
import Box from "./Box.tsx";
import Result from "./Result.tsx";
import PlayerTurn from "./PlayerTurn.tsx";

type Props = {};

const initialState = {
  "1": { value: "", player: "", isChecked: false },
  "2": { value: "", player: "", isChecked: false },
  "3": { value: "", player: "", isChecked: false },
  "4": { value: "", player: "", isChecked: false },
  "5": { value: "", player: "", isChecked: false },
  "6": { value: "", player: "", isChecked: false },
  "7": { value: "", player: "", isChecked: false },
  "8": { value: "", player: "", isChecked: false },
  "9": { value: "", player: "", isChecked: false },
};

const Game = (props: Props) => {
  const { gameId } = useContext(gameContext);
  const { User } = useContext(userContext);
  const [score, setScore] = useState(initialState);
  const [playerNo, setPlayerNo] = useState(User?.isHost ? "1" : "2");
  const [player, setPlayer] = useState(User?.isHost ? "1" : "2");
  const [steps, setSteps] = useState<number>(0);
  const [opponateWinnerName, setOpponateWinnerName] = useState<string | null>(
    null
  );
  const [requsetAccepted, setRequestAccepted] = useState<boolean>(false)
  const [winner, setWinner] = useState<string | null>(null);

  function handleMoveClick(box: number) {
    // Not player turn or already box is selected.
    if (playerNo !== player || score[box].isChecked) return;

    // setting  player's new choise
    setScore((prev) => ({
      ...prev,
      [box]: {
        value: player === "1" ? "O" : "X",
        player: player,
        isChecked: true,
      },
    }));

    // emit the move event
    socket.emit("move", { box, player, gameId });

    // changing player
    setPlayer((prev) => (prev === "1" ? "2" : "1"));
    setSteps(prev=>prev+1);
  }

  // listening opponent winning event
  useEffect(() => {
    if (socket) {
      socket.on("opponent-won", ({ name }) => {
        setOpponateWinnerName(name);
      });
    }
  }, [socket]);

  // listening opponent move
  useEffect(() => {
    if (socket) {
      socket.on("opponent-moved", ({ box, player, gameId }) => {
        setScore((prev) => ({
          ...prev,
          [box]: {
            value: player === "1" ? "O" : "X",
            player: player,
            isChecked: true,
          },
        }));

        setPlayer(() => (player === "1" ? "2" : "1"));
        setSteps(prev=>prev+1);
      });
    }
    return ()=>{
      socket.off("opponent-moved");
    }
  }  
  , [socket]);

  // checking winner.
  useEffect(() => {
    if(steps<5)return;
    allWinnerFunction();
  }, [score]);

  function isPalyerWon(one: number, two: number, three: number) {
    if (
      score[one].value &&
      score[two].value &&
      score[three].value &&
      score[one].value === score[two].value &&
      score[two].value === score[three].value
    ) {
      if (playerNo === score[one].player) {
        setWinner(score[one].player);
        if (socket) {
          socket.emit("winner", gameId);
        }
      }
    }
  }

  function allWinnerFunction() {
    isPalyerWon(1, 2, 3);
    isPalyerWon(4, 5, 6);
    isPalyerWon(7, 8, 9);
    isPalyerWon(1, 4, 7);
    isPalyerWon(2, 5, 8);
    isPalyerWon(3, 6, 9);
    isPalyerWon(1, 5, 9);
    isPalyerWon(3, 5, 7);
  }

  useEffect(()=>{
    console.log("steps",steps);
  },[steps]);



  // reset setup for play again;
  useEffect(()=>{
    if(requsetAccepted){
      setScore(initialState);
      setOpponateWinnerName(null);
      setWinner(null);
      setPlayer(User?.isHost ? "1" : "2");
      setSteps(0);
      setRequestAccepted(false);
    }
  },[requsetAccepted])

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      {/* wrapper */}
      <div className="shadow-sm rounded flex flex-col justify-center gap-6 items-center  shadow-black min-h-[60vh]  w-[50vw]">
        <GameInfo />

        <Result setRequestAccepted={setRequestAccepted}  winner={winner} opponateWinnerName={opponateWinnerName} />

        <PlayerTurn
          winner={winner}
          opponateWinnerName={opponateWinnerName}
          steps={steps}
          player={player}
          playerNo={playerNo}
          setRequestAccepted={setRequestAccepted}
        />

        {/* game */}
        <div className="w-full h-full flex flex-col gap-[2px] items-center justify-center">
          <div className="flex flex-col items-center ">
            {/* row 1 */}
            <div className="flex items-center">
              {Array(3)
                .fill(1)
                .map((item, index) => (
                  <Box boxNumber={index + 1} onClick={handleMoveClick}>
                    {score[index + 1].value}
                  </Box>
                ))}
            </div>

            {/* row 2 */}
            <div className="flex items-center">
              {Array(3)
                .fill(1)
                .map((item, index) => (
                  <Box
                    middle={true}
                    boxNumber={index + 1 + 3}
                    onClick={handleMoveClick}
                  >
                    {score[index + 1 + 3].value}
                  </Box>
                ))}
            </div>

            {/* row 3 */}
            <div className="flex items-center">
              {Array(3)
                .fill(1)
                .map((item, index) => (
                  <Box boxNumber={index + 1 + 6} onClick={handleMoveClick}>
                    {score[index + 1 + 6].value}
                  </Box>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Game;
