import { useEffect, useState } from "react";

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:44357/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data.movieQuiz || []); // Ensure it sets an array
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (selectedQuiz && nextQuestion < selectedQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) return <div>Loading...</div>; // Show a loading message

  return (
    <div className="p-4 max-w-md mx-auto">
      {!selectedQuiz ? (
        <div>
          <h1 className="text-xl font-bold">Select a Quiz</h1>
          {quizzes.length === 0 ? (
            <p>No quizzes available.</p>
          ) : (
            quizzes.map((quiz) => (
              <button
                key={quiz.id}
                className="block w-full p-2 my-2 bg-blue-500 text-white rounded"
                onClick={() => setSelectedQuiz(quiz)}
              >
                {quiz.name}
              </button>
            ))
          )}
        </div>
      ) : showScore ? (
        <div>
          <h2 className="text-xl font-bold">
            Your Score: {score}/{selectedQuiz.questions?.length}
          </h2>
          <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={() => window.location.reload()}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
            <>
              <h2 className="text-xl font-bold">
                {selectedQuiz.questions[currentQuestion].question}
              </h2>
              {selectedQuiz.questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className="block w-full p-2 my-2 bg-gray-200 rounded"
                  onClick={() => handleAnswerClick(answer.isCorrect)}
                >
                  {answer.answer}
                </button>
              ))}
            </>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      )}
    </div>
  );
}
