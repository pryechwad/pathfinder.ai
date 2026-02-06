import { Calendar, CheckCircle, Lock, ArrowRight } from 'lucide-react';

const MonthlyAssessment = () => {
  const months = [
    { id: 1, month: 'Month 1', title: 'Foundation Skills', status: 'completed', score: 85 },
    { id: 2, month: 'Month 2', title: 'Core Concepts', status: 'completed', score: 78 },
    { id: 3, month: 'Month 3', title: 'Advanced Topics', status: 'in-progress', score: null },
    { id: 4, month: 'Month 4', title: 'Practical Applications', status: 'locked', score: null },
    { id: 5, month: 'Month 5', title: 'Project Work', status: 'locked', score: null },
    { id: 6, month: 'Month 6', title: 'Mid-Term Assessment', status: 'locked', score: null },
    { id: 7, month: 'Month 7', title: 'Specialization', status: 'locked', score: null },
    { id: 8, month: 'Month 8', title: 'Industry Projects', status: 'locked', score: null },
    { id: 9, month: 'Month 9', title: 'Advanced Skills', status: 'locked', score: null },
    { id: 10, month: 'Month 10', title: 'Portfolio Building', status: 'locked', score: null },
    { id: 11, month: 'Month 11', title: 'Interview Prep', status: 'locked', score: null },
    { id: 12, month: 'Month 12', title: 'Final Assessment', status: 'locked', score: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            12-Month Odyssey Track
          </h1>
          <p className="text-gray-600 text-lg">
            A sequential growth journey designed for Classes 8-12
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all ${
                item.status === 'locked' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">{item.month}</span>
                {item.status === 'completed' && (
                  <CheckCircle className="text-green-500" size={24} />
                )}
                {item.status === 'in-progress' && (
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {item.status === 'locked' && <Lock className="text-gray-400" size={24} />}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>

              {item.score && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Score</span>
                    <span className="font-bold text-blue-600">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              )}

              {item.status === 'in-progress' && (
                <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyAssessment;
