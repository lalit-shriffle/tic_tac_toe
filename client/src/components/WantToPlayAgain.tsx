import React, { useContext } from 'react'
import { socket } from '../socket.ts';
import { gameContext } from '../context/gameContext.ts';
import { useNavigate } from 'react-router-dom';

type Props = {
    requester:string | null;
    setRequester: (requester:string | null)=> void;
    setRequestAccepted: (requsetAccepted: boolean)=> void;
}

const WantToPlayAgain = ({requester,setRequester,setRequestAccepted}: Props) => {
    const navigate = useNavigate();
    const {gameId} = useContext(gameContext);

    function handleRejectClick(){
        setRequester(null);
        if(socket){
            socket.emit("request-rejected",{gameId:gameId});
            navigate("/")
        }
    }

    function handleAcceptClick(){
        if(socket){
            socket.emit("request-accepted",{gameId:gameId});
            setRequestAccepted(true)
        }

    }


  return (
    <div className='flex flex-col gap-4 bg-white'>
        <span>{requester}{" "} wants to play again</span>
        <div className='flex gap-3 items-center justify-center'>
            <button className='bg-red-500  border-none p-1 rounded-md font-medium ' onClick={handleRejectClick}>Reject</button>
            <button className='bg-green-500  border-none p-1 rounded-md font-medium ' onClick={handleAcceptClick}>Accept</button>
        </div>
    </div>
  )
}

export default WantToPlayAgain