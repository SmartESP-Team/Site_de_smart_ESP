import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Download,
  Search,
  Filter,
  Cpu,
  Copy,
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
  {
    id: 11,
    name: "Capteur de Gaz (Série MQ)",
    image: "https://i.postimg.cc/s2tYbmYt/MQ-2-Smoke-Gas-Sensor-Module-3-removebg-preview_-_Copie.png",
    description: "Module capteur de gaz pour la détection de divers types de gaz (GPL, fumée, alcool, etc.).",
    voltage: "5V DC",
    specifications: ["Plage de détection : 200-10000ppm", "Temps de préchauffage : 20s", "Sortie : Analogique/Numérique", "Consommation : 150mA"]
  },
  {
    id: 12,
    name: "Adaptateur Secteur USB",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/12.png",
    description: "Alimentation pour fournir du courant continu via un port USB à partir d'une prise secteur.",
    voltage: "5V DC",
    specifications: ["Puissance : 5W", "Courant : 1A", "Tension d'entrée : 100-240V AC", "Taille : 50x30mm"]
  },
  {
    id: 13,
    name: "Module de Communication Sans Fil",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/27.png",
    description: "Module générique pour la communication sans fil, potentiellement Wi-Fi ou Bluetooth.",
    voltage: "3.3-5V DC",
    specifications: ["Portée : 100m", "Fréquence : 2.4GHz", "Débit : 1Mbps", "Interface : UART/SPI"]
  },
  {
    id: 14,
    name: "Module Joystick Analogique",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/14.png",
    description: "Module joystick à deux axes (X et Y) avec un bouton-poussoir, pour le contrôle de projets.",
    voltage: "5V DC",
    specifications: ["Axes : X/Y", "Sortie : Analogique", "Bouton intégré : Oui", "Taille : 30x30mm"]
  },
  {
    id: 15,
    name: "Capteur de Mouvement PIR",
    image: "https://i.postimg.cc/nLsKdgD4/otronic-capteur-pir-hc-sr501-detecteur-de-mouvemen_-_Copie.webp",
    description: "Capteur infrarouge passif (PIR) pour détecter le mouvement de personnes ou d'animaux.",
    voltage: "5V DC",
    specifications: ["Portée : 7m", "Angle : 110°", "Temps de blocage : 2.5s", "Sortie : Numérique"]
  },
  {
    id: 16,
    name: "Module Lecteur RFID RC522",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/16.png",
    description: "Module lecteur/écrivain RFID fonctionnant à 13.56MHz, livré avec une carte et un porte-clés RFID.",
    voltage: "3.3V DC",
    specifications: ["Fréquence : 13.56MHz", "Portée : 5cm", "Interface : SPI", "Protocole : ISO14443A"]
  },
  {
    id: 17,
    name: "Module Relais",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/17.png",
    description: "Module relais électromécanique pour commander des appareils à haute tension/courant à partir d'un microcontrôleur.",
    voltage: "5V DC",
    specifications: ["Courant max : 10A", "Tension AC : 250V", "Tension DC : 30V", "Interface : Numérique"]
  },
  {
    id: 18,
    name: "Module Ethernet ENC28J60",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/18.png",
    description: "Module permettant de connecter un microcontrôleur à un réseau Ethernet.",
    voltage: "3.3V DC",
    specifications: ["Vitesse : 10Mbps", "Interface : SPI", "RAM : 8KB", "Protocole : TCP/IP"]
  },
  {
    id: 19,
    name: "Matrice LED 8x8 avec Driver MAX7219",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/19.png",
    description: "Afficheur à matrice de 64 LEDs (8x8) contrôlé par un driver MAX7219 pour un affichage simple.",
    voltage: "5V DC",
    specifications: ["Résolution : 8x8", "Couleur : Rouge", "Interface : SPI", "Consommation : 300mA"]
  },
  {
    id: 20,
    name: "Diode Électroluminescente (LED)",
    image: "https://i.postimg.cc/Rh1L7tn2/LEDR5-39458-Copie.jpg",
    description: "Composant électronique émettant de la lumière lorsqu'il est traversé par un courant électrique.",
    voltage: "2-3.5V DC",
    specifications: ["Couleur : Rouge", "Tension : 2V", "Courant : 20mA", "Taille : 5mm"]
  },
  {
    id: 21,
    name: "Capteur de Courant ACS712",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/21.png",
    description: "Module capteur de courant basé sur l'effet Hall pour mesurer le courant AC ou DC.",
    voltage: "5V DC",
    specifications: ["Plage : ±20A", "Sortie : Analogique", "Précision : 1.5%", "Isolation : Oui"]
  },
  {
    id: 22,
    name: "Bouton tactile",
    image: "https://i.postimg.cc/Kvc7MRJ3/51l-Vs5-Rfjv-L-UF350-350-QL80-removebg-preview-Copie.png",
    description: "Module avec un bouton poussoir tactile pour une entrée utilisateur simple.",
    voltage: "3.3-5V DC",
    specifications: ["Type : Tactile", "Sortie : Numérique", "Durée de vie : 1M cycles", "Taille : 12mm"]
  },
  {
    id: 23,
    name: "Capteur à Effet Hall KY-003",
    image: "https://i.postimg.cc/yYPTWFKZ/KY-039-02.png",
    description: "Capteur qui détecte la présence d'un champ magnétique, utilisé comme interrupteur sans contact.",
    voltage: "5V DC",
    specifications: ["Sortie : Numérique", "Sensibilité : 3mT", "Temps de réponse : 3µs", "Interface : Numérique"]
  },
  {
    id: 24,
    name: "Câbles de Connexion (Jumper Wires)",
    image: "https://i.postimg.cc/R08d44Bp/jumper-wire-kabel-40-stk-je-20-cm-m2m-male-to-male-kompatibel-mit-arduino-und-raspberry-pi-breadboar.jpg",
    description: "Nappe de câbles flexibles pour connecter des composants sur une platine d'expérimentation.",
    voltage: "N/A",
    specifications: ["Longueur : 20cm", "Type : Mâle-Mâle", "Couleur : Multicolore", "Matériau : Cuivre étamé"]
  },
  {
    id: 25,
    name: "Driver de Moteur Pas-à-Pas",
    image: "https://i.postimg.cc/bvvVqm2r/image2-F12298792-F202110282-Fob-5aa405-5dbbef32dc5d840db6605304-1-large.jpg",
    description: "Module de commande pour piloter un ou plusieurs moteurs pas-à-pas avec précision.",
    voltage: "5-35V DC",
    specifications: ["Courant max : 2A", "Micro-pas : 1/16", "Interface : PWM", "Taille : 40x60mm"]
  },
  {
    id: 26,
    name: "Résistance",
    image: "https://i.postimg.cc/rwVQ9fjj/images-removebg-preview-Copie.png",
    description: "Composant passif utilisé pour limiter le courant dans un circuit électrique.",
    voltage: "N/A",
    specifications: ["Valeur : 10KΩ", "Tolérance : ±5%", "Puissance : 0.25W", "Type : Axial"]
  },
  {
    id: 27,
    name: "Module de Communication Longue Portée (LoRa)",
    image: "https://i.postimg.cc/GtkHgwr5/27.png",
    description: "Module de communication sans fil longue portée et basse consommation, idéal pour les projets IoT.",
    voltage: "3.3V DC",
    specifications: ["Portée : 10km", "Fréquence : 433/868/915MHz", "Débit : 300bps-50kbps", "Interface : SPI"]
  },
  {
    id: 28,
    name: "Capteur d'Humidité du Sol",
    image: "https://i.postimg.cc/FRdPL1pQ/images-1-Copie.jpg",
    description: "Capteur permettant de mesurer le taux d'humidité dans le sol, souvent utilisé pour l'arrosage automatique.",
    voltage: "3.3-5V DC",
    specifications: ["Sortie : Analogique", "Plage : 0-100%", "Temps de réponse : 2s", "Durée de vie : 10K cycles"]
  },
  {
    id: 29,
    name: "Driver de Moteur L298N",
    image: "https://i.postimg.cc/C13cHYrn/images-Copie.jpg",
    description: "Pont en H double pour contrôler la direction et la vitesse de deux moteurs DC ou d'un moteur pas-à-pas.",
    voltage: "5-35V DC",
    specifications: ["Courant max : 2A", "Tension logique : 5V", "Interface : PWM", "Taille : 43x43mm"]
  },
  {
    id: 30,
    name: "Transistor NPN",
    image: "https://i.postimg.cc/Xq9QshtH/image-599.webp",
    description: "Composant semi-conducteur utilisé pour amplifier ou commuter des signaux électroniques et de la puissance électrique.",
    voltage: "N/A",
    specifications: ["Type : NPN", "Gain : 100-300", "Courant : 800mA", "Tension : 40V"]
  },
  {
    id: 31,
    name: "Moteur Pas-à-Pas 28BYJ-48 avec Driver ULN2003",
    image: "https://i.postimg.cc/YqmX949N/DZD000597-1-550x550-png-Copie.webp",
    description: "Ensemble moteur pas-à-pas et sa carte de commande, pour un contrôle de position précis et simple.",
    voltage: "5V DC",
    specifications: ["Pas : 5.625°", "Réduction : 1/64", "Courant : 120mA", "Interface : ULN2003"]
  },
  {
    id: 32,
    name: "Capteur Environnemental BME280",
    image: "https://i.postimg.cc/13sYjmmp/H276712715b94425fb99630fac4f4d6b8-D-jpg-640x640-Q90-jpg-Copie.webp",
    description: "Capteur numérique mesurant la pression atmosphérique, la température et l'humidité.",
    voltage: "3.3V DC",
    specifications: ["Pression : 300-1100hPa", "Température : -40 à +85°C", "Humidité : 0-100%", "Interface : I2C/SPI"]
  },
  {
    id: 33,
    name: "Capteur de Température Linéaire",
    image: "https://powertech-dz.net/media/products/4.jfif",
    description: "Capteur de température analogique dont la tension de sortie est directement proportionnelle à la température.",
    voltage: "5V DC",
    specifications: ["Plage : -55 à +150°C", "Sortie : 10mV/°C", "Précision : ±1°C", "Interface : Analogique"]
  },
  {
    id: 34,
    name: "Condensateur Électrolytique",
    image: "https://i.postimg.cc/5t9T6xDx/F7110933-01-Copie.webp",
    description: "Composant qui stocke de l'énergie électrique, utilisé pour le filtrage et le lissage de tension.",
    voltage: "N/A",
    specifications: ["Capacité : 1000µF", "Tension : 16V", "Tolérance : ±20%", "Type : Radial"]
  },
  {
    id: 35,
    name: "Capteur de Pluie",
    image: "https://i.postimg.cc/V6pVGXv6/e79102673-regen-sensor-module-x-Copie.png",
    description: "Module détectant la présence de pluie ou d'eau sur sa surface de détection.",
    voltage: "5V DC",
    specifications: ["Sortie : Analogique/Numérique", "Temps de réponse : 1s", "Taille : 50x40mm", "Durée de vie : 50K cycles"]
  },
  {
    id: 36,
    name: "Module Horloge Temps Réel (RTC) DS3231",
    image: "https://i.postimg.cc/25Y9gzCQ/ds3231-At24c32-iic-precision-Rtc.jpg",
    description: "Module qui maintient l'heure et la date de manière précise, même lorsque l'alimentation principale est coupée.",
    voltage: "3.3-5V DC",
    specifications: ["Précision : ±2ppm", "Interface : I2C", "Mémoire : 32KB", "Taille : 38x22mm"]
  },
  {
    id: 37,
    name: "Encodeur Rotatif",
    image: "https://i.postimg.cc/YCYyX4B2/doc-ky-040-rotary-encoder-overview.jpg",
    description: "Capteur de position rotatif qui fournit des impulsions pour déterminer l'angle et la direction de rotation.",
    voltage: "5V DC",
    specifications: ["Résolution : 20 impulsions/tour", "Type : Incrémental", "Interface : Numérique", "Taille : 30mm"]
  },
  {
    id: 38,
    name: "Capteur de Température et d'Humidité DHT11",
    image: "https://i.postimg.cc/3wZfTPwP/dht11-temperature-humidity-sensor-module-breakout-removebg-preview-Copie.png",
    description: "Capteur numérique pour mesurer la température et l'humidité ambiantes.",
    voltage: "3.3-5V DC",
    specifications: ["Température : 0-50°C", "Humidité : 20-90%RH", "Précision : ±2°C, ±5%RH", "Interface : Numérique"]
  },
  {
    id: 39,
    name: "Pompe Péristaltique",
    image: "https://i.postimg.cc/66VqNcVC/capteur-de-debit-de-l-eau-g12-yf-s201-Copie.jpg",
    description: "Type de pompe volumétrique utilisée pour pomper une variété de fluides avec précision.",
    voltage: "12V DC",
    specifications: ["Débit : 100mL/min", "Pression : 0.1MPa", "Taille : 100x50mm", "Matériau : Silicone"]
  },
  {
    id: 40,
    name: "Dissipateur Thermique",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpxm8A4FtQSh-pmkTqzZfCwZXxNHDOUsZlxw&s",
    description: "Composant passif qui dissipe la chaleur générée par un composant électronique pour éviter la surchauffe.",
    voltage: "N/A",
    specifications: ["Matériau : Aluminium", "Taille : 20x20mm", "Résistance thermique : 5°C/W", "Poids : 10g"]
  },
  {
    id: 41,
    name: "Capteur de Courant Non-Invasif",
    image: "https://i.postimg.cc/59zvQ8Bt/capteur-courant-ac-detachable-100a-max-seeedstudio-Copie.jpg",
    description: "Transformateur de courant qui se clipse autour d'un fil pour mesurer le courant AC sans couper le circuit.",
    voltage: "N/A",
    specifications: ["Plage : 0-100A", "Sortie : 0-50mA", "Précision : ±1%", "Taille : 30x20mm"]
  },
  {
    id: 42,
    name: "Module Accéléromètre/Gyroscope MPU-6050",
    image: "https://i.postimg.cc/sgXtwfDv/617088-1.webp",
    description: "Unité de mesure inertielle (IMU) à 6 axes qui combine un accéléromètre 3 axes et un gyroscope 3 axes.",
    voltage: "3.3-5V DC",
    specifications: ["Accéléromètre : ±2/4/8/16g", "Gyroscope : ±250/500/1000/2000°/s", "Interface : I2C", "Taille : 20x15mm"]
  },
  {
    id: 43,
    name: "Arduino Uno",
    image: "https://i.postimg.cc/9M7bLMkt/46.png",
    description: "Plateforme de prototypage électronique open-source basée sur du matériel et des logiciels faciles à utiliser.",
    voltage: "5V DC",
    specifications: ["Microcontrôleur : ATmega328P", "Flash : 32KB", "GPIO : 14", "PWM : 6"]
  },
  {
    id: 44,
    name: "Haut-parleur / Buzzer",
    image: "https://french.uttransducer.com/photo/pl32845753-12v_mini_low_voltage_piezo_buzzer_piezo_element_speaker_musical_card_device.jpg",
    description: "Composant transducteur qui convertit un signal électrique en son.",
    voltage: "3-12V DC",
    specifications: ["Fréquence : 2-5kHz", "Puissance : 0.5W", "Taille : 12mm", "Type : Piézo"]
  },
  {
    id: 45,
    name: "Afficheur 7 Segments",
    image: "https://i.postimg.cc/02fM1vRY/48.png",
    description: "Dispositif d'affichage électronique permettant de montrer des chiffres décimaux et quelques lettres.",
    voltage: "5V DC",
    specifications: ["Type : Cathode commune", "Couleur : Rouge", "Taille : 0.56\"", "Interface : Numérique"]
  },
  {
    id: 46,
    name: "Module Capteur de Son",
    image: "https://i.postimg.cc/hPJLrHRK/a-P1-G8y-Jb-Yuw-A-img202504011832491887105786-removebg-preview-Copie.png",
    description: "Module avec un microphone pour détecter l'intensité sonore ambiante.",
    voltage: "5V DC",
    specifications: ["Sortie : Analogique", "Sensibilité : -44dB", "Fréquence : 50Hz-10kHz", "Taille : 20x15mm"]
  },
  {
    id: 47,
    name: "DHT22 Température/Humidité",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/51.png",
    description: "Capteur numérique pour mesurer la température et l'humidité avec une plus grande précision que le DHT11.",
    voltage: "3.3-5V DC",
    specifications: ["Température : -40 à +80°C", "Humidité : 0-100%RH", "Précision : ±0.5°C, ±2%RH", "Interface : Numérique"]
  },
  {
    id: 48,
    name: "ADS1115 Convertisseur Analogique-Numérique (CAN)",
    image: "https://www.f-legrand.fr/scidoc/figures/sciphys/arduino/ads1115/platine-ads1115.png",
    description: "Module convertisseur analogique-numérique de précision à 16 bits pour lire des signaux analogiques.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 16 bits", "Débit : 860SPS", "Interface : I2C", "Taille : 15x20mm"]
  },
  {
    id: 49,
    name: "Capteur Tactile Capacitif",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/63.png",
    description: "Module qui fonctionne comme un bouton poussoir sans contact, détectant le toucher par variation de capacité.",
    voltage: "3.3-5V DC",
    specifications: ["Sortie : Numérique", "Sensibilité : Ajustable", "Taille : 10mm", "Durée de vie : 1M cycles"]
  },
  {
    id: 50,
    name: "Clavier Matriciel 4x4",
    image: "https://i.postimg.cc/ZRh6Hczj/54.png",
    description: "Clavier à membrane avec 16 touches disposées en matrice 4x4 pour l'entrée de données.",
    voltage: "5V DC",
    specifications: ["Touches : 16", "Disposition : 4x4", "Interface : Numérique", "Taille : 80x80mm"]
  },
  {
    id: 51,
    name: "Buzzer",
    image: "https://i.postimg.cc/NGDR8mJ7/55.png",
    description: "Composant de signalisation audio qui produit un son (bip, tonalité) lorsqu'il est alimenté.",
    voltage: "3-5V DC",
    specifications: ["Fréquence : 2.5kHz", "Puissance : 0.1W", "Taille : 9mm", "Type : Actif"]
  },
  {
    id: 52,
    name: "ESP32",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/56.png",
    description: "Microcontrôleur avec Wi-Fi et Bluetooth intégrés, monté sur une carte de développement pour un prototypage facile.",
    voltage: "3.3V DC",
    specifications: ["CPU : Dual-core 240MHz", "WiFi : 802.11 b/g/n", "Bluetooth : v4.2", "GPIO : 34"]
  },
  {
    id: 53,
    name: "ESP8266 NodeMCU",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/58.png",
    description: "Plateforme IoT open-source populaire utilisant le microcontrôleur ESP8266 avec Wi-Fi intégré.",
    voltage: "3.3V DC",
    specifications: ["CPU : 80MHz", "Flash : 4MB", "WiFi : 802.11 b/g/n", "GPIO : 17"]
  },
  {
    id: 54,
    name: "Serrure Électrique à Solénoïde",
    image: "https://m.media-amazon.com/images/I/51olJLjdavL.jpg",
    description: "Dispositif de verrouillage électromécanique qui peut être contrôlé par un signal électrique.",
    voltage: "12V DC",
    specifications: ["Courant : 0.5A", "Force : 50N", "Taille : 60x40mm", "Type : Fail-safe"]
  },
  {
    id: 55,
    name: "FTDI Adaptateur USB vers Série TTL",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/60.png",
    description: "Convertisseur qui permet de connecter des appareils avec une interface série (UART) à un ordinateur via USB.",
    voltage: "5V DC",
    specifications: ["Débit : 3Mbps", "Interface : USB/UART", "Taille : 50x20mm", "Alimentation : USB"]
  },
  {
    id: 56,
    name: "Module GPS",
    image: "https://www.ubuy.ma/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFoOWtGS2oweEwuX1NTNDAwXy5qcGc.jpg",
    description: "Récepteur GPS pour obtenir des données de géolocalisation (latitude, longitude, altitude) à partir des satellites.",
    voltage: "3.3-5V DC",
    specifications: ["Précision : 2.5m", "Fréquence : 1Hz", "Interface : UART", "Taille : 25x25mm"]
  },
  {
    id: 57,
    name: "Lecteur de Carte MicroSD",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/62.png",
    description: "Module permettant de lire et d'écrire des données sur une carte mémoire MicroSD avec un microcontrôleur.",
    voltage: "3.3-5V DC",
    specifications: ["Capacité max : 32GB", "Interface : SPI", "Taille : 22x30mm", "Vitesse : 2MB/s"]
  },
  {
    id: 58,
    name: "TTP223B / Tactile TTP223B",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/63.png",
    description: "Interrupteur tactile capacitif simple basé sur le circuit intégré TTP223B.",
    voltage: "2-5.5V DC",
    specifications: ["Sortie : Numérique", "Sensibilité : Ajustable", "Taille : 10mm", "Durée de vie : 1M cycles"]
  },
  {
    id: 59,
    name: "Module Capteur de Vibration SW-420",
    image: "https://es-online.tn/storage/admin/articles/article_35668/image/Module%20de%20capteur%20de%20vibrations%20de%20type%20normalement%20ferm%C3%A9.jpg12-12-2024-09-59.jpg",
    description: "Module qui détecte les vibrations ou les chocs, souvent utilisé dans les systèmes d'alarme.",
    voltage: "3.3-5V DC",
    specifications: ["Sortie : Numérique", "Sensibilité : Ajustable", "Taille : 15mm", "Durée de vie : 100K cycles"]
  },
  {
    id: 60,
    name: "Platine d'Expérimentation (Breadboard)",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/65.png",
    description: "Planche de prototypage réutilisable pour construire des circuits électroniques sans soudure.",
    voltage: "N/A",
    specifications: ["Trous : 830", "Taille : 165x55mm", "Matériau : ABS", "Couleur : Blanc"]
  },
  {
    id: 61,
    name: "Carte Arduino Nano",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/66.png",
    description: "Version compacte de la carte Arduino Uno, idéale pour les projets où l'espace est limité.",
    voltage: "5V DC",
    specifications: ["Microcontrôleur : ATmega328P", "Flash : 32KB", "GPIO : 22", "PWM : 6"]
  },
  {
    id: 62,
    name: "DS18B20/Température Étanche",
    image: "https://a2itronic.ma/wp-content/uploads/2022/01/SONDE-DE-TEMPERATURE-ETANCHE-DS18B20_1.jpg",
    description: "Sonde de température numérique étanche qui utilise le protocole de communication 1-Wire.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : -55 à +125°C", "Précision : ±0.5°C", "Interface : 1-Wire", "Étanche : IP67"]
  },
  {
    id: 63,
    name: "Empreintes Digitales",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/68.png",
    description: "Capteur biométrique pour lire et identifier les empreintes digitales, utilisé pour la sécurité et l'authentification.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 500DPI", "Interface : UART", "Taille : 56x20mm", "Capacité : 1000 empreintes"]
  },
  {
    id: 64,
    name: "Obstacle Infrarouge",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/64.png",
    description: "Module qui détecte la présence d'objets devant lui en émettant et recevant de la lumière infrarouge.",
    voltage: "5V DC",
    specifications: ["Portée : 2-30cm", "Sortie : Numérique", "Taille : 20mm", "Angle : 35°"]
  },
  {
    id: 65,
    name: "Capteur de Flamme",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/70.png",
    description: "Capteur conçu pour détecter la présence d'une flamme en se basant sur son rayonnement infrarouge.",
    voltage: "3.3-5V DC",
    specifications: ["Portée : 0.8m", "Sortie : Numérique", "Taille : 20mm", "Angle : 60°"]
  },
  {
    id: 66,
    name: "Module GSM/GPRS SIM800L",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/71.png",
    description: "Module pour ajouter des fonctionnalités de téléphonie mobile (appels, SMS) et de connexion de données GPRS à un projet.",
    voltage: "3.7-4.2V DC",
    specifications: ["Fréquence : 850/900/1800/1900MHz", "Interface : UART", "Taille : 25x25mm", "Consommation : 1A"]
  },
  {
    id: 67,
    name: "Afficheur LCD 16x2",
    image: "https://i.postimg.cc/Qd27NbCs/72.png",
    description: "Écran à cristaux liquides (LCD) capable d'afficher 2 lignes de 16 caractères.",
    voltage: "5V DC",
    specifications: ["Résolution : 16x2", "Couleur : Bleu/Vert", "Interface : Parallèle", "Taille : 80x36mm"]
  },
  {
    id: 68,
    name: "Capteur de Luminosité (LDR)",
    image: "https://via.placeholder.com/150?text=Component+68",
    description: "Capteur passif dont la résistance varie en fonction de l'intensité lumineuse ambiante.",
    voltage: "3.3-5V DC",
    specifications: ["Type : Analogique", "Plage de détection : 1-1000 lux", "Temps de réponse : 10ms", "Angle : 120°"]
  },
  {
    id: 69,
    name: "Module Microphone MAX9814",
    image: "https://robu.in/wp-content/uploads/2023/11/3-12.jpg",
    description: "Microphone amplifié avec gain ajustable, idéal pour la détection de sons ou la reconnaissance vocale.",
    voltage: "3.3-5V DC",
    specifications: ["Gain : 30-60dB", "Sortie : Analogique", "Fréquence : 20Hz-20kHz", "Alimentation : 3.3-5V"]
  },
  {
    id: 70,
    name: "Capteur de Distance Ultrason HC-SR04",
    image: "https://microcell.ma/wp-content/uploads/2024/02/ultrasonic-hc04.jpg",
    description: "Module de mesure de distance par écho ultrasonore, utilisé pour la détection d'obstacles.",
    voltage: "5V DC",
    specifications: ["Portée : 2cm-4m", "Précision : ±3mm", "Angle : 15°", "Sortie : Numérique (Trigger/Echo)"]
  },
  {
    id: 71,
    name: "Moteur DC 6V",
    image: "https://microcell.ma/wp-content/uploads/2024/02/MO-TT-02-a-800x800-1.webp",
    description: "Moteur à courant continu simple, utilisé pour la propulsion dans les robots ou les véhicules miniatures.",
    voltage: "6V DC",
    specifications: ["Vitesse : 200 RPM", "Couple : 0.5kg·cm", "Courant : 200mA", "Taille : 30x20mm"]
  },
  {
    id: 72,
    name: "Module Amplificateur Audio PAM8403",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/8.png",
    description: "Amplificateur stéréo numérique 2x3W, idéal pour les projets audio avec haut-parleurs.",
    voltage: "5V DC",
    specifications: ["Puissance : 2x3W", "THD : <1%", "Entrée : Analogique", "Classe : D"]
  },
  {
    id: 73,
    name: "Capteur de CO2 MH-Z19B",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/9.png",
    description: "Capteur de dioxyde de carbone (CO2) basé sur la technologie NDIR, utilisé pour la qualité de l'air.",
    voltage: "5V DC",
    specifications: ["Plage : 0-5000ppm", "Précision : ±50ppm", "Sortie : UART/PWM", "Temps de préchauffage : 3min"]
  },
  {
    id: 74,
    name: "Module de Communication NRF24L01",
    image: "https://digiwarestore.com/12119-thickbox_default/nrf24l01-nrf-wireless-communication-module-for-arduino-432365.jpg",
    description: "Module sans fil 2.4GHz à faible consommation, utilisé pour la communication entre microcontrôleurs.",
    voltage: "3.3V DC",
    specifications: ["Portée : 100m (module amplifié)", "Débit : 250kbps-2Mbps", "Interface : SPI", "Consommation : 12mA"]
  },
  {
    id: 75,
    name: "Capteur de Qualité de l'Air (SGP30)",
    image: "https://www.kubii.com/9406-full_default/capteur-qualite-de-l-air-sgp30-breakout.jpg",
    description: "Capteur numérique de qualité de l'air intérieur, mesurant les COV et le CO2 équivalent.",
    voltage: "3.3V DC",
    specifications: ["Mesures : COV, eCO2", "Interface : I2C", "Durée de vie : 5 ans", "Précision : ±15%"]
  },
  {
    id: 76,
    name: "Pompe à Air pour Aquarium",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/10.png",
    description: "Mini pompe à air 12V pour aérer l'eau dans les aquariums ou systèmes hydroponiques.",
    voltage: "12V DC",
    specifications: ["Débit : 100L/h", "Pression : 0.02MPa", "Niveau sonore : 40dB", "Connexion : Tuyau 4mm"]  
  },
  {
    id: 77,
    name: "Capteur de Tension (Voltage Sensor)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedWEuhpU8JZj30Bj6Lux_4gZu-iChTAzZfQ&s",
    description: "Module diviseur de tension permettant de mesurer des tensions élevées (jusqu'à 25V) avec un microcontrôleur.",
    voltage: "5V DC",
    specifications: ["Plage : 0-25V", "Précision : ±0.1V", "Sortie : Analogique", "Ratio : 1:5"]
  },
  {
    id: 78,
    name: "Module LED RGB WS2812B (Neopixel)",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/11.png",
    description: "LED adressable RGB contrôlable individuellement, utilisée pour des effets lumineux dynamiques.",
    voltage: "5V DC",
    specifications: ["Couleur : RVB", "Protocole : One-Wire", "Consommation : 60mA (max)", "Angle : 120°"]
  },
  {
    id: 79,
    name: "Capteur de Niveau d'Eau",
    image: "https://marocproduits.com/mp_content/uploads/2023/09/module-Capteur-de-niveau-deau-maroc.jpg",
    description: "Capteur à plaques conductrices pour détecter le niveau d'eau dans un réservoir ou un bac.",
    voltage: "5V DC",
    specifications: ["Sortie : Analogique/Numérique", "Plage : Linéaire", "Matériau : Cuivre étamé", "Taille : 40x15mm"]
  },
  {
    id: 80,
    name: "Module de Chargeur Li-ion TP4056",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/1/481442760/GB/DO/AT/123335792/tp4056-1a-li-ion-battery-charging-module-500x500.jpeg",
    description: "Module de charge de batterie lithium-ion 1S avec protection contre la surcharge et la surintensité.",
    voltage: "5V DC",
    specifications: ["Tension : 4.2V", "Courant : 1A max", "Protections : OVP, OCP", "Indicateur : LED rouge/bleue"]
  },
  {
    id: 81,
    name: "Capteur de conductivité électrique (EC)",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/2.png",
    description: "Capteur à turbine pour mesurer le débit d'eau dans un tuyau, souvent utilisé dans les compteurs intelligents.",
    voltage: "5-24V DC",
    specifications: ["Plage : 1-30L/min", "Sortie : Impulsions", "Précision : ±10%", "Filetage : 1/2\""]
  },
  {
    id: 82,
    name: "Module Bluetooth HC-05",
    image: "https://marocproduits.com/mp_content/uploads/2019/08/module-bluetooth-serie-hc05.jpg",
    description: "Module de communication Bluetooth série pour connecter un microcontrôleur à un smartphone ou PC.",
    voltage: "3.3-6V DC",
    specifications: ["Version : Bluetooth 2.0", "Portée : 10m", "Interface : UART", "Mode : Maître/Esclave"]
  },
  {
    id: 83,
    name: "Relais 2 Canaux 5V",
    image: "https://a2itronic.ma/wp-content/uploads/2022/01/p_5_9_3_593-2-Channaux-Module-de-relais-5V-pour-Arduino.jpg",
    description: "Module avec deux relais électromécaniques pour commander deux appareils indépendants.",
    voltage: "5V DC",
    specifications: ["Courant max : 10A", "Tension : 250V AC / 30V DC", "Interface : Numérique", "Indicateur LED : Oui"]
  },
  {
  id: 84,
  name: "Capteur de Couleur",
  image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/6.png",
  description: "Capteur numérique capable de détecter la couleur d'une surface en mesurant les composantes rouge, verte et bleue (RVB) de la lumière réfléchie.",
  voltage: "3.3-5V DC",
  specifications: ["Type : Numérique (I2C ou PWM)","Capteur courant : TCS3200 / TCS34725",    "Plage spectrale : 400-700nm (visible)","Sortie : RVB (RGB) et/ou valeur hexadécimale", "Précision : ±10 sur 256 niveaux", "Éclairage intégré : LED blanche","Angle de détection : 45°"]
},
  {
    id: 85,
    name: "Module de Batterie 18650",
    image: "https://www.moussasoft.com/wp-content/uploads/2019/04/5V-1A-Module-chargeur-pour-batterie-Lithium-18650-Micro-USB-MAROC-CASABLANCA-FES-MARRAKECH.jpg",
    description: "Support pour batterie lithium-ion 18650 avec connecteur et protection contre l'inversion.",
    voltage: "3.7V DC",
    specifications: ["Type : 18650", "Connecteur : 2 broches", "Matériau : Plastique", "Taille : 70x20mm"]
  },
  {
    id: 86,
    name: "Capteur de Poids (Load Cell) + HX711",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/5.png",
    description: "Cellule de pesage avec module amplificateur HX711 pour mesurer des poids précisément.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : 500g à 5kg", "Précision : ±1g", "Interface : HX711 (Digital)", "Sortie : I2C-like"]
  },
  {
    id: 87,
    name: "Moteur à Vibration",
    image: "https://m.media-amazon.com/images/I/61Z4Wll4fML.jpg",
    description: "Mini moteur excentré utilisé pour les notifications tactiles ou les alertes silencieuses.",
    voltage: "3-5V DC",
    specifications: ["Tension : 3.7V typique", "Courant : 80mA", "Taille : 10mm", "Vitesse : 10000 RPM"]
  },
  {
    id: 88,
    name: "Module d'Extension GPIO MCP23017",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/13.png",
    description: "Convertisseur I/O permettant d'ajouter 16 broches GPIO supplémentaires via I2C.",
    voltage: "3.3-5V DC",
    specifications: ["Broches : 16", "Interface : I2C", "Adresses : 8 configurables", "Taille : 20x15mm"]
  },
  {
    id: 89,
    name: "Capteur de T° Infrarouge MLX90614",
    image: "https://a2itronic.ma/wp-content/uploads/2022/01/p_2_6_6_2_2662-MLX90614ESF-GY-906-Capteur-Infrarouge-TemperatureModule-Pour-Arduino.jpg",
    description: "Capteur de température sans contact par infrarouge, idéal pour la mesure corporelle ou industrielle.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : -70 à +380°C", "Précision : ±0.5°C", "Interface : I2C", "Distance : 5cm"]
  },
  {
    id: 90,
    name: "Module d'Affichage OLED 1.3\"",
    image: "https://m.media-amazon.com/images/I/71tSA8eBtTL._UF1000,1000_QL80_.jpg",
    description: "Grand écran OLED 128x64 avec interface I2C ou SPI, idéal pour afficher des graphiques complexes.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 128x64", "Interface : I2C/SPI", "Couleur : Monochrome", "Taille : 1.3\""]
  },
  {
    id: 91,
    name: "Capteur de T° PT100",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVGh09gSIjmCCXGXuPogxvjQFVtnmzs9CBA&s",
    description: "Capteur de température à résistance platine, très précis pour les applications industrielles.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : -200 à +600°C", "Précision : ±0.1°C", "Interface : Analogique", "Type : RTD"]
  },
  {
    id: 92,
    name: "Module de Contrôle de LED DMX512",
    image: "https://m.media-amazon.com/images/I/81OnxD+Qc8L.jpg",
    description: "Module pour piloter des bandes LED DMX ou des projecteurs professionnels.",
    voltage: "5-24V DC",
    specifications: ["Protocole : DMX512", "Canal : 3-16", "Interface : RS485", "Taille : 50x30mm"]
  },
  {
    id: 93,
    name: "Capteur de T°/Pression BMP280",
    image: "https://a2itronic.ma/wp-content/uploads/2019/01/BMP280-main.jpg",
    description: "Capteur barométrique haute précision pour mesurer la pression atmosphérique et la température.",
    voltage: "3.3V DC",
    specifications: ["Pression : 300-1100hPa", "Température : 0-65°C", "Interface : I2C/SPI", "Précision : ±1hPa"]
  },
  {
  id: 94,
  name: "Capteur de Position Angulaire (AS5600)",
  image: "https://www.helectro.net/wp-content/uploads/2025/01/as5600-magnetic-angle-sensor-encoder-module.webp",
  description: "Capteur de position angulaire sans contact basé sur une technologie magnétique, idéal pour mesurer la rotation precise d'un axe (0 à 360°).",
  voltage: "3.3-5V DC",
  specifications: ["Plage de mesure : 0 à 360°","Résolution : 12 bits (0.087° par pas)","Interface : Analogique / PWM / I2C","Précision : ±0.05° à ±2° selon position","Vitesse max : 30 000 RPM","Type : Capteur magnétique (sans contact)","Alimentation : 3.3V à 5V"]
},
  {
    id: 95,
    name: "Capteur de Chute MMA7455",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/15.png",
    description: "Accéléromètre 3 axes avec détection de chute intégrée, utilisé dans les wearables.",
    voltage: "3.3V DC",
    specifications: ["Plage : ±2/4/8g", "Sortie : Numérique", "Interface : I2C/SPI", "Alarme chute : Oui"]
  },
  {
    id: 96,
    name: "Module de Surveillance de Batterie",
    image: "https://hydraulic-cdn.com/productimages/1/3/5/4/7/7/5/2/image.jpgx1000y1000ex1000ey1000aligncenter_720.jpeg",
    description: "Affiche la tension, le courant et la puissance d'une batterie en temps réel.",
    voltage: "5V DC",
    specifications: ["Tension max : 30V", "Courant max : 10A", "Affichage : OLED", "Précision : ±1%"]
  },
  {
    id: 97,
    name: "Capteur de Radiation UV",
    image: "https://m.media-amazon.com/images/I/612VubMfJ9S._UF1000,1000_QL80_.jpg",
    description: "Capteur mesurant l'intensité des rayons ultraviolets (UV), utile pour la santé ou la météo.",
    voltage: "3.3-5V DC",
    specifications: ["Gamme : UV-A/UV-B", "Sortie : Analogique", "Plage : 0-15mW/cm²", "Angle : 60°"]
  },
  {
    id: 98,
    name: "Module de Pilotage de LED TLC5940",
    image: "https://ae01.alicdn.com/kf/S69e04df5f15f4714a77c9b30b33bdd20J.jpg",
    description: "Contrôleur PWM 16 canaux pour piloter précisément des LEDs ou des moteurs.",
    voltage: "5V DC",
    specifications: ["Canaux : 16", "Résolution : 12 bits", "Interface : SPI", "Courant max : 120mA/canal"]
  },
  {
    id: 99,
    name: "Capteur de Gaz MQ-135 (Air Quality)",
    image: "https://powerlab.dz/wp-content/uploads/2023/02/download-2023-02-28T112301.969.jpg",
    description: "Détecte les polluants comme le CO2, NH3, NOx, et la qualité de l'air intérieur.",
    voltage: "5V DC",
    specifications: ["Plage : 10-1000ppm",      "Temps de préchauffage : 24h",      "Sortie : Analogique",      "Durée : 10 ans"]
  },
  {
    id: 100,
    name: "Module de Détection RFID PN532",
    image: "https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/Untitled%20folder/16.png",
    description: "Lecteur RFID/NFC haute sensibilité, compatible avec les cartes MIFARE et les smartphones.",
    voltage: "3.3-5V DC",
    specifications: ["Fréquence : 13.56MHz", "Portée : 5-10cm", "Interface : I2C/SPI/UART", "Protocole : NFC"]
  },
  {
    "id": 101,
    "name": "Capteur de CO (MQ-7)",
    "image": "https://circuit.rocks/cdn/shop/products/carbon-monoxide-analog-sensor-mq7-for-arduino-732.jpg",
    "description": "Détecte le monoxyde de carbone (CO) pour la sécurité domestique ou industrielle.",
    "voltage": "5V DC",
    "specifications": ["Plage: 20-2000ppm",      "Sortie: Analogique",      "Temps de préchauffage: 48h",      "Précision: ±5%"    ]
  },
  {
    "id": 102,
    "name": "Capteur de CH4 (MQ-4)",
    "image": "https://circuit.rocks/cdn/shop/files/gas-analog-ch4-gas-sensor-mq4-for-arduino-a39423.jpg",
    "description": "Détecte le méthane (CH4) pour les applications de sécurité ou de surveillance environnementale.",
    "voltage": "5V DC",
    "specifications": [ "Plage: 200-10000ppm","Sortie: Analogique","Temps de préchauffage: 24h", "Précision: ±10%"]
  },
  {
    "id": 103,
    "name": "Capteur de NO2 (MQ-131)",
    "image": "https://powerlab.dz/wp-content/uploads/2024/05/611m-CoRaL._AC_SY300_SX300_.jpg",
    "description": "Détecte le dioxyde d'azote (NO2) pour la qualité de l'air.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 1-10ppm",      "Sortie: Analogique",      "Précision: ±5%"    ]
  },
  {
    "id": 104,
    "name": "Capteur de O3 (MQ-131)",
    "image": "https://cdn-reichelt.de/bilder/web/xxl_ws/A300%2FDEBO_GAS_MQ131_2_01.png",
    "description": "Détecte l'ozone (O3) pour les applications environnementales.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 10-1000ppb",      "Sortie: Analogique",      "Précision: ±10%"    ]
  },
  {
    "id": 105,
    "name": "Capteur de SO2 (MQ-136)",
    "image": "https://m.media-amazon.com/images/I/61XVYQ+JQSL._AC_SL1500_.jpg",
    "description": "Détecte le dioxyde de soufre (SO2) pour la surveillance industrielle.",
    "voltage": "5V DC",
    "specifications": [ "Plage: 1-100ppm","Sortie: Analogique", "Précision: ±10%"    ]
  },
  {
    "id": 106,
    "name": "Capteur de H2S (MQ-136)",
    "image": "https://nerikoelectronics.com/storage/app/public/product/2024-03-23-65fea468bea08.png",
    "description": "Détecte le sulfure d'hydrogène (H2S) pour les applications de sécurité.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 1-100ppm",      "Sortie: Analogique",      "Précision: ±10%"    ]
  },
  {
    "id": 107,
    "name": "Capteur de NH3 (MQ-137)",
    "image": "https://tronic.lk/assets/uploads/c1fd14934f83d71560698b1bfcb778a0.jpg",
    "description": "Détecte l'ammoniac (NH3) pour les applications agricoles ou industrielles.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 5-500ppm",      "Sortie: Analogique",      "Précision: ±10%"    ]
  },
  {
    "id": 108,
    "name": "Capteur de Formaldéhyde (MQ-138)",
    "image": "https://circuits-diy.com/wp-content/uploads/2021/10/mq138-pinout-voc-formaldehyde-aldehyde-sensor.jpg",
    "description": "Détecte le formaldéhyde pour la qualité de l'air intérieur.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 0.1-10ppm",      "Sortie: Analogique",      "Précision: ±10%"    ]
  },
  {
    "id": 109,
    "name": "Capteur de Poussière (PMS5003)",
    "image": "https://sc04.alicdn.com/kf/H2b640be931874d98ae160d8b3afa9a31G.jpg",
    "description": "Mesure la concentration de particules fines (PM1.0, PM2.5, PM10) dans l'air.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 0.3-10µm",      "Sortie: UART",      "Précision: ±10%"    ]
  },
  {
    "id": 110,
    "name": "Capteur de Rayonnement UV (VEML6070)",
    "image": "https://cdn.bodanius.com/media/1/7fb120948_adafruit-veml6070-uv-index-sensor-breakout_x.jpg",
    "description": "Mesure l'intensité des rayons UV pour les applications de santé ou météo.",
    "voltage": "3.3V DC",
    "specifications": [      "Plage: 280-400nm",      "Sortie: I2C",      "Précision: ±1%"    ]
  },
  {
    "id": 111,
    "name": "Capteur de Rayonnement Gamma (Geiger)",
    "image": "https://shop-image.readyplanet.com/LJp-bVGXf8iFBCkg22Mt83U21EI=/7ad864ba3de141e58046fb973fa9c769",
    "description": "Détecte les rayonnements ionisants pour les applications de sécurité nucléaire.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 0.1-1000µSv/h",      "Sortie: Impulsions",      "Précision: ±15%"    ]
  },
  {
    "id": 112,
    "name": "Capteur de Débit d'Air (FS3000)",
    "image": "https://www.yoctopuce.com/pubarchive/2024-07/fs3000-breakout-board_1.jpg",
    "description": "Mesure le débit d'air pour les applications HVAC ou industrielles.",
    "voltage": "5V DC",
    "specifications": [      "Plage: 0-30m/s",      "Sortie: Analogique",      "Précision: ±3%"    ]
  },
  {
    "id": 113,
    "name": "Capteur de Débit de Liquide (YF-S201)",
    "image": "https://image.made-in-china.com/202f0j00tzafBkvhVpoL/Water-Flow-Sensor-Sea-Yf-S201-Flowmeter-G1-2-1-30L-Min.webp",
    "description": "Mesure le débit de liquide dans les tuyaux.",
    "voltage": "5-24V DC",
    "specifications": [      "Plage: 1-30L/min",      "Sortie: Impulsions",      "Précision: ±10%"    ]
  },
  {
    "id": 114,
    "name": "Capteur de pH (Sonde pH)",
    "image": "https://a2itronic.ma/wp-content/uploads/2022/01/p_2_7_2_6_2726-Liquid-PH0-14-Module-detecteur-de-valeur-sonde-PH-Electrode-BNC-pour-Arduino.jpg",
    "description": "Mesure le pH des solutions liquides pour les applications agricoles ou chimiques.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-14pH",
      "Sortie: Analogique",
      "Précision: ±0.1pH"
    ]
  },
  {
    "id": 115,
    "name": "Capteur de Conductivité (EC)",
    "image": "https://m.media-amazon.com/images/I/51dAS-cD01L.jpg",
    "description": "Mesure la conductivité électrique des solutions liquides.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-20mS/cm",
      "Sortie: Analogique",
      "Précision: ±5%"
    ]
  },
  {
    "id": 116,
    "name": "Capteur de Turbidité",
    "image": "https://mhtronic.com/wp-content/uploads/2022/08/0-main-capteur-de-turbidite-en-suspension-kit-de-module-de-detection-de-la-valeur-de-la-turbidite-en-suspension-liquide-detection-des-particules-en-suspension-pour-arduino.png",
    "description": "Mesure la turbidité de l'eau pour les applications environnementales.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-1000NTU",
      "Sortie: Analogique",
      "Précision: ±5%"
    ]
  },
  {
    "id": 117,
    "name": "Capteur de Salinité",
    "image": "https://www.aqualabo.fr/wp-content/uploads/2023/12/Capteur-Conductivite-C4E-1.png",
    "description": "Mesure la salinité des solutions liquides.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-50ppt",
      "Sortie: Analogique",
      "Précision: ±2%"
    ]
  },
  {
    "id": 118,
    "name": "Capteur de Débit Massique (SLF3S)",
    "image": "https://img.directindustry.fr/images_di/photo-m2/70966-20002034.jpg",
    "description": "Mesure le débit massique des gaz pour les applications industrielles.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-100sccm",
      "Sortie: Analogique",
      "Précision: ±2%"
    ]
  },
  {
    "id": 119,
    "name": "Capteur de Débit de Gaz (MF5700)",
    "image": "https://cfsensor.com/wp-content/uploads/2022/11/4000-4-1.jpg",
    "description": "Mesure le débit de gaz pour les applications industrielles ou médicales.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-500sccm",
      "Sortie: Analogique",
      "Précision: ±3%"
    ]
  },
  {
    "id": 120,
    "name": "Capteur de Pression Différentielle",
    "image": "https://fap-cleaner.com/wp-content/uploads/2023/05/capteur-de-pression-de-differentiel-pour-audi-seat-vw-skoda.jpg",
    "description": "Mesure la différence de pression entre deux points.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-10kPa",
      "Sortie: Analogique",
      "Précision: ±1%"
    ]
  },
  {
    "id": 121,
    "name": "Capteur de Vitesse du Vent",
    "image": "https://www.usinenouvelle.com/expo/img/capteur-de-vent-pour-mesure-de-vitesse-pce-fst-200-2-011827530-product_zoom.jpg",
    "description": "Mesure la vitesse du vent pour les stations météo.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-100m/s",
      "Sortie: Analogique",
      "Précision: ±3%"
    ]
  },
  {
    "id": 122,
    "name": "Capteur de Direction du Vent",
    "image": "https://img.directindustry.fr/images_di/photo-m2/192288-16039047.jpg",
    "description": "Mesure la direction du vent pour les stations météo.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-360°",
      "Sortie: Analogique",
      "Précision: ±5°"
    ]
  },
  {
    "id": 123,
    "name": "Capteur de Pluie (Pluviomètre)",
    "image": "https://www.usinenouvelle.com/expo/img/capteur-de-pluie-hd2013-2-011827530-product_zoom.jpg",
    "description": "Mesure la quantité de pluie pour les stations météo.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-50mm/h",
      "Sortie: Numérique",
      "Précision: ±5%"
    ]
  },
  {
    "id": 124,
    "name": "Capteur de Neige",
    "image": "https://m.media-amazon.com/images/I/614W4vUZhVL._UF1000,1000_QL80_.jpg",
    "description": "Détecte la présence de neige pour les applications météo ou de sécurité.",
    "voltage": "5V DC",
    "specifications": [
      "Sortie: Numérique",
      "Précision: ±10%"
    ]
  },
  {
    "id": 125,
    "name": "Capteur de Glace",
    "image": "https://www.alliance-technologies.net/app/uploads/2023/01/IDS-30-1-550x0-c-default.png",
    "description": "Détecte la formation de glace pour les applications aéronautiques ou routières.",
    "voltage": "5V DC",
    "specifications": [
      "Sortie: Numérique",
      "Précision: ±10%"
    ]
  },
  {
    "id": 126,
    "name": "Capteur de Déformation (Strain Gauge)",
    "image": "https://cdn3.tim-europe.com/websites/pei/typo3temp/assets/_processed_/a/0/csm_HBM-jauges-de-contrainte-KFU-image_23abff6a0f.jpg",
    "description": "Mesure la déformation des matériaux pour les applications structurelles.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-1000µε",
      "Sortie: Analogique",
      "Précision: ±1%"
    ]
  },
  {
    "id": 127,
    "name": "Capteur de Force (Load Cell 50kg)",
    "image": "https://m.media-amazon.com/images/I/61DJnO8zurL._UF1000,1000_QL80_.jpg",
    "description": "Mesure les forces de compression ou de traction.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-50kg",
      "Sortie: HX711",
      "Précision: ±0.1%"
    ]
  },
  {
    "id": 128,
    "name": "Capteur de Couple",
    "image": "https://cdn.cleanrider.com/uploads/2023/11/capteur-de-couple-boitier-riverside-500e.jpg",
    "description": "Mesure le couple appliqué sur un axe.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-10Nm",
      "Sortie: Analogique",
      "Précision: ±1%"
    ]
  },
  {
    "id": 129,
    "name": "Capteur de Vibration (ADXL345)",
    "image": "https://cdn11.bigcommerce.com/s-mm9wpa/images/stencil/1280x1280/products/3621/14475/adxl-1__61674.1729975869.jpg",
    "description": "Mesure les vibrations sur 3 axes pour les applications industrielles ou de maintenance.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: ±16g",
      "Sortie: I2C/SPI",
      "Précision: ±0.1g"
    ]
  },
  {
    "id": 130,
    "name": "Capteur de Choc (ADXL377)",
    "image": "https://cdn-shop.adafruit.com/970x728/1413-00.jpg",
    "description": "Détecte les chocs ou les impacts pour les applications de sécurité.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: ±200g",
      "Sortie: Analogique",
      "Précision: ±5%"
    ]
  },
  {
    "id": 131,
    "name": "Capteur de Son 3D (INMP441)",
    "image": "https://www.raspberry.ma/wp-content/uploads/2024/03/1711417972_481_Microphone-Omnidirectionnel-Tech-I2S-INMP441-Test-et-Avis.webp",
    "description": "Microphone numérique pour la détection de sons en 3D.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: 20Hz-20kHz",
      "Sortie: I2S",
      "Précision: ±1dB"
    ]
  },
  {
    "id": 132,
    "name": "Capteur de Champ Magnétique (HMC5883L)",
    "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3-pUYAC2u6DlXtmiYPwlOap3AHU_nDl8EvfAOOfnxB43PWTYzV2IF0G8QcR5op6yOpB5LmivIkFAPABlakrFrSHF3_kPCebhex3jrOQUuFhwjL-H0QV_MI8INauSnS5ONmMic_TllfIY/s1600/HMC5883L.JPG",
    "description": "Mesure les champs magnétiques pour les applications de navigation ou de détection.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: ±8Gauss",
      "Sortie: I2C",
      "Précision: ±1%"
    ]
  },
  {
    "id": 133,
    "name": "Capteur de Proximité Laser (VL53L0X)",
    "image": "https://powertech-dz.net/media/products/vl53l0x.jpg",
    "description": "Mesure la distance avec précision en utilisant un laser.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: 0-2m",
      "Sortie: I2C",
      "Précision: ±5mm"
    ]
  },
  {
    "id": 134,
    "name": "Capteur de Proximité Infrarouge",
    "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQ1sTPSVmESWRwabCN13ws-08q-1EA4yrPXSe38ksh9L24vcm3y2z7ku42VZ63nn4O-2KCQRbao85JrJm5hBrNlAYFAyCTaFP5vHAX_AsEKqp_124PHCutsH_6JYpcGvv8UNptngOWhuk/s1600/P1170720.JPG",
    "description": "Détecte la présence d'objets à courte distance.",
    "voltage": "5V DC",
    "specifications": [
      "Plage: 0-80cm",
      "Sortie: Numérique",
      "Précision: ±10%"
    ]
  },
  {
    "id": 135,
    "name": "Capteur de Mouvement 3D (MPU-9250)",
    "image": "https://www.powertech-dz.net/media/products/Module_Gyroscope_MPU9250.jpg",
    "description": "Combine accéléromètre, gyroscope et magnétomètre pour la détection de mouvement en 3D.",
    "voltage": "3.3V DC",
    "specifications": [
      "Plage: ±16g/±2000°/s","Sortie: I2C", "Précision: ±1%"
    ]
  },
  {
    "id": 136,
    "name": "Capteur de Position GPS (NEO-6M)",
    "image": "https://www.bastelgarage.ch/image/cache/catalog/Artikel/420331-420340/420340-994-1000x1000.jpg",
    "description": "Module GPS pour la géolocalisation précise.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 2.5m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 137,
    "name": "Capteur de Position GLONASS",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFIJet4DyK7Vgpj-3IcQqQyYPo_HU8ZtGI0-LC0yMzBPe4dokAvD8MR1hZKA0S3Ab2wg&usqp=CAU",
    "description": "Module de positionnement par satellite GLONASS pour une précision accrue.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1.5m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 138,
    "name": "Capteur de Position Galileo",
    "image": "https://cdn-reichelt.de/bilder/web/artikel_ws/A300%2FASX00017_ISO_1.jpg",
    "description": "Module de positionnement par satellite Galileo pour une couverture européenne.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 139,
    "name": "Capteur de Position BeiDou",
    "image": "https://www.hiwonder.com/cdn/shop/files/1_f55ef94d-4b65-47bb-98ed-149b110c8132.jpg?",
    "description": "Module de positionnement par satellite BeiDou pour une couverture asiatique.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1.5m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 140,
    "name": "Capteur de Position QZSS",
    "image": "https://cdn3.tim-europe.com/websites/pei/typo3temp/assets/_processed_/8/2/csm_28955_PEI5209_MTS_Fig2_RT4_a61cf4fdca.jpg",
    "description": "Module de positionnement par satellite QZSS pour une couverture japonaise.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 141,
    "name": "Capteur de Position IRNSS",
    "image": "https://img.directindustry.fr/images_di/photo-mg/4567760-18480758.jpg",
    "description": "Module de positionnement par satellite IRNSS pour une couverture indienne.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 2m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 142,
    "name": "Capteur de Position Multi-GNSS",
    "image": "https://www.furuno.com/files/ProductImage/1961/image/GF-8704_5_two_ph1.jpg",
    "description": "Module combinant GPS, GLONASS, Galileo, BeiDou et QZSS pour une précision maximale.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 0.5m",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 143,
    "name": "Capteur de Position RTK",
    "image": "https://www.ardusimple.com/wp-content/uploads/2025/05/simpleRTK3B_Pro_01.jpg",
    "description": "Module GPS RTK pour une précision centimétrique.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1cm",
      "Sortie: UART",
      "Temps de verrouillage: 10s"
    ]
  },
  {
    "id": 144,
    "name": "Capteur de Position PPK",
    "image": "https://lh4.googleusercontent.com/proxy/Sc_hrp3rXvas5k2caJ3Xg2YmYaZWjbOvNxdpKnb00OhHsitl5B226dbVne9lhEtpf_hlxQA6zijfzM_TDW34_zjkEecJ0HOIZqchzF5eY5gKK2RuuFhgJkn5K0qxO57sO000ycWDfjPxHr8YMCamCUSLvO2_VuMEtw",
    "description": "Module GPS PPK pour une précision centimétrique en post-traitement.",
    "voltage": "3.3-5V DC",
    "specifications": [
      "Précision: 1cm",
      "Sortie: UART",
      "Temps de verrouillage: 1s"
    ]
  },
  {
    "id": 145,
    "name": "Capteur de Position LORAN",
    "image": "https://img.directindustry.fr/images_di/photo-mg/37684-11475597.jpg",
    "description": "Module de navigation longue portée pour les applications maritimes.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 500m",
      "Sortie: Numérique",
      "Portée: 1000km"
    ]
  },
  {
    "id": 146,
    "name": "Capteur de Position DECCA",
    "image": "https://www.celeramotion.com/inductive-sensors/wp-content/uploads/sites/7/2019/05/capteurs-de-position-300x200.png",
    "description": "Module de navigation hyperbole pour les applications maritimes historiques.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 1km",
      "Sortie: Analogique",
      "Portée: 500km"
    ]
  },
  {
    "id": 147,
    "name": "Capteur de Position OMEGA",
    "image": "https://img.gmoto.pl/507701/czujnik-polozenia-przepustnicy_1.webp",
    "description": "Module de navigation mondiale pour les applications maritimes ou aériennes.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 4km",
      "Sortie: Numérique",
      "Portée: 10000km"
    ]
  },
  {
    "id": 148,
    "name": "Capteur de Position CHAYKA",
    "image": "https://i0.wp.com/pitch-technologies.fr/wp-content/uploads/2019/06/SP2846-345-065-101-CAPTEUR-ROTATIF-SPRING-SHAFT.jpeg",
    "description": "Module de navigation russe pour les applications maritimes.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 500m",
      "Sortie: Numérique",
      "Portée: 1000km"
    ]
  },
  {
    "id": 149,
    "name": "Capteur de Position ALPHA",
    "image": "https://ae01.alicdn.com/kf/Sde41c38d59714fb9ad9f58c70f4186332.jpg_640x640q90.jpg",
    "description": "Module de navigation soviétique pour les applications militaires.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 100m",
      "Sortie: Numérique",
      "Portée: 500km"
    ]
  },
  {
    "id": 150,
    "name": "Capteur de Position BRAS",
    "image": "https://www.researchgate.net/publication/324186692/figure/fig1/AS:611693092671488@1522850406100/Exemple-de-capteur-positionne-sur-le-bras.png",
    "description": "Module de navigation brésilien pour les applications maritimes.",
    "voltage": "5V DC",
    "specifications": [
      "Précision: 1km",
      "Sortie: Numérique",
      "Portée: 2000km"
    ]
  },
  {
    "id": 151,
    "name": "Raspberry Pi Pico",
    "image": "https://m.media-amazon.com/images/I/61Zxehl0-qL.jpg",
    "description": "Microcontrôleur RP2040 pour les projets IoT et embarqués.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: Dual-core 133MHz",
      "RAM: 264KB",
      "GPIO: 26",
      "PWM: 16"
    ]
  },
  {
    "id": 152,
    "name": "BeagleBone Black",
    "image": "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F1252411-02",
    "description": "Plateforme open-source pour les projets embarqués avancés.",
    "voltage": "5V DC",
    "specifications": [
      "CPU: 1GHz",
      "RAM: 512MB",
      "GPIO: 65",
      "PWM: 8"
    ]
  },
  {
    "id": 153,
    "name": "STM32F4 Discovery Kit",
    "image": "https://cdn2.botland.store/111111-pdt_540/stm32f1-vl-discovery-kit.jpg",
    "description": "Kit de développement pour les microcontrôleurs STM32F4.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 180MHz",
      "RAM: 192KB",
      "GPIO: 50",
      "PWM: 14"
    ]
  },
  {
    "id": 154,
    "name": "Teensy 4.0",
    "image": "https://www.pjrc.com/store/teensy40_front.jpg",
    "description": "Microcontrôleur ultra-rapide pour les projets audio et temps réel.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 600MHz",
      "RAM: 1MB",
      "GPIO: 40",
      "PWM: 34"
    ]
  },
  {
    "id": 155,
    "name": "Particle Photon",
    "image": "https://www.direnc.net/particle-photon-wifi-iot-gelistirme-karti-en-esp-board-particle-46890-75-B.jpg",
    "description": "Microcontrôleur Wi-Fi pour les projets IoT cloud.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 120MHz",
      "RAM: 128KB",
      "WiFi: 802.11 b/g/n",
      "GPIO: 18"
    ]
  },
  {
    "id": 156,
    "name": "Onion Omega2",
    "image": "https://blog.oshpark.com/wp-content/uploads/2017/01/tumblr_ojbxowfrfv1tja38uo3_1280.jpg",
    "description": "Microcontrôleur Linux pour les projets IoT et embarqués.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 580MHz",
      "RAM: 128MB",
      "WiFi: 802.11 b/g/n",
      "GPIO: 15"
    ]
  },
  {
    "id": 157,
    "name": "ESP32-S2",
    "image": "https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32s2/_images/esp32-s2-devkitm-1-v1-isometric.png",
    "description": "Microcontrôleur Wi-Fi avec sécurité renforcée.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 240MHz",
      "RAM: 320KB",
      "WiFi: 802.11 b/g/n",
      "GPIO: 43"
    ]
  },
  {
    "id": 158,
    "name": "ESP32-C3",
    "image": "https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/3705/ESP32-C3-DEVKITM-1.jpg",
    "description": "Microcontrôleur Wi-Fi/BLE avec sécurité matérielle.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 160MHz",
      "RAM: 400KB",
      "WiFi: 802.11 b/g/n",
      "BLE: 5.0",
      "GPIO: 22"
    ]
  },
  {
    "id": 159,
    "name": "ESP32-S3",
    "image": "https://cdn3.botland.store/img/cms/23341_4.jpg",
    "description": "Microcontrôleur Wi-Fi/BLE avec écran LCD intégré.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 240MHz",
      "RAM: 512KB",
      "WiFi: 802.11 b/g/n",
      "BLE: 5.0",
      "GPIO: 44"
    ]
  },
  {
    "id": 160,
    "name": "NVIDIA Jetson Nano",
    "image": "https://m.media-amazon.com/images/I/71tZcfXMFQL._AC_SL1500_.jpg",
    "description": "Carte de développement pour l'IA embarquée.",
    "voltage": "5V DC",
    "specifications": [
      "CPU: Quad-core 1.43GHz",
      "RAM: 4GB",
      "GPU: 128 CUDA cores",
      "GPIO: 40"
    ]
  },
  {
    "id": 161,
    "name": "Google Coral Dev Board",
    "image": "https://m.media-amazon.com/images/I/71oebkDzk1L._UF894,1000_QL80_.jpg",
    "description": "Carte de développement pour l'apprentissage automatique embarqué.",
    "voltage": "5V DC",
    "specifications": [
      "CPU: Quad-core 1.5GHz",
      "RAM: 1GB",
      "TPU: 4TOPS",
      "GPIO: 40"
    ]
  },
  {
    "id": 162,
    "name": "Arduino Mega 2560",
    "image": "https://www.robotpark.com/image/cache/data/PRO/91068/Arduino-Mega-2560-R3-Pic01-1200x630w.png",
    "description": "Plateforme de prototypage avancée avec de nombreuses E/S.",
    "voltage": "5V DC",
    "specifications": [
      "CPU: ATmega2560",
      "RAM: 8KB",
      "Flash: 256KB",
      "GPIO: 54",
      "PWM: 15"
    ]
  },
  {
    "id": 163,
    "name": "Arduino Due",
    "image": "https://arduino.cc/en/uploads/Main/ArduinoDue_Front.jpg",
    "description": "Plateforme de prototypage 32 bits pour les projets avancés.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 84MHz",
      "RAM: 96KB",
      "Flash: 512KB",
      "GPIO: 54",
      "PWM: 12"
    ]
  },
  {
    "id": 164,
    "name": "Arduino Zero",
    "image": "https://store.arduino.cc/cdn/shop/files/ABX00003_03.front_1065x700.jpg",
    "description": "Plateforme de prototypage 32 bits avec débogage intégré.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "RAM: 32KB",
      "Flash: 256KB",
      "GPIO: 14",
      "PWM: 12"
    ]
  },
  {
    "id": 165,
    "name": "Arduino MKR WiFi 1010",
    "image": "https://grobotronics.com/images/companies/1/ABX00023.png?1663925197180",
    "description": "Plateforme de prototypage Wi-Fi pour les projets IoT.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "RAM: 32KB",
      "Flash: 256KB",
      "WiFi: 802.11 b/g/n",
      "GPIO: 8"
    ]
  },
  {
    "id": 166,
    "name": "Arduino MKR GSM 1400",
    "image": "https://static.insales-cdn.com/images/products/1/593/212533841/arduino-mkr-gsm-1400.2.jpg",
    "description": "Plateforme de prototypage GSM pour les projets IoT cellulaires.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "RAM: 32KB",
      "Flash: 256KB",
      "GSM: 850/900/1800/1900MHz",
      "GPIO: 8"
    ]
  },
  {
    "id": 167,
    "name": "Arduino MKR NB 1500",
    "image": "https://projects.arduinocontent.cc/cover-images/0dc9db3b-8aee-44a5-90ad-d921a650e6ac.blob",
    "description": "Plateforme de prototypage NB-IoT pour les projets IoT cellulaires basse consommation.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "RAM: 32KB",
      "Flash: 256KB",
      "NB-IoT: 800/900MHz",
      "GPIO: 8"
    ]
  },
  {
    "id": 168,
    "name": "Arduino MKR WAN 1310",
    "image": "https://store.arduino.cc/cdn/shop/files/MKRWAN1310WANT_01.iso_934x700.jpg?v=1727098331",
    "description": "Plateforme de prototypage LoRa pour les projets IoT longue portée.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "RAM: 32KB",
      "Flash: 256KB",
      "LoRa: 868/915MHz",
      "GPIO: 8"
    ]
  },
  {
    "id": 169,
    "name": "Arduino MKR Vidor 4000",
    "image": "https://maker.pro/storage/6buPB7p/6buPB7pn5x10Ip4MqfETYUKST3QdxaSrmIkVK8yu.jpeg",
    "description": "Plateforme de prototypage avec FPGA intégré pour les projets avancés.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 48MHz",
      "FPGA: 8K LE",
      "RAM: 32KB",
      "Flash: 256KB",
      "GPIO: 8"
    ]
  },
  {
    "id": 170,
    "name": "Arduino Portenta H7",
    "image": "https://eu.mouser.com/images/marketingid/2020/img/101443878.png",
    "description": "Plateforme de prototypage industrielle pour les projets IoT avancés.",
    "voltage": "3.3V DC",
    "specifications": [
      "CPU: 480MHz",
      "RAM: 1MB",
      "Flash: 2MB",
      "WiFi: 802.11 b/g/n",
      "BLE: 5.0",
      "GPIO: 48"
    ]
  }
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

// --- Script Circuit Page ---
// --- Script Circuit Page ---
const ScriptCircuitPage = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [generatedSVG, setGeneratedSVG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to copy the AI system prompt to clipboard
  const copySystemPrompt = () => {
    const fullPrompt = `# Professional SVG Circuit Diagram Generator
**MISSION**: Create PROFESSIONAL, ACCURATE SVG circuit diagrams that are so clear that anyone can understand the connections at a glance.
## 🚨 CRITICAL OUTPUT REQUIREMENT 🚨
**OUTPUT ONLY THE SVG CODE - NO EXPLANATIONS, NO TEXT, NO COMMENTS**
**RESPOND WITH PURE SVG MARKUP ONLY**
## 🚫 ABSOLUTE RULE: NO WIRE LINES 🚫
**NEVER DRAW ANY LINES, PATHS, OR WIRES BETWEEN COMPONENTS**
**CONNECTIONS ARE SHOWN ONLY BY MATCHING NUMBERS ON PINS**
**NO <line>, NO <path>, NO <polyline> ELEMENTS FOR CONNECTIONS**
**THE NUMBERED PIN SYSTEM IS THE ONLY CONNECTION METHOD**
## NO WIRE LINES - NUMBERS ONLY CONNECTION SYSTEM
- **ZERO LINES**: Never draw wires, traces, or connection lines
- **NUMBERED PINS**: Same number = connected together
- **VISUAL CLARITY**: Clean layout with only numbered connection points
- **NO CONNECTING ELEMENTS**: No lines, arrows, or paths between components
## CRITICAL VISUAL REQUIREMENTS
### 1. PIN PLACEMENT RULES (MANDATORY)
- **PINS MUST BE EXACTLY ON COMPONENT EDGES** - Never floating outside or inside
- **PIN CIRCLES positioned PRECISELY on the border** of rectangles/shapes
- **PIN SPACING**: Minimum 25px between adjacent pins
- **PIN SIZE**: 4px radius circles for visibility
**EXACT PIN POSITIONING FORMULAS:**
- **Right edge pins**: \`cx="componentX + componentWidth"\` \`cy="componentY + pinOffset"\`
- **Left edge pins**: \`cx="componentX"\` \`cy="componentY + pinOffset"\`
- **Top edge pins**: \`cx="componentX + pinOffset"\` \`cy="componentY"\`  
- **Bottom edge pins**: \`cx="componentX + pinOffset"\` \`cy="componentY + componentHeight"\`
**EXAMPLE**: If component is \`<rect x="200" y="300" width="150" height="100">\`:
- Right edge pin at middle: \`<circle cx="350" cy="350" r="4"/>\` (200+150=350, 300+50=350)
- Left edge pin at top: \`<circle cx="200" cy="320" r="4"/>\` (exactly at x=200)
- Top edge pin: \`<circle cx="275" cy="300" r="4"/>\` (exactly at y=300)
- Bottom edge pin: \`<circle cx="275" cy="400" r="4"/>\` (300+100=400)
### 2. COMPONENT STANDARDS
- **Minimum component size**: 120px width × 80px height
- **Component spacing**: Minimum 150px between any two components
- **Rounded corners**: \`rx="5"\` for professional appearance
- **Border width**: \`stroke-width="2"\` for all components
- **Component colors**:
  - Microcontrollers: \`fill="#2C3E50"\` (dark blue-gray)
  - Sensors: \`fill="#ECF0F1"\` (light gray)
  - Displays: \`fill="#34495E"\` (medium gray)
  - Power components: \`fill="#E74C3C"\` (red)
  - LEDs: \`fill="#F39C12"\` (orange)
### 3. PIN LABELING SYSTEM
- **Format**: \`PINNAME-CONNECTION#\`
- **Label placement**: 
  - Left pins: Label 15px to the LEFT of pin (\`x="pinX - 15"\`)
  - Right pins: Label 15px to the RIGHT of pin (\`x="pinX + 15"\`)
  - Top pins: Label 10px ABOVE pin (\`y="pinY - 10"\`)
  - Bottom pins: Label 15px BELOW pin (\`y="pinY + 15"\`)
- **Text anchoring**:
  - Left labels: \`text-anchor="end"\`
  - Right labels: \`text-anchor="start"\`
  - Top/Bottom labels: \`text-anchor="middle"\`
### 4. CONNECTION COLOR CODING
- **Power (Red)**: VCC, 3V3, 5V, VIN
- **Ground (Black)**: GND, GND1, GND2
- **Digital I/O (Blue)**: GPIO pins, SDA, SCL, CS, MOSI, MISO
- **Analog (Green)**: A0, A1, ADC pins
- **Special (Purple)**: RST, EN, CLK
## SVG STRUCTURE TEMPLATE
<svg width="1400" height="1000" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="700" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#2C3E50">PROJECT_NAME Circuit Diagram</text>
  <!-- ESP32 Example (Centered) -->
  <rect x="600" y="400" width="200" height="150" rx="5" fill="#2C3E50" stroke="#34495E" stroke-width="2"/>
  <text x="700" y="425" text-anchor="middle" font-size="16" font-weight="bold" fill="white">ESP32 DevKit</text>
  <!-- ESP32 Left Pins (EXACTLY on left edge) -->
  <circle cx="600" cy="440" r="4" fill="#E74C3C"/>
  <text x="585" y="445" text-anchor="end" font-size="12" font-weight="bold" fill="#E74C3C">3V3-1</text>
  <circle cx="600" cy="465" r="4" fill="#2C3E50"/>
  <text x="585" y="470" text-anchor="end" font-size="12" font-weight="bold" fill="#2C3E50">GND-2</text>
  <circle cx="600" cy="490" r="4" fill="#3498DB"/>
  <text x="585" y="495" text-anchor="end" font-size="12" font-weight="bold" fill="#3498DB">GPIO21-3</text>
  <circle cx="600" cy="515" r="4" fill="#3498DB"/>
  <text x="585" y="520" text-anchor="end" font-size="12" font-weight="bold" fill="#3498DB">GPIO22-4</text>
  <!-- ESP32 Right Pins (EXACTLY on right edge) -->
  <circle cx="800" cy="440" r="4" fill="#27AE60"/>
  <text x="815" y="445" text-anchor="start" font-size="12" font-weight="bold" fill="#27AE60">GPIO34-5</text>
  <circle cx="800" cy="465" r="4" fill="#27AE60"/>
  <text x="815" y="470" text-anchor="start" font-size="12" font-weight="bold" fill="#27AE60">GPIO35-6</text>
  <!-- Sensor Example (Left side) -->
  <rect x="200" y="300" width="150" height="100" rx="5" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="2"/>
  <text x="275" y="325" text-anchor="middle" font-size="14" font-weight="bold" fill="#2C3E50">BME280 Sensor</text>
  <!-- Sensor Right Pins (EXACTLY on right edge x=350) -->
  <circle cx="350" cy="330" r="4" fill="#E74C3C"/>
  <text x="365" y="335" text-anchor="start" font-size="12" font-weight="bold" fill="#E74C3C">VCC-1</text>
  <circle cx="350" cy="355" r="4" fill="#2C3E50"/>
  <text x="365" y="360" text-anchor="start" font-size="12" font-weight="bold" fill="#2C3E50">GND-2</text>
  <circle cx="350" cy="380" r="4" fill="#3498DB"/>
  <text x="365" y="385" text-anchor="start" font-size="12" font-weight="bold" fill="#3498DB">SDA-3</text>
  <!-- LED Example (Right side) -->
  <circle cx="1000" cy="350" r="25" fill="#F39C12" stroke="#E67E22" stroke-width="2"/>
  <text x="1000" y="325" text-anchor="middle" font-size="12" font-weight="bold" fill="#2C3E50">LED</text>
  <!-- LED Pins -->
  <circle cx="975" cy="350" r="4" fill="#27AE60"/>
  <text x="960" y="355" text-anchor="end" font-size="12" font-weight="bold" fill="#27AE60">+-5</text>
  <circle cx="1025" cy="350" r="4" fill="#2C3E50"/>
  <text x="1040" y="355" text-anchor="start" font-size="12" font-weight="bold" fill="#2C3E50">--2</text>
  <!-- Connection Legend -->
  <rect x="50" y="800" width="300" height="150" rx="5" fill="#F8F9FA" stroke="#BDC3C7" stroke-width="1"/>
  <text x="200" y="825" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Connection Guide</text>
  <text x="70" y="850" font-size="12" font-weight="bold" fill="#E74C3C">Power (Red): 3V3-1, VCC-1</text>
  <text x="70" y="870" font-size="12" font-weight="bold" fill="#2C3E50">Ground (Black): GND-2</text>
  <text x="70" y="890" font-size="12" font-weight="bold" fill="#3498DB">I2C Data: SDA-3, GPIO21-3</text>
  <text x="70" y="910" font-size="12" font-weight="bold" fill="#27AE60">Analog: GPIO34-5, GPIO35-6</text>
  <!-- Professional Grid (Optional) -->
  <defs>
    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ECF0F1" stroke-width="1" opacity="0.3"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="1400" height="1000" fill="url(#grid)" opacity="0.5"/>
</svg>
## LAYOUT STRATEGY
### Component Positioning:
1. **ESP32/Main MCU**: Center (x=600-800, y=400-550)
2. **Input Sensors**: Left side (x=150-400, y=200-700)  
3. **Output Devices**: Right side (x=900-1250, y=200-700)
4. **Power Components**: Top area (x=400-1000, y=100-200)
5. **Communication modules**: Bottom area (x=400-1000, y=700-850)
### Spacing Rules:
- **Minimum 150px between components**
- **Pin spacing: 25px minimum**
- **Text clearance: 15px from pins**
- **Border margins: 50px from SVG edges**
## ADVANCED FEATURES
### Visual Hierarchy:
- **Drop shadows** for depth: \`filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"\`
- **Gradient backgrounds** for power sections
- **Consistent typography** throughout
### Professional Touches:
- **Component part numbers** in smaller text
- **Voltage/current ratings** where relevant  
- **Wire gauge recommendations** in legend
- **Breadboard pin mapping** if applicable
## 📋 DETAILED PROJECT ANALYSIS REQUIREMENTS
### STEP 1: MICROCONTROLLER ANALYSIS
**Extract EXACT pin information:**
- **Board type**: ESP32, ESP8266, Arduino Uno, Nano, etc.
- **Pin mapping**: Physical pin numbers AND GPIO names
- **Used pins only**: List every single pin mentioned in code/documentation
- **Pin functions**: Digital, Analog, PWM, I2C, SPI, UART
**Example Format:**
\`\`\`
ESP32 DevKit V1:
- GPIO21 (Physical Pin 33) → SDA for I2C
- GPIO22 (Physical Pin 36) → SCL for I2C  
- GPIO4 (Physical Pin 26) → Digital Output for LED
- GPIO34 (Physical Pin 6) → Analog Input for Sensor
- 3V3 (Physical Pin 3) → Power Supply
- GND (Physical Pin 14) → Ground
\`\`\`
### STEP 2: COMPONENT DETAILED BREAKDOWN
**For EACH component, extract:**
**A) SENSORS (BME280, DHT22, MPU6050, etc.)**
- **Model**: Exact part number
- **Pin count**: How many pins total
- **Pin names**: VCC, GND, SDA, SCL, DATA, etc.
- **Voltage**: 3.3V or 5V
- **Protocol**: I2C, SPI, Digital, Analog
**B) DISPLAYS (OLED, LCD, 7-Segment)**
- **Size/Type**: 0.96" OLED, 16x2 LCD, etc.
- **Interface**: I2C, SPI, Parallel
- **Pin mapping**: VCC, GND, SDA, SCL, CS, DC, RST
**C) ACTUATORS (Motors, Servos, Relays)**
- **Type**: Servo SG90, DC Motor, Stepper, Relay module
- **Control pins**: Signal, Enable, Direction pins
- **Power requirements**: Separate power supply needed?
**D) INPUT DEVICES (Buttons, Potentiometers, Encoders)**
- **Pin configuration**: Pull-up/pull-down requirements
- **Connection type**: Digital input, analog input
### STEP 3: CONNECTION MAPPING TABLE
**Create exact pin-to-pin mapping:**
| Component | Component Pin | Wire Color | MCU Pin | MCU GPIO | Function |
|-----------|---------------|------------|---------|----------|----------|
| BME280 | VCC | Red | Pin 3 | 3V3 | Power |
| BME280 | GND | Black | Pin 14 | GND | Ground |
| BME280 | SDA | Blue | Pin 33 | GPIO21 | I2C Data |
| BME280 | SCL | Yellow | Pin 36 | GPIO22 | I2C Clock |
| LED | Anode (+) | Red | Pin 26 | GPIO4 | Digital Out |
| LED | Cathode (-) | Black | Pin 14 | GND | Ground |
### STEP 4: SPECIAL CONSIDERATIONS
**Identify and document:**
- **Pull-up resistors**: 4.7kΩ for I2C lines
- **Current limiting resistors**: 220Ω for LEDs
- **Voltage dividers**: For analog sensors
- **Decoupling capacitors**: 100nF ceramic caps
- **External power**: 12V supply for motors
### STEP 5: SCHOOL PROJECT CONTEXT
**Educational clarity requirements:**
- **Beginner-friendly**: Assume zero electronics knowledge
- **Clear labeling**: Every connection must be obvious
- **Safety notes**: Voltage warnings, polarity warnings
- **Breadboard friendly**: Standard component spacing
- **Parts list**: Exact components with part numbers
### EXAMPLE: COMPLETE PROJECT ANALYSIS
**Project**: "Arduino Weather Station with OLED Display"
**Components Identified:**
1. **Arduino Uno R3**
   - Pin A4 (SDA) → OLED SDA
   - Pin A5 (SCL) → OLED SCL
   - Pin 5V → Power rail
   - Pin GND → Ground rail
2. **BME280 Temperature/Humidity Sensor**
   - VCC pin → 3.3V (not 5V!)
   - GND pin → Ground
   - SDA pin → Arduino A4
   - SCL pin → Arduino A5
3. **0.96" OLED Display (SSD1306)**
   - VCC pin → 5V power
   - GND pin → Ground
   - SDA pin → Arduino A4  
   - SCL pin → Arduino A5
4. **Support Components**
   - 2x 4.7kΩ resistors (I2C pull-ups)
   - Breadboard
   - Jumper wires
**Connection Summary:**
- I2C Bus: A4 (SDA), A5 (SCL) shared between OLED and BME280
- Power: 5V and 3.3V rails from Arduino
- Ground: Common ground for all components
## VALIDATION CHECKLIST
- [ ] All pins are EXACTLY on component edges (use mathematical formulas)
- [ ] Pin coordinates calculated: cx = componentX + componentWidth for right edge
- [ ] Pin coordinates calculated: cx = componentX for left edge  
- [ ] Pin coordinates calculated: cy = componentY for top edge
- [ ] Pin coordinates calculated: cy = componentY + componentHeight for bottom edge
- [ ] Pin labels are properly positioned and readable
- [ ] Same connection numbers appear on all connected pins
- [ ] Color coding is consistent throughout
- [ ] Component spacing allows for clear reading
- [ ] Legend explains all connections clearly
- [ ] SVG uses full 1400×1000 space efficiently
- [ ] Professional color scheme and typography
**RESULT**: A circuit diagram so clear that anyone can build the project by following the numbered connections, with zero ambiguity about pin locations or connections.
---
## 🎯 FINAL INSTRUCTION 🎯
**ANALYZE THE PROJECT AND OUTPUT ONLY THE SVG CODE**
**NO EXTRA TEXT - JUST THE SVG file
${projectDescription}`;

    navigator.clipboard.writeText(fullPrompt)
      .then(() => alert("✅ Prompt système copié dans le presse-papiers !"))
      .catch(() => alert("❌ Échec de la copie."));
  };

  // Function to render SVG from the description box
  const renderSVFFromDescription = () => {
    // Simple validation: check if the input looks like SVG
    if (!projectDescription.trim().startsWith('<svg') || !projectDescription.trim().endsWith('</svg>')) {
      setError("❌ Le texte dans la description ne semble pas être un code SVG valide. Assurez-vous qu'il commence par <svg et se termine par </svg>.");
      return;
    }
    setGeneratedSVG(projectDescription.trim());
    setError(""); // Clear any previous errors
  };

  const generateCircuitSVG = async () => {
    if (!projectDescription.trim()) {
      setError("Veuillez entrer une description de votre projet.");
      return;
    }

    setIsLoading(true);
    setGeneratedSVG("");
    setError("");

    try {
      // This entire block is a STRING sent to the AI. The code examples within it are NOT executed by JavaScript.
      // Linters may show false errors here. You can ignore them or add a linter ignore comment if needed.
      const systemPrompt = `
# Professional SVG Circuit Diagram Generator
**MISSION**: Create PROFESSIONAL, ACCURATE SVG circuit diagrams that are so clear that anyone can understand the connections at a glance.
## 🚨 CRITICAL OUTPUT REQUIREMENT 🚨
**OUTPUT ONLY THE SVG CODE - NO EXPLANATIONS, NO TEXT, NO COMMENTS**
**RESPOND WITH PURE SVG MARKUP ONLY**
## 🚫 ABSOLUTE RULE: NO WIRE LINES 🚫
**NEVER DRAW ANY LINES, PATHS, OR WIRES BETWEEN COMPONENTS**
**CONNECTIONS ARE SHOWN ONLY BY MATCHING NUMBERS ON PINS**
**NO <line>, NO <path>, NO <polyline> ELEMENTS FOR CONNECTIONS**
**THE NUMBERED PIN SYSTEM IS THE ONLY CONNECTION METHOD**
## NO WIRE LINES - NUMBERS ONLY CONNECTION SYSTEM
- **ZERO LINES**: Never draw wires, traces, or connection lines
- **NUMBERED PINS**: Same number = connected together
- **VISUAL CLARITY**: Clean layout with only numbered connection points
- **NO CONNECTING ELEMENTS**: No lines, arrows, or paths between components
## CRITICAL VISUAL REQUIREMENTS
### 1. PIN PLACEMENT RULES (MANDATORY)
- **PINS MUST BE EXACTLY ON COMPONENT EDGES** - Never floating outside or inside
- **PIN CIRCLES positioned PRECISELY on the border** of rectangles/shapes
- **PIN SPACING**: Minimum 25px between adjacent pins
- **PIN SIZE**: 4px radius circles for visibility
**EXACT PIN POSITIONING FORMULAS:**
- **Right edge pins**: \`cx="componentX + componentWidth"\` \`cy="componentY + pinOffset"\`
- **Left edge pins**: \`cx="componentX"\` \`cy="componentY + pinOffset"\`
- **Top edge pins**: \`cx="componentX + pinOffset"\` \`cy="componentY"\`  
- **Bottom edge pins**: \`cx="componentX + pinOffset"\` \`cy="componentY + componentHeight"\`
**EXAMPLE**: If component is \`<rect x="200" y="300" width="150" height="100">\`:
- Right edge pin at middle: \`<circle cx="350" cy="350" r="4"/>\` (200+150=350, 300+50=350)
- Left edge pin at top: \`<circle cx="200" cy="320" r="4"/>\` (exactly at x=200)
- Top edge pin: \`<circle cx="275" cy="300" r="4"/>\` (exactly at y=300)
- Bottom edge pin: \`<circle cx="275" cy="400" r="4"/>\` (300+100=400)
### 2. COMPONENT STANDARDS
- **Minimum component size**: 120px width × 80px height
- **Component spacing**: Minimum 150px between any two components
- **Rounded corners**: \`rx="5"\` for professional appearance
- **Border width**: \`stroke-width="2"\` for all components
- **Component colors**:
  - Microcontrollers: \`fill="#2C3E50"\` (dark blue-gray)
  - Sensors: \`fill="#ECF0F1"\` (light gray)
  - Displays: \`fill="#34495E"\` (medium gray)
  - Power components: \`fill="#E74C3C"\` (red)
  - LEDs: \`fill="#F39C12"\` (orange)
### 3. PIN LABELING SYSTEM
- **Format**: \`PINNAME-CONNECTION#\`
- **Label placement**: 
  - Left pins: Label 15px to the LEFT of pin (\`x="pinX - 15"\`)
  - Right pins: Label 15px to the RIGHT of pin (\`x="pinX + 15"\`)
  - Top pins: Label 10px ABOVE pin (\`y="pinY - 10"\`)
  - Bottom pins: Label 15px BELOW pin (\`y="pinY + 15"\`)
- **Text anchoring**:
  - Left labels: \`text-anchor="end"\`
  - Right labels: \`text-anchor="start"\`
  - Top/Bottom labels: \`text-anchor="middle"\`
### 4. CONNECTION COLOR CODING
- **Power (Red)**: VCC, 3V3, 5V, VIN
- **Ground (Black)**: GND, GND1, GND2
- **Digital I/O (Blue)**: GPIO pins, SDA, SCL, CS, MOSI, MISO
- **Analog (Green)**: A0, A1, ADC pins
- **Special (Purple)**: RST, EN, CLK
## SVG STRUCTURE TEMPLATE
<svg width="1400" height="1000" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="700" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#2C3E50">PROJECT_NAME Circuit Diagram</text>
  <!-- ESP32 Example (Centered) -->
  <rect x="600" y="400" width="200" height="150" rx="5" fill="#2C3E50" stroke="#34495E" stroke-width="2"/>
  <text x="700" y="425" text-anchor="middle" font-size="16" font-weight="bold" fill="white">ESP32 DevKit</text>
  <!-- ESP32 Left Pins (EXACTLY on left edge) -->
  <circle cx="600" cy="440" r="4" fill="#E74C3C"/>
  <text x="585" y="445" text-anchor="end" font-size="12" font-weight="bold" fill="#E74C3C">3V3-1</text>
  <circle cx="600" cy="465" r="4" fill="#2C3E50"/>
  <text x="585" y="470" text-anchor="end" font-size="12" font-weight="bold" fill="#2C3E50">GND-2</text>
  <circle cx="600" cy="490" r="4" fill="#3498DB"/>
  <text x="585" y="495" text-anchor="end" font-size="12" font-weight="bold" fill="#3498DB">GPIO21-3</text>
  <circle cx="600" cy="515" r="4" fill="#3498DB"/>
  <text x="585" y="520" text-anchor="end" font-size="12" font-weight="bold" fill="#3498DB">GPIO22-4</text>
  <!-- ESP32 Right Pins (EXACTLY on right edge) -->
  <circle cx="800" cy="440" r="4" fill="#27AE60"/>
  <text x="815" y="445" text-anchor="start" font-size="12" font-weight="bold" fill="#27AE60">GPIO34-5</text>
  <circle cx="800" cy="465" r="4" fill="#27AE60"/>
  <text x="815" y="470" text-anchor="start" font-size="12" font-weight="bold" fill="#27AE60">GPIO35-6</text>
  <!-- Sensor Example (Left side) -->
  <rect x="200" y="300" width="150" height="100" rx="5" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="2"/>
  <text x="275" y="325" text-anchor="middle" font-size="14" font-weight="bold" fill="#2C3E50">BME280 Sensor</text>
  <!-- Sensor Right Pins (EXACTLY on right edge x=350) -->
  <circle cx="350" cy="330" r="4" fill="#E74C3C"/>
  <text x="365" y="335" text-anchor="start" font-size="12" font-weight="bold" fill="#E74C3C">VCC-1</text>
  <circle cx="350" cy="355" r="4" fill="#2C3E50"/>
  <text x="365" y="360" text-anchor="start" font-size="12" font-weight="bold" fill="#2C3E50">GND-2</text>
  <circle cx="350" cy="380" r="4" fill="#3498DB"/>
  <text x="365" y="385" text-anchor="start" font-size="12" font-weight="bold" fill="#3498DB">SDA-3</text>
  <!-- LED Example (Right side) -->
  <circle cx="1000" cy="350" r="25" fill="#F39C12" stroke="#E67E22" stroke-width="2"/>
  <text x="1000" y="325" text-anchor="middle" font-size="12" font-weight="bold" fill="#2C3E50">LED</text>
  <!-- LED Pins -->
  <circle cx="975" cy="350" r="4" fill="#27AE60"/>
  <text x="960" y="355" text-anchor="end" font-size="12" font-weight="bold" fill="#27AE60">+-5</text>
  <circle cx="1025" cy="350" r="4" fill="#2C3E50"/>
  <text x="1040" y="355" text-anchor="start" font-size="12" font-weight="bold" fill="#2C3E50">--2</text>
  <!-- Connection Legend -->
  <rect x="50" y="800" width="300" height="150" rx="5" fill="#F8F9FA" stroke="#BDC3C7" stroke-width="1"/>
  <text x="200" y="825" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Connection Guide</text>
  <text x="70" y="850" font-size="12" font-weight="bold" fill="#E74C3C">Power (Red): 3V3-1, VCC-1</text>
  <text x="70" y="870" font-size="12" font-weight="bold" fill="#2C3E50">Ground (Black): GND-2</text>
  <text x="70" y="890" font-size="12" font-weight="bold" fill="#3498DB">I2C Data: SDA-3, GPIO21-3</text>
  <text x="70" y="910" font-size="12" font-weight="bold" fill="#27AE60">Analog: GPIO34-5, GPIO35-6</text>
  <!-- Professional Grid (Optional) -->
  <defs>
    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ECF0F1" stroke-width="1" opacity="0.3"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="1400" height="1000" fill="url(#grid)" opacity="0.5"/>
</svg>
## LAYOUT STRATEGY
### Component Positioning:
1. **ESP32/Main MCU**: Center (x=600-800, y=400-550)
2. **Input Sensors**: Left side (x=150-400, y=200-700)  
3. **Output Devices**: Right side (x=900-1250, y=200-700)
4. **Power Components**: Top area (x=400-1000, y=100-200)
5. **Communication modules**: Bottom area (x=400-1000, y=700-850)
### Spacing Rules:
- **Minimum 150px between components**
- **Pin spacing: 25px minimum**
- **Text clearance: 15px from pins**
- **Border margins: 50px from SVG edges**
## ADVANCED FEATURES
### Visual Hierarchy:
- **Drop shadows** for depth: \`filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"\`
- **Gradient backgrounds** for power sections
- **Consistent typography** throughout
### Professional Touches:
- **Component part numbers** in smaller text
- **Voltage/current ratings** where relevant  
- **Wire gauge recommendations** in legend
- **Breadboard pin mapping** if applicable
## 📋 DETAILED PROJECT ANALYSIS REQUIREMENTS
### STEP 1: MICROCONTROLLER ANALYSIS
**Extract EXACT pin information:**
- **Board type**: ESP32, ESP8266, Arduino Uno, Nano, etc.
- **Pin mapping**: Physical pin numbers AND GPIO names
- **Used pins only**: List every single pin mentioned in code/documentation
- **Pin functions**: Digital, Analog, PWM, I2C, SPI, UART
**Example Format:**
\`\`\`
ESP32 DevKit V1:
- GPIO21 (Physical Pin 33) → SDA for I2C
- GPIO22 (Physical Pin 36) → SCL for I2C  
- GPIO4 (Physical Pin 26) → Digital Output for LED
- GPIO34 (Physical Pin 6) → Analog Input for Sensor
- 3V3 (Physical Pin 3) → Power Supply
- GND (Physical Pin 14) → Ground
\`\`\`
### STEP 2: COMPONENT DETAILED BREAKDOWN
**For EACH component, extract:**
**A) SENSORS (BME280, DHT22, MPU6050, etc.)**
- **Model**: Exact part number
- **Pin count**: How many pins total
- **Pin names**: VCC, GND, SDA, SCL, DATA, etc.
- **Voltage**: 3.3V or 5V
- **Protocol**: I2C, SPI, Digital, Analog
**B) DISPLAYS (OLED, LCD, 7-Segment)**
- **Size/Type**: 0.96" OLED, 16x2 LCD, etc.
- **Interface**: I2C, SPI, Parallel
- **Pin mapping**: VCC, GND, SDA, SCL, CS, DC, RST
**C) ACTUATORS (Motors, Servos, Relays)**
- **Type**: Servo SG90, DC Motor, Stepper, Relay module
- **Control pins**: Signal, Enable, Direction pins
- **Power requirements**: Separate power supply needed?
**D) INPUT DEVICES (Buttons, Potentiometers, Encoders)**
- **Pin configuration**: Pull-up/pull-down requirements
- **Connection type**: Digital input, analog input
### STEP 3: CONNECTION MAPPING TABLE
**Create exact pin-to-pin mapping:**
| Component | Component Pin | Wire Color | MCU Pin | MCU GPIO | Function |
|-----------|---------------|------------|---------|----------|----------|
| BME280 | VCC | Red | Pin 3 | 3V3 | Power |
| BME280 | GND | Black | Pin 14 | GND | Ground |
| BME280 | SDA | Blue | Pin 33 | GPIO21 | I2C Data |
| BME280 | SCL | Yellow | Pin 36 | GPIO22 | I2C Clock |
| LED | Anode (+) | Red | Pin 26 | GPIO4 | Digital Out |
| LED | Cathode (-) | Black | Pin 14 | GND | Ground |
### STEP 4: SPECIAL CONSIDERATIONS
**Identify and document:**
- **Pull-up resistors**: 4.7kΩ for I2C lines
- **Current limiting resistors**: 220Ω for LEDs
- **Voltage dividers**: For analog sensors
- **Decoupling capacitors**: 100nF ceramic caps
- **External power**: 12V supply for motors
### STEP 5: SCHOOL PROJECT CONTEXT
**Educational clarity requirements:**
- **Beginner-friendly**: Assume zero electronics knowledge
- **Clear labeling**: Every connection must be obvious
- **Safety notes**: Voltage warnings, polarity warnings
- **Breadboard friendly**: Standard component spacing
- **Parts list**: Exact components with part numbers
### EXAMPLE: COMPLETE PROJECT ANALYSIS
**Project**: "Arduino Weather Station with OLED Display"
**Components Identified:**
1. **Arduino Uno R3**
   - Pin A4 (SDA) → OLED SDA
   - Pin A5 (SCL) → OLED SCL
   - Pin 5V → Power rail
   - Pin GND → Ground rail
2. **BME280 Temperature/Humidity Sensor**
   - VCC pin → 3.3V (not 5V!)
   - GND pin → Ground
   - SDA pin → Arduino A4
   - SCL pin → Arduino A5
3. **0.96" OLED Display (SSD1306)**
   - VCC pin → 5V power
   - GND pin → Ground
   - SDA pin → Arduino A4  
   - SCL pin → Arduino A5
4. **Support Components**
   - 2x 4.7kΩ resistors (I2C pull-ups)
   - Breadboard
   - Jumper wires
**Connection Summary:**
- I2C Bus: A4 (SDA), A5 (SCL) shared between OLED and BME280
- Power: 5V and 3.3V rails from Arduino
- Ground: Common ground for all components
## VALIDATION CHECKLIST
- [ ] All pins are EXACTLY on component edges (use mathematical formulas)
- [ ] Pin coordinates calculated: cx = componentX + componentWidth for right edge
- [ ] Pin coordinates calculated: cx = componentX for left edge  
- [ ] Pin coordinates calculated: cy = componentY for top edge
- [ ] Pin coordinates calculated: cy = componentY + componentHeight for bottom edge
- [ ] Pin labels are properly positioned and readable
- [ ] Same connection numbers appear on all connected pins
- [ ] Color coding is consistent throughout
- [ ] Component spacing allows for clear reading
- [ ] Legend explains all connections clearly
- [ ] SVG uses full 1400×1000 space efficiently
- [ ] Professional color scheme and typography
**RESULT**: A circuit diagram so clear that anyone can build the project by following the numbered connections, with zero ambiguity about pin locations or connections.
---
## 🎯 FINAL INSTRUCTION 🎯
**ANALYZE THE PROJECT AND OUTPUT ONLY THE SVG CODE**
**NO EXTRA TEXT - JUST THE SVG file
${projectDescription}`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaf0dZY3tmfdR7Um0mUr-jnJCkLg8-XSI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text.trim();

        // Extract SVG from the response (assuming it's wrapped in \`\`\`svg ... \`\`\`)
        const svgMatch = aiResponse.match(/```svg\s*([\s\S]*?)\s*```/);
        if (svgMatch && svgMatch[1]) {
          setGeneratedSVG(svgMatch[1]);
        } else {
          // If no SVG code block found, try to find SVG tags
          const svgTagMatch = aiResponse.match(/<svg[\s\S]*?<\/svg>/);
          if (svgTagMatch) {
            setGeneratedSVG(svgTagMatch[0]);
          } else {
            setError("L'IA n'a pas généré de code SVG valide. Voici sa réponse complète : " + aiResponse);
          }
        }
      } else {
        setError("❌ Erreur : Aucun SVG généré par l'IA.");
      }
    } catch (error) {
      console.error("Erreur API Gemini:", error);
      setError("❌ Échec de la connexion à l'IA. Vérifiez le réseau ou l'API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedSVG) {
      navigator.clipboard.writeText(generatedSVG)
        .then(() => alert("✅ SVG copié dans le presse-papiers !"))
        .catch(() => alert("❌ Échec de la copie."));
    }
  };

  const downloadSVG = () => {
    if (generatedSVG) {
      const blob = new Blob([generatedSVG], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'circuit_diagram.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
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
              <Zap className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Générateur de Schémas Circuits</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Générateur de Schémas Circuits avec IA</h1>
          <p className="text-xl text-gray-600">Décrivez votre projet et laissez l'IA générer un schéma de circuit SVG complet</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description de votre projet</h2>
          <p className="text-gray-600 mb-4">Décrivez en détail votre projet, y compris les composants utilisés, leurs connexions, et toute information pertinente.</p>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Ex: Je veux créer un système d'arrosage automatique avec un ESP32, un capteur d'humidité du sol, une pompe à eau et un relais. Le capteur est connecté à GPIO34, le relais à GPIO26..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={generateCircuitSVG}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Zap className="animate-spin" size={20} />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Brain size={20} />
                  <span>Générer le Schéma</span>
                </>
              )}
            </button>

            {/* NEW: Button to copy the system prompt */}
            <button
              onClick={copySystemPrompt}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Copy size={20} />
              <span>Copier le Prompt</span>
            </button>

            {/* NEW: Button to render SVG from description */}
            <button
              onClick={renderSVFFromDescription}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Zap size={20} />
              <span>Visualiser SVG</span>
            </button>

            {generatedSVG && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Copy size={20} />
                  <span>Copier SVG</span>
                </button>
                <button
                  onClick={downloadSVG}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Télécharger SVG</span>
                </button>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>

        {generatedSVG && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schéma du Circuit Généré</h2>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: generatedSVG }} />
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Code SVG (copiez pour l'utiliser dans vos projets)</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                {generatedSVG}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Conseils pour une meilleure génération</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Spécifiez clairement le microcontrôleur utilisé (ESP32, ESP8266, Arduino, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Listez tous les composants avec leurs modèles spécifiques si possible</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Indiquez les broches GPIO auxquelles chaque composant est connecté</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mentionnez les protocoles de communication utilisés (I2C, SPI, UART, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Précisez les tensions d'alimentation requises pour chaque composant</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Incluez des informations sur les résistances, condensateurs ou autres composants passifs nécessaires</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loadingCode, setLoadingCode] = useState(false);

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
                    text: `
                    Génère une explications simple du fonctionnement et trois mini codes Arduino C++ distincts (pour Arduino UNO, ESP32 et ESP8266) permettant d’utiliser le composant suivant : ${component.name} (${component.description}).
Exigences :
- Chaque code doit être directement exécutable et compilable sans modifications supplémentaires.
- Ajouter une section de commentaires claire en haut (/** ... */) listant précisément quels pins utiliser pour Arduino, ESP32 et ESP8266.
- Inclure des commentaires en français expliquant chaque étape importante du code (initialisation, configuration, boucle, etc.).
- Le code doit rester simple, minimaliste et pédagogique pour faciliter la compréhension.
`
,
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


const HomePage = () => {
  // >>> NEW: State for Download Modal Logic
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [userType, setUserType] = useState<'tester' | 'user' | null>(null);
  const [testerId, setTesterId] = useState('');
  const [userName, setUserName] = useState(''); // Not used anymore for users, but kept for structure
  const [userEmail, setUserEmail] = useState(''); // Not used anymore for users
  const [downloadError, setDownloadError] = useState('');

  // >>> NEW: Pre-defined list of 10 tester IDs
  const validTesterIds = [
    '21HOUeHOU6',
    'PERRY',
    'TEST-R6NANI',
    'TEST-TesT',
    'TEST-Z9A2B',
    'TEST-C7D4E',
    'TEST-F8G6H',
    'TEST-J1K3L',
    'TEST-Q5V7W',
    'TEST-X8Y0Z'
  ];

  // >>> NEW: Function to handle the final download after validation
  const handleFinalDownload = () => {
    window.open("https://github.com/SmartESP-Team/Site_de_smart_ESP/releases/download/v1.0/arduino.ide.hepler.zip", "_blank", "noopener,noreferrer");
  };

  // >>> UPDATED: Function to handle form submission
  const handleDownloadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadError('');

    if (userType === 'tester') {
      // ✅ Tester mode
      if (validTesterIds.includes(testerId.trim().toUpperCase())) {
        alert('✅ Accès de testeur confirmé. Téléchargement en cours...');
        setShowDownloadModal(false);
        handleFinalDownload();

        // Reset form
        setUserType(null);
        setTesterId('');
      } else {
        setDownloadError('❌ ID de testeur invalide. Veuillez vérifier et réessayer.');
      }

    } else if (userType === 'user') {
      // ✅ USER MODE: Show message + Discord button (NO form submission)
      setDownloadError('🚧 Cette fonctionnalité n’est pas encore disponible pour les utilisateurs. Rejoignez notre communauté Discord pour un accès gratuit et exclusif !');
      // Do NOT submit or download — just show message and Discord button
    }
  };

  return (
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
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentPage("home")}
              >
                Accueil
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentPage("download")}
              >
                Fonctionnalités
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentPage("components")}
              >
                Composants
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentPage("custom")}
              >
                Contact
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentPage("scriptcircuit")}
              >
                Schéma Circuit
              </button>
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
                  Smart ESP – L’IoT pour tous : créez, innovez et partagez vos <span className="text-blue-600">projets connectés</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  <span>
                    Smart ESP :  
                    L’application <strong className="text-green-600">IoT qui libère votre potentiel</strong>, conçue pour <strong className="text-purple-600">étudiants</strong>, <strong className="text-purple-600">débutants</strong> et passionnés curieux.  
                    Avec Smart ESP, transformez vos <strong className="text-orange-600">idées ESP32/ESP8266</strong> en projets réels, utiles et concrets pour votre entourage.  
                    Profitez d’une <strong className="text-blue-500">collecte</strong>, d’une surveillance et d’un partage de données en temps réel grâce à <strong className="text-green-500">Google Sheets</strong>, <strong className="text-red-500">Gmail</strong> et l’<strong className="text-pink-500">assistance IA Gemini</strong>.  
                    Catalogue de composants, bibliothèques et <strong className="text-teal-600">outils intelligents</strong> : tout est pensé pour que vous ressentiez la fierté de réussir, sans configuration complexe.
                  </span>
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
                  className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
                  onClick={() => window.open("https://smartesp-premium.vercel.app/", "_blank", "noopener,noreferrer")}
                >
                  <ExternalLink size={20} />
                  <span>Smart ESP Premium Workflow </span>
                </button>
                <button
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white border-2 border-[#5865F2] px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
                  onClick={() => window.open("https://discord.gg/rJfVXHgs", "_blank", "noopener,noreferrer")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                  </svg>
                  <span>Rejoindre la communauté Discord</span>
                </button>
                {/* >>> MODIFIED: Download Button triggers modal */}
                <button
                  className="
                    group
                    relative
                    overflow-hidden
                    bg-gradient-to-r from-[#5865F2] to-[#4752C4]
                    hover:from-[#4752C4] hover:to-[#5865F2]
                    text-white
                    border-2 border-transparent
                    hover:border-[#5865F2]
                    px-8 py-4
                    rounded-xl
                    text-lg font-bold
                    shadow-lg shadow-[#5865F2]/30
                    hover:shadow-xl hover:shadow-[#4752C4]/50
                    transition-all duration-300
                    transform hover:scale-105
                    flex items-center justify-center
                    space-x-3
                    focus:outline-none focus:ring-4 focus:ring-[#5865F2]/50
                    active:scale-95
                  "
                  onClick={() => setShowDownloadModal(true)} // <<< Opens the modal
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="transition-transform duration-300 group-hover:rotate-12"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                  </div>
                  <span className="transition-colors duration-300 group-hover:text-[#E7E9FF]">
                    Télécharger l'assistant Arduino
                  </span>
                  <div className="
                    absolute
                    top-0 left-0
                    w-full h-full
                    bg-white/10
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    pointer-events-none
                  "></div>
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
      {/* >>> ADDED: Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div> {/* Overlay for better text readability */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
            Notre Mission
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <p className="text-lg md:text-xl leading-relaxed">
              Notre mission est de permettre à chacun de créer des projets IoT, même avec très peu de connaissances techniques. Grâce à notre dévouement, de plus en plus de personnes osent entrer dans le domaine de l’IoT, découvrant qu’il est possible d’utiliser la technologie pour résoudre leurs problèmes rapidement et efficacement.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mt-6">
              Chez Smart ESP, nous mettons toutes les ressources à portée de main, afin que chacun, quel que soit son niveau, puisse explorer, apprendre et innover dans un environnement connecté et une communauté solidaire.
            </p>
          </div>
        </div>
        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-10 text-white/10">
          <Zap size={48} />
        </div>
        <div className="absolute bottom-10 right-10 text-white/10">
          <Cpu size={48} />
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
                  Voire la communauté 
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
                <li>smartespservices@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Smart ESP. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* >>> NEW: Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Accès au téléchargement</h2>
              <button
                onClick={() => {
                  setShowDownloadModal(false);
                  setUserType(null);
                  setTesterId('');
                  setUserName('');
                  setUserEmail('');
                  setDownloadError('');
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {!userType && (
              <div className="space-y-4">
                <p className="text-gray-700">Êtes-vous un testeur ou un utilisateur ?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUserType('tester')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Testeur
                  </button>
                  <button
                    onClick={() => setUserType('user')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Utilisateur
                  </button>
                </div>
              </div>
            )}

            {userType === 'tester' && (
              <form onSubmit={handleDownloadFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="tester-id" className="block text-sm font-medium text-gray-700 mb-1">
                    Entrez votre ID de testeur
                  </label>
                  <input
                    type="text"
                    id="tester-id"
                    value={testerId}
                    onChange={(e) => setTesterId(e.target.value)}
                    placeholder="Ex: TEST-7H2K9"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                {downloadError && <p className="text-red-500 text-sm mb-4">{downloadError}</p>}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setUserType(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Valider
                  </button>
                </div>
              </form>
            )}

            {userType === 'user' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        🚧 Cette fonctionnalité n’est pas encore disponible pour les utilisateurs.
                        <br />
                        <strong>Rejoignez notre communauté Discord pour un accès gratuit et exclusif !</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => window.open("https://discord.gg/rJfVXHgs", "_blank", "noopener,noreferrer")}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                    <span>Rejoindre Discord</span>
                  </button>

                  {/* Optional: Report Button */}
                  <button
                    type="button"
                    onClick={() => alert("Fonctionnalité de signalement bientôt disponible.")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Signaler un problème
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={() => setUserType(null)}
                    className="text-gray-500 hover:text-gray-700 underline text-sm"
                  >
                    ← Retour au choix
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


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

  const ComponentsPage = () => {
    // >>> NEW FEATURE: State for multi-selection and custom prompt (with persistence)
    const [selectedComponentsForAI, setSelectedComponentsForAI] = useState<Component[]>(() => {
      // Load from localStorage on initial render
      const savedIds = localStorage.getItem('selectedComponentIds');
      if (savedIds) {
        try {
          const ids = JSON.parse(savedIds) as number[];
          return iotComponents.filter(comp => ids.includes(comp.id));
        } catch (error) {
          console.error("Failed to parse saved component IDs from localStorage", error);
          return [];
        }
      }
      return [];
    });
    const [customPrompt, setCustomPrompt] = useState("");
    const [customGeneratedCode, setCustomGeneratedCode] = useState<string | null>(null);
    const [loadingCustomCode, setLoadingCustomCode] = useState(false);
    // >>> NEW FEATURE: Applied Search Term (for Enter key)
    const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
    // Handle Enter key press for search
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setAppliedSearchTerm(searchTerm); // Apply the search only on Enter
        e.preventDefault();
      }
    };
    // Effect to save selected components to localStorage
    useEffect(() => {
      const ids = selectedComponentsForAI.map(comp => comp.id);
      localStorage.setItem('selectedComponentIds', JSON.stringify(ids));
    }, [selectedComponentsForAI]);
    // >>> NEW FEATURE: Function to toggle component selection
    const toggleComponentSelectionForAI = (component: Component) => {
      setSelectedComponentsForAI(prev => {
        if (prev.find(c => c.id === component.id)) {
          return prev.filter(c => c.id !== component.id); // Deselect if already selected
        } else {
          return [...prev, component]; // Select if not already selected
        }
      });
    };
    // >>> NEW FEATURE: Function to generate code based on selected components and prompt
    const generateCustomCode = async () => {
      if (selectedComponentsForAI.length === 0) {
        alert("Veuillez sélectionner au moins un composant.");
        return;
      }
      if (customPrompt.trim().length === 0) {
        alert("Veuillez entrer une description de votre projet.");
        return;
      }
      setLoadingCustomCode(true);
      setCustomGeneratedCode(null);
      try {
       const componentList = selectedComponentsForAI.map(comp => `${comp.name} (${comp.description})`).join("\n- ");
        const fullPrompt = `L'utilisateur a sélectionné les composants suivants :
- ${componentList}
Description du projet souhaité par l'utilisateur :
"${customPrompt}"
Génère une réponse complète, pédagogique et utile. Cela peut être :
- Un projet IoT intégrant tous ces composants.
- Un schéma de câblage simplifié.
- Un code Arduino C++ unifié pour ESP32 ou ESP8266.
- Des conseils d'utilisation.
Le tout doit être clair, concis et directement utilisable par un étudiant ou un débutant.`;
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaf0dZY3tmfdR7Um0mUr-jnJCkLg8-XSI",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }],
            }),
          }
        );
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          setCustomGeneratedCode(data.candidates[0].content.parts[0].text.trim());
        } else {
          setCustomGeneratedCode("❌ Erreur : Aucune réponse générée par l'IA.");
        }
      } catch (error) {
        console.error("Erreur API Gemini (Custom):", error);
        setCustomGeneratedCode("❌ Échec de la connexion à l'IA. Vérifiez le réseau ou l'API key.");
      } finally {
        setLoadingCustomCode(false);
      }
    };
    // >>> NEW FEATURE: Function to clear selection
    const clearSelection = () => {
      setSelectedComponentsForAI([]);
      setCustomPrompt("");
      setCustomGeneratedCode(null);
    };
    // >>> NEW FEATURE: Filter components using the applied search term (on Enter)
    const filteredComponents = iotComponents.filter((component) =>
      component.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    );
    return (
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
                  Smart ESP – Catalogue de composants IoT
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
                onKeyPress={handleSearchKeyPress} // <-- NEW: Trigger search on Enter
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
          {/* >>> NEW FEATURE: Multi-Select & Prompt UI */}
          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Créer un Projet Personnalisé avec l'IA</h3>
            <p className="text-sm text-gray-600 mb-4">
              Cliquez sur le bouton "+" sur les cartes de composants pour les ajouter ici, puis décrivez votre idée de projet (max 500 caractères).
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Composants sélectionnés ({selectedComponentsForAI.length})</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedComponentsForAI.map(comp => (
                  <span key={comp.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {comp.name}
                    <button
                      type="button"
                      onClick={() => toggleComponentSelectionForAI(comp)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedComponentsForAI.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Tout effacer
                  </button>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Décrivez votre projet (max 500 caractères)
              </label>
              <textarea
                id="custom-prompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value.substring(0, 500))} // Enforce 500 char limit
                placeholder="Ex: Je veux créer une station météo qui envoie un email si la température dépasse 30°C..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                maxLength={500}
              ></textarea>
              <p className="text-xs text-gray-500 text-right mt-1">{customPrompt.length}/500</p>
            </div>
            <button
              onClick={generateCustomCode}
              disabled={loadingCustomCode}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 transition-colors flex items-center space-x-2"
            >
              {loadingCustomCode ? (
                <>
                  <Zap className="animate-spin" size={16} />
                  <span>Génération...</span>
                </>
              ) : (
                <>
                  <Brain size={16} />
                  <span>Générer mon Projet</span>
                </>
              )}
            </button>
            {/* >>> NEW FEATURE: Display Custom Generated Output */}
            {customGeneratedCode && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">Résultat de l'IA</h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(customGeneratedCode).then(
                        () => alert("✅ Copié dans le presse-papiers !"),
                        () => alert("❌ Échec de la copie.")
                      );
                    }}
                    className="flex items-center space-x-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded border"
                  >
                    <Copy size={14} />
                    <span>Copier</span>
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {customGeneratedCode}
                </pre>
              </div>
            )}
          </div>
          {/* Component Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                // >>> ORIGINAL BEHAVIOR: Click opens the modal
                onClick={() => setSelectedComponent(component)}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all relative ${
                  selectedComponentsForAI.find(c => c.id === component.id) ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <img
                  src={component.image}
                  alt={component.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{component.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {component.description.substring(0, 60)}...
                  </p>
                </div>
                {/* >>> NEW FEATURE: Add a "+" button for AI selection */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the modal from opening
                    toggleComponentSelectionForAI(component);
                  }}
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-md hover:shadow-lg transition-all z-10"
                  title="Ajouter à la liste pour l'IA"
                >
                  +
                </button>
                {/* >>> NEW FEATURE: Add "Voir sur YouTube" button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the modal from opening
                    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(component.name)}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md hover:shadow-lg transition-all z-10"
                  title="Voir sur YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.007-.103c.05-.572.124-1.14.235-1.558a2.007 2.007 0 0 1 1.415-1.42c.487-.132 1.544-.211 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Modal (UNCHANGED) */}
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Zap size={16} />
                      <span>Générer le code</span>
                    </button>
                    {loadingCode && (
                      <p className="text-blue-600 mt-2 flex items-center space-x-2">
                        <Zap className="animate-spin" size={16} />
                        <span>Génération du code...</span>
                      </p>
                    )}
                    {generatedCode && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-800">Code Généré</h3>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedCode).then(
                                () => alert("✅ Code copié dans le presse-papiers !"),
                                () => alert("❌ Échec de la copie.")
                              );
                            }}
                            className="flex items-center space-x-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded border"
                          >
                            <Copy size={14} />
                            <span>Copier</span>
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap font-mono">
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
  };

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
      {/* Portfolio Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Projets IoT Inspirants</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Maison Intelligente avec Reconnaissance Vocale",
              desc: "Contrôlez vos lumières, volets et musique par la voix, avec assistant IA intégré.",
              image: "https://m.media-amazon.com/images/I/816tOhl+3pL._AC_SL1500_.jpg"
            },
            {
              title: "Jardin Automatique Connecté",
              desc: "Arrosage intelligent selon l'humidité du sol, la météo et la lumière. Surveillance en temps réel.",
              image: "https://www.moussasoft.com/wp-content/uploads/2023/02/Systeme-darrosage-de-plantes-Arduino-.jpg"
            },
            {
              title: "Serrure Biométrique + Notification Gmail",
              desc: "Ouverture par empreinte digitale avec alerte  à chaque accès.",
              image: "https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/01/enroll-finger.jpg?quality=100&strip=all&ssl=1"
            },
            {
              title: "Capteur de Qualité de l’Air & Purificateur Auto",
              desc: "Détecte CO2, poussière et humidité, active le purificateur si nécessaire.",
              image: "https://www.alonsoruibal.com/wp-content/uploads/2024/05/esp32-c3-connections@2x.jpeg?auto=format&fit=crop&w=600&h=400&q=80"
            },
            {
              title: "Station Météo Personnelle avec Alertes",
              desc: "Mesure température, pluie, vent et envoie des alertes SMS ou Gmail.",
              image: "https://i.ytimg.com/vi/1qGGDFqb1ow/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH8CYAC0AWKAgwIABABGGUgXChMMA8=&rs=AOn4CLAxprxwy1FSbrk2fUU82-wI5hgfRw?auto=format&fit=crop&w=600&h=400&q=80"
            },
            {
              title: "Robot de Surveillance Mobile (ESP32-CAM)",
              desc: "Robot télécommandé avec caméra en streaming et détection de mouvement.",
              image: "https://raw.githubusercontent.com/Circuit-Digest/ESP32-Cam-Surveillance-Car/2ecf12ce9a1ee8d120fa83f880da9de1a1b8d51f/wifi-surveillance-robot-car-esp32-cam.gif?auto=format&fit=crop&w=600&h=400&q=80"
            }
          ].map((app, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col">
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{app.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{app.desc}</p>
                {/* Contact Buttons */}
                <div className="space-y-2">
                  <a
                    href="https://api.whatsapp.com/send/?phone=212710038821"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Why Choose Us */}
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
      {/* Call to Action */}

      <div className="flex flex-col sm:flex-row gap-4">
  <button
    className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
    onClick={() => window.open("https://smartesp-premium.vercel.app/")}
  >
    <ExternalLink size={20} />
    <span>Smart ESP Premium Workflow </span>
  </button>
  {/* NEW: Discord Community Button */}
  <button
    className="bg-[#5865F2] hover:bg-[#4752C4] text-white border-2 border-[#5865F2] px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
    onClick={() => window.open("https://discord.gg/rJfVXHgs", "_blank", "noopener,noreferrer")}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
    </svg>
    <span>Rejoindre la communauté Discord</span>
  </button>
</div>
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à Transformer Votre Vision IoT ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Laissez notre équipe d'experts créer une solution IoT personnalisée qui correspond parfaitement à vos exigences.
            Du concept au déploiement, nous nous occupons de tout.
          </p>
          <a
            href="https://wa.me/212710038821"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Contactez-nous pour concrétiser votre projet ✅
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
    case "scriptcircuit":
      return <ScriptCircuitPage />;
    default:
      return <HomePage />;
  }
}

export default App;
