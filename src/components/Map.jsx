import React from 'react'

const Map = ({ routes, airports }) => {
  const groups = routes.map(route => {
    const source = airports.filter(airport => airport.code === route.src)[0]
    const dest = airports.filter(airport => airport.code === route.dest)[0]
    const d = `M${source.long} ${source.lat} L ${dest.long} ${dest.lat}`;
    console.log(source, dest)

    return (
      <g key={route.airline + route.src + route.dest}>
        <circle className="source" cx={source.long} cy={source.lat}>
          <title>{source.name}</title>
        </circle> 
        <circle className="destination" cx={dest.long} cy={dest.lat}>
          <title>{dest.name}</title>
        </circle>
        <path d={d} />
      </g>
    )
  })

  return (
    <div>
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        {groups}
      </g>
    </svg>
  </div>
  )
}



export default Map