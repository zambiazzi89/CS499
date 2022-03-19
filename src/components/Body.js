import React, { useState } from 'react'
import './Body.css'
import { DataDisplay } from './DataDisplay'
import { DataStructureMenu } from './DataStructureMenu'
import { OperationMenu } from './OperationMenu'
import { useFetch } from '../useFetch'

export const Body = () => {
  const [dataStructure, setDataStructure] = useState('')
  const [loadedData, setLoadedData] = useState(false)
  const [displayData, setDisplayData] = useState('')
  const [errorData, setErrorData] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)

  const { data, loading } = useFetch('eBid_Monthly_Sales_Dec_2016.csv')

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
            setErrorData={setErrorData}
            setTimeElapsed={setTimeElapsed}
          />
          <DataDisplay
            loadedData={loadedData}
            displayData={displayData}
            errorData={errorData}
            timeElapsed={timeElapsed}
          />
        </div>
      )}
    </>
  )
}
