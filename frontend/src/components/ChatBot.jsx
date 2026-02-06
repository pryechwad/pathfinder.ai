import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const conversationFlow = [
    {
      bot: "👋 Hi! Welcome to PathFinder! I'm here to help you discover your perfect career path.",
      options: ['Get Started', 'Learn More']
    },
    {
      bot: "Great! What's your name?",
      type: 'input'
    },
    {
      bot: "Nice to meet you, {name}! 😊 What grade are you currently in?",
      options: ['8th', '9th', '10th', '11th', '12th', 'College']
    },
    {
      bot: "Awesome! What are you most interested in?",
      options: ['Technology', 'Business', 'Creative Arts', 'Science', 'Other']
    },
    {
      bot: "Perfect! Would you like to explore career paths or take an aptitude test?",
      options: ['Career Paths', 'Aptitude Test', 'Both']
    },
    {
      bot: "Excellent choice! 🎉 Can you share your email or phone number so our team can reach out to you?",
      type: 'input'
    },
    {
      bot: "Thank you so much! 🙏 Our team will contact you soon with personalized recommendations. Have a great day!",
      final: true
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(conversationFlow[0]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (step) => {
    const botText = step.bot.replace('{name}', messages.find(m => m.userName)?.userName || '');
    setMessages(prev => [...prev, { text: botText, sender: 'bot', options: step.options, type: step.type, final: step.final }]);
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { text: option, sender: 'user' }]);
    
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < conversationFlow.length) {
        setCurrentStep(nextStep);
        addBotMessage(conversationFlow[nextStep]);
      }
    }, 800);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userName = currentStep === 1 ? userInput : undefined;
    setMessages(prev => [...prev, { text: userInput, sender: 'user', userName }]);
    setUserInput('');

    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < conversationFlow.length) {
        setCurrentStep(nextStep);
        addBotMessage(conversationFlow[nextStep]);
      }
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 animate-bounce"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">PathFinder Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Options */}
                {msg.options && msg.sender === 'bot' && idx === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-2">
                    {msg.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(option)}
                        className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {messages.length > 0 && 
           messages[messages.length - 1].type === 'input' && 
           !messages[messages.length - 1].final && (
            <form onSubmit={handleInputSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
