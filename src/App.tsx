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
  }
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
                  Smart ESP – La plateforme IoT unique, intelligente et simple pour vos  <span className="text-blue-600">Projets ESP</span>
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
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Retour à l'Accueil</span>
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Smart ESP – Catalogue de composants IoT pour ESP32 et ESP8266</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
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

  const NotFoundPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
    <IconBackground />
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <span className="text-3xl font-bold">404</span>
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Page Non Trouvée</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! La page que vous recherchez n'existe pas. Elle a peut-être été déplacée, supprimée ou saisie incorrectement.
      </p>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 mb-8 text-left max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Suggestions utiles :</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start space-x-3">
            <Play className="text-blue-500 mt-1 flex-shrink-0" size={16} />
            <span>Vérifiez l'adresse URL et réessayez.</span>
          </li>
          <li className="flex items-start space-x-3">
            <Play className="text-blue-500 mt-1 flex-shrink-0" size={16} />
            <span>Retournez à l'accueil pour explorer les fonctionnalités.</span>
          </li>
          <li className="flex items-start space-x-3">
            <Play className="text-blue-500 mt-1 flex-shrink-0" size={16} />
            <span>Parcourez le catalogue de composants IoT pour vos projets.</span>
          </li>
          <li className="flex items-start space-x-3">
            <Play className="text-blue-500 mt-1 flex-shrink-0" size={16} />
            <span>Téléchargez l'application Smart ESP pour commencer.</span>
          </li>
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

      <div className="mt-12 text-gray-500">
        <p>© 2025 Smart ESP. Tous droits réservés.</p>
      </div>
    </div>
  </div>
);

 switch (currentPage) {
  case 'download':
    return <DownloadPage />;
  case 'components':
    return <ComponentsPage />;
  case 'custom':
    return <CustomAppsPage />;
  case 'home':
    return <HomePage />;
  default:
    return <NotFoundPage />;
}

export default App;
