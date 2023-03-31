import { Notyf } from "notyf";
import { createContext, useContext } from "react";

const NotyfContext = createContext(
  new Notyf({
    duration: 2000,
  }),
);

export const useNotyf = (): Notyf => useContext(NotyfContext);
