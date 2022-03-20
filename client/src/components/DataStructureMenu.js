import React from 'react'
import './DataStructureMenu.css'

export const DataStructureMenu = ({ setDataStructure }) => {
  const dataStructures = [
    'Array',
    'Linked List',
    'Hash Table',
    'Binary Search Tree',
  ]

  // Menu for the user to select a data structure from the options
  return (
    <div className="data-structure-menu">
      <div>
        <div className="ds-menu-prompt">SELECT A DATA STRUCTURE</div>
        {dataStructures.map((ds) => (
          <div
            key={ds}
            className="data-structure-button"
            onClick={() => setDataStructure(`${ds}`)}
          >
            {ds}
          </div>
        ))}
      </div>
    </div>
  )
}
