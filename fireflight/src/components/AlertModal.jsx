import React, { useContext } from "react";

import Modal from "./Modal/Modal";
import { GlobalContext } from "../context/contextProvider";

const AlertModal = ({ showAlerts }) => {
  const { globalState, setFires, setUserLocations, setAllCoordinates } = useContext(GlobalContext);
  const { fireInfo, userLocations, userAllCoordinates } = globalState;
  
  const updateLastAlert = () => {};

  const firesArray = [];
  const setCoords=()=> {
    setAllCoordinates(userLocations)
  }

  const getFireData = () => {
    console.log("radius", userLocations[0].radius)
    if (userAllCoordinates) {
      console.log("userAllCoordinates", userAllCoordinates);
      let i=0
      for( i; i<userAllCoordinates.length; i++) {
        const location = {"user_coords": userAllCoordinates[i], "distance": userLocations[i].radius}
        console.log("Location", location)
        setFires(location)
      }
      // const location = {
      //   user_coords: [userCoordinates.latitude, userCoordinates.longitude],
      //   distance: 10000
      // };
      // console.log("location", userCoordinates);
      // setFires(location);
    }
  };

  console.log("fireInfo", fireInfo); // <------- active fires are coming in from the users address. Its not pretty. deff needs some refactoring. Was more concerned with getting it to work. The distance is being hardcoded into the location variable inside getFireData. By tomorrow, we should be able to get the radius that a user has selected instead of hardcoding it.
  console.log("userLocations", userLocations)
  // Explanation of what is happening.
  // 1: When we push the Get user locations button we call setUserLocations. This gets all the users array of addesses and sets the variable in context.
  // 2: Inside this same function we make a mapbox geocoding api call. We pass the first address in the array into the api. The geocoding api converts the address into lat / long coordinates. We set those coordinates to userCoordinates.
  // 3: When we click the Get Fire Locations button, we pass the userCoordinates down and create the location object inside the getFireData function. We then pass location into the setFires function.
  // 4: setFires function grabs all the active fires based on the location info we passed in. That data is passed into fireInfo variable.

  // Still quite buggy. You have to click Get User Locations button twice before you can click the Get Fire Locations button to work correctly. No idea why that is. Feel free to investigate.

  return (
    <div>
      {/* <Modal show={showAlerts}> */}
      <Modal show={true}>
        {userLocations.map(location => {
          return <p key={location.id}>{location.address}</p>;
        })}
        <div>
          <h1>ALERT</h1>
          <p>We detect a potential fire within the alert radius</p>
          //To Ken from Shannon: click this button to get array of single user's
          locations
          <button onClick={setUserLocations}>Get user locations</button>
          <button onClick={setCoords}>Set All Coordinates</button>
          <button onClick={getFireData}>Get Fire Locations</button>
          <button onClick={updateLastAlert}>Acknowledge Alert</button>
          <h3>Modal Alert</h3>
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
