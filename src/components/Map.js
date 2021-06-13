import React, { Component } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import Tooltip from "./Tooltip";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100vw",
    height: "100vh",
    latitude: 4.6482836,
    longitude: -74.1482346,
    zoom: 12,
  },
};
class Map extends Component {
  state = initialState;

  componentDidMount() {
    this.prepareData();
  }

  prepareData = () => {
    const { query, data } = this.props;
    const map_data = data.filter((f) => f[query] > 0);
    this.setState({
      map_data,
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
        mapStyle="mapbox://styles/luisa-gonzalez/ckpud3v7b5nva17s44d2xv9p2"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {map_data.map((data, index) => {
          const longitude = Number(data.coordenadas.longitud);
          const latitude = Number(data.coordenadas.latitude);

          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <div
                className="map-marker"
                style={{
                  height: 1000,
                  width: 1000,
                  color: '#ffffff'
                }}
                onClick={() => this.setState({ tooltip: '' })}
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

        <div className="map-nav">
          <NavigationControl
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
