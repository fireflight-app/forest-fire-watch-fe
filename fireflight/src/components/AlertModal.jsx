import React, { useContext } from "react";

import Modal from "./Modal/Modal";
import { GlobalContext } from "../context/contextProvider";
import AddressContext from "../context/addressContextProvider";

const AlertModal = ({ showAlerts, setShowAlerts }) => {
  const {
    globalState,
    setFires,
    setUserLocations,
    setAllCoordinates
  } = useContext(GlobalContext);
  const {
    fireInfo,
    userLocations,
    userAllCoordinates,
    activeFireInfo
  } = globalState;

  const acknowledgeAlert = () => {
    //add PUT request to update last_alert on locations table with Date.now
    setShowAlerts(false);
  };

  return (
    <div>
      {/* <Modal show={showAlerts}> */}
      <Modal show={showAlerts}>
        <div>
          <h1>ALERT</h1>
          <p>We detect a potential fire within the alert radius</p>
          <h3>Modal Alert</h3>
          updateLastAlert is not written yet, but should be able to use a put
          request from
          <button onClick={acknowledgeAlert}>Acknowledge</button>
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
