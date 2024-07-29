import React, { useState } from 'react'
import { gameContext } from '../context/gameContext.ts'
import { GameIdType } from '../types/contextTypes.ts'

type Props = {
    children:React.ReactNode
}
const GameContextProvider = ({children}: Props) => {
    const [gameId, setGameId] = useState<GameIdType | null>(null);
  return (
    <gameContext.Provider value={{gameId, setGameId}}>
        {children}
    </gameContext.Provider>     
   
  )
}

export default GameContextProvider