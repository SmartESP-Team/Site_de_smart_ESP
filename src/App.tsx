import React, { useState } from 'react';
import {
  BarChart3, Cpu, Smartphone, Globe, Download, ChevronLeft,
  Search, Brain, Star, Cloud, Wifi, Database, Zap, Mail,
  FileSpreadsheet, ExternalLink, Play
} from 'lucide-react';

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

// Mock Data (abrévié pour l'exemple)
const iotComponents: Component[] = [
  {
    id: 1,
    name: "Afficheur OLED",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/50.png",
    description: "Petit écran OLED pour afficher des informations textes ou graphiques, souvent avec une interface I2C.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 128x64", "Interface : I2C", "Couleur : Monochrome", "Taille : 0.96\""]
  },
  {
    id: 2,
    name: "ESP32-CAM",
    image: "https://i.postimg.cc/FskXbsPG/t-l-chargement.jpg",
    description: "Module de développement basé sur l'ESP32 avec une caméra intégrée, idéal pour les projets de surveillance vidéo et de reconnaissance d'image.",
    voltage: "5V DC",
    specifications: ["Résolution caméra : 2MP", "WiFi : 802.11 b/g/n", "Flash : 4MB", "GPIO : 9 broches"]
  },
  // ... (ajoutez le reste de vos composants ici)
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Ingénieur IoT",
    company: "TechCorp",
    text: "Smart ESP a révolutionné notre processus de développement IoT. L'intégration Gemini AI fournit des suggestions de projets incroyables !",
    rating: 5
  },
  // ... (ajoutez le reste de vos témoignages ici)
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
const NavBar = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="text-blue-600" size={32} />
          <span className="text-2xl font-bold text-gray-800">Smart ESP</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-blue-600 transition-colors">Accueil</button>
          <button onClick={() => setCurrentPage('components')} className="text-gray-600 hover:text-blue-600 transition-colors">Composants</button>
          <button onClick={() => setCurrentPage('download')} className="text-gray-600 hover:text-blue-600 transition-colors">Téléchargements</button>
          <button onClick={() => setCurrentPage('custom')} className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>
        </div>
      </div>
    </div>
  </nav>
);

// Home Page
const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
    <IconBackground />
    <NavBar setCurrentPage={setCurrentPage} />
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
              <button
                onClick={() => setCurrentPage('components')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <Zap size={20} />
                <span>Catalogue de Composants</span>
              </button>
              <button
                onClick={() => setCurrentPage('download')}
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold border border-blue-600 transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <Download size={20} />
                <span>Téléchargements</span>
              </button>
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
    {/* Ajoutez le reste de vos sections ici */}
  </div>
);

// Components Page
const ComponentsPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Bonjour ! Je suis votre assistant IoT. Demandez-moi quels composants vous avez besoin pour votre projet (ex: 'Quels composants pour un jardin intelligent ?')." },
  ]);
  const [recommendedComponents, setRecommendedComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const GEMINI_API_KEY = "AIzaSyCaf0dZY3tmfdR7Um0mUr-jnJCkLg8-XSI";
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
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Retour à l'Accueil</span>
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Smart ESP – Catalogue de composants IoT</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher des composants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Brain size={20} />
            <span>{chatOpen ? 'Fermer le Chat' : 'Chat IA'}</span>
          </button>
        </div>
        {chatOpen && (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 mb-8 overflow-hidden">
            <div className="p-4 bg-blue-600 text-white font-semibold">Assistance IA – Recommandations de Composants</div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Décrivez votre projet..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSendChat} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Envoyer
              </button>
            </div>
          </div>
        )}
        {recommendedComponents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🔧 Composants Recommandés par l'IA</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {recommendedComponents.map((component) => (
                <div
                  key={component.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 border-2 border-blue-300"
                  onClick={() => setSelectedComponent(component)}
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img src={component.image} alt={component.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{component.name}</h3>
                    <p className="text-xs text-blue-600 mt-1">{component.voltage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Tous les Composants ({filteredComponents.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => setSelectedComponent(component)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={component.image}
                  alt={component.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{component.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{component.voltage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedComponent.name}</h2>
                <button onClick={() => setSelectedComponent(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedComponent.image} alt={selectedComponent.name} className="w-full aspect-square object-cover rounded-lg" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedComponent.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Alimentation</h3>
                    <p className="text-blue-600 font-medium">{selectedComponent.voltage}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Spécifications Clés</h3>
                    <ul className="space-y-1">
                      {selectedComponent.specifications.map((spec, index) => (
                        <li key={index} className="text-gray-600 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Download Page
const DownloadPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <IconBackground />
    <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Retour à l'Accueil</span>
          </button>
          <div className="flex items-center space-x-2">
            <Download className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Téléchargements Smart ESP</span>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Captures d'Écran de l'Application</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <a
          href="https://github.com/YannErmes/SmartESP_app_update/releases/download/v1.2.0/app-armeabi-v7a-release.apk"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
        >
          <Download size={24} />
          <span>Application Smart ESP</span>
        </a>
        <a
          href="https://github.com/SmartESP-Team/SmartESP32Utils/archive/refs/heads/main.zip"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
        >
          <Download size={24} />
          <span>Bibliothèques Arduino</span>
        </a>
        <a
          href="#"
          className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
        >
          <Download size={24} />
          <span>Documentation PDF</span>
        </a>
        <a
          href="#"
          className="bg-gray-600 hover:bg-gray-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
        >
          <Download size={24} />
          <span>Exemples de Code</span>
        </a>
      </div>
    </div>
  </div>
);

// Custom Apps Page
const CustomAppsPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <IconBackground />
    <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Retour à l'Accueil</span>
          </button>
          <div className="flex items-center space-x-2">
            <Globe className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</span>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Applications IoT Personnalisées</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Des solutions sur mesure pour vos projets IoT – du concept au déploiement, nous nous occupons de tout.
        </p>
        <a
          href="https://wa.me/0710038821"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
        >
          Commander Mon Application Personnalisée
        </a>
      </div>
    </div>
  </div>
);

// 404 Page
const NotFoundPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
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
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <ChevronLeft size={20} />
          <span>Retour à l'Accueil</span>
        </button>
        <button
          onClick={() => setCurrentPage('components')}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <Zap size={20} />
          <span>Catalogue de Composants</span>
        </button>
        <button
          onClick={() => setCurrentPage('download')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <Download size={20} />
          <span>Téléchargements</span>
        </button>
      </div>
    </div>
  </div>
);

// Main App
function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'components' | 'download' | 'custom' | 'notfound'>('home');

  return (
    <>
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'components' && <ComponentsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'download' && <DownloadPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'custom' && <CustomAppsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'notfound' && <NotFoundPage setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
