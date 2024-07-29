import React, { useContext, useState } from "react";
import { socket } from "../socket.ts";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext.ts";
import { gameContext } from "../context/gameContext.ts";
import { geneateNewGameId } from "../utils/generateNumber.ts";
import InputBox from "../shared/InputBox.tsx";
import Label from "../shared/Label.tsx";
import Input from "../shared/Input.tsx";
import Button from "../shared/Button.tsx";
import { IUserContextType } from "../types/contextTypes.ts";
import {
  validateNewGameInputs,
  validateStartGameInputs,
} from "../utils/validation.ts";
import ErrorFeedback from "../shared/ErrorFeedback.tsx";

type Props = {};

const Boarding = (props: Props) => {
  const navigate = useNavigate();

  const { User, setUser } = useContext(userContext);
  const { setGameId } = useContext(gameContext);
  const [name, setName] = useState<string>("");
  const [newJoinee, setNewJoinee] = useState<string>("");
  const [newGameId, setNewGameId] = useState<string>("");
  const [joinGameId, setJoinGameId] = useState<string>("");

  const [joinGameError, setJoinGameError] = useState({});
  const [startGameError, setStartGameError] = useState({});

  // on-change functions
  const handleNameChange = (e) => setName(e.target.value);
  const handleGameIdChange = (e) => setJoinGameId(e.target.value);
  const handleNewJoineeNameChange = (e) => setNewJoinee(e.target.value);


  // starting new game
  function handleStartGameClick(e) {
    setStartGameError({}); // reset errors

    const errors = validateStartGameInputs(name);
    setStartGameError(errors);

    const isValidate = Object.keys(errors).length <= 0;
    if(!isValidate) return 
    const gameId = geneateNewGameId();
    setGameId(gameId);
    setUser({ name: name, isHost: true });
    socket.emit("start-game", { name: name, gameId: gameId });
    navigate("/home");
    
  }

  // joining existing game
  function handleJoinGameClick(e) {
    setJoinGameError({});
    const errors = validateNewGameInputs(newJoinee, joinGameId);
    setJoinGameError(errors);
    const isValidate = Object.keys(errors).length <= 0;

    if (!isValidate) return;

    setGameId(joinGameId);
    socket.emit("join-game", { name: newJoinee, gameId: joinGameId });
    navigate("/home");
  }

  return (
    // container
    <div className="flex items-center justify-center h-screen bg-[rgba(255,255,255,.4)]">
      {/* wrapper */}
      <div className="max-w-[50vh] flex flex-col gap-3 py-8 px-6 shadow-md shadow-black rounded-xl">
        <InputBox>
          <Label>Enter your name</Label>
          <Input
            type="text"
            value={newJoinee}
            onChange={handleNewJoineeNameChange}
          />
          <ErrorFeedback msg={joinGameError?.name} />
        </InputBox>

        <InputBox>
          <Label>Enter Game Id</Label>
          <Input
            type="number"
            onChange={handleGameIdChange}
            value={joinGameId}
          />
          <ErrorFeedback msg={joinGameError?.gameId} />
        </InputBox>

        <Button onClick={handleJoinGameClick}>Join Game</Button>

        <div className="flex items-center justify-center">
          <hr />
          <span>Or</span>
          <hr />
        </div>

        <InputBox>
          <Label>Enter your name</Label>
          <Input type="text" onChange={handleNameChange} value={name} />
          <ErrorFeedback msg={startGameError?.name} />
        </InputBox>

        <Button onClick={handleStartGameClick}>Start New Game</Button>
      </div>
    </div>
  );
};

export default Boarding;
