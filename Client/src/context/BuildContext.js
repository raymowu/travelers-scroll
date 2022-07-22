import { createContext, useReducer } from "react";

export const BuildContext = createContext();

export const buildReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUILD":
      return {
        build: action.payload,
      };
    default:
      return state;
  }
};

export const BuildContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(buildReducer, {
    build: {
      _id: 0,
      title: "",
      description: "",
      character: "",
      Author: {},
      weapons: [],
      weapons_replacement: [],
      artifacts: [],
      artifact_sands_stat: "",
      artifact_goblet_stat: "",
      artifact_circlet_stat: "",
      artifact_substats: [],
      teams: [],
      comments: [],
      likes: 0,
      likedUsers: [],
      date: "",
      __v: 0,
    },
  });

  return (
    <BuildContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BuildContext.Provider>
  );
};
