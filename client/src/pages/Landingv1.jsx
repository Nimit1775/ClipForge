import { useState, useEffect } from "react";
import { Play, Edit, FastForward, ZapOff, ChevronRight, ArrowRight, X } from "lucide-react";

// Import EmailJS library
export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");
  const [activeFeature, setActiveFeature] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const features = [
    {
      icon: <Play className="text-purple-500" />,
      title: "Smart Clip Generation",
      description: "Our AI analyzes your content and identifies the most engaging moments automatically."
    },
    {
      icon: <Edit className="text-cyan-500" />,
      title: "Perfect Captions",
      description: "Context-aware subtitles that enhance viewer retention and accessibility."
    },
    {
      icon: <FastForward className="text-emerald-500" />,
      title: "Streamlined Workflow",
      description: "Cut editing time by 90% with our one-click optimization tools."
    },
    {
      icon: <ZapOff className="text-amber-500" />,
      title: "Zero Effort Required",
      description: "Upload once, get multiple platform-optimized clips delivered to your dashboard."
    }
  ];

  useEffect(() => {
    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize EmailJS with your user ID (you'll add this later)
      window.emailjs.init("1ggY8LRSu4amFw6vN");
    };
    
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Prepare template parameters
    const templateParams = {
      name: name,
      email: email,
      channel: channel || "Not provided"
    };
    
    // Send email using EmailJS
    window.emailjs.send(
      'service_2jaz1pp', // Replace with your service ID
      'template_9zh3f6e', // Replace with your template ID
      templateParams
    )
    .then(() => {
      setSubmitted(true);
      setLoading(false);
      // Optionally reset form
      setName("");
      setEmail("");
      setChannel("");
    }, (err) => {
      console.error('Failed to send email:', err);
      setError("Failed to submit. Please try again.");
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute w-64 h-64 rounded-full bg-purple-700/10 blur-3xl top-1/4 -left-32"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-700/10 blur-3xl bottom-1/4 -right-48"></div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="text-2xl">⚒️</div>
          <span className="font-bold text-xl">ClipForge</span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all"
        >
          Join Waitlist
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-4">
              ✨ Early Access Now Available
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Create viral <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">short-form</span> content instantly
            </h1>
            <p className="text-xl text-gray-300">
              Transform your long videos into algorithm-friendly clips that drive engagement, automatically and intelligently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
              >
                Get Early Access <ArrowRight size={18} />
              </button>
              
            </div>
          </div>
          
          {/* Interactive preview animation */}
          <div className="lg:w-1/2 relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-white/10">
              <div className="bg-gray-900 p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">clipforge.ai/dashboard</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚒️</span>
                    <h3 className="text-lg font-bold">Smart Clip Generator</h3>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Processing</span>
                </div>
                
                <div className="h-64 bg-black/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4">
                      {features[activeFeature].icon}
                    </div>
                    <h4 className="font-bold">{features[activeFeature].title}</h4>
                    <p className="text-sm text-gray-400 max-w-xs mt-2">{features[activeFeature].description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  {features.map((_, idx) => (
                    <button 
                      key={idx}
                      className={`w-full h-1 rounded-full ${idx === activeFeature ? 'bg-purple-500' : 'bg-gray-700'}`}
                      onClick={() => setActiveFeature(idx)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="text-3xl">⚒️</span>
            <h2 className="text-4xl font-bold">Create More Content with Less Effort</h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our advanced AI understands your content and automatically extracts the most engaging moments
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all hover:shadow-lg hover:shadow-purple-500/10 border border-white/10"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Trusted by Content Creators</h2>
            <p className="text-gray-300">Join hundreds of creators already saving hours on content production</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {["YouTube", "TikTok", "Instagram", "Twitch"].map((platform) => (
              <div key={platform} className="text-center opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-xl font-bold">{platform}</div>
                <div className="text-sm text-gray-400">Compatible</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Modal with EmailJS functionality */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚒️</span>
                <h3 className="font-bold text-xl">Join Early Access</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1">
                <X size={20} />
              </button>
            </div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Full Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Content Platform (optional)</label>
                  <input
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Your YouTube, TikTok, etc. profile URL"
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all mt-4 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>Processing <span className="animate-pulse">...</span></>
                  ) : (
                    <>Join Waitlist <ChevronRight size={18} /></>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p className="text-gray-300 mb-6">We'll be in touch soon with your exclusive access.</p>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="text-xl">⚒️</div>
            <span className="font-bold">ClipForge</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} ClipForge. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}