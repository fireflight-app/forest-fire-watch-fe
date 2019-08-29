import React, { useReducer, createContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import connector from "../helpers/connects";
import { GlobalContext, defaultValues } from "./contextProvider";

import {
  SET_LOCATION,
  SET_NAME,
  GET_FIRES_START,
  GET_FIRES_SUCCESS,
  GET_FIRES_ERROR,
  GET_USER_LOCATIONS_START,
  GET_USER_LOCATIONS_SUCCESS,
  GET_USER_LOCATIONS_ERROR,
  SET_LAST_ALERT_START,
  SET_LAST_ALERT_SUCCESS,
  SET_LAST_ALERT_ERROR,
  SET_COORDS
} from "./types";

const DSbaseURL = "https://fire-data-api.herokuapp.com";

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case GET_FIRES_SUCCESS:
      //To Ken from Shannon: should add the fire coordinates and alert boolean from the DS (setFires function)to the fireInfo array
      return {
        ...state,
        fireInfo: [...state.fireInfo, action.payload]
      };
    //To Ken from Shannon: should add all locations of single user to the userLocations array
    case GET_USER_LOCATIONS_SUCCESS:
      return {
        ...state,
        userLocations: action.payload
      };
    case SET_COORDS:
      return {
        ...state,
        userCoordinates: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const GlobalProvider = props => {
  const [globalState, dispatch] = useReducer(globalReducer, defaultValues);

  const setUser = newUser => {
    dispatch({
      type: SET_NAME,
      payload: newUser
    });
  };

  const setCoordinates = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${globalState.userAddress}.json?access_token=${token}`
      )
      .then(res => {
        dispatch({
          type: SET_COORDS,
          payload: {
            latitude: res.data.features[0].center[1],
            longitude: res.data.features[0].center[0]
          }
        });
      });
  };

  //example location:
  //  {
  //    "user_coords" : [-122.347204, 47.653278],
  //    "distance" : 1000
  // }
  //To Ken from Shannon: This is the API call to the DS backend, currently not working because of the CORS issue
  const setFires = location => {
    dispatch({ type: GET_FIRES_START });
    console.log("GET_FIRES_START");
    axios
      .post(`${DSbaseURL}/check_fires`, location)
      .then(res => {
        dispatch({ type: GET_FIRES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_FIRES_ERROR, payload: err });
      });
  };
  //To Ken from Shannon: This gets an array of all locations for the signed in user.
  const setUserLocations = () => {
    dispatch({ type: GET_USER_LOCATIONS_START });
    axiosWithAuth()
      .get("/locations")
      .then(res => {
        dispatch({ type: GET_USER_LOCATIONS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_USER_LOCATIONS_ERROR, payload: err });
      });
  };

  const setLastAlert = mostRecentAlert => {
    dispatch({ type: SET_LAST_ALERT_START });
    axios
      .put("locations", mostRecentAlert)
      .then(res => {
        console.log(res.data);
        dispatch({ type: SET_LAST_ALERT_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: SET_LAST_ALERT_ERROR, payload: err });
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        dispatch,
        setUser,
        setFires,
        setUserLocations,
        setLastAlert,
        setCoordinates
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
