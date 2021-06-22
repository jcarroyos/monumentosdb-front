import React, { Component } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import Tooltip from "./Tooltip";
import ReactHtmlParser from 'react-html-parser';
import Menu from "./Menu";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN = "pk.eyJ1IjoibHVpc2EtZ29uemFsZXoiLCJhIjoiY2twdWN6YWFvMDR5YzMxcDMydm9qZHpsZSJ9.xsECthZv6vJ6YEazMaYXvw";
const somos = "<p>Una cartografía, para quienes no conocen el término, puede describirse como una técnica para trazar espacios geográficos, más específicamente mapas. Cuando hablamos de cartografía social, este segundo vocablo nos imbuye a pensarnos la producción de dichas cartas geográficas desde un proceso colectivo-participativo, en donde la exploración y exposición de los espacios se realiza con base en las vivencias grupales que le otorgan un sentido socio-cultural a dichos lugares.</p> <p>Así pues, desde la electiva de Entornos Virtuales, ofrecida por la maestría en Museología y Gestión del Patrimonio, de la Universidad Nacional de Colombia, los estudiantes propusimos la creación de una cartografía social como una herramienta para la localización y descripción de zonas patrimoniales, ubicadas en las ciudades de Bogotá y Pasto, las cuales han sido transformadas y re-significadas dentro de la coyuntura del Paro Nacional de Colombia, iniciada el 28 de abril de 2021. Nuestro objetivo es develar aquellos puntos de encuentro, con los que, como ciudadanos y ciudadanas, construimos continuamente y otorgamos valores a los espacios de la ciudad. Los invitamos a todos y todas a formar parte de este proyecto. <a target='_blank' href='https://github.com/jcarroyos/monumentosdb-front/issues'>Clic acá para más información</a>.</p></br></br>";


const Toggle = () => {
  const [show, toggleShow] = React.useState(false);

  return (
    <>
    <div className="icono-somos" onClick={() => toggleShow(!show)}>Nosotros</div>
    <div className="somos">{show && ReactHtmlParser(somos)}</div>
    </>
  )
}

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
                  height: 30,
                  width: 30,
                  backgroundImage: `url("../monumento.png")`,
                  backgroundSize: '30px'
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
        <Toggle />
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
