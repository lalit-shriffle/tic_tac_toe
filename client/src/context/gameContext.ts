import { createContext } from "react";
import { IGameContextType } from "../types/contextTypes";

export const gameContext = createContext<IGameContextType | null>(null);