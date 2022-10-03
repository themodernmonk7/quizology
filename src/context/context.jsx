import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

const AppContext = React.createContext()

const API_ENDPOINT = `https://opentdb.com/api.php?`

const url = ""
// Reference URL
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  //Fetch questions from API
  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(error))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
    setLoading(false)
    setWaiting(false)
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        // show modal
        return 0
      } else {
        return index
      }
    })
  }

  useEffect(() => {
    fetchQuestions(tempUrl)
  }, [])

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        nextQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
