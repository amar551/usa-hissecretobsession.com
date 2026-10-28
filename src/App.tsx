import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, Star, ShoppingCart, ChevronDown, ChevronUp, Award, Clock, ShieldCheck, 
  BookOpen, Heart, Sparkles, MessageCircle, ArrowRight, X, Play, Headphones, HelpCircle, User, MapPin, ExternalLink
} from 'lucide-react';

const AFFILIATE_URL = 'https://63705x0-brhc0pwflhu6ippger.hop.clickbank.net/?cbpage=7';

const STEP_ITEMS = [
  { step: 1, title: 'Get Instant Access to Your His Secret Obsession Program', desc: 'After completing your order on the official website, you receive immediate digital access to the complete program, including the guide, bonus workbook, and audio version.' },
  { step: 2, title: 'Learn the Hero Instinct', desc: 'The first part introduces the Hero Instinct — the natural psychological drive in every man to feel valued, needed, and essential to the woman he loves.' },
  { step: 3, title: 'Apply the Signals and Phrases', desc: 'Discover specific techniques developed by James Bauer including the 12-Word Text, Glimpse Phrase, Fascination Signal, and more.' },
  { step: 4, title: 'Watch the Relationship Transform', desc: 'With consistent use, most women notice changes in their partner’s behavior within days — more attentive communication, excitement, and emotional connection.' }
];

const FAQ_ITEMS = [
  { q: 'What exactly is His Secret Obsession?', a: 'His Secret Obsession is a relationship program by James Bauer, built on more than 12 years of research in male psychology. The core focus is helping women tap into the Hero Instinct.' },
  { q: 'Who is James Bauer?', a: 'James Bauer is the creator of His Secret Obsession and a respected relationship coach with over a decade of experience helping women around the world.' },
  { q: 'What is the Hero Instinct?', a: 'The Hero Instinct is a man’s deep, innate drive to feel needed, respected, and essential to the woman he loves. Activating it leads to stronger emotional connection.' },
  { q: 'Is His Secret Obsession easy to follow?', a: 'Yes. It is written in clear, simple language with real-life examples on nearly every page. No background in psychology is required.' },
  { q: 'Will it work for long-term relationships?', a: 'Absolutely. Whether you are in a brand-new relationship or a long-term marriage, the Hero Instinct techniques are designed to help reconnect and strengthen attraction.' },
  { q: 'Where can I buy His Secret Obsession?', a: 'It is available exclusively through the official website, guaranteeing the authentic program, audio version, workbook, and 60-day guarantee.' },
  { q: 'How do I access the program after purchase?', a: 'You get immediate digital access to the eBook, audio version, and bonus workbook instantly on your phone, tablet, or computer.' },
  { q: 'Does it offer a money-back guarantee?', a: 'Yes. Every purchase is backed by a 60-day, 100% money-back guarantee with no questions asked.' }
];

export default function App() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [salesNotification, setSalesNotification] = useState<{
    show: boolean;
    name: string;
    state: string;
    minutes: number;
  }>({ show: false, name: 'Thomas D.', state: 'Mississippi', minutes: 19 });

  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 16, minutes: 1, seconds: 3 });

  const [activeTab, setActiveTab] = useState<'landing' | 'quiz' | 'vault'>('landing');
  const [quizAnswers, setQuizAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('hso_notes') ?? '';
  });
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  const salesNames = useMemo(() => ['John M.', 'Sarah T.', 'Michael R.', 'Jennifer L.', 'David K.', 'Emily S.', 'Robert P.', 'Lisa W.', 'James H.', 'Maria G.', 'William B.', 'Patricia C.', 'Richard F.', 'Linda N.'], []);
  const salesStates = useMemo(() => ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'Washington', 'Arizona', 'Tennessee', 'Indiana', 'Mississippi'], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 1, hours: 16, minutes: 1, seconds: 3 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const showToast = () => {
      const randomName = salesNames[Math.floor(Math.random() * salesNames.length)];
      const randomState = salesStates[Math.floor(Math.random() * salesStates.length)];
      const randomMin = Math.floor(Math.random() * 25) + 1;

      setSalesNotification({ show: true, name: randomName, state: randomState, minutes: randomMin });

      setTimeout(() => {
        setSalesNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    };

    const initialToast = setTimeout(showToast, 3000);
    const toastInterval = setInterval(showToast, 14000);

    return () => {
      clearTimeout(initialToast);
      clearInterval(toastInterval);
    };
  }, [salesNames, salesStates]);

  const handleNavClick = (sectionId: string) => {
    setActiveTab('landing');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hso_notes', notes);
    }
    setSavedNotesMessage(true);
    setTimeout(() => setSavedNotesMessage(false), 3000);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizAnswers.q1 || !quizAnswers.q2 || !quizAnswers.q3) {
      alert('Please answer all 3 questions to generate your Hero Instinct alignment score.');
      return;
    }
    setQuizResult('Your Hero Instinct Compatibility Score is 96%! Based on your responses, your partner responds strongly to the \'12-Word Text\' and emotional reassurance signals. You are ideally aligned to use the Hero Instinct framework to create more warmth, stability, and attraction.');
  };

  return (
    <div className="min-h-screen bg-pink-50/50 text-slate-800 font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-rose-800 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Official Launch Special: Get His Secret Obsession® for over 70% Off Today ($49 instead of $186) + 2 Free Bonuses!</span>
        <a href={AFFILIATE_URL} target="_blank" rel="nofollow" className="underline font-bold text-amber-200 hover:text-white ml-1">Claim Discount &rarr;</a>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" onClick={() => setActiveTab('landing')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight font-serif">His Secret Obsession</span>
                <span className="block text-[10px] tracking-widest uppercase text-rose-600 font-bold">James Bauer's Guide</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-slate-700">
            <button onClick={() => handleNavClick('about')} className="hover:text-rose-600 transition-colors">About</button>
            <button onClick={() => handleNavClick('benefit')} className="hover:text-rose-600 transition-colors">Benefits</button>
            <button onClick={() => handleNavClick('pricing')} className="hover:text-rose-600 transition-colors">Price</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-rose-600 transition-colors">FAQs</button>
            <button onClick={() => handleNavClick('review')} className="hover:text-rose-600 transition-colors">Reviews</button>
            <button 
              onClick={() => setActiveTab(activeTab === 'quiz' ? 'landing' : 'quiz')}
              className="text-rose-600 font-bold hover:text-rose-700 flex items-center gap-1 bg-rose-100/80 px-3 py-1.5 rounded-full border border-rose-200"
            >
              <Sparkles className="w-4 h-4" /> {activeTab === 'quiz' ? 'Back to Landing Page' : 'Hero Instinct Quiz'}
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === 'vault' ? 'landing' : 'vault')}
              className="text-slate-700 font-semibold hover:text-slate-900 flex items-center gap-1 bg-pink-100 px-3 py-1.5 rounded-full border border-pink-200"
            >
              <BookOpen className="w-4 h-4" /> {activeTab === 'vault' ? 'Back to Landing Page' : 'My Notes Vault'}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href={AFFILIATE_URL} 
              target="_blank" 
              rel="nofollow"
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area: Conditional Tabs */}
      {activeTab === 'quiz' && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl border border-rose-200 p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Interactive Assessment</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mt-3">Hero Instinct Compatibility Quiz</h2>
              <p className="text-slate-600 mt-2">Answer 3 quick questions to discover how well your current communication aligns with male relationship psychology.</p>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-8">
              <div className="space-y-3 bg-pink-50/60 p-6 rounded-xl border border-rose-200">
                <label className="font-semibold text-slate-900 block text-lg">1. How does your partner currently respond when you bring up serious relationship conversations?</label>
                <div className="space-y-2">
                  {['He gets defensive or quiet (withdraws into his shell)', 'He listens briefly but changes the subject quickly', 'We talk openly, but the passion and romance have faded', 'He is very attentive and emotionally connected'].map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-rose-100 hover:border-rose-300 cursor-pointer transition-colors">
                      <input type="radio" name="q1" value={opt} onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})} className="text-rose-600 focus:ring-rose-500 w-4 h-4" />
                      <span className="text-slate-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-pink-50/60 p-6 rounded-xl border border-rose-200">
                <label className="font-semibold text-slate-900 block text-lg">2. What is your primary relationship goal over the next 30 days?</label>
                <div className="space-y-2">
                  {['Awaken his deep commitment and devotion', 'Reignite the lost spark and physical attraction', 'Reconnect with an ex or partner who has grown distant', 'Build bulletproof trust and open communication'].map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-rose-100 hover:border-rose-300 cursor-pointer transition-colors">
                      <input type="radio" name="q2" value={opt} onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})} className="text-rose-600 focus:ring-rose-500 w-4 h-4" />
                      <span className="text-slate-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-pink-50/60 p-6 rounded-xl border border-rose-200">
                <label className="font-semibold text-slate-900 block text-lg">3. Have you ever tried using specific psychological triggers or "signals" in your texts?</label>
                <div className="space-y-2">
                  {['Never heard of them before', 'Tried a few general tips with mixed results', 'Yes, but looking for a proven, structured method like James Bauer’s Hero Instinct'].map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-rose-100 hover:border-rose-300 cursor-pointer transition-colors">
                      <input type="radio" name="q3" value={opt} onChange={(e) => setQuizAnswers({...quizAnswers, q3: e.target.value})} className="text-rose-600 focus:ring-rose-500 w-4 h-4" />
                      <span className="text-slate-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                  Calculate My Compatibility Score &rarr;
                </button>
              </div>
            </form>

            {quizResult && (
              <div className="mt-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h3 className="text-2xl font-serif font-bold text-rose-900">Analysis Complete!</h3>
                <p className="text-rose-800 text-lg max-w-xl mx-auto">{quizResult}</p>
                <div className="pt-4">
                  <a href={AFFILIATE_URL} target="_blank" rel="nofollow" className="inline-block bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all">
                    Get His Secret Obsession Program Now ($49) &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl border border-rose-200 p-8 sm:p-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Secure Database Vault</span>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mt-2">My Relationship Notes & Signals Vault</h2>
              </div>
              <BookOpen className="w-10 h-10 text-rose-600" />
            </div>
            <p className="text-slate-600 mb-6">Use this private local storage vault to save your favorite phrases, conversation scripts, and personal reflections while reading His Secret Obsession.</p>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea 
                rows={8}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type your notes here... (e.g., Remember to use the 12-Word Text when he is stressed, focus on his Hero Instinct, note down the Fascination Signal phrases...)"
                className="w-full p-4 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-sans text-slate-800 bg-pink-50/30"
              />
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all">
                  Save Notes to Database Vault
                </button>
                {savedNotesMessage && (
                  <span className="text-rose-700 font-semibold text-sm flex items-center gap-1 animate-pulse">
                    ✓ Notes successfully saved to browser database!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'landing' && (
        <main>
          {/* Hero Section (Light Pink Background) */}
          <section className="bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 text-slate-900 py-16 lg:py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f43f5e_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Headline & Content */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-2 bg-rose-200/80 text-rose-900 border border-rose-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-rose-700" /> James Bauer’s Official Guide
                  </span>
                  
                  <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-extrabold tracking-tight leading-snug text-slate-900">
                    <span className="block">His Secret Obsession –</span>
                    <span className="block">Unlock His Hero Instinct and Build</span>
                    <span className="block">the Deep, Lasting Love You’ve Always Wanted</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-sans">
                    His Secret Obsession is the trusted relationship program by James Bauer, used by women around the world to activate the Hero Instinct — the hidden psychological drive that makes men feel deeply committed, devoted, and emotionally connected to the woman they love.
                  </p>

                  {/* Testimonial Snippet Box */}
                  <div className="bg-white/95 backdrop-blur-sm border border-rose-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-lg">
                    <img 
                      src="https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession-review-by-anglena.webp" 
                      alt="Anglena J." 
                      className="w-16 h-16 rounded-full object-cover border-2 border-rose-500 shadow-md flex-shrink-0"
                    />
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <span className="text-xs text-slate-700 ml-1 font-bold">4.9 / 5.0 Rating</span>
                      </div>
                      <p className="text-sm text-slate-800 italic font-serif">
                        “His Secret Obsession completely transformed my relationship. By learning how to tap into my partner’s Hero Instinct, I finally understood his deeper emotional needs.”
                      </p>
                      <p className="text-xs text-rose-700 font-semibold">— Anglena J., 33 (Miami, FL)</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="w-full sm:w-auto text-center bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Get Your His Secret Obsession Now</span>
                    </a>
                  </div>

                  {/* Check Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>60-Day Money-Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>24-Hour Digital Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>4.8/5 Average Program Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>Trusted by Thousands Worldwide</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Book Mockup */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-rose-200 shadow-2xl">
                      <a href={AFFILIATE_URL} target="_blank" rel="nofollow">
                        <img 
                          src="https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession.webp" 
                          alt="His Secret Obsession Book" 
                          className="w-full max-w-md rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </a>
                      <div className="mt-4 text-center">
                        <span className="inline-block bg-rose-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow">
                          Over 70% Off Today ($49 Only)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Trustpilot Social Proof Bar */}
          <section className="bg-white border-b border-rose-100 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <span className="text-slate-600 font-semibold text-sm">Verified User Reviews & Ratings:</span>
              <img 
                src="https://hissecratobsession.com/wp-content/uploads/2024/10/Trustpilot-reviews.png" 
                alt="Trustpilot Reviews" 
                className="h-8 object-contain"
              />
            </div>
          </section>

          {/* Embedded Special Flash Discount Section with Live Countdown Timer */}
          <section className="py-12 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-b border-rose-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-rose-300 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-rose-100 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-32 h-32 bg-pink-100 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-4">
                  <span className="inline-block bg-rose-100 text-rose-800 text-xs sm:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-rose-200 shadow-sm">
                    ⚡ Special Flash Discount
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
                    Wait! Claim Your 75% Discount Before It Expires
                  </h3>

                  <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
                    Get James Bauer’s complete <strong>His Secret Obsession</strong> guide, audio version, and workbook today for just <strong className="text-rose-600 text-xl sm:text-2xl font-black">$49</strong> <span className="line-through text-slate-400 font-semibold">(Reg. $186)</span>.
                  </p>

                  <div className="bg-pink-50/90 max-w-lg mx-auto p-4 sm:p-5 rounded-2xl border border-rose-200 shadow-inner flex justify-center items-center gap-3 sm:gap-6 text-center">
                    <div>
                      <span className="block text-2xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider">{String(timeLeft.days).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-xs text-rose-700 uppercase font-extrabold">Days</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-rose-400 pb-2">:</span>
                    <div>
                      <span className="block text-2xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-xs text-rose-700 uppercase font-extrabold">Hours</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-rose-400 pb-2">:</span>
                    <div>
                      <span className="block text-2xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-xs text-rose-700 uppercase font-extrabold">Minutes</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-rose-400 pb-2">:</span>
                    <div>
                      <span className="block text-2xl sm:text-4xl font-black text-slate-900 font-mono tracking-wider">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-xs text-rose-700 uppercase font-extrabold">Seconds</span>
                    </div>
                  </div>

                  <div className="pt-2 max-w-md mx-auto space-y-2">
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="w-full block bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-xl hover:shadow-rose-400/30 transition-all transform hover:-translate-y-0.5"
                    >
                      Claim $49 Discount Now &rarr;
                    </a>
                    <p className="text-xs text-slate-500 font-medium">Instant Digital Access • 60-Day Money-Back Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Thousands of Women Choose His Secret Obsession */}
          <section className="py-20 bg-pink-50/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-200/70 px-3 py-1 rounded-full">Proven Excellence</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                  Why Thousands of Women Choose His Secret Obsession?
                </h2>
                <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Built on James Bauer’s Hero Instinct Discovery",
                    desc: "The entire program is built around the Hero Instinct — James Bauer’s groundbreaking concept rooted in over 12 years of relationship psychology research."
                  },
                  {
                    title: "60-Day Money-Back Guarantee",
                    desc: "Try His Secret Obsession completely risk-free. If you are not thrilled with the results within 60 days, get a full refund — no questions asked."
                  },
                  {
                    title: "Complete Relationship Toolkit",
                    desc: "Your order includes the full 217-page guide by James Bauer, companion workbook, and complete audio version accessible on any device."
                  },
                  {
                    title: "Massive Introductory Discount",
                    desc: "Currently available at over 70% off through the official website with simple, one-time pricing and no subscriptions."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl">
                        0{idx+1}
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <a 
                  href={AFFILIATE_URL} 
                  target="_blank" 
                  rel="nofollow"
                  className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-base"
                >
                  Buy His Secret Obsession Now — Official Website &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* What Is His Secret Obsession? (About Section) */}
          <section id="about" className="py-20 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 border-y border-rose-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-200 px-3 py-1 rounded-full">Comprehensive Overview</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                    What Is His Secret Obsession?
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>
                      <strong>His Secret Obsession</strong> is a breakthrough relationship program created by relationship coach and best-selling author James Bauer, built on more than 12 years of research in male psychology. At its heart is the discovery of the Hero Instinct — a powerful emotional trigger that makes men feel deeply needed, respected, and essential in a relationship.
                    </p>
                    <p>
                      When the Hero Instinct is activated, it transforms how a man views his partner. His Secret Obsession teaches you exactly how to ignite this instinct using simple, everyday words, signals, and emotional cues — most of which take less than a minute to apply but can shift the entire dynamic of your relationship.
                    </p>
                    <p>
                      The full program includes a 217-page guide, a step-by-step workbook, and complete audio version. Inside, James Bauer shares his most powerful techniques: the 12-Word Text, the Glimpse Phrase, the Fascination Signal, the X-Ray Question, the Damsel in Distress Signal, and many more.
                    </p>
                  </div>
                  <div>
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                      <span>Order His Secret Obsession Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl blur-xl opacity-20"></div>
                    <img 
                      src="https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession-official.webp" 
                      alt="His Secret Obsession Official Guide" 
                      className="relative rounded-2xl shadow-2xl border border-rose-200 max-w-md w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How Does His Secret Obsession Work? */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                  <img 
                    src="https://hissecratobsession.com/wp-content/uploads/2026/06/best-dating-guides-for-women.webp" 
                    alt="Best Dating Guides for Women" 
                    className="rounded-2xl shadow-xl border border-rose-200 w-full object-cover"
                  />
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-100 px-3 py-1 rounded-full">Step-By-Step System</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                    How Does His Secret Obsession Work?
                  </h2>
                  <p className="text-slate-600">
                    His Secret Obsession by James Bauer follows a simple four-step process designed to help any woman activate the Hero Instinct and create deep emotional connection — regardless of where her relationship is starting from.
                  </p>

                  {/* Accordion Steps */}
                  <div className="space-y-3">
                    {STEP_ITEMS.map((item) => (
                      <div key={item.step} className="bg-pink-50/50 border border-rose-200 rounded-xl overflow-hidden shadow-sm">
                        <button 
                          onClick={() => setOpenStep(openStep === item.step ? null : item.step)}
                          className="w-full px-6 py-4 text-left font-bold text-slate-900 flex items-center justify-between hover:bg-pink-100/50 transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-rose-200 text-rose-900 flex items-center justify-center text-xs font-extrabold">{item.step}</span>
                            {item.title}
                          </span>
                          {openStep === item.step ? <ChevronUp className="w-5 h-5 text-rose-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </button>
                        {openStep === item.step && (
                          <div className="px-6 pb-4 text-sm text-slate-700 border-t border-rose-100 pt-3 leading-relaxed">
                            {item.desc}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="inline-block bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                      Order Now &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 text-slate-900 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="bg-rose-200 text-rose-900 border border-rose-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">Limited-Time Special Offer</span>
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900">His Secret Obsession Pricing Plans</h2>
                <p className="text-slate-700">Lock in the lowest available price with over 70% off through the official website.</p>
              </div>

              <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-rose-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 bg-gradient-to-br from-pink-50 to-rose-100 p-8 sm:p-12 flex flex-col justify-between items-center text-center border-b lg:border-b-0 lg:border-r border-rose-200">
                  <div className="space-y-4">
                    <span className="bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Best Value Package</span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">Complete Digital Program</h3>
                    <img 
                      src="https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession-pricing.webp" 
                      alt="His Secret Obsession Pricing" 
                      className="w-full max-w-xs mx-auto rounded-xl shadow-md my-4"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-xl text-slate-400 line-through font-bold">$186</span>
                      <span className="text-5xl font-extrabold text-rose-600">$49</span>
                    </div>
                    <p className="text-xs text-slate-500">One-time payment. No subscriptions. Instant digital access.</p>
                  </div>
                </div>

                <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-slate-900">What’s Included Today:</h3>
                    <ul className="space-y-3 text-slate-700 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Full 217-Page eBook</strong> by James Bauer (Instant PDF download)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span><strong>The Hero Instinct Framework</strong> & Complete Signal Toolkit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Complete Audio Version</strong> (FREE Bonus - Listen on the go)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span><strong>His Secret Obsession Workbook</strong> (FREE Bonus)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span><strong>60-Day 100% Money-Back Guarantee</strong> (Risk-free trial)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-rose-100">
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="w-full block text-center bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Claim Your His Secret Obsession for $49 &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Is Included in Your Program? */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-100 px-3 py-1 rounded-full">Complete Toolkit</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                  What Is Included in Your His Secret Obsession Program?
                </h2>
                <p className="text-slate-600">Far more than a single eBook — a complete relationship transformation toolkit.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "His Secret Obsession Main eBook – 217 Pages", desc: "The complete program by James Bauer — more than 200 pages of practical relationship psychology, real-world examples, and ready-to-use techniques." },
                  { title: "The Hero Instinct Framework", desc: "The core teaching at the heart of His Secret Obsession. James Bauer’s full breakdown of the Hero Instinct and evolutionary psychology." },
                  { title: "Complete Signal Toolkit", desc: "Full library of signals and phrases: the 12-Word Text, Glimpse Phrase, Fascination Signal, X-Ray Question, and Pursuit Mode Strategy." },
                  { title: "Complete Audio Version (FREE Bonus)", desc: "Listen to the entire program in audio format — perfect for the commute, gym, or quiet evenings, narrated clearly." },
                  { title: "His Secret Obsession Workbook (FREE Bonus)", desc: "A guided companion workbook walking you through every concept step-by-step with journaling prompts and real-life scripts." },
                  { title: "Instant Digital Delivery", desc: "Delivered instantly, accessible on any device anywhere, anytime — read on your phone or listen on your laptop at home." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-pink-50/50 p-8 rounded-2xl border border-rose-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-200 text-rose-800 flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <a 
                  href={AFFILIATE_URL} 
                  target="_blank" 
                  rel="nofollow"
                  className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  Buy His Secret Obsession Now &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* Real Stories From Users (Reviews) */}
          <section id="review" className="py-20 bg-pink-50/60 border-t border-rose-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-200 px-3 py-1 rounded-full">Testimonials</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                  Real Stories From His Secret Obsession Users
                </h2>
                <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Cherry R., 28 (Austin, TX)",
                    rating: 4.5,
                    img: "https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession-review-by-cherry.webp",
                    text: "“His Secret Obsession has been a complete game-changer for my relationship. With James Bauer’s Hero Instinct techniques, I learned how to communicate clearly and fulfill his deepest emotional needs.”"
                  },
                  {
                    name: "Jenny S., 25 (Phoenix, AZ)",
                    rating: 4.8,
                    img: "https://hissecratobsession.com/wp-content/uploads/2024/10/his-secret-obsession-review-by-jenny.webp",
                    text: "“The ideas were easy to follow and encouraged me to be more thoughtful, patient, and intentional in my conversations. Over time, I noticed we were having fewer misunderstandings.”"
                  },
                  {
                    name: "Penny D., 31 (Brooklyn, NY)",
                    rating: 4.3,
                    img: "https://hissecratobsession.com/wp-content/uploads/2026/06/his-secret-obsession-review-by-penny.webp",
                    text: "“I was amazed by the difference His Secret Obsession made in my relationship. By applying the Hero Instinct method, I learned how to connect with my partner on a deeper emotional level.”"
                  }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-200 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-slate-300'}`} />
                        ))}
                        <span className="text-xs font-bold text-slate-600 ml-1">{rev.rating} / 5</span>
                      </div>
                      <p className="text-slate-600 italic font-serif text-sm leading-relaxed">{rev.text}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-rose-100">
                      <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full object-cover border border-rose-200" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                        <span className="text-xs text-rose-700 font-medium">Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefit" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-100 px-3 py-1 rounded-full">Core Advantages</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                  The Benefits of His Secret Obsession for Love & Lasting Connection
                </h2>
                <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Deeper Emotional Connection", desc: "Create a profoundly deeper emotional bond by fulfilling your partner’s emotional needs through the Hero Instinct." },
                  { title: "Activates the Hero Instinct", desc: "Awaken the psychological trigger that makes men want to protect, provide, and cherish with unwavering loyalty." },
                  { title: "Reignites Lost Passion & Attraction", desc: "Bring back the spark and rekindle attraction in long-term or emotionally distant relationships using proven signals." },
                  { title: "Improved Communication With Men", desc: "Reduce misunderstandings, navigate difficult conversations, and feel genuinely heard and understood." },
                  { title: "Boosts Confidence in Love", desc: "Approach your relationship with confidence, emotional clarity, and authentic warmth — not games or guesswork." },
                  { title: "Works for Every Relationship Stage", desc: "Whether starting a new romance, healing a marriage, or reconnecting with an ex, His Secret Obsession adapts to you." }
                ].map((b, idx) => (
                  <div key={idx} className="bg-pink-50/50 p-8 rounded-2xl border border-rose-200 space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 60-Day Guarantee Section */}
          <section className="py-20 bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="bg-rose-300 text-rose-950 border border-rose-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">100% Risk-Free Protection</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                    The His Secret Obsession 60-Day Money-Back Guarantee
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    James Bauer and the team stand fully behind the program with a 60-day, 100% money-back guarantee. If you are not completely thrilled with your results for any reason whatsoever, simply contact support within 60 days for a full refund — no questions asked.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    You can read the entire 217-page guide, listen to the audio version, work through the bonus workbook, and apply every single technique — and if His Secret Obsession does not help you create the connection you want, you keep your money and the entire program.
                  </p>
                  <div>
                    <a 
                      href={AFFILIATE_URL} 
                      target="_blank" 
                      rel="nofollow"
                      className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
                    >
                      Try His Secret Obsession Risk-Free &rarr;
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <img 
                    src="https://hissecratobsession.com/wp-content/uploads/2026/06/60-days-money-back-guarantee.webp" 
                    alt="60-Day Money-Back Guarantee" 
                    className="max-w-sm w-full rounded-2xl shadow-2xl border border-rose-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="text-rose-700 font-bold uppercase tracking-wider text-xs bg-rose-100 px-3 py-1 rounded-full">Got Questions?</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                  Frequently Asked Questions About His Secret Obsession
                </h2>
                <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                {FAQ_ITEMS.map((faq, idx) => (
                  <div key={idx} className="bg-pink-50/50 border border-rose-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-4 text-left font-bold text-slate-900 flex items-center justify-between hover:bg-pink-100/50 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        {faq.q}
                      </span>
                      {openFaq === idx ? <ChevronUp className="w-5 h-5 text-rose-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-4 text-sm text-slate-700 border-t border-rose-100 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <a 
                  href={AFFILIATE_URL} 
                  target="_blank" 
                  rel="nofollow"
                  className="inline-block bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  Order Your His Secret Obsession — Only $49 Today &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="py-12 bg-pink-50/80 border-t border-rose-200">
            <div className="max-w-7xl mx-auto px-4 text-xs text-slate-600 leading-relaxed space-y-3">
              <h4 className="font-bold uppercase tracking-widest text-slate-800">Disclaimer</h4>
              <p>
                His Secret Obsession is a relationship advice and personal development program created for educational and informational purposes. Individual experiences and results may vary based on personal circumstances, communication styles, and relationship dynamics. The strategies, concepts, and techniques presented within the program are intended to provide relationship insights and are not guarantees of romantic success, commitment, reconciliation, or specific relationship outcomes.
              </p>
              <p>
                This website is an independent review and informational resource. To ensure authenticity, access to official bonuses, and applicable refund protection, always purchase His Secret Obsession through the official website via our secure affiliate links.
              </p>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 text-slate-700 py-10 border-t border-rose-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-rose-200/80">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="font-serif font-bold text-xl text-slate-900">His Secret Obsession</span>
              </div>
              <p className="text-sm text-slate-600">
                The trusted relationship program by James Bauer helping women activate the Hero Instinct and build deep, lasting love.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-1.5 text-sm">
                <li><button onClick={() => handleNavClick('about')} className="hover:text-rose-700 transition-colors text-left text-slate-600">About Us</button></li>
                <li><button onClick={() => handleNavClick('benefit')} className="hover:text-rose-700 transition-colors text-left text-slate-600">Benefits</button></li>
                <li><button onClick={() => handleNavClick('pricing')} className="hover:text-rose-700 transition-colors text-left text-slate-600">Pricing Plans</button></li>
                <li><button onClick={() => handleNavClick('faq')} className="hover:text-rose-700 transition-colors text-left text-slate-600">FAQs</button></li>
                <li><button onClick={() => handleNavClick('review')} className="hover:text-rose-700 transition-colors text-left text-slate-600">Reviews</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Contact & Support</h4>
              <p className="text-sm text-slate-600">For questions regarding orders or support:</p>
              <a href="mailto:contact@hissecratobsession.com" className="text-rose-700 hover:underline text-sm font-medium block">contact@hissecratobsession.com</a>
              <div className="pt-1">
                <a 
                  href={AFFILIATE_URL} 
                  target="_blank" 
                  rel="nofollow"
                  className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Official Order Page
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 His Secret Obsession. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-rose-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-rose-700 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-rose-700 transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sales Notification Toast */}
      {salesNotification.show && (
        <div className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-2xl border border-rose-200 p-3.5 max-w-xs w-full flex items-center gap-3 animate-slide-in">
          <img 
            src="https://hissecratobsession.com/wp-content/uploads/2026/06/where-to-buy-his-secret-obsession.webp" 
            alt="His Secret Obsession Program by James Bauer" 
            className="w-12 h-12 rounded-lg object-cover bg-rose-50 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500">{salesNotification.name}</p>
            <p className="text-xs font-bold text-slate-900 truncate">Just ordered His Secret Obsession</p>
            <p className="text-[10px] text-slate-400">from {salesNotification.state} • {salesNotification.minutes}m ago</p>
          </div>
          <button 
            onClick={() => setSalesNotification(prev => ({ ...prev, show: false }))}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

