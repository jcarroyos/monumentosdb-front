import React, { Component } from "react";
import { Popup } from "react-map-gl";
import ReactHtmlParser from 'react-html-parser';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



class Tooltip extends Component {

  render() {
    const { details, handleCloseTooltip } = this.props;

    return (
      <Popup
        tipSize={0}
        longitude={details.lugares_monumento.llongitud}
        latitude={details.lugares_monumento.llatitud}
        closeButton={true}
        closeOnClick={false}
        dynamicPosition={true}
        captureScroll={true}
        onClose={() => handleCloseTooltip()}
      >
        <div className="map-tooltip">
          <Tabs>
            <TabList>
              <Tab>Manifestación</Tab>
              <Tab>Descripción</Tab>
              <Tab>Origen</Tab>
              <Tab>Estado actual</Tab>
              <Tab>Fuentes</Tab>
            </TabList>
            <div className="container-box">
              {/* Manifestación */}
              <TabPanel>
                <div className="map-tooltip-field">
                  {details.htitulo}
                </div>
                <div className="map-tooltip-field">
                  {details.hfecha}
                </div>
                <div className="map-tooltip-field">
                  <ul>
                  {this.props.details.participantes.map((participante, index) => (
                    <li key={index}>
                      {participante.pnombre}
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="map-tooltip-field">
                  {details.hpregunta}
                </div>
                <div className="map-tooltip-img">
                  <img alt="imagen" src={details.himagenantes[0].formats.thumbnail.url} />
                </div>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.lnombrelugar}
                </div>
              </TabPanel>

              {/* Descripción */}
              <TabPanel>
                <div className="map-tooltip-field">
                  {details.htitulo}
                </div>
                <div className="map-tooltip-field">
                  {details.hdescripcion}
                </div>
                <div className="map-tooltip-field">
                  {details.participantes.pnombre}
                </div>
                <div className="map-tooltip-field">
                  {details.participantes.pdescripcion}
                </div>
              </TabPanel>

              {/* Origen */}
              <TabPanel>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.lnombremonumento}
                </div>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.ltipomonumento}
                </div>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.lfechainstalacion}
                </div>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.lmotivoinstalacion}
                </div>
              </TabPanel>

              {/* Estado actual */}
              <TabPanel>
                <div className="map-tooltip-field">
                  {details.htitulo}
                </div>
                <div className="map-tooltip-field">
                  {details.hestadoactual}
                </div>
                <div className="map-tooltip-img">
                  <img alt="imagen" src={details.himagenactual[0].formats.thumbnail.url} />
                </div>
                <div className="map-tooltip-field">
                  {details.lugares_monumento.lnombrelugar}
                </div>
              </TabPanel>

              {/* Fuentes */}
              <TabPanel>
                <div className="map-tooltip-field">
                  {details.htitulo}
                </div>
                <div className="map-tooltip-field">
                  {ReactHtmlParser(details.hfuenteinfo)}
                </div>

              </TabPanel>
            </div>
          </Tabs>
        </div>

      </Popup>
    );
  }
}

export default Tooltip;
