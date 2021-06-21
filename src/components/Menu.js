import React, { Component } from "react";
import Select from 'react-dropdown-select';

class Menu extends Component {
    onSelectChanged(value) {
        this.props.flyTo(value[0].lugares_monumento.llatitud, value[0].lugares_monumento.llongitud)
    }
    render() {
        const { listado } = this.props;
        return (
            <Select
                searchable={false}
                labelField="lugares_monumento.lnombrelugar"
                placeholder="Monumentos"
                valueField="id"
                dropdownPosition="auto"
                dropdownHeight="60hv"
                separator={true}
                options={listado}
                onChange={this.onSelectChanged.bind(this)}
            />
        )
    }
}

export default Menu;