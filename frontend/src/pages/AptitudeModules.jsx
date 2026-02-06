import { Brain, Target, Lightbulb, Users, TrendingUp, Award, ArrowRight, X, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const AptitudeModules = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const modules = [
    {
      id: 1,
      title: 'Logical Reasoning',
      description: 'Test your analytical and problem-solving abilities',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      duration: '30 mins',
      questions: 25,
      completed: true,
      score: 82
    },
    {
      id: 2,
      title: 'Verbal Ability',
      description: 'Assess your language and communication skills',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
      duration: '25 mins',
      questions: 20,
      completed: true,
      score: 75
    },
    {
      id: 3,
      title: 'Quantitative Aptitude',
      description: 'Evaluate your mathematical and numerical skills',
      icon: Target,
      color: 'from-green-500 to-teal-500',
      duration: '35 mins',
      questions: 30,
      completed: false,
      score: null
    },
    {
      id: 4,
      title: 'Personality Assessment',
      description: 'Discover your strengths and work preferences',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      duration: '20 mins',
      questions: 40,
      completed: false,
      score: null
    },
    {
      id: 5,
      title: 'Career Interest',
      description: 'Identify careers that match your interests',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      duration: '15 mins',
      questions: 30,
      completed: false,
      score: null
    },
    {
      id: 6,
      title: 'Skill Assessment',
      description: 'Measure your technical and soft skills',
      icon: Award,
      color: 'from-indigo-500 to-purple-500',
      duration: '40 mins',
      questions: 35,
      completed: false,
      score: null
    }
  ];

  const questions = {
    1: [
      { id: 1, question: 'If A is taller than B, and B is taller than C, who is the shortest?', options: ['A', 'B', 'C', 'Cannot determine'], correct: 2 },
      { id: 2, question: 'What comes next in the series: 2, 4, 8, 16, ?', options: ['20', '24', '32', '64'], correct: 2 },
      { id: 3, question: 'If all roses are flowers and some flowers fade quickly, then:', options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'All flowers are roses'], correct: 1 },
      { id: 4, question: 'Complete the pattern: A, C, E, G, ?', options: ['H', 'I', 'J', 'K'], correct: 1 },
      { id: 5, question: 'If 5 workers can complete a task in 10 days, how many days will 10 workers take?', options: ['5 days', '10 days', '15 days', '20 days'], correct: 0 }
    ],
    2: [
      { id: 1, question: 'Choose the word most similar to "Happy":', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1 },
      { id: 2, question: 'What is the antonym of "Brave"?', options: ['Courageous', 'Fearless', 'Cowardly', 'Bold'], correct: 2 },
      { id: 3, question: 'Complete the sentence: She is good ___ mathematics.', options: ['in', 'at', 'on', 'with'], correct: 1 },
      { id: 4, question: 'Identify the correctly spelled word:', options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'], correct: 1 },
      { id: 5, question: 'Choose the correct sentence:', options: ['He don\'t like coffee', 'He doesn\'t likes coffee', 'He doesn\'t like coffee', 'He not like coffee'], correct: 2 }
    ],
    3: [
      { id: 1, question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correct: 2 },
      { id: 2, question: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], correct: 2 },
      { id: 3, question: 'What is the area of a rectangle with length 8 and width 5?', options: ['13', '26', '40', '80'], correct: 2 },
      { id: 4, question: 'Solve: 3 × (4 + 2) = ?', options: ['14', '18', '20', '24'], correct: 1 },
      { id: 5, question: 'What is the average of 10, 20, and 30?', options: ['15', '20', '25', '30'], correct: 1 }
    ],
    4: [
      { id: 1, question: 'I prefer working:', options: ['Alone', 'In a team', 'Depends on task', 'No preference'], correct: -1 },
      { id: 2, question: 'When facing a problem, I:', options: ['Analyze logically', 'Trust my intuition', 'Ask for help', 'Try different solutions'], correct: -1 },
      { id: 3, question: 'I feel energized when:', options: ['Meeting new people', 'Working on projects', 'Helping others', 'Learning new things'], correct: -1 },
      { id: 4, question: 'My ideal work environment is:', options: ['Fast-paced', 'Structured', 'Creative', 'Flexible'], correct: -1 },
      { id: 5, question: 'I make decisions based on:', options: ['Facts and data', 'Personal values', 'Others\' opinions', 'Past experience'], correct: -1 }
    ],
    5: [
      { id: 1, question: 'Which field interests you most?', options: ['Technology', 'Healthcare', 'Business', 'Arts'], correct: -1 },
      { id: 2, question: 'I enjoy activities that involve:', options: ['Problem solving', 'Creativity', 'Helping people', 'Leadership'], correct: -1 },
      { id: 3, question: 'My dream job would be:', options: ['Innovative', 'Stable', 'Impactful', 'Challenging'], correct: -1 },
      { id: 4, question: 'I prefer tasks that are:', options: ['Analytical', 'Creative', 'Social', 'Practical'], correct: -1 },
      { id: 5, question: 'Work-life balance is:', options: ['Very important', 'Important', 'Somewhat important', 'Not a priority'], correct: -1 }
    ],
    6: [
      { id: 1, question: 'Rate your communication skills:', options: ['Excellent', 'Good', 'Average', 'Need improvement'], correct: -1 },
      { id: 2, question: 'How comfortable are you with public speaking?', options: ['Very comfortable', 'Comfortable', 'Somewhat comfortable', 'Not comfortable'], correct: -1 },
      { id: 3, question: 'Your problem-solving ability is:', options: ['Excellent', 'Good', 'Average', 'Developing'], correct: -1 },
      { id: 4, question: 'How well do you handle stress?', options: ['Very well', 'Well', 'Moderately', 'Struggle'], correct: -1 },
      { id: 5, question: 'Your time management skills are:', options: ['Excellent', 'Good', 'Average', 'Need work'], correct: -1 }
    ]
  };

  const handleStartTest = (moduleId) => {
    setSelectedTest(moduleId);
    setAnswers({});
    setSubmitted(false);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    const testQuestions = questions[selectedTest];
    let correct = 0;
    testQuestions.forEach(q => {
      if (q.correct !== -1 && answers[q.id] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / testQuestions.filter(q => q.correct !== -1).length) * 100);
  };

  if (selectedTest) {
    const testQuestions = questions[selectedTest];
    const module = modules.find(m => m.id === selectedTest);

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
            <button
              onClick={() => setSelectedTest(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <X size={20} /> Close
            </button>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              {testQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {idx + 1}. {q.question}
                  </h3>
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          answers[q.id] === optIdx
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          checked={answers[q.id] === optIdx}
                          onChange={() => handleAnswerSelect(q.id, optIdx)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== testQuestions.length}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Test
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Completed!</h2>
              {module.id <= 3 ? (
                <>
                  <p className="text-xl text-gray-600 mb-6">Your Score: {calculateScore()}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                      style={{ width: `${calculateScore()}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-xl text-gray-600 mb-6">Thank you for completing the assessment!</p>
              )}
              <button
                onClick={() => setSelectedTest(null)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Back to Modules
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Aptitude Modules
          </h1>
          <p className="text-gray-600 text-lg">
            Scientific evaluations to unlock your comprehensive Master Blueprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`h-32 bg-gradient-to-r ${module.color} flex items-center justify-center relative`}>
                <module.icon className="text-white" size={48} />
                {module.completed && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white font-semibold text-sm">{module.score}%</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                <p className="text-gray-600 text-sm">{module.description}</p>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{module.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Questions</p>
                    <p className="font-semibold text-gray-900">{module.questions}</p>
                  </div>
                </div>

                {module.completed ? (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${module.color} h-2 rounded-full`}
                        style={{ width: `${module.score}%` }}
                      />
                    </div>
                    <button 
                      onClick={() => handleStartTest(module.id)}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      Retake Test
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleStartTest(module.id)}
                    className={`w-full bg-gradient-to-r ${module.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                  >
                    Start Test <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AptitudeModules;
