import React, { useState } from 'react'
import './HomeScreen.css'
import { DataDisplay } from '../components/DataDisplay'
import { DataStructureMenu } from '../components/DataStructureMenu'
import { OperationMenu } from '../components/OperationMenu'
import { useFetch } from '../useFetch'

export const HomeScreen = () => {
  // Use state Hooks to preserve the values of specific variables through re-renders
  const [dataStructure, setDataStructure] = useState('')
  const [loadedData, setLoadedData] = useState(false)
  const [displayData, setDisplayData] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Fetch data from the CSV file in the public folder
  const { data, loading } = useFetch('eBid_Monthly_Sales_Dec_2016.csv')

  // Body components consist of a menu to select data structures
  // Once the data structure is selected, the operation menu and data display components are rendered
  return (
    <>
      {!dataStructure ? (
        <DataStructureMenu setDataStructure={setDataStructure} />
      ) : (
        <div className="body-container">
          <OperationMenu
            data={data}
            loading={loading}
            dataStructure={dataStructure}
            setDataStructure={setDataStructure}
            loadedData={loadedData}
            setLoadedData={setLoadedData}
            setDisplayData={setDisplayData}
            setTimeElapsed={setTimeElapsed}
          />
          <DataDisplay
            loadedData={loadedData}
            displayData={displayData}
            timeElapsed={timeElapsed}
          />
        </div>
      )}
    </>
  )
}
