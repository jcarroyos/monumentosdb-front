import './App.scss';
import React, { Component } from "react";
import axios from 'axios';
import Map from "./components/Map";

const initialState = {
  monumentos_data: [],
  data_loaded: false,
  fields: ["htitulo", "mtipo", "hfecha", "id"]
};

class App extends Component {
  // State of your application
  state = initialState;

  // Fetch your monumentos immediately after the component is mounted
  componentDidMount() {
    this.fetchMonumentosData();
  }

  fetchMonumentosData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://monumentosdb.herokuapp.com/monumentos",
        
      });
      console.log(response)
      // console.table(response.data.data);
      const monumentos_data = this.processData(response.data);

      this.setState({
        monumentos_data,
        data_loaded: true,
      });
    } catch (e) {
      console.log("no es posible conectar con la fuente de datos", e);
    }
  };

  processData = (data) => {
    let processed = [];

    for (const d of data) {
      let obj = {
        htitulo: d.htitulo,
        id: d.id
      };

    // Patch for countries' coordinates 
      obj['coordenadas'] = {
        latitude: d.mlatitud,
        longitude: d.mlognitud
      }

      processed.push(obj);
    }

    return processed;
  };

  handleSetQuery = (query) => {
    this.setState({
      query,
    });
  };
  render() {
    const { monumentos_data, data_loaded, fields } = this.state;

    return data_loaded ? (
      <div className="root">
        <ol className="listado">
          {this.state.monumentos_data.map(m => (
            <li className="texto" key={m.id}>{m.htitulo}</li>
          ))}
        </ol>
        <Map
          data={monumentos_data}
          fields={fields}
        />
      </div>
    ) : null;
  }
}

export default App;