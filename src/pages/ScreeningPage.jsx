import React, { useState } from 'react';
import { 
  FiCheckCircle, FiAlertCircle, FiHeart, FiArrowRight, FiRefreshCw,
  FiBell, FiSettings 
} from 'react-icons/fi';

const ScreeningPage = () => {
  const [userStats] = useState({ name: "Student" });
  const [notifications] = useState([
    { id: 1, read: false, message: "Welcome to your dashboard!" }
  ]);

  const [currentAssessment, setCurrentAssessment] = useState('selection');
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const assessments = [
    {
      id: 'phq9',
      title: 'Depression Screening (PHQ-9)',
      description: 'Assess symptoms of depression over the past 2 weeks',
      icon: FiHeart,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself or that you are a failure',
        'Trouble concentrating on things',
        'Moving or speaking slowly, or being fidgety/restless',
        'Thoughts that you would be better off dead'
      ]
    },
    {
      id: 'gad7',
      title: 'Anxiety Screening (GAD-7)',
      description: 'Evaluate anxiety symptoms over the past 2 weeks',
      icon: FiAlertCircle,
      color: 'from-green-500 to-emerald-500',
      questions: [
        'Feeling nervous, anxious, or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid, as if something awful might happen'
      ]
    }
  ];

  const responseOptions = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' }
  ];

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const calculateResults = () => {
    const assessment = assessments.find(a => a.id === currentAssessment);
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    
    let severity, recommendation, color;
    
    if (currentAssessment === 'phq9') {
      if (totalScore <= 4) {
        severity = 'Minimal';
        recommendation = 'Your depression symptoms are minimal. Continue practicing self-care and healthy habits.';
        color = 'text-green-600';
      } else if (totalScore <= 9) {
        severity = 'Mild';
        recommendation = 'You may be experiencing mild depression. Consider talking to a counselor or trying our self-help resources.';
        color = 'text-yellow-600';
      } else if (totalScore <= 14) {
        severity = 'Moderate';
        recommendation = 'Your symptoms suggest moderate depression. I recommend scheduling an appointment with a counselor.';
        color = 'text-orange-600';
      } else if (totalScore <= 19) {
        severity = 'Moderately Severe';
        recommendation = 'Your symptoms indicate moderately severe depression. Please consider professional help immediately.';
        color = 'text-red-600';
      } else {
        severity = 'Severe';
        recommendation = 'Your symptoms suggest severe depression. Please seek immediate professional help.';
        color = 'text-red-700';
      }
    } else if (currentAssessment === 'gad7') {
      if (totalScore <= 4) {
        severity = 'Minimal';
        recommendation = 'Your anxiety levels appear minimal. Keep up your current coping strategies.';
        color = 'text-green-600';
      } else if (totalScore <= 9) {
        severity = 'Mild';
        recommendation = 'You may be experiencing mild anxiety. Consider stress management techniques and our resource hub.';
        color = 'text-yellow-600';
      } else if (totalScore <= 14) {
        severity = 'Moderate';
        recommendation = 'Your anxiety symptoms are moderate. I recommend speaking with a mental health professional.';
        color = 'text-orange-600';
      } else {
        severity = 'Severe';
        recommendation = 'Your anxiety symptoms are severe. Please consider seeking professional help soon.';
        color = 'text-red-600';
      }
    }

    setResults({
      score: totalScore,
      maxScore: assessment.questions.length * 3,
      severity,
      recommendation,
      color,
      assessmentTitle: assessment.title
    });
  };

  const resetAssessment = () => {
    setCurrentAssessment('selection');
    setAnswers({});
    setResults(null);
  };

  // -------------------- UI Rendering --------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <FiHeart className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {userStats.name}!
              </h1>
              <p className="text-sm text-gray-500">Here’s your mental health overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <FiBell className="text-lg" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <FiSettings className="text-lg" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Selection View */}
        {currentAssessment === 'selection' && !results && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Mental Health Self-Assessment
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Take a confidential screening to better understand your mental health.
                These assessments are not diagnostic tools but can help identify
                if you might benefit from professional support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {assessments.map((assessment) => {
                const Icon = assessment.icon;
                return (
                  <div
                    key={assessment.id}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 group"
                    onClick={() => setCurrentAssessment(assessment.id)}
                  >
                    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${assessment.color} shadow-lg`}></div>
                      <Icon className="relative text-white text-4xl z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                      {assessment.title}
                    </h3>
                    <p className="text-base text-gray-700 mb-4">{assessment.description}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {assessment.questions.length} questions • Takes 3-5 minutes
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                      <span className="group-hover:animate-pulse">Start Assessment</span>
                      <FiArrowRight className="ml-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results View */}
        {results && (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete</h1>
              <p className="text-base text-gray-600">{results.assessmentTitle}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-700">Your Score:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {results.score} / {results.maxScore}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(results.score / results.maxScore) * 100}%` }}
                />
              </div>
              <div className="text-center">
                <span className={`text-lg font-semibold ${results.color}`}>
                  {results.severity}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Recommendations</h3>
              <p className="text-base text-blue-700">{results.recommendation}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetAssessment}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
              >
                <FiRefreshCw className="mr-2" />
                Take Another Assessment
              </button>
            </div>
          </div>
        )}

        {/* Assessment In Progress */}
        {!results && currentAssessment !== 'selection' && (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl">
            {(() => {
              const assessment = assessments.find((a) => a.id === currentAssessment);
              const progress = (Object.keys(answers).length / assessment.questions.length) * 100;
              const canSubmit = Object.keys(answers).length === assessment.questions.length;
              return (
                <>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{assessment.title}</h1>
                  <p className="text-base text-gray-700 mb-4">{assessment.description}</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">
                    {assessment.questions.map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {index + 1}. {question}
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {responseOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                answers[index] === option.value
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={option.value}
                                checked={answers[index] === option.value}
                                onChange={() => handleAnswerChange(index, option.value)}
                                className="sr-only"
                              />
                              <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={calculateResults}
                      disabled={!canSubmit}
                      className={`inline-flex items-center px-8 py-3 font-semibold rounded-md transition-all duration-200 ${
                        canSubmit
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Complete Assessment
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningPage;
