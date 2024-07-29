import React, { useContext, useEffect } from 'react'
import Game from '../components/Game.tsx'
import { gameContext } from '../context/gameContext.ts'

type Props = {}

const Home = (props: Props) => {
  const {gameId} = useContext(gameContext);

  useEffect(()=>{
  })
  return (
    <div>
      <Game/>
    </div>
  )
}

export default Home