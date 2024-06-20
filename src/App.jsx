import { createContext, useState, useId } from "react"

import { BrowserRouter } from "react-router-dom"

import Main from "./layouts/Main"

import './style.css'
import './media.css'

export const AppContext = createContext();

function App() {
  const [wordsLastId, setWordsLastId] = useState(0)

  const [words, setWords] = useState([]);



  return (
    <>
      <AppContext.Provider value={{words, setWords, wordsLastId, setWordsLastId}}>
      <BrowserRouter>
      <Main />
      </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
