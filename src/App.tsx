import React, { useState } from 'react';

// Icons from lucide-react
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

// Mock Data: IoT Components (100 items)
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
  {
    id: 3,
    name: "Module XBee Series 2",
    image: "https://i.postimg.cc/tRNtJhtH/51vp-NMY8px-L-SL1000.jpg",
    description: "Module de communication sans fil de Digi utilisant le protocole Zigbee pour créer des réseaux maillés fiables.",
    voltage: "3.3V DC",
    specifications: ["Portée : 120m (extérieur)", "Fréquence : 2.4GHz", "Débit : 250kbps", "Interface : UART"]
  },
  {
    id: 4,
    name: "Servomoteur SG90",
    image: "https://i.postimg.cc/g29FgFQp/Servomoteur-Metallique-MG996-13-KG-360-maroc.jpg",
    description: "Petit servomoteur léger, utilisé pour le contrôle de position précis dans les projets de robotique et de modélisme.",
    voltage: "4.8-6V DC",
    specifications: ["Couple : 1.8kg/cm", "Vitesse : 0.12s/60°", "Poids : 9g", "Angle : 180°"]
  },
  {
    id: 5,
    name: "Mini Ventilateur DC",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/5.png",
    description: "Petit ventilateur fonctionnant en courant continu, utilisé pour le refroidissement de composants électroniques.",
    voltage: "5V DC",
    specifications: ["Taille : 30x30mm", "Débit d'air : 2.5CFM", "Niveau sonore : 25dB", "Courant : 0.1A"]
  },
  {
    id: 6,
    name: "Relais Statique (SSR) FOTEK SSR-40 DA",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/6.png",
    description: "Relais statique (Solid State Module) pour commuter des charges AC de 24-380V avec une commande DC de 3-32V.",
    voltage: "3-32V DC",
    specifications: ["Courant max : 40A", "Tension AC : 24-380V", "Isolation : 4000V", "Temps de réponse : 10ms"]
  },
  {
    id: 7,
    name: "Raspberry Pi 4",
    image: "https://i.postimg.cc/bwQXMVft/Raspberry-Pi-4-Model-B-4-GB-8-GB-RAM.jpg",
    description: "Micro-ordinateur monocarte polyvalent pour une multitude de projets, de la domotique au multimédia.",
    voltage: "5V DC",
    specifications: ["CPU : Quad-core 1.5GHz", "RAM : 2/4/8GB", "WiFi : 802.11ac", "USB : 2x USB3, 2x USB2"]
  },
  {
    id: 8,
    name: "Potentiomètre B50K",
    image: "https://i.postimg.cc/qM0hFRYB/8.png",
    description: "Potentiomètre rotatif de 50K ohms avec une courbe de réponse linéaire, utilisé pour ajuster des signaux analogiques.",
    voltage: "5V DC",
    specifications: ["Résistance : 50KΩ", "Tolérance : ±20%", "Puissance : 0.1W", "Type : Linéaire"]
  },
  {
    id: 9,
    name: "Mini Pompe à Eau Submersible",
    image: "https://i.postimg.cc/D0xs23JY/9.png",
    description: "Petite pompe à eau submersible fonctionnant à basse tension, idéale pour les projets d'arrosage automatique ou de fontaines.",
    voltage: "3-6V DC",
    specifications: ["Débit : 120L/h", "Hauteur max : 1m", "Courant : 0.5A", "Taille : 50x30mm"]
  },
  {
    id: 10,
    name: "Capteur de Pression (FSR)",
    image: "https://i.postimg.cc/XJcdzCVW/10.png",
    description: "Capteur de force résistif dont la résistance varie en fonction de la pression appliquée.",
    voltage: "3.3-5V DC",
    specifications: ["Plage de force : 0-10kg", "Résistance : 10KΩ (sans pression)", "Temps de réponse : 1ms", "Interface : Analogique"]
  },
  // ... (include all 100 components as previously provided)
  // For brevity, we'll keep this list concise. You already have the full list.
];

// Testimonials
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

// Home Page
const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
    <IconBackground />
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

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Explorer Smart ESP</h2>
          <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour le développement IoT</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
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

          <div className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center space-y-6">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Cpu className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Catalogue de Composants IoT</h3>
              <p className="text-gray-600">Accédez à une base de données complète de composants avec spécifications et images</p>
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

    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Applications IoT Personnalisées</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Des solutions sur mesure pour vos projets IoT – du concept à la livraison</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Hub de Capteurs Agricoles", desc: "Agriculture de précision avec intégration météo" },
            { title: "Système de Gestion Énergétique", desc: "Optimisation de la consommation avec prédictions ML" },
            { title: "Sécurité & Contrôle d'Accès", desc: "Reconnaissance faciale et gestion d'accès intelligente" },
            { title: "Moniteur Environnemental", desc: "Suivi de la qualité de l'air avec alertes prédictives" }
          ].map((app, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl h-full p-4 space-y-3">
                  <div className="flex space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`h-8 ${i % 2 === 0 ? 'bg-blue-100' : 'bg-purple-100'} rounded`}></div>
                    ))}
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
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Pourquoi Choisir Nos Applications Personnalisées ?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sur Mesure", desc: "Adaptées à vos besoins spécifiques" },
            { title: "Intégration IA", desc: "Assistant intelligent et automatisation" },
            { title: "Support Continu", desc: "Mises à jour et assistance incluses" },
            { title: "Déploiement Rapide", desc: "Livraison en 2-4 semaines" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ce que disent nos utilisateurs</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg relative">
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
            <h3 className="font-semibold mb-4">Liens</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Accueil</button></li>
              <li><button onClick={() => setCurrentPage('components')} className="hover:text-white">Composants</button></li>
              <li><button onClick={() => setCurrentPage('download')} className="hover:text-white">Téléchargements</button></li>
              <li><button onClick={() => setCurrentPage('custom')} className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
              <li><a href="#" className="hover:text-white">Tutoriels</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">contact@smartesp.com</p>
            <p className="text-gray-400">+212 6 10 03 88 21</p>
          </div>
        </div>
        <div className="mt-12 text-gray-500">
          <p>© 2025 Smart ESP. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
);

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

// Components Page
const ComponentsPage = ({ setCurrentPage, selectedComponent, setSelectedComponent }: {
  setCurrentPage: (page: string) => void;
  selectedComponent: Component | null;
  setSelectedComponent: (comp: Component | null) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your IoT Assistant. Ask me what components you need for your project (e.g., 'What do I need for a smart garden?').",
    },
  ]);
  const [recommendedComponents, setRecommendedComponents] = useState<Component[]>([]);

  const GEMINI_API_KEY = "AIzaSyCaf0dZY3tmfdR7Um0mUr-jnJCkLg8-XS4";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const extractComponentNames = (text: string): string[] => {
    const lines = text.split('\n');
    const names: string[] = [];
    lines.forEach(line => {
      let cleaned = line.trim().replace(/^[\d\-\*\•\s]+/, '').trim();
      cleaned = cleaned.replace(/^(capteur|module|afficheur|driver|relais|sensor|display|module|driver)\s+/i, '').trim();
      const match = iotComponents.find(comp =>
        comp.name.toLowerCase().includes(cleaned.toLowerCase()) ||
        cleaned.toLowerCase().includes(comp.name.toLowerCase())
      );
      if (match && !names.includes(match.name)) {
        names.push(match.name);
      }
    });
    return names;
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
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
      const matchedComponents = iotComponents.filter(comp => componentNames.includes(comp.name));
      setRecommendedComponents(matchedComponents);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process your request. Please try again." }]);
      console.error("Gemini API Error:", error);
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
  const [currentPage, setCurrentPage] = useState<'home' | 'components' | 'download' | 'custom'>('home');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  return (
    <>
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'components' && <ComponentsPage setCurrentPage={setCurrentPage} selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />}
      {currentPage === 'download' && <DownloadPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'custom' && <CustomAppsPage setCurrentPage={setCurrentPage} />}
      {!['home', 'components', 'download', 'custom'].includes(currentPage) && <NotFoundPage setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
