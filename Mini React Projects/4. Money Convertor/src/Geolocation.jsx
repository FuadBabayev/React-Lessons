import { useState } from "react";

function useGeolocation(){
    // const [latitude, setLatitude] = useState("");
    // const [longitude, setLongitude] = useState("");
    const [position, setPosition] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function getPosition() {        
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // setLatitude((lat) => latitude);
          // setLongitude((long) => longitude);
          setPosition({
            latitude,         //  latitude : position.coords.latitude,
            longitude        //  longitude : position.coords.longitude
          });
          setIsLoading(false);
        });
    }

    
    return {position, isLoading, getPosition};
}

function Geolocation() {
    const {position, isLoading, getPosition} = useGeolocation();
    const {latitude, longitude} = position;

    const [countClicks, setCountClicks] = useState(0);
    function handleClick(){
      setCountClicks((count) => count + 1);
      getPosition();
    }



  return (
    <>
      <button onClick={handleClick} disabled={isLoading}>Get My Position</button>
      {isLoading && <p>Loading your position address...</p>}
      {!isLoading && longitude && latitude && ( <>
        <p>Your GPS position <a target="_blank" href={`https://www.openstreetmap.org/#map=13/${latitude}/${longitude}`}
        rel="noreferrer" > {latitude} {longitude}</a></p>
        {countClicks && <p>You clikced {countClicks} times</p>}</>
      )}
    </>
  );
}

export default Geolocation;
