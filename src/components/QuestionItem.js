import React from "react"

function QuestionItem({ question, handleDeleteQuestion, handleChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question
  console.log({ question })
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ))

  // Delete Question - DELETE
  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        handleDeleteQuestion(question)
      })
  }

  // Change answer - PATCH
  const handleChangeClick = (e) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: e.target.selectedIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleChangeAnswer(data)
        console.log({ data })
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeClick}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  )
}

export default QuestionItem
