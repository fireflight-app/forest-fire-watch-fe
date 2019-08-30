import React from "react";
import remote from "../helpers/connects";

const defaultValues = {
  user: null,
  remote: remote,
  fireInfo: [],
  activeFires: false,
  userLocations: [],
  userCoordinates: {},
  userAllCoordinates:[]
};

//set default state for autocomplete
const GlobalContext = React.createContext(defaultValues);

export { GlobalContext, defaultValues };
