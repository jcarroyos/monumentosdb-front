import './App.scss';
import React, { useState, useEffect } from 'react';
import ReactMapGL from "react-map-gl";
import axios from 'axios';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "200vh",
    latitude: 4.2482836,
    longitude: -74.1482346,
    zoom: 10
  });

  useEffect(() => {
    // code to run on component mount
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/luisa-gonzalez/ckpud3v7b5nva17s44d2xv9p2"
      onViewportChange={viewport => {
      setViewport(viewport)
      }}
      >
    </ReactMapGL>
  );
}

class App extends React.Component {
  // State of your application
  state = {
    monumentos: [],
    error: null,
  };

  // Fetch your monumentos immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const response = await axios.get('https://monumentosdb.herokuapp.com/monumentos');
      this.setState({ monumentos: response.data });
      console.log(response);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, monumento } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className="App">
        <ol className="listado">
          {this.state.monumentos.map(monumento => (
            <li className="texto" key={monumento.id}>{monumento.htitulo},<strong>{monumento.pnombre}</strong> - Lat: {monumento.mlatitud}, Long: {monumento.mlognitud}</li>
          ))}
        </ol>
        <Map />
      </div>
      
    );
  }
}

export default App;