import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageCircle, FiActivity, FiBook, FiUsers, FiCalendar, FiShield, 
  FiHeart, FiArrowRight, FiStar, FiChevronDown, FiChevronUp, FiMail, 
  FiCheck, FiTarget, FiThumbsUp, FiLock, FiChevronLeft, FiChevronRight,
  FiUserCheck, FiPenTool, FiSend
} from 'react-icons/fi';

// Custom Hook for Count-Up Animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const finalEnd = parseInt(String(end).replace(/[^0-9]/g, '')) || 0;
          if (start === finalEnd) {
            setCount(end);
            return;
          }

          const incrementTime = 16; // roughly 60fps
          const totalSteps = Math.ceil(duration / incrementTime);
          const increment = finalEnd / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= finalEnd) {
              setCount(finalEnd);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, incrementTime);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  // Handle non-numeric strings like '24/7'
  if (isNaN(parseInt(String(end).replace(/[^0-9]/g, '')))) {
    return <span ref={ref}>{end}</span>;
  }

  return <span ref={ref}>{count}</span>;
};


const Home = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- NEW --- Testimonial Carousel Logic
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Computer Science Student",
      avatar: "SM",
      content: "The AI chatbot helped me through a really tough semester. It's like having a supportive friend available 24/7.",
      rating: 5
    },
    {
      name: "Alex K.",
      role: "Psychology Major",
      avatar: "AK",
      content: "The peer support forum made me realize I'm not alone in my struggles. The community here is amazing.",
      rating: 5
    },
    {
      name: "Maria L.",
      role: "Engineering Student",
      avatar: "ML",
      content: "Booking a counselor was so easy, and the sessions have been incredibly helpful for managing my anxiety.",
      rating: 5
    },
    {
      name: "David P.",
      role: "Business Student",
      avatar: "DP",
      content: "The self-assessment tools gave me valuable insights into my mental state and helped me track my progress.",
      rating: 4
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextTestimonial, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);


  const faqs = [
    {
      question: "Is my information kept confidential?",
      answer: "Absolutely. We use end-to-end encryption and follow strict privacy protocols. Your conversations and data are completely confidential and anonymous if you choose."
    },
    {
      question: "How does the AI chatbot work?",
      answer: "Our AI chatbot is trained on evidence-based therapeutic techniques and can provide immediate support, coping strategies, and guidance. It's available 24/7 and can help with anxiety, stress, and other mental health concerns."
    },
    {
      question: "Can I really book a counselor for free?",
      answer: "Yes! Our counseling services are completely free for students. We have certified mental health professionals available for one-on-one sessions."
    },
    {
      question: "What if I need immediate help?",
      answer: "For immediate emergencies, call 911 or the Crisis Helpline at 988. Our AI chatbot can also provide immediate support and coping strategies while you wait for professional help."
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const features = [
    {
      icon: FiMessageCircle,
      title: 'AI-Guided Support',
      description: 'Get instant coping strategies and guidance from our intelligent chatbot available 24/7.',
      link: '/chatbot',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiActivity,
      title: 'Self-Assessment',
      description: 'Take confidential mental health screenings to understand your wellbeing.',
      link: '/screening',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiBook,
      title: 'Resource Hub',
      description: 'Access videos, guides, and exercises in your preferred language.',
      link: '/resources',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      title: 'Peer Support',
      description: 'Connect anonymously with fellow students in moderated forums.',
      link: '/forum',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiCalendar,
      title: 'Book Counselor',
      description: 'Schedule private appointments with certified campus counselors.',
      link: '/booking',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FiShield,
      title: 'Complete Privacy',
      description: 'Your data is encrypted and confidential. Anonymous support is available.',
      link: '#',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const stats = [
    { number: '1000', label: 'Students Supported', suffix: '+' },
    { number: '24/7', label: 'AI Support Available', suffix: '' },
    { number: '50', label: 'Counselors Connected', suffix: '+' },
    { number: '99', label: 'Privacy Protected', suffix: '%' }
  ];
  
  // --- NEW --- Data for new sections
  const whyChooseUsItems = [
    { icon: FiTarget, title: "Evidence-Based", description: "Our tools and resources are rooted in proven therapeutic methods like CBT." },
    { icon: FiThumbsUp, title: "Student-Focused", description: "Designed by and for students to address the unique pressures of college life." },
    { icon: FiLock, title: "Completely Confidential", description: "A safe space where your privacy is our top priority. Share without fear." }
  ];

  const howItWorksSteps = [
    { icon: FiUserCheck, title: "Take a Quick Assessment", description: "Start with a confidential self-assessment to understand your needs." },
    { icon: FiPenTool, title: "Explore Personalized Tools", description: "Get access to AI chat, resources, and forums tailored to you." },
    { icon: FiSend, title: "Connect with a Professional", description: "Easily book a session with a certified counselor when you're ready." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Professional logo/brand */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
              <FiHeart className="text-white text-2xl" />
            </div>
          </div>
          
          {/* Refined typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Mental Health
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              Matters
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive digital platform providing AI-guided support, peer connections, 
            and professional counseling services tailored for college students.
          </p>
          
          {/* Professional CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chatbot"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Instant Support
              <FiArrowRight className="ml-2" />
            </Link>
            
            <Link
              to="/screening"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 bg-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Take Self-Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A Safe Space for Students</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform is built on a foundation of trust, care, and understanding.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-blue-50 text-blue-600 mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-200">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {useCountUp(stat.number)}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need for Mental Wellness</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">A comprehensive support system designed to help you navigate the challenges of college life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link} className="group block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Learn More
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Started in 3 Simple Steps</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Your path to better mental wellness is just a few clicks away.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return(
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white shadow-lg mx-auto mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Students Are Saying</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Real stories from students who found support and healing through our platform.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="flex-shrink-0 w-full px-4">
                    <div className="bg-slate-50 rounded-lg p-8 text-center">
                      <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-blue-600 text-white font-semibold text-lg mb-6">
                        {testimonial.avatar}
                      </div>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-lg italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors">
              <FiChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors">
              <FiChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our mental health platform.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <div className={`transform transition-transform duration-200 ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                    <FiChevronDown className="text-gray-500 h-5 w-5" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFAQ === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-lg text-blue-100 mb-8">Get mental health tips, resources, and platform updates delivered to your inbox.</p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isSubscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                {isSubscribed ? (
                  <span className="flex items-center"><FiCheck className="inline mr-2" /> Subscribed!</span>
                ) : (
                  <span className="flex items-center"><FiMail className="inline mr-2" /> Subscribe</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Emergency & CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 rounded-lg p-8 border border-red-200 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Need Immediate Help?</h2>
            <p className="text-lg text-gray-600 mb-6">If you're experiencing a mental health emergency, please reach out now. You are not alone.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:911" className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Emergency: 911</a>
              <a href="tel:988" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Crisis Helpline: 988</a>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Take the First Step Today</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Your mental health journey starts here. We're ready to support you every step of the way.</p>
          <Link
            to="/screening"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Your Assessment
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;