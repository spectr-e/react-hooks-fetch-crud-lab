import React from "react"
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, handleDeleteQuestion, handleChangeAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* GET \questions */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            handleDeleteQuestion={handleDeleteQuestion}
            handleChangeAnswer={handleChangeAnswer}
          />
        ))}
      </ul>
    </section>
  )
}

export default QuestionList
