import React, { useEffect, useState } from "react";

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

const Home = (props: Props) => {
  const [score, setScore] = useState(initialState);
  const [player, setPlayer] = useState("1");

  function handleClick(box: number) {
    console.log(box);
    if (score[box].isChecked) return;
    setScore((prev) => ({
      ...prev,
      [box]: {
        value: player === "1" ? "O" : "X",
        player: player,
        isChecked: true,
      },
    }));
    setPlayer((prev) => (prev === "1" ? "2" : "1"));
  }

useEffect(()=>{
  isPalyerWon();

},[score])

  function isPalyerWon() {
    console.log( score[1].value, score[2].value, score[3].value);
    if ((score[1].value &&score[2].value&& score[3].value)&&
      score[1].value === score[2].value &&
      score[2].value === score[3].value
    ) {
      console.log("player won");
    }
  }
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      {/* wrapper */}
      <div className="shadow-lg h-[50vh] w-[50vw]">
        {/* game */}
        <div className="w-full h-full flex flex-col gap-[2px] items-center justify-center">
          {/* row 1 */}
          <div className="flex items-center  gap-[2px]">
            <div
              onClick={() => handleClick(1)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["1"].value}
            </div>
            <div
              onClick={() => handleClick(2)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["2"].value}
            </div>
            <div
              onClick={() => handleClick(3)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["3"].value}
            </div>
          </div>
          {/* row 2 */}
          <div className="flex items-center gap-[2px]">
            <div
              onClick={() => handleClick(4)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["4"].value}
            </div>
            <div
              onClick={() => handleClick(5)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["5"].value}
            </div>
            <div
              onClick={() => handleClick(6)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["6"].value}
            </div>
          </div>
          {/* row 3 */}
          <div className="flex items-center gap-[2px]">
            <div
              onClick={() => handleClick(7)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["7"].value}
            </div>
            <div
              onClick={() => handleClick(8)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["8"].value}
            </div>
            <div
              onClick={() => handleClick(9)}
              className="h-10 w-10 border cursor-pointer  flex justify-center items-center"
            >
              {score["9"].value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
