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
  {
    id: 11,
    name: "Capteur de Gaz (Série MQ)",
    image: "https://i.postimg.cc/s2tYbmYt/MQ-2-Smoke-Gas-Sensor-Module-3-removebg-preview_-_Copie.png",
    description: "Module capteur de gaz pour la détection de divers types de gaz (GPL, fumée, alcool, etc.).",
    voltage: "5V DC",
    specifications: ["Plage de détection : 200-1000ppm", "Temps de préchauffage : 20s", "Sortie : Analogique/Numérique", "Consommation : 150mA"]
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
    image: "https://via.placeholder.com/150?text=Component+69",
    description: "Microphone amplifié avec gain ajustable, idéal pour la détection de sons ou la reconnaissance vocale.",
    voltage: "3.3-5V DC",
    specifications: ["Gain : 30-60dB", "Sortie : Analogique", "Fréquence : 20Hz-20kHz", "Alimentation : 3.3-5V"]
  },
  {
    id: 70,
    name: "Capteur de Distance Ultrason HC-SR04",
    image: "https://via.placeholder.com/150?text=Component+70",
    description: "Module de mesure de distance par écho ultrasonore, utilisé pour la détection d'obstacles.",
    voltage: "5V DC",
    specifications: ["Portée : 2cm-4m", "Précision : ±3mm", "Angle : 15°", "Sortie : Numérique (Trigger/Echo)"]
  },
  {
    id: 71,
    name: "Moteur DC 6V",
    image: "https://via.placeholder.com/150?text=Component+71",
    description: "Moteur à courant continu simple, utilisé pour la propulsion dans les robots ou les véhicules miniatures.",
    voltage: "6V DC",
    specifications: ["Vitesse : 200 RPM", "Couple : 0.5kg·cm", "Courant : 200mA", "Taille : 30x20mm"]
  },
  {
    id: 72,
    name: "Module Amplificateur Audio PAM8403",
    image: "https://via.placeholder.com/150?text=Component+72",
    description: "Amplificateur stéréo numérique 2x3W, idéal pour les projets audio avec haut-parleurs.",
    voltage: "5V DC",
    specifications: ["Puissance : 2x3W", "THD : <1%", "Entrée : Analogique", "Classe : D"]
  },
  {
    id: 73,
    name: "Capteur de CO2 MH-Z19B",
    image: "https://via.placeholder.com/150?text=Component+73",
    description: "Capteur de dioxyde de carbone (CO2) basé sur la technologie NDIR, utilisé pour la qualité de l'air.",
    voltage: "5V DC",
    specifications: ["Plage : 0-5000ppm", "Précision : ±50ppm", "Sortie : UART/PWM", "Temps de préchauffage : 3min"]
  },
  {
    id: 74,
    name: "Module de Communication NRF24L01",
    image: "https://via.placeholder.com/150?text=Component+74",
    description: "Module sans fil 2.4GHz à faible consommation, utilisé pour la communication entre microcontrôleurs.",
    voltage: "3.3V DC",
    specifications: ["Portée : 100m (module amplifié)", "Débit : 250kbps-2Mbps", "Interface : SPI", "Consommation : 12mA"]
  },
  {
    id: 75,
    name: "Capteur de Qualité de l'Air (SGP30)",
    image: "https://via.placeholder.com/150?text=Component+75",
    description: "Capteur numérique de qualité de l'air intérieur, mesurant les COV et le CO2 équivalent.",
    voltage: "3.3V DC",
    specifications: ["Mesures : COV, eCO2", "Interface : I2C", "Durée de vie : 5 ans", "Précision : ±15%"]
  },
  {
    id: 76,
    name: "Pompe à Air pour Aquarium",
    image: "https://via.placeholder.com/150?text=Component+76",
    description: "Mini pompe à air 12V pour aérer l'eau dans les aquariums ou systèmes hydroponiques.",
    voltage: "12V DC",
    specifications: ["Débit : 100L/h", "Pression : 0.02MPa", "Niveau sonore : 40dB", "Connexion : Tuyau 4mm"]
  },
  {
    id: 77,
    name: "Capteur de Tension (Voltage Sensor)",
    image: "https://via.placeholder.com/150?text=Component+77",
    description: "Module diviseur de tension permettant de mesurer des tensions élevées (jusqu'à 25V) avec un microcontrôleur.",
    voltage: "5V DC",
    specifications: ["Plage : 0-25V", "Précision : ±0.1V", "Sortie : Analogique", "Ratio : 1:5"]
  },
  {
    id: 78,
    name: "Module LED RGB WS2812B (Neopixel)",
    image: "https://via.placeholder.com/150?text=Component+78",
    description: "LED adressable RGB contrôlable individuellement, utilisée pour des effets lumineux dynamiques.",
    voltage: "5V DC",
    specifications: ["Couleur : RVB", "Protocole : One-Wire", "Consommation : 60mA (max)", "Angle : 120°"]
  },
  {
    id: 79,
    name: "Capteur de Niveau d'Eau",
    image: "https://via.placeholder.com/150?text=Component+79",
    description: "Capteur à plaques conductrices pour détecter le niveau d'eau dans un réservoir ou un bac.",
    voltage: "5V DC",
    specifications: ["Sortie : Analogique/Numérique", "Plage : Linéaire", "Matériau : Cuivre étamé", "Taille : 40x15mm"]
  },
  {
    id: 80,
    name: "Module de Chargeur Li-ion TP4056",
    image: "https://via.placeholder.com/150?text=Component+80",
    description: "Module de charge de batterie lithium-ion 1S avec protection contre la surcharge et la surintensité.",
    voltage: "5V DC",
    specifications: ["Tension : 4.2V", "Courant : 1A max", "Protections : OVP, OCP", "Indicateur : LED rouge/bleue"]
  },
  {
    id: 81,
    name: "Capteur de Débit d'Eau YF-S201",
    image: "https://via.placeholder.com/150?text=Component+81",
    description: "Capteur à turbine pour mesurer le débit d'eau dans un tuyau, souvent utilisé dans les compteurs intelligents.",
    voltage: "5-24V DC",
    specifications: ["Plage : 1-30L/min", "Sortie : Impulsions", "Précision : ±10%", "Filetage : 1/2\""]
  },
  {
    id: 82,
    name: "Module Bluetooth HC-05",
    image: "https://via.placeholder.com/150?text=Component+82",
    description: "Module de communication Bluetooth série pour connecter un microcontrôleur à un smartphone ou PC.",
    voltage: "3.3-6V DC",
    specifications: ["Version : Bluetooth 2.0", "Portée : 10m", "Interface : UART", "Mode : Maître/Esclave"]
  },
  {
    id: 83,
    name: "Relais 2 Canaux 5V",
    image: "https://via.placeholder.com/150?text=Component+83",
    description: "Module avec deux relais électromécaniques pour commander deux appareils indépendants.",
    voltage: "5V DC",
    specifications: ["Courant max : 10A", "Tension : 250V AC / 30V DC", "Interface : Numérique", "Indicateur LED : Oui"]
  },
  {
    id: 84,
    name: "Capteur de T°/H° AM2302 (DHT22 en module)",
    image: "https://via.placeholder.com/150?text=Component+84",
    description: "Version encapsulée du DHT22, plus robuste pour les environnements extérieurs ou humides.",
    voltage: "3.3-5V DC",
    specifications: ["Température : -40 à +80°C", "Humidité : 0-100%", "Précision : ±0.5°C", "Sortie : Numérique"]
  },
  {
    id: 85,
    name: "Module de Batterie 18650",
    image: "https://via.placeholder.com/150?text=Component+85",
    description: "Support pour batterie lithium-ion 18650 avec connecteur et protection contre l'inversion.",
    voltage: "3.7V DC",
    specifications: ["Type : 18650", "Connecteur : 2 broches", "Matériau : Plastique", "Taille : 70x20mm"]
  },
  {
    id: 86,
    name: "Capteur de Poids (Load Cell) + HX711",
    image: "https://via.placeholder.com/150?text=Component+86",
    description: "Cellule de pesage avec module amplificateur HX711 pour mesurer des poids précisément.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : 500g à 5kg", "Précision : ±1g", "Interface : HX711 (Digital)", "Sortie : I2C-like"]
  },
  {
    id: 87,
    name: "Moteur à Vibration",
    image: "https://via.placeholder.com/150?text=Component+87",
    description: "Mini moteur excentré utilisé pour les notifications tactiles ou les alertes silencieuses.",
    voltage: "3-5V DC",
    specifications: ["Tension : 3.7V typique", "Courant : 80mA", "Taille : 10mm", "Vitesse : 10000 RPM"]
  },
  {
    id: 88,
    name: "Module d'Extension GPIO MCP23017",
    image: "https://via.placeholder.com/150?text=Component+88",
    description: "Convertisseur I/O permettant d'ajouter 16 broches GPIO supplémentaires via I2C.",
    voltage: "3.3-5V DC",
    specifications: ["Broches : 16", "Interface : I2C", "Adresses : 8 configurables", "Taille : 20x15mm"]
  },
  {
    id: 89,
    name: "Capteur de T° Infrarouge MLX90614",
    image: "https://via.placeholder.com/150?text=Component+89",
    description: "Capteur de température sans contact par infrarouge, idéal pour la mesure corporelle ou industrielle.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : -70 à +380°C", "Précision : ±0.5°C", "Interface : I2C", "Distance : 5cm"]
  },
  {
    id: 90,
    name: "Module d'Affichage OLED 1.3\"",
    image: "https://via.placeholder.com/150?text=Component+90",
    description: "Grand écran OLED 128x64 avec interface I2C ou SPI, idéal pour afficher des graphiques complexes.",
    voltage: "3.3-5V DC",
    specifications: ["Résolution : 128x64", "Interface : I2C/SPI", "Couleur : Monochrome", "Taille : 1.3\""]
  },
  {
    id: 91,
    name: "Capteur de T° PT100",
    image: "https://via.placeholder.com/150?text=Component+91",
    description: "Capteur de température à résistance platine, très précis pour les applications industrielles.",
    voltage: "3.3-5V DC",
    specifications: ["Plage : -200 à +600°C", "Précision : ±0.1°C", "Interface : Analogique", "Type : RTD"]
  },
  {
    id: 92,
    name: "Module de Contrôle de LED DMX512",
    image: "https://via.placeholder.com/150?text=Component+92",
    description: "Module pour piloter des bandes LED DMX ou des projecteurs professionnels.",
    voltage: "5-24V DC",
    specifications: ["Protocole : DMX512", "Canal : 3-16", "Interface : RS485", "Taille : 50x30mm"]
  },
  {
    id: 93,
    name: "Capteur de T°/Pression BMP280",
    image: "https://via.placeholder.com/150?text=Component+93",
    description: "Capteur barométrique haute précision pour mesurer la pression atmosphérique et la température.",
    voltage: "3.3V DC",
    specifications: ["Pression : 300-1100hPa", "Température : 0-65°C", "Interface : I2C/SPI", "Précision : ±1hPa"]
  },
  {
    id: 94,
    name: "Module de Communication LoRa SX1278",
    image: "https://via.placeholder.com/150?text=Component+94",
    description: "Module LoRa à 433MHz pour la communication longue portée et basse consommation.",
    voltage: "3.3V DC",
    specifications: ["Portée : 8km (rural)", "Fréquence : 433MHz", "Débit : 300bps-38.4kbps", "Antenne : SMA"]
  },
  {
    id: 95,
    name: "Capteur de Chute MMA7455",
    image: "https://via.placeholder.com/150?text=Component+95",
    description: "Accéléromètre 3 axes avec détection de chute intégrée, utilisé dans les wearables.",
    voltage: "3.3V DC",
    specifications: ["Plage : ±2/4/8g", "Sortie : Numérique", "Interface : I2C/SPI", "Alarme chute : Oui"]
  },
  {
    id: 96,
    name: "Module de Surveillance de Batterie",
    image: "https://via.placeholder.com/150?text=Component+96",
    description: "Affiche la tension, le courant et la puissance d'une batterie en temps réel.",
    voltage: "5V DC",
    specifications: ["Tension max : 30V", "Courant max : 10A", "Affichage : OLED", "Précision : ±1%"]
  },
  {
    id: 97,
    name: "Capteur de Radiation UV",
    image: "https://via.placeholder.com/150?text=Component+97",
    description: "Capteur mesurant l'intensité des rayons ultraviolets (UV), utile pour la santé ou la météo.",
    voltage: "3.3-5V DC",
    specifications: ["Gamme : UV-A/UV-B", "Sortie : Analogique", "Plage : 0-15mW/cm²", "Angle : 60°"]
  },
  {
    id: 98,
    name: "Module de Pilotage de LED TLC5940",
    image: "https://via.placeholder.com/150?text=Component+98",
    description: "Contrôleur PWM 16 canaux pour piloter précisément des LEDs ou des moteurs.",
    voltage: "5V DC",
    specifications: ["Canaux : 16", "Résolution : 12 bits", "Interface : SPI", "Courant max : 120mA/canal"]
  },
  {
    id: 99,
    name: "Capteur de Gaz MQ-135 (Air Quality)",
    image: "https://via.placeholder.com/150?text=Component+99",
    description: "Détecte les polluants comme le CO2, NH3, NOx, et la qualité de l'air intérieur.",
    voltage: "5V DC",
    specifications: ["Plage : 10-1000ppm", "Temps de préchauffage : 24h", "Sortie : Analogique", "Durée : 10 ans"]
  },
  {
    id: 100,
    name: "Module de Détection RFID PN532",
    image: "https://via.placeholder.com/150?text=Component+100",
    description: "Lecteur RFID/NFC haute sensibilité, compatible avec les cartes MIFARE et les smartphones.",
    voltage: "3.3-5V DC",
    specifications: ["Fréquence : 13.56MHz", "Portée : 5-10cm", "Interface : I2C/SPI/UART", "Protocole : NFC"]
  }
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
