import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BarChart3, Cpu, Smartphone, Globe, Download, ChevronLeft, Search, Brain, Star, Cloud, Wifi, Database, Zap, Mail, FileSpreadsheet, ExternalLink, Play } from 'lucide-react';

// Types
interface Component {
  id: number;
  name: string;
  image: string;
  description: string;
  voltage: string;
  specifications: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

// Mock Data (move to separate file in a real project)
const iotComponents: Component[] = [
  // ... (your existing iotComponents array)
];

const testimonials: Testimonial[] = [
  // ... (your existing testimonials array)
];

// Background Icons Component
const IconBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 text-blue-200/20 transform rotate-12">
      <BarChart3 size={24} />
    </div>
    <div className="absolute top-32 right-20 text-blue-300/20 transform -rotate-12">
      <Cpu size={20} />
    </div>
    <div className="absolute top-64 left-1/4 text-blue-200/20 transform rotate-45">
      <Cloud size={18} />
    </div>
    <div className="absolute bottom-32 right-10 text-blue-300/20 transform -rotate-45">
      <Wifi size={22} />
    </div>
    <div className="absolute bottom-64 left-20 text-blue-200/20 transform rotate-12">
      <Database size={20} />
    </div>
    <div className="absolute top-1/2 right-1/3 text-blue-300/20 transform -rotate-12">
      <Zap size={16} />
    </div>
  </div>
);

// NavBar Component
const NavBar = () => (
  <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="text-blue-600" size={32} />
          <span className="text-2xl font-bold text-gray-800">Smart ESP</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Accueil</Link>
          <Link to="/components" className="text-gray-600 hover:text-blue-600 transition-colors">Composants</Link>
          <Link to="/download" className="text-gray-600 hover:text-blue-600 transition-colors">Téléchargements</Link>
          <Link to="/custom" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  </nav>
);

// Home Page
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
    <IconBackground />
    <NavBar />
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Smart ESP – La plateforme IoT unique, intelligente et simple pour vos <span className="text-blue-600">Projets ESP</span>
              </h1>
              <p className="text-xl text-gray-600">
                Accélérez votre développement IoT avec des outils intelligents, un catalogue de composants et des applications personnalisées.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/components"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <Zap size={20} />
                <span>Catalogue de Composants</span>
              </Link>
              <Link
                to="/download"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold border border-blue-600 transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <Download size={20} />
                <span>Téléchargements</span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/Green%20and%20Yellow%20Playful%20Illustrative%20What%20are%20the%20parts%20of%20a%20Plant%20Presentation%20(2).png"
                alt="Capture d'écran de l'application Smart ESP"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* ... (rest of your HomePage sections) */}
  </div>
);

// Components Page
const ComponentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Bonjour ! Je suis votre assistant IoT. Demandez-moi quels composants vous avez besoin pour votre projet (ex: 'Quels composants pour un jardin intelligent ?')." },
  ]);
  const [recommendedComponents, setRecommendedComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const extractComponentNames = (text: string): string[] => {
    const componentNames = iotComponents.map(c => c.name.toLowerCase());
    const lines = text.toLowerCase().split('\n');
    const matches = new Set<string>();
    lines.forEach(line => {
      componentNames.forEach(name => {
        if (line.includes(name)) matches.add(name);
      });
    });
    return Array.from(matches);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsLoading(true);
    setRecommendedComponents([]);
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.4, topK: 32, topP: 0.9, maxOutputTokens: 200 }
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const aiReply = data.candidates[0].content.parts[0].text;
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      const componentNames = extractComponentNames(aiReply);
      const matchedComponents = iotComponents.filter(comp => componentNames.includes(comp.name.toLowerCase()));
      setRecommendedComponents(matchedComponents);
    } catch (error) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, une erreur est survenue. Veuillez réessayer ou vérifier votre connexion."
      }]);
      console.error("Gemini API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredComponents = iotComponents.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <IconBackground />
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <ChevronLeft size={20} />
              <span>Retour à l'Accueil</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Smart ESP – Catalogue de composants IoT</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ... (rest of your ComponentsPage logic) */}
      </div>
    </div>
  );
};

// Download Page
const DownloadPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <IconBackground />
    <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ChevronLeft size={20} />
            <span>Retour à l'Accueil</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Download className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Téléchargements Smart ESP</span>
          </div>
        </div>
      </div>
    </nav>
    {/* ... (rest of your DownloadPage) */}
  </div>
);

// Custom Apps Page
const CustomAppsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <IconBackground />
    <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ChevronLeft size={20} />
            <span>Retour à l'Accueil</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Globe className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</span>
          </div>
        </div>
      </div>
    </nav>
    {/* ... (rest of your CustomAppsPage) */}
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
    <IconBackground />
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <span className="text-3xl font-bold">404</span>
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Page Non Trouvée</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! La page que vous recherchez n'existe pas.</p>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 mb-8 text-left max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Suggestions utiles :</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start space-x-3"><Play className="text-blue-500 mt-1 flex-shrink-0" size={16} /><span>Vérifiez l'adresse URL.</span></li>
          <li className="flex items-start space-x-3"><Play className="text-blue-500 mt-1 flex-shrink-0" size={16} /><span>Retournez à l'accueil.</span></li>
          <li className="flex items-start space-x-3"><Play className="text-blue-500 mt-1 flex-shrink-0" size={16} /><span>Explorez les composants.</span></li>
          <li className="flex items-start space-x-3"><Play className="text-blue-500 mt-1 flex-shrink-0" size={16} /><span>Téléchargez l'app.</span></li>
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <ChevronLeft size={20} />
          <span>Retour à l'Accueil</span>
        </Link>
        <Link
          to="/components"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <Zap size={20} />
          <span>Catalogue de Composants</span>
        </Link>
        <Link
          to="/download"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <Download size={20} />
          <span>Téléchargements</span>
        </Link>
      </div>
    </div>
  </div>
);

// Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/custom" element={<CustomAppsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
