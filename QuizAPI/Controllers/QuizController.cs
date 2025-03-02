using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace QuizApp.Controllers
{
    [ApiController]
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly string _jsonFilePath = "quiz-data.json";

        [HttpGet]
        public IActionResult GetQuizzes()
        {
            if (!System.IO.File.Exists(_jsonFilePath))
                return NotFound(new { message = "Quiz data file not found." });

            var jsonData = System.IO.File.ReadAllText(_jsonFilePath);
            var quizzes = JsonConvert.DeserializeObject<Dictionary<string, List<Quiz>>>(jsonData);


            return Ok(quizzes);
        }
    }

    public class Quiz
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Question> Questions { get; set; }
    }

    public class Question
    {
        public string question { get; set; }
        public List<Answer> Answers { get; set; }
    }

    public class Answer
    {
        public string answer { get; set; }
        public bool isCorrect { get; set; }
    }

}
