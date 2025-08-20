import React, { useState } from 'react';
import { ChevronLeft, Download, Search, Filter, Play, Star, Cpu, Wifi, Cloud, BarChart3, Database, Zap, Smartphone, Globe, Mail, FileSpreadsheet, Brain, Settings, ExternalLink } from 'lucide-react';

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

// Mock data
const iotComponents: Component[] = [
  {
    id: 1,
    name: "Capteur DHT11 Température & Humidité",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
    description: "Capteur numérique de température et d'humidité avec sortie de signal numérique calibrée",
    voltage: "3.3-5V DC",
    specifications: ["Plage de température : 0-50°C", "Plage d'humidité : 20-90%RH", "Précision : ±2°C, ±5%RH", "Temps de réponse : 6-10s"]
  },
  {
    id: 2,
    name: "Capteur de Gaz MQ2",
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    description: "Capteur de détection de fumée et de gaz pour GPL, propane, méthane, alcool, hydrogène",
    voltage: "5V DC",
    specifications: ["Plage de détection : 200-10000ppm", "Tension de chauffage : 5V", "Résistance de charge : 20kΩ", "Temps de préchauffage : 20s"]
  },
  {
    id: 3,
    name: "Carte de Développement ESP32",
    image: "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
    description: "Microcontrôleur WiFi & Bluetooth avec processeur double cœur",
    voltage: "3.3V",
    specifications: ["CPU : Double cœur 240MHz", "WiFi : 802.11 b/g/n", "Bluetooth : v4.2 BR/EDR + BLE", "GPIO : 34 broches"]
  },
  {
    id: 4,
    name: "ESP8266 NodeMCU",
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg",
    description: "Microcontrôleur WiFi avec pile de protocoles TCP/IP intégrée",
    voltage: "3.3V",
    specifications: ["CPU : 80MHz", "Flash : 4MB", "WiFi : 802.11 b/g/n", "GPIO : 17 broches"]
  },
  {
    id: 5,
    name: "Pilote de Moteur L298N",
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    description: "Pilote de moteur double pont en H pour moteurs DC et pas à pas",
    voltage: "5-35V",
    specifications: ["Courant de sortie : 2A par canal", "Puissance max : 25W", "Tension logique : 5V", "Contrôle : Compatible PWM"]
  },
  {
    id: 6,
    name: "Capteur Ultrasonique HC-SR04",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
    description: "Capteur de mesure de distance sans contact utilisant des ondes ultrasoniques",
    voltage: "5V DC",
    specifications: ["Portée : 2cm-400cm", "Précision : 3mm", "Fréquence : 40kHz", "Impulsion de déclenchement : 10µs"]
  }
];

// Generate more components (simplified for demo)
for (let i = 7; i <= 100; i++) {
  iotComponents.push({
    id: i,
    name: `Composant IoT ${i}`,
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    description: `Composant IoT avancé pour diverses applications et projets`,
    voltage: "3.3-5V DC",
    specifications: [`Fonctionnalité ${i}A`, `Fonctionnalité ${i}B`, `Fonctionnalité ${i}C`, `Fonctionnalité ${i}D`]
  });
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Ingénieur IoT",
    company: "TechCorp",
    text: "Smart ESP a révolutionné notre processus de développement IoT. L'intégration Gemini AI fournit des suggestions de projets incroyables !",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Chef de Produit",
    company: "InnovateLabs",
    text: "L'intégration Google Sheets rend le partage de données transparent. La collaboration de notre équipe n'a jamais été aussi bonne.",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Créateur",
    company: "Passionné DIY",
    text: "En tant qu'amateur, Smart ESP rend les projets IoT complexes accessibles. Le catalogue de composants est incroyablement utile !",
    rating: 5
  },
  {
    id: 4,
    name: "Elena Popov",
    role: "Directrice Technique",
    company: "SmartHome Solutions",
    text: "L'intégration Gmail et l'assistant IA ont rationalisé tout notre flux de travail IoT. Hautement recommandé !",
    rating: 5
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredComponents = iotComponents.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative IoT Icons */}
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

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
      <IconBackground />
      
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                  Smart ESP – La plateforme IoT unique, intelligente et simple pour vos  <span className="text-blue-600">Projets ESP</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                 Smart ESP est une plateforme IoT unique, idéale pour les étudiants et
                  débutants en IoT, qui simplifie vos projets ESP32 et ESP8266. Collectez, 
                  commandez, surveillez et partagez vos données en temps réel, avec Google Sheets,
                  Gmail et assistance IA, le tout sans configuration complexe.
                </p>
              </div>
              
              {/* Tech Stack Highlights */}
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

            {/* Right Side - App Screenshot */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg" 
                  alt="Capture d'écran de l'application Smart ESP"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
        <IconBackground />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-xl text-gray-600">Approuvé par les développeurs et créateurs du monde entier</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
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

      {/* Three Big Cards Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explorer Smart ESP</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour le développement IoT</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1: Download Smart ESP */}
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center space-y-6">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Download className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Télécharger Smart ESP</h3>
                <p className="text-gray-600">Obtenez l'application Smart ESP complète avec toutes les bibliothèques et pilotes</p>
                <button 
                  onClick={() => setCurrentPage('download')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  Voir les Téléchargements
                </button>
              </div>
              <div className="absolute top-4 right-4 text-blue-200/50">
                <Smartphone size={24} />
              </div>
            </div>

            {/* Card 2: IoT Components */}
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center space-y-6">
                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Cpu className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Catalogue de Composants IoT</h3>
                <p className="text-gray-600">Parcourez notre vaste catalogue de plus de 100 composants IoT avec des spécifications détaillées</p>
                <button 
                  onClick={() => setCurrentPage('components')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                >
                  Parcourir les Composants
                </button>
              </div>
              <div className="absolute top-4 right-4 text-green-200/50">
                <Zap size={24} />
              </div>
            </div>

            {/* Card 3: Custom IoT Apps */}
            <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center space-y-6">
                <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</h3>
                <p className="text-gray-600">Commandez des applications IoT personnalisées adaptées à vos besoins spécifiques</p>
                <button 
                  onClick={() => setCurrentPage('custom')}
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

      {/* Footer */}
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
      
      {/* Navigation */}
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
              <span className="text-2xl font-bold text-gray-800">Téléchargements Smart ESP</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* App Screenshots */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Captures d'Écran de l'Application</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[9/16] bg-gradient-to-br from-blue-600 to-blue-800 p-4">
                  <div className="bg-white rounded-lg h-full p-4 space-y-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded"></div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="h-8 bg-gray-100 rounded"></div>
                        <div className="h-8 bg-blue-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Download Buttons */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
  <a
    href="https://lien-vers-app-smart-esp.com"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
  >
    <Download size={24} />
    <span>Application Smart ESP</span>
  </a>

  <a
    href="https://lien-vers-bibliotheque-esp32.com"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
  >
    <Download size={24} />
    <span>Bibliothèque ESP32</span>
  </a>

  <a
    href="https://lien-vers-bibliotheque-esp8266.com"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
  >
    <Download size={24} />
    <span>Bibliothèque ESP8266</span>
  </a>

  <a
    href="https://lien-vers-fichier-pilote-esp.com"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-3 transform hover:scale-105"
  >
    <Download size={24} />
    <span>Fichier Pilote ESP</span>
  </a>
</div>


        {/* Embedded YouTube Video */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Vidéo de Démarrage</h3>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
      
      {/* Navigation */}
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
              <span className="text-2xl font-bold text-gray-800">Composants IoT</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Filtrer</span>
            </button>
          </div>
        </div>

        {/* Components Grid */}
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

      {/* Component Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedComponent.name}</h2>
                <button 
                  onClick={() => setSelectedComponent(null)}
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
      
      {/* Navigation */}
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
        {/* Hero Section */}
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

        {/* App Screenshots Portfolio */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Notre Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Tableau de Bord Maison Intelligente", desc: "Automatisation domestique complète avec insights IA" },
              { title: "Moniteur IoT Industriel", desc: "Surveillance d'usine en temps réel et analyses" },
              { title: "Hub de Capteurs Agricoles", desc: "Agriculture de précision avec intégration météo" },
              { title: "Système de Gestion Énergétique", desc: "Optimisation de la consommation avec prédictions ML" },
              { title: "Sécurité & Contrôle d'Accès", desc: "Reconnaissance faciale et gestion d'accès intelligente" },
              { title: "Moniteur Environnemental", desc: "Suivi de la qualité de l'air avec alertes prédictives" }
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

        {/* Features Section */}
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

        {/* CTA Section */}
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

  // Main render logic
  switch (currentPage) {
    case 'download':
      return <DownloadPage />;
    case 'components':
      return <ComponentsPage />;
    case 'custom':
      return <CustomAppsPage />;
    default:
      return <HomePage />;
  }
}

export default App;
