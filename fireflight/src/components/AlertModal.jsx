import React, { useContext } from "react";

import Modal from "./Modal/Modal";
import { FireContext } from "../context/contextProvider";

const AlertModal = () => {
  const { state, setFires, setUserLocations } = useContext(FireContext);
  const { fireInfo, userLocations } = state;
  console.log(userLocations);
  const updateLastAlert = () => {};

  const firesArray = [];

  const getFireData = () => {
    if (userLocations) {
      console.log(userLocations[0]);
      //To Ken from Shannon: This is a WIP, formats a single location 
      //(currently the first location in the userLocations array) from the array received 
      //from the setUserLocations API call in GlobalContext.jsx, and then triggers the DS API call, setFires. 
      const location = {
        user_coords: [userLocations[0].latitude, userLocations[0].longitude],
        distance: userLocations[0].radius
      };
      console.log("location", location);
      setFires(location);
    }
  };

  return (
    <Modal show={true}>
      {userLocations.map(location => {
        return <p key={location.id}>{location.address}</p>;
      })}
      <div>
        <h1>ALERT</h1>
        <p>We detect a potential fire within the alert radius</p>
        //To Ken from Shannon: click this button to get array of single user's locations
        <button onClick={setUserLocations}>Get use locations</button>
        //To Ken from Shannon: Once the CORS issue is fixed, this button will get fire data for first location in the userLocations array
        <button onClick={getFireData}>Get Fire Locations</button>
        <button onClick={updateLastAlert}>Acknowledge Alert</button>
        <h3>Modal Alert</h3>
      </div>
    </Modal>
  );
};

export default AlertModal;
