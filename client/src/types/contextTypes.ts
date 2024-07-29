// user-context types
export interface IUser{
    name:string;
    isHost:boolean;
}

export interface IUserContextType {
    User:IUser | null,
    setUser :(user:IUser)=>void
}

// game-context types

export type GameIdType = string | null;

export interface IGameContextType {
    gameId:GameIdType;
    setGameId: (gameId:GameIdType)=> void ;
}