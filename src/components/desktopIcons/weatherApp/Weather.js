import "./Weather.css";
import { useState, useEffect } from "react";
import axios from "axios";
function Weather() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Delhi");

  const apiKey = "8a7b579b2234232325cbd1702285bc1c";
 

   const [location, setLocation] = useState(null);
//    const [city, setCity] = useState(null);

   useEffect(() => {
     // Function to handle successful location detection
     const handleLocationSuccess = (position) => {
       const { latitude, longitude } = position.coords;
       setLocation({ latitude, longitude });
       fetchCityName(latitude, longitude);
     };

     // Function to handle location detection error
     const handleLocationError = (error) => {
       console.error("Error getting location:", error);
       // Fallback to Delhi as the default location
       setLocation({ latitude: 28.6139, longitude: 77.209 });
       fetchCityName(28.6139, 77.209);
     };

     // Function to fetch city name using Nominatim API
     const fetchCityName = async (latitude, longitude) => {
       const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

       try {
         const response = await fetch(apiUrl);
         const data = await response.json();
         if (data.address && data.address.city) {
           const cityName = data.address.city;
           setCity(cityName);
           setSearch(cityName);
           fetchApi();
         } else {
           setCity("Unknown");
           setSearch("Delhi");
           fetchApi();
         }
       } catch (error) {
         console.error("Error fetching city name:", error);
         setCity("Unknown");
       }
     };

     // Check if the browser supports geolocation
     if (navigator.geolocation) {
       // Attempt to get the current position
       navigator.geolocation.getCurrentPosition(
         handleLocationSuccess,
         handleLocationError
       );
     } else {
       // Geolocation is not supported, fallback to Delhi as the default location
       setLocation({ latitude: 28.6139, longitude: 77.209 });
       fetchCityName(28.6139, 77.209);
     }
   }, []);

     const fetchApi = async () => {
       try {
         const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
         const response = await axios.get(url);
         const data = response.data;
         setCity(data.main);
       } catch (error) {
         console.error("Error fetching weather data:", error);
         setCity(null);
       }
     };

     

  return (
    <div>
      <div className="box">
        <div className="wave" />
        <div className="wave-two" />
        <div className="wave-three" />
        <div id="weathercon">
          <i className="fas fa-sun" style={{ color: "#eccc68" }} />
        </div>
        <div className="info">
          <h5 className="location">
            <i className="fas fa-street-view" style={{ color: "#fff" }}></i>

            {/* <form>
              <h3 style={{ color: "white" }}>CITY NAME</h3>
              <input
                type="text"
                name="cityName"
                placeholder="&nbsp;&nbsp;&nbsp;Enter the City Name here"
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  backgroundColor: "white",
                  height: "45px",
                  width: "300px",
                  borderRadius: "25px",
                  borderColor: "white",
                  opacity: "0.5",
                  border: "none",
                  fontSize: "2rem",
                }}
              />
            </form> */}
          </h5>
          {!city ? (
            <h1 className="temp">No Data Found</h1>
          ) : (
            <div>
              <h2 className="temp">{search.toLocaleUpperCase()}</h2>
              <h2 className="temp">{(city.temp - 273).toFixed(2)} °C</h2>
              <h3 className="tempmin_max">
                Min: {(city.temp_min - 273).toFixed(2)}°C | Max :{" "}
                {(city.temp_max - 273).toFixed(2)}°C
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
