import React from 'react'

type Props = {
    winner:string | null,
    opponateWinnerName:string | null;
    player : string | null;
    playerNo:string | null;

}

const PlayerTurn = ({winner, opponateWinnerName,player,playerNo}: Props) => {
  return (
    <div className='flex items-center justify-center'>
        {!winner && !opponateWinnerName && 
        <>
          <span>{playerNo !== player ?
            <span className='text-yellow-500'>Wait for your turn</span> : 
            <span className='text-blue-500'>Choose you move</span>
            }</span>
        </>
        }
    </div>
  )
}

export default PlayerTurn