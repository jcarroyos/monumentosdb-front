import React, { Component } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import img_monumento_prueba from '../monumento.png';

import Tooltip from "./Tooltip";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100vw",
    height: "70vh",
    latitude: 4.6482836,
    longitude: -74.1482346,
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
    console.log(this.props);

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
          //const img_monumento = data.lugares_monumento.lmonumentoicon.formats.thumbnail.url;
          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              {/* <div
                className="map-marker"
                style={{
                  height: 1000,
                  width: 1000,
                  color: '#ffffff'
                }}
                onClick={() => this.setState({ tooltip: '' })}
              /> */}
              <img className="map-marker"
                src={img_monumento_prueba}
                alt="monumento"
                width="100px"
                height="auto"
                onClick={() => console.log("click")}
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
