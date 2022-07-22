import { BuildContext } from "../context/BuildContext";
import { useContext } from "react";

export const useBuildContext = () => {
  const context = useContext(BuildContext);

  if (!context) {
    throw Error("useBuildContext must be used inside a BuildContextProvider");
  }

  return context;
};
