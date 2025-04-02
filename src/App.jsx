import { useState, useEffect, useMemo, memo } from "react"

import AppCard from "./component/AppCard"

function App() {

  const [politicians, setPoliticians] = useState([])
  const [filter, setFilter] = useState("")
  const filteredPoliticians = useMemo(() => {
    if (filter === "") return []
    const newData = politicians.filter(curElem => curElem.name.toLowerCase().includes(filter.toLowerCase()) || curElem.biography.toLowerCase().includes(filter.toLowerCase()))
    return newData
  }, [filter])

  //useEffect che al mounting della pagina prende i politici
  useEffect(() => {
    //chiamata al server asincrona immediatamente invocata
    (async () => {

      //porzione di codice a rischio che fa la chiamata per salvare i dati 
      try {

        const promiceData = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`)
        const data = await promiceData.json()
        console.log(data);

        setPoliticians(data)

      } catch (err) {
        console.error(`errore nel caricamento dei politici`, err)
      }

    })()

  }, [])

  return (
    <>
      <div className="container">
        <h1 className="text-center ">I politici:</h1>
        <div className="my-3">
          <label htmlFor="" className="form-control text-center">cerca per</label>
          <input type="text" name="" id="" className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        {/* faccio in modo che carichi le card solo quando l'array è popolato */}
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4">
          {
            politicians.length > 0 && filteredPoliticians.length === 0 ?
              politicians.map((curElem, index) => <AppCard politici={curElem} key={index} />) :
              !filteredPoliticians.length > 0 && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          }
          {
            filteredPoliticians.length > 0 || politicians.length > 0 ?
              filteredPoliticians.map((curElem, index) => <AppCard politici={curElem} key={index} />) :
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
