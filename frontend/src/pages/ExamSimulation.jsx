import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { questionBanks } from '../data/questionBank';

const ExamSimulation = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours exam time
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('math'); // default subject: math
  const navigate = useNavigate();

  // Subject list
  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' }
  ];

  // Get all questions
  const getQuestions = (subject) => {
    return questionBanks[subject];
  };

  // Get questions based on selected subject
  const examQuestions = getQuestions(selectedSubject);

  // Add question navigation state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Jump to specific question
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    const element = document.getElementById(`question-${index + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Fullscreen mode change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Prevent window switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert('Warning: Do not switch windows, as it may be recorded as cheating behavior!');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error('Failed to enter fullscreen:', err);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    // TODO: Submit answers to backend
    console.log('Submitting answers:', answers);
    navigate('/student-dashboard');
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exam-simulation">
      <div className="exam-header">
        <div className="subject-selector">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-select"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="question-navigation">
          <select
            value={currentQuestionIndex}
            onChange={(e) => jumpToQuestion(Number(e.target.value))}
            className="question-select"
          >
            {examQuestions.map((_, index) => (
              <option key={index} value={index}>
                Question {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="timer">Time Remaining: {formatTime(timeLeft)}</div>
        {!isFullscreen && (
          <button onClick={enterFullscreen} className="fullscreen-btn">
            Enter Fullscreen Mode
          </button>
        )}
      </div>

      <div className="exam-content">
        {examQuestions.map((question, index) => (
          <div key={question.id} id={`question-${index + 1}`} className="question-container">
            <h3>Question {index + 1}</h3>
            <p>{question.question}</p>
            
            {question.type === 'multiple-choice' ? (
              <div className="options">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      checked={answers[question.id] === option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder="Enter your answer here..."
              />
            )}
          </div>
        ))}
      </div>

      <div className="exam-footer">
        <button onClick={handleSubmit} className="submit-btn">
          Submit Exam
        </button>
      </div>

      <style jsx>{`
        .exam-simulation {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .exam-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: #f5f5f5;
          margin-bottom: 20px;
          border-radius: 8px;
        }

        .subject-selector {
          margin-right: 20px;
        }

        .subject-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1em;
          background-color: white;
          cursor: pointer;
        }

        .subject-select:focus {
          outline: none;
          border-color: #1a73e8;
          box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
        }

        .timer {
          font-size: 1.2em;
          font-weight: bold;
          color: #333;
        }

        .question-container {
          background: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        textarea {
          width: 100%;
          min-height: 150px;
          padding: 10px;
          margin-top: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .exam-footer {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .submit-btn {
          padding: 10px 30px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.1em;
        }

        .submit-btn:hover {
          background-color: #1557b0;
        }

        .fullscreen-btn {
          padding: 8px 15px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .fullscreen-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default ExamSimulation;