import { createContext } from "react";
import { IUserContextType } from "../types/contextTypes";

export const userContext = createContext<IUserContextType|null>(null);