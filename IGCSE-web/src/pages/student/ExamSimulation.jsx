import React, { useState, useEffect } from 'react';

const ExamSimulation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [answers, setAnswers] = useState({});

  // Placeholder exam data - this would typically come from an API
  const examData = {
    title: "Sample IGCSE Exam",
    duration: 7200, // 2 hours in seconds
    questions: [
      {
        id: 1,
        text: "Sample question 1",
        options: ["Option A", "Option B", "Option C", "Option D"],
      },
      // Add more sample questions as needed
    ],
  };

  useEffect(() => {
    // Initialize timer when component mounts
    if (timeRemaining === null) {
      setTimeRemaining(examData.duration);
    }

    // Timer countdown
    const timer = timeRemaining > 0 && setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Exam Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{examData.title}</h1>
          <div className="text-xl font-mono">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestion + 1} of {examData.questions.length}
          </h2>
          <p className="text-gray-800 mb-4">{examData.questions[currentQuestion]?.text}</p>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {examData.questions[currentQuestion]?.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[examData.questions[currentQuestion]?.id] === option}
                  onChange={() => handleAnswerSelect(examData.questions[currentQuestion]?.id, option)}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(examData.questions.length - 1, prev + 1))}
            disabled={currentQuestion === examData.questions.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamSimulation; 