import React, { useContext, useEffect, useState } from "react";
import { gameContext } from "../context/gameContext.ts";
import { socket } from "../socket.ts";
import Model from "./Model.tsx";
import WantToPlayAgain from "./WantToPlayAgain.tsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  setRequestAccepted: (requsetAccepted: boolean) => void;
};

const RestartGame = ({ setRequestAccepted }: Props) => {
  const navigate = useNavigate();
  const { gameId } = useContext(gameContext);
  const [requester, setRequester] = useState<string | null>(null);

  function restartGame() {
    socket.emit("play-again", { gameId: gameId });
  }

  useEffect(() => {
    if (socket) {
      socket.on("play-again-request", (data: { name: string }) => {
        console.log("data request", data);
        setRequester(data.name);
      });

      socket.on("your-request-accepted", ({ name }) => {
        toast.success("Request for new game accepted");
        setRequestAccepted(true);
        setRequester(null);
      });

      socket.on("your-request-rejected", ({ name }) => {
        toast.error("Request for new game rejeced");
        navigate("/");
      });
    }

    return () => {
      socket.off("play-again-request");
      socket.off("your-request-accepted");
      socket.off("your-request-rejected");
    };
  }, [socket]);

  return (
    <>
      <button onClick={restartGame} className="bg-red-500 rounded text-black">
        Play Again?
      </button>

      {requester && (
        <Model>
          <WantToPlayAgain
            setRequestAccepted={setRequestAccepted}
            setRequester={setRequester}
            requester={requester}
          />
        </Model>
      )}
    </>
  );
};

export default RestartGame;
