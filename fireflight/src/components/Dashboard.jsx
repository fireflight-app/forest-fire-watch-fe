import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MapProvider } from "../context/MapContext";
import { GlobalContext } from "../context/contextProvider";

import AlertModal from "./AlertModal";

// import Map from "./Map";

const Dashboard = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const {
    globalState,
    setFires,
    setUserLocations,
    setAllCoordinates,
    setActiveFires
  } = useContext(GlobalContext);
  const { fireInfo, activeFires, userLocations, userAllCoordinates } = globalState;


  useEffect(()=> {
    checkAlerts()
  }, [])
//on mounting, this function will check if last_alert on locations table is more than 4 hours ago
//(****should be refactored to user address context for locations)
//if so, it will check to see if there are active fires
//still need to write function to update last_alert, can probably use a put request from addressContext
  const checkAlerts = ()=> {
    const currentTime = Date.now()
    const hour=3600000
    userLocations.forEach(location=> {
      if (location.last_alert-currentTime>(4*hour)){
        setActiveFires()
      }
    })
  }

  return (
    <DashboardWrapper>
      <button onClick={setActiveFires}>Check For Fires</button>
      {showAlerts ? <BackDrop onClick={() => setShowAlerts(false)} /> : null}
      <AlertModal showAlerts={activeFires} />
      <Heading>Dashboard</Heading>
      <ContentContainer>
        <AlertsDiv onClick={() => setShowAlerts(true)}>
          <DivHeading>View Todays Alerts</DivHeading>
        </AlertsDiv>
        {/* <MapDiv>
          <DivHeading>Active Fires</DivHeading>
          <MapProvider>
            <Map />
          </MapProvider>
        </MapDiv> */}
        <ProfileDiv>
          <DivHeading>My Profile</DivHeading>
        </ProfileDiv>
      </ContentContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  height: 100vh;
  text-align: center;
`;

const Heading = styled.h1`
  color: #f2f3f4;
  padding: 15px 0px;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const DivHeading = styled.h2`
  padding: 10px 0px;
  margin: 0;
`;

const AlertsDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 10px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    order: 2;
    margin: auto;
  }
`;

const MapDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: auto;
  margin: 15px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 1 / 3;
    max-width: 1000px;
  }
`;

const ProfileDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 15px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    order: 3;
  }
`;

const BackDrop = styled.div`
  background-color: rgba(48, 49, 48, 0.42);
  height: 100%;
  position: fixed;
  transition: all 1.3s;
  width: 100%;
`;






  // useEffect(()=> {
  //   checkForFires()
  // },[userLocations])

  // const checkForFires = () => {
  //   setUserLocations()
  //     .then(res => {
  //       setAllCoordinates()
  //         .then(res => {
  //           setFires()
  //             .then(res => {
  //               console.log(fireInfo);
  //             })
  //             .catch(err => {
  //               console.log(err);
  //             });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   // if(userLocations.length>0) {
  //   // setAllCoordinates(userLocations)
  //   // }
  //   // if (userAllCoordinates.length>0) {
  //   //   // getFireData();
  //   // }
  //   console.log("userAllCoordinates", userAllCoordinates);
  //   console.log(userLocations.length, "HERE");
  //   console.log(userAllCoordinates.length, "THERE");

    // const activeFires = fireInfo.map(fire => {
    //   if (fire.Alert) {
    //     return true;
    //   }
    // });
    // console.log("activeFires", activeFires)
    // if (activeFires.length>0) {
    //   setShowAlerts(true);
    // }
  //  };
  // const getFireData = () => {
  //   // if ( userAllCoordinates.length>0&&useEffect(()=> {
  //   //   //   checkForFires()
  //   // },[userLocations])useEffect(()=> {
  //   //   checkForFires()
  //   // },[userLocations])userLocations.length>0) {
  //   console.log("userAllCoordinates", userAllCoordinates);
  //   let i = 0;
  //   for (i; i < userLocations.length; i++) {
  //     console.log(userLocations.length, "HERE");
  //     console.log(userAllCoordinates.length, "THERE");
  //     const location = {
  //       user_coords: userAllCoordinates[i],
  //       distance: userLocations[i].radius
  //     };
  //     console.log("Location", location);
  //     setFires(location);
  //     // }
  //   }
  // };
