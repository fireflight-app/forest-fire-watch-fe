import React, { useReducer } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import connector from "../helpers/connects";
import { GlobalContext, defaultValues } from "./contextProvider";

import {
  SET_LOCATION,
  SET_NAME,
  SET_FIRES,
  SET_USER_LOCATIONS,
  SET_LAST_ALERT,
  SET_COORDS,
  SET_ALL_COORDS
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
    case SET_FIRES:
      //To Ken from Shannon: should add the fire coordinates and alert boolean from the DS (setFires function)to the fireInfo array
      return {
        ...state,
        fireInfo: [...state.fireInfo, action.payload]
      };
    case SET_USER_LOCATIONS:
      return {
        ...state,
        userLocations: action.payload
      };
    case SET_ALL_COORDS:

      // const userLocWithCoords = state.userLocations;
      // action.payload.forEach((location, index)=> {
      //   console.log("FOR EACH", action.payload[index])
      // })
      // console.log("userLocWithCoords",userLocWithCoords)
      // for (let i = 0; i < action.payload.length; i++){
      //   console.log("I",action.payload[i])
      //   // userLocWithCoords[i]
      // }
        return {
          ...state,
          userAllCoordinates: [...state.userAllCoordinates, action.payload]
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

  //example location:
  //  {
  //    "user_coords" : [-122.347204, 47.653278],
  //    "distance" : 1000
  // }
  const setFires = location => {
    axios
      .post(`${DSbaseURL}/check_fires`, location)
      .then(res => {
        dispatch({ type: SET_FIRES, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const setUserLocations = () => {
    axiosWithAuth()
      .get("/locations")
      .then(res => {
        dispatch({ type: SET_USER_LOCATIONS, payload: res.data });
        // res.data.map(location => {
        //   axios
        //     .get(
        //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.address}.json?access_token=${token}`
        //     )
        //     .then(res => {
        //       dispatch({
        //         type: SET_ALL_COORDS,
        //         payload: [
        //           res.data.features[0].center[1],
        //           res.data.features[0].center[0]
        //         ]
        //       });
        //     });
        // });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const setAllCoordinates = locations => {
    locations.forEach(location => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.address}.json?access_token=${token}`
        )
        .then(res => {
          const coordinates = [
            res.data.features[0].center[1],
            res.data.features[0].center[0]
          ];
    dispatch({ type: SET_ALL_COORDS, payload: coordinates });
        });
    });

  };

  const setLastAlert = mostRecentAlert => {
    axios
      .put("locations", mostRecentAlert)
      .then(res => {
        console.log(res.data);
        dispatch({ type: SET_LAST_ALERT, payload: res.data });
      })
      .catch(err => {
        console.log(err);
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
        setAllCoordinates,
        setLastAlert
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
