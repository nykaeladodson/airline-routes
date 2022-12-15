import React, { useState } from 'react';
import './App.css';
import data from './data.js'
import Table from './components/Table.jsx'
import Select from './components/Select.jsx'
import Map from './components/Map.jsx'

const App = () => {
  const PER_PAGE = 25
  const [routes, setRoutes] = useState(data.routes)
  const [filterOptions, setFilterOptions] = useState(data.routes
    .reduce((arr, route) => {
      if (!arr.includes(route.airline)) { 
        arr.push(route.airline)
      }
      return arr
    }, [])
    .map(route => data.getAirlineById(route)))

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return data.getAirlineById(value);
    } else if (property === 'src' || property === 'dest') {
      return data.getAirportByCode(value);
    }
  }

  const onSelectAirline = (airline) => {
    const filteredRoutes = data.routes.filter(route => data.getAirlineById(route.airline) === airline)
    setRoutes(filteredRoutes)
  }

  const handleFilterRoutes = (e) => {
    e.preventDefault()
    onSelectAirline(e.target.value)
  }

  const handleClearFilters = () => {
    setRoutes(data.routes)
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <Map 
        routes={routes} 
        airports={data.airports} 
      />
      <Select 
        options={filterOptions} 
        valueKey="id" 
        titleKey="name"
        allTitle="All Airlines" 
        value="" 
        onSelect={handleFilterRoutes} 
      />
      <button onClick={handleClearFilters}>Clear Filter</button>
      <section>
        <Table 
          className="routes-table" 
          columns={columns} 
          rows={routes} 
          format={formatValue} 
          perPage={PER_PAGE}
        />
      </section>
    </div>
  )
}

export default App;