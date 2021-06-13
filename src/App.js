import React, { Component } from "react";
import axios from 'axios';
import Map from "./components/Map";

// estilos
import './App.scss';


const initialState = {
  monumentos_data: [],
  data_loaded: false,
  fields: ["htitulo", "mtipo", "hfecha", "id", "img_monumento"]
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
      const monumentos_data = response.data;
      this.setState({
        monumentos_data,
        data_loaded: true,
      });
    } catch (e) {
      console.log("no es posible conectar con la fuente de datos", e);
    }
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
          <h1>monumentosdb</h1>
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