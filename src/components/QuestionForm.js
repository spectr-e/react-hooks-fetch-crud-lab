import React, { useState, useEffect } from "react"

function QuestionForm({ setQuestions }) {
  const [answer1, setAnswer1] = useState("")
  const [answer2, setAnswer2] = useState("")
  const [answer3, setAnswer3] = useState("")
  const [answer4, setAnswer4] = useState("")

  const [answers, setAnswers] = useState([])

  const [formData, setFormData] = useState({
    prompt: "",
    answers: [],
    correctIndex: 0,
  })

  function handleChangeAnswer(e) {
    switch (e.target.name) {
      case "answer1":
        setAnswer1(() => e.target.value)
        break
      case "answer2":
        setAnswer2(() => e.target.value)
        break
      case "answer3":
        setAnswer3(() => e.target.value)
        break
      case "answer4":
        setAnswer4(e.target.value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    let run = true
    if (run) {
      setAnswers(() => [answer1, answer2, answer3, answer4])
    }
    return () => {
      run = false
    }
  }, [answer4])

  function handleChange(e) {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
      answers: answers,
    }))
  }
  // useEffect(() => {
  //   setFormData(() => ({
  //     ...formData,
  //     answer: answers,
  //   }))
  // }, [answers])

  function handleSubmit(event) {
    event.preventDefault()
    console.log({
      answers: answers,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      formData: formData,
    })

    post()
    setAnswer1("")
    setAnswer2("")
    setAnswer3("")
    setAnswer4("")
    setFormData({
      prompt: "",
      answers: [],
      correctIndex: 0,
    })
  }

  // POST /questions
  const post = () => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setQuestions(() => data))
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={answer1}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={answer2}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={answer3}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={answer4}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{answer1}</option>
            <option value="1">{answer2}</option>
            <option value="2">{answer3}</option>
            <option value="3">{answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  )
}

export default QuestionForm
