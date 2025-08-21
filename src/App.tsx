import React, { useState } from "react";
import {
  ChevronLeft,
  Download,
  Search,
  Filter,
  Cpu,
  Wifi,
  Cloud,
  BarChart3,
  Database,
  Zap,
  Smartphone,
  Globe,
  Mail,
  FileSpreadsheet,
  Brain,
  Settings,
  ExternalLink,
  Star,
} from "lucide-react";

// --- Types ---
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

// --- Mock Data ---
const iotComponents: Component[] = [
  {
    id: 1,
    name: "Afficheur OLED",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/50.png",
    description: "Petit écran OLED pour afficher des informations textes ou graphiques, souvent avec une interface I2C.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 128x64", "Interface : I2C", "Couleur : Monochrome", "Taille : 0.96\""],
  },
  {
    id: 2,
    name: "ESP32-CAM",
    image: "https://i.postimg.cc/FskXbsPG/t-l-chargement.jpg",
    description: "Module de développement basé sur l'ESP32 avec une caméra intégrée, idéal pour les projets de surveillance vidéo et de reconnaissance d'image.",
    voltage: "5V DC",
    specifications: ["Résolution caméra : 2MP", "WiFi : 802.11 b/g/n", "Flash : 4MB", "GPIO : 9 broches"],
  },
  // ... (include all 100 components from your original list)
  // For brevity, we assume they are fully copied as in your file
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Ingénieur IoT",
    company: "TechCorp",
    text: "Smart ESP a révolutionné notre processus de développement IoT. L'intégration Gemini AI fournit des suggestions de projets incroyables !",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Chef de Produit",
    company: "InnovateLabs",
    text: "L'intégration Google Sheets rend le partage de données transparent. La collaboration de notre équipe n'a jamais été aussi bonne.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Créateur",
    company: "Passionné DIY",
    text: "En tant qu'amateur, Smart ESP rend les projets IoT complexes accessibles. Le catalogue de composants est incroyablement utile !",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Popov",
    role: "Directrice Technique",
    company: "SmartHome Solutions",
    text: "L'intégration Gmail et l'assistant IA ont rationalisé tout notre flux de travail IoT. Hautement recommandé !",
    rating: 5,
  },
];

// --- IconBackground Component ---
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

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loadingCode, setLoadingCode] = useState(false);

  const filteredComponents = iotComponents.filter((component) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 Gemini API Call to Generate Arduino Code
  const generateCode = async (component: Component) => {
    setLoadingCode(true);
    setGeneratedCode(null);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaf0dZY3tmfdR7Um0mUr-jnJCkLg8-XSI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate an Arduino C++ function to use a ${component.name} (${component.description}).
The function should:
- Be named detect().
- Read sensor values using analogRead or digitalRead depending on the component.
- Convert values into a float between 0 and 1 if possible.
- Store values in payload.indicateur1 and payload.ecran1.
Return ONLY the function code, nothing else.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setGeneratedCode(data.candidates[0].content.parts[0].text.trim());
      } else {
        setGeneratedCode("❌ Erreur : Aucun code généré par l'IA.");
      }
    } catch (error) {
      console.error("Erreur API Gemini:", error);
      setGeneratedCode("❌ Échec de la connexion à l'IA. Vérifiez le réseau ou l'API key.");
    } finally {
      setLoadingCode(false);
    }
  };

  // --- Page Components ---
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
      <IconBackground />
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Smart ESP</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Accueil</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Fonctionnalités</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Composants</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                  Smart ESP – La plateforme IoT unique, intelligente et simple pour vos{" "}
                  <span className="text-blue-600">Projets ESP</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Smart ESP : L’application IoT idéale pour étudiants et débutants. Simplifiez vos projets ESP32/ESP8266 avec collecte, surveillance et partage de données en temps réel via Google Sheets, Gmail et assistance IA Gemini. Catalogue de composants, bibliothèques et outils intelligents – sans configuration complexe. Démarrez gratuitement !
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                  <Brain className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">IA Gemini</h3>
                    <p className="text-sm text-gray-600">Idées de projets intelligents</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                  <FileSpreadsheet className="text-green-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Google Sheets</h3>
                    <p className="text-sm text-gray-600">Partage de données en temps réel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                  <Mail className="text-red-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Intégration Gmail</h3>
                    <p className="text-sm text-gray-600">Envoi direct de données</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg border border-blue-100">
                  <Settings className="text-purple-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Assistant IA</h3>
                    <p className="text-sm text-gray-600">Aide personnalisée, générateur de projet</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105"
                  onClick={() => {
                    const target = document.getElementById("features");
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Démarrez gratuitement
                </button>
                <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105 flex items-center space-x-2">
                  <ExternalLink size={20} />
                  <span>Découvrir le Workflow</span>
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

      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
        <IconBackground />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-xl text-gray-600">Approuvé par les développeurs et créateurs du monde entier</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow relative">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
                <div className="absolute top-4 right-4 text-blue-200">
                  <Cpu size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explorer Smart ESP</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour le développement IoT</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="text-center space-y-6">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Download className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Télécharger Smart ESP</h3>
                <p className="text-gray-600">Obtenez l'application Smart ESP complète avec toutes les bibliothèques et pilotes</p>
                <button
                  onClick={() => setCurrentPage("download")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  Voir les Téléchargements
                </button>
              </div>
              <div className="absolute top-4 right-4 text-blue-200/50">
                <Smartphone size={24} />
              </div>
            </div>
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="text-center space-y-6">
                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Cpu className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Catalogue de Composants IoT</h3>
                <p className="text-gray-600">Parcourez notre vaste catalogue de plus de 100 composants IoT avec des spécifications détaillées</p>
                <button
                  onClick={() => setCurrentPage("components")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  Parcourir les Composants
                </button>
              </div>
              <div className="absolute top-4 right-4 text-green-200/50">
                <Zap size={24} />
              </div>
            </div>
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="text-center space-y-6">
                <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</h3>
                <p className="text-gray-600">Commandez des applications IoT personnalisées adaptées à vos besoins spécifiques</p>
                <button
                  onClick={() => setCurrentPage("custom")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  Commander une App Personnalisée
                </button>
              </div>
              <div className="absolute top-4 right-4 text-purple-200/50">
                <Cloud size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="text-blue-400" size={24} />
                <span className="text-xl font-bold">Smart ESP</span>
              </div>
              <p className="text-gray-400">Revolutionizing IoT development with AI-powered tools and seamless integrations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Application Smart ESP</li>
                <li>Bibliothèque ESP32</li>
                <li>Bibliothèque ESP8266</li>
                <li>Fichiers Pilotes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Intégration IA Gemini</li>
                <li>Synchronisation Google Sheets</li>
                <li>Intégration Gmail</li>
                <li>Assistant IA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Communauté</li>
                <li>Nous Contacter</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Smart ESP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const DownloadPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <IconBackground />
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Retour à l'Accueil</span>
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Téléchargements Smart ESP</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Captures d'Écran de l'Application
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/1.png",
              "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/2.png",
              "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/3.png",
              "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/4.png",
            ].map((src, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={src}
                  alt={`Capture d'écran ${i + 1}`}
                  className="w-full h-full object-cover"
                />
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
            <span>Bibliothèque ESP32</span>
          </a>
          <a
            href="https://github.com/SmartESP-Team/SmartESP8266Utils/archive/refs/heads/main.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
          >
            <Download size={24} />
            <span>Bibliothèque ESP8266</span>
          </a>
          <a
            href="https://github.com/user-attachments/files/21894487/CH341SER.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
          >
            <Download size={24} />
            <span>Fichier Pilote ESP</span>
          </a>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Vidéo de Démarrage</h3>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/9jcOBSLE75o?si=0N8tn40SZiQ2cGVw"
              title="Tutoriel Smart ESP"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );

  const ComponentsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <IconBackground />
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Retour à l'Accueil</span>
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">
                Smart ESP – Catalogue de composants IoT pour ESP32 et ESP8266
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un composant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Filter size={20} />
            <span>Filtres</span>
          </button>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => setSelectedComponent(component)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
            >
              <img
                src={component.image}
                alt={component.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{component.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{component.description.substring(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedComponent.name}</h2>
                <button
                  onClick={() => {
                    setSelectedComponent(null);
                    setGeneratedCode(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedComponent.image}
                    alt={selectedComponent.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
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
                  <button
                    onClick={() => generateCode(selectedComponent)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Générer le code
                  </button>
                  {loadingCode && (
                    <p className="text-blue-600 mt-2">⏳ Génération du code...</p>
                  )}
                  {generatedCode && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Code Généré</h3>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        {generatedCode}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CustomAppsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <IconBackground />
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("home")}
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
            Découvrez l'avenir du développement IoT avec notre service d'applications personnalisées alimenté par l'IA.
            Nous créons des solutions sur mesure qui s'intègrent parfaitement à votre infrastructure existante
            tout en exploitant des technologies de pointe.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🚀 Développement IoT Nouvelle Génération</h2>
            <p className="text-lg">
              Nos applications IoT personnalisées exploitent la puissance de l'IA Gemini pour l'automatisation intelligente,
              l'intégration en temps réel avec Google Sheets pour une gestion transparente des données, et une connectivité
              Gmail avancée pour des notifications et rapports instantanés.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Notre Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Tableau de Bord Maison Intelligente", desc: "Automatisation domestique complète avec insights IA" },
              { title: "Moniteur IoT Industriel", desc: "Surveillance d'usine en temps réel et analyses" },
              { title: "Hub de Capteurs Agricoles", desc: "Agriculture de précision avec intégration météo" },
              { title: "Système de Gestion Énergétique", desc: "Optimisation de la consommation avec prédictions ML" },
              { title: "Sécurité & Contrôle d'Accès", desc: "Reconnaissance faciale et gestion d'accès intelligente" },
              { title: "Moniteur Environnemental", desc: "Suivi de la qualité de l'air avec alertes prédictives" },
            ].map((app, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl h-full p-4 space-y-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                      <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                        <BarChart3 className="text-blue-600" size={32} />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-gray-100 rounded"></div>
                        <div className="h-8 bg-blue-100 rounded"></div>
                        <div className="h-8 bg-purple-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{app.title}</h3>
                  <p className="text-gray-600">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Pourquoi Choisir Nos Applications Personnalisées ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Brain className="text-blue-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Intelligence Alimentée par l'IA</h3>
              <p className="text-gray-600">Intégration IA Gemini pour la prise de décision intelligente et l'analyse prédictive</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FileSpreadsheet className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Synchronisation de Données en Temps Réel</h3>
              <p className="text-gray-600">Intégration transparente avec Google Sheets pour le partage de données en direct et la collaboration</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Mail className="text-red-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Notifications Instantanées</h3>
              <p className="text-gray-600">Intégration Gmail pour des alertes immédiates et des rapports automatisés</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Cloud className="text-purple-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Architecture Évolutive</h3>
              <p className="text-gray-600">Conception cloud-native qui évolue avec les besoins de votre entreprise</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Prêt à Transformer Votre Vision IoT ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Laissez notre équipe d'experts créer une solution IoT personnalisée qui correspond parfaitement à vos exigences.
              Du concept au déploiement, nous nous occupons de tout.
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
    </div>
  );

  // --- Page Routing ---
  switch (currentPage) {
    case "download":
      return <DownloadPage />;
    case "components":
      return <ComponentsPage />;
    case "custom":
      return <CustomAppsPage />;
    default:
      return <HomePage />;
  }
}

export default App;
