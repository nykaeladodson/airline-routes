import React from 'react'


const Select = ( {options, onSelect}) => { 
  return (
    <div>
      <select onChange={onSelect}>
      {options.map(option => {
        return (
          <option key={option}>{option}</option>
        )
      })}
      </select>
    </div>
  )
}

export default Select;