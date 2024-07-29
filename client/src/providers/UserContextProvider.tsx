import React, { useState } from 'react'
import { userContext } from '../context/userContext.ts'
import { IUser } from '../types/contextTypes.ts'

type Props = {
    children:React.ReactNode
}

const UserContextProvider = ({children}: Props) => {
    const [User,setUser] = useState<IUser | null>(null);
  return (
   <userContext.Provider value={{User,setUser}}>
    {children}
   </userContext.Provider>
  )
}

export default UserContextProvider