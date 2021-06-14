import React, { Component } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import Tooltip from "./Tooltip";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100vw",
    height: "70vh",
    latitude: 3.4550619,
    longitude: -76.5457046,
    zoom: 12,
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
          const longitude = Number(data.lugares_monumento.llatitud);
          const latitude = Number(data.lugares_monumento.llongitud);

          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <div
                className="map-marker"
                style={{
                  height: 20,
                  width: 20,
                  background: '#ffe500'
                }}
                //onClick={() => console.log(data)}
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
