import { createContext, useState } from "react"

import { Routes, Route } from "react-router-dom"

import Home from "../components/page/Home"
import Other from "../components/page/Other"

export const MainContext = createContext();

function Main() {
  // const [data] = useState([]);
  let [data, setData] = useState([]);

  const getData = () => {
    data = [
        {id: id, word: '', translation: ''},
      ]
    setData([...data])
  }
    return (
      <MainContext.Provider value={data}>
        <main className="main">
        
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/other" element={<Other />}/>

      </Routes>
      </main>
       </MainContext.Provider>
    )
  }
  
  export default Main
  