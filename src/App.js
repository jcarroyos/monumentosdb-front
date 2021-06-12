import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 4.6097100,
    longitude: -74.0817500,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  return (
    <div className="App">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/jcarroyos/ckptqtqd31w5s17mwmrykwq07"
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
        >
          markers here
        </ReactMapGL>
    </div>
  );
} 


export default App;