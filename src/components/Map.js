import React, { Component } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import Tooltip from "./Tooltip";
import Menu from "./Menu";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN = "pk.eyJ1IjoibHVpc2EtZ29uemFsZXoiLCJhIjoiY2twdWN6YWFvMDR5YzMxcDMydm9qZHpsZSJ9.xsECthZv6vJ6YEazMaYXvw";


const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100vw",
    height: "100vh",
    latitude: 3.4550619,
    longitude: -76.5457046,
    zoom: 5
  },
};

class Map extends Component {
  state = initialState;


  componentDidMount() {
    const { data } = this.props;
    const map_data = data;
    this.setState({
      map_data,
    });
  }

  flyTo = (lon, lat) => {
    console.log(lat + ' | ' + lon)
    this.setState({
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: lat,
        longitude: lon,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18
      },
    });
  };


  handleCloseTooltip = () => {
    this.setState({ tooltip: null });
  };



  render() {
    const { map_data, tooltip, viewport } = this.state;
    const { fields } = this.props;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/luisa-gonzalez/ckpy3dolm64m717mw5dznforg"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {map_data.map((data, index) => {
          const longitude = Number(data.lugares_monumento.llatitud);
          const latitude = Number(data.lugares_monumento.llongitud);

          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <div
                className="map-marker"
                style={{
                  height: 20,
                  width: 20,
                  background: '#FF0080'
                }}
                onClick={() => this.setState({ tooltip: data })}
              />
            </Marker>
          );
        })}

        {tooltip && (
          <Tooltip
            details={tooltip}
            fields={fields}
            handleCloseTooltip={this.handleCloseTooltip}
          />
        )}
        <div id="menu">
          <Menu
            listado={map_data}
            flyTo={this.flyTo}
          />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
