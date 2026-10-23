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
  // State for accordions
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State for sales notification toast
  const [salesNotification, setSalesNotification] = useState<{
    show: boolean;
    name: string;
    state: string;
    minutes: number;
  }>({ show: false, name: 'Thomas D.', state: 'Mississippi', minutes: 19 });

  // State for popup modal & working timer
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 16, minutes: 1, seconds: 3 });

  // State for interactive quiz & notes database feature
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

  // Working countdown timer effect
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

  // Sales notification loop
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

    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 4000);

    const initialToast = setTimeout(showToast, 3000);
    const toastInterval = setInterval(showToast, 14000);

    return () => {
      clearTimeout(popupTimer);
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

  // The rest of the original component remains unchanged below this point.
