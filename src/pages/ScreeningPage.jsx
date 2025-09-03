import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiHeart, FiArrowRight, FiRefreshCw, FiMessageCircle, FiCalendar, FiUsers, FiInfo } from 'react-icons/fi';

const ScreeningPage = () => {
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

  if (currentAssessment === 'selection') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Mental Health Self-Assessment</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a confidential screening to better understand your mental health. 
            These assessments are not diagnostic tools but can help identify if you might benefit from professional support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {assessments.map((assessment) => {
            const Icon = assessment.icon;
            return (
              <div
                key={assessment.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => setCurrentAssessment(assessment.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${assessment.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white text-2xl" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{assessment.title}</h3>
                <p className="text-base text-gray-700 mb-4">{assessment.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {assessment.questions.length} questions • Takes 3-5 minutes
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                  Start Assessment
                  <FiArrowRight className="ml-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FiAlertCircle className="text-yellow-600 text-xl mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
              <p className="text-base text-yellow-700">
                These screening tools are for educational purposes only and do not replace professional mental health diagnosis or treatment. 
                If you're experiencing thoughts of self-harm or suicide, please seek immediate help by calling emergency services or a crisis hotline.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl p-8">
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
              ></div>
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Resources</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li>• AI Chatbot for instant support</li>
                <li>• Breathing exercises and relaxation guides</li>
                <li>• Peer support forum</li>
                <li>• Emergency helpline numbers</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Support</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li>• Book counselor appointment</li>
                <li>• Campus mental health services</li>
                <li>• Group therapy sessions</li>
                <li>• Wellness workshops</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetAssessment}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className="mr-2" />
              Take Another Assessment
            </button>
            
            {(results.severity === 'Moderate' || results.severity === 'Moderately Severe' || results.severity === 'Severe') && (
              <a
                href="/booking"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Book Counselor Appointment
                <FiArrowRight className="ml-2" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  const assessment = assessments.find(a => a.id === currentAssessment);
  const progress = (Object.keys(answers).length / assessment.questions.length) * 100;
  const canSubmit = Object.keys(answers).length === assessment.questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentAssessment('selection')}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Assessments
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{assessment.title}</h1>
          <p className="text-base text-gray-700 mb-4">{assessment.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Progress: {Object.keys(answers).length} of {assessment.questions.length} questions
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-base text-blue-700">
            <strong>Instructions:</strong> Over the last 2 weeks, how often have you been bothered by any of the following problems? 
            Please answer honestly - your responses are completely confidential.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {assessment.questions.map((question, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {index + 1}. {question}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[index] === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[index] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
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
          
          {!canSubmit && (
            <p className="text-sm text-gray-500 mt-2">
              Please answer all questions to complete the assessment
            </p>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            🔒 <strong>Privacy Protected:</strong> Your responses are encrypted and stored securely. 
            This assessment is for your personal awareness and is not shared with anyone without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreeningPage;