import React from "react";
import remote from "../helpers/connects";

const defaultValues = {
  user: null,
  remote: remote,
  fireInfo: [],
  activeFireInfo:[],
  userLocations: [],
  userCoordinates: {},
  userAllCoordinates:[]
};

//set default state for autocomplete
const GlobalContext = React.createContext(defaultValues);

export { GlobalContext, defaultValues };
