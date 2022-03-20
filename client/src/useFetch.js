import { useEffect, useState } from 'react'

export const useFetch = (URL) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL)
      const resText = await res.text()
      setData(resText)
      setLoading(false)
    }
    getData()
  })
  return {
    data,
    loading,
  }
}
