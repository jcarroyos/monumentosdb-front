import React, { Component } from "react";
import { Popup } from "react-map-gl";

class Tooltip extends Component {
  render() {
    const { details, handleCloseTooltip } = this.props;
    //console.log(details.himagenactual[0].formats.thumbnail.url);
    return (
      <Popup
        tipSize={0}
        longitude={details.lugares_monumento.llongitud}
        latitude={details.lugares_monumento.llatitud}
        closeButton={true}
        onClose={() => handleCloseTooltip()}
      >
        <div className="map-tooltip">
          <div className="map-tooltip-field">
            <div className="map-tooltip-header">{details.hpregunta}</div>
          </div>
          <div className="map-tooltip-field">
            <div className="map-tooltip-label">Fecha del hecho:</div>
            <div className="map-tooltip-value">{details.hfecha}</div>
          </div>
          <div className="imagenes">
            <img alt="imagen-antes" src={details.himagenantes[0].formats.thumbnail.url} />
            <img alt="imagen-despues" src={details.himagenactual[0].formats.thumbnail.url} />
          </div>
          <div className="map-tooltip-field">
            <div className="map-tooltip-label">Descripción:</div>
            <div className="map-tooltip-value">{details.hdescripcion}</div>
          </div>
          <div className="map-tooltip-field">
            <div className="map-tooltip-label">Estado actual:</div>
            <div className="map-tooltip-value">{details.hestadoactual}</div>
          </div>
        </div>
      </Popup>
    );
  }
}

export default Tooltip;
