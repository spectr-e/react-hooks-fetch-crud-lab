import React, { useState, useEffect } from "react"
import AdminNavBar from "./AdminNavBar"
import QuestionForm from "./QuestionForm"
import QuestionList from "./QuestionList"

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])

  // Fetch all questions - GET questions
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    // Effect
    fetchQuestions(signal)
    // Cleanup
    return () => {
      controller.abort()
    }
  }, [])
  const fetchQuestions = (signal) => {
    fetch("http://localhost:4000/questions", {
      signal: signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(() => setQuestions(data))
      })
      .catch((err) => console.log(err))
  }

  // Delete a question - DELETE /questions/:id
  const handleDeleteQuestion = (deletedQuest) => {
    const filteredQuestions = questions.filter(
      (question) => question.id !== deletedQuest.id
    )
    setQuestions(() => filteredQuestions)
  }

  // Update a question - PATCH /questions/:id
  const handleChangeAnswer = (updatedQuest) => {
    const updatedQuestsions = questions.map((question) => {
      if (question.id === updatedQuest.id) {
        return updatedQuest
      } else {
        return question
      }
    })
    setQuestions(() => updatedQuestsions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm setQuestions={setQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
          handleChangeAnswer={handleChangeAnswer}
        />
      )}
    </main>
  )
}
export default App
