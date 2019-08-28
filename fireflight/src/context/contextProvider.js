import React from "react";
import remote from "../helpers/connects";

const defaultValues = {
  user: null,
  remote: remote,
  fireInfo: [],
  userLocations: [],
  userCoordinates: {},
  setFires: location => {},
  setUserLocations: () => {},
  setLastAlert: () => {}
};

//set default state for autocomplete
const GlobalContext = React.createContext(defaultValues);

export { GlobalContext, defaultValues };
