import React, { useContext } from "react";

import Modal from "./Modal/Modal";
import { GlobalContext } from "../context/contextProvider";

const AlertModal = ({ showAlerts }) => {
  const { globalState, setFires, setUserLocations } = useContext(GlobalContext);
  const { fireInfo, userLocations, userCoordinates } = globalState;
  console.log(userCoordinates);
  const updateLastAlert = () => {};

  const firesArray = [];

  const getFireData = () => {
    if (userCoordinates) {
      //To Ken from Shannon: This is a WIP, formats a single location
      //(currently the first location in the userLocations array) from the array received
      //from the setUserLocations API call in GlobalContext.jsx, and then triggers the DS API call, setFires.
      const location = {
        user_coords: [userCoordinates.latitude, userCoordinates.longitude],
        distance: 10000
      };
      console.log("location", location);
      setFires(location);
    }
  };

  console.log(fireInfo); // <------- active fires are coming in from the users address. Its not pretty. deff needs some refactoring. Was more concerned with getting it to work. The distance is being hardcoded into the location variable inside getFireData. By tomorrow, we should be able to get the radius that a user has selected instead of hardcoding it.

  // Explanation of what is happening.
  // 1: When we push the Get user locations button we call setUserLocations. This gets all the users array of addesses and sets the variable in context.
  // 2: Inside this same function we make a mapbox geocoding api call. We pass the first address in the array into the api. The geocoding api converts the address into lat / long coordinates. We set those coordinates to userCoordinates.
  // 3: When we click the Get Fire Locations button, we pass the userCoordinates down and create the location object inside the getFireData function. We then pass location into the setFires function.
  // 4: setFires function grabs all the active fires based on the location info we passed in. That data is passed into fireInfo variable.

  return (
    <div>
      <Modal show={showAlerts}>
        {userLocations.map(location => {
          return <p key={location.id}>{location.address}</p>;
        })}
        <div>
          <h1>ALERT</h1>
          <p>We detect a potential fire within the alert radius</p>
          //To Ken from Shannon: click this button to get array of single user's
          locations
          <button onClick={setUserLocations}>Get user locations</button>
          //To Ken from Shannon: Once the CORS issue is fixed, this button will
          get fire data for first location in the userLocations array
          <button onClick={getFireData}>Get Fire Locations</button>
          <button onClick={updateLastAlert}>Acknowledge Alert</button>
          <h3>Modal Alert</h3>
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
