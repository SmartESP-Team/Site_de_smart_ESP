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
  Home,
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
  // ... (rest of your components)
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Ingénieur IoT",
    company: "TechCorp",
    text: "IOT4YOU2 a révolutionné notre processus de développement IoT. L'intégration Gemini AI fournit des suggestions de projets incroyables !",
    rating: 5,
  },
  // ... (rest of your testimonials)
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

interface HomeButtonProps {
  onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-6 left-6 z-50 glass-button rounded-2xl px-6 py-3 flex items-center space-x-2 text-blue-600 font-semibold shadow-lg"
  >
    <Home size={20} />
    <span>Accueil</span>
  </button>
);

// --- Script Circuit Page ---
const ScriptCircuitPage = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [generatedSVG, setGeneratedSVG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- API Key Management ---
  const [defaultApiKey] = useState("AIzaSyDE9J-NkHYMOiBbAJ_nW27frcC9h8owcIg");
  const [customApiKey, setCustomApiKey] = useState("");
  const [useCustomApiKey, setUseCustomApiKey] = useState(false);

  // Load the custom API key from localStorage on app load
  useEffect(() => {
    const savedApiKey = localStorage.getItem("customApiKey");
    if (savedApiKey) {
      setCustomApiKey(savedApiKey);
    }
  }, []);

  // Save the custom API key to localStorage
  useEffect(() => {
    if (customApiKey) {
      localStorage.setItem("customApiKey", customApiKey);
    }
  }, [customApiKey]);

  const API_KEY = useCustomApiKey ? customApiKey : defaultApiKey;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

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
\${projectDescription}`;
    navigator.clipboard.writeText(fullPrompt)
      .then(() => alert("✅ Prompt système copié dans le presse-papiers !"))
      .catch(() => alert("❌ Échec de la copie."));
  };

  const renderSVFFromDescription = () => {
    if (!projectDescription.trim().startsWith('<svg') || !projectDescription.trim().endsWith('</svg>')) {
      setError("❌ Le texte dans la description ne semble pas être un code SVG valide. Assurez-vous qu'il commence par <svg et se termine par </svg>.");
      return;
    }
    setGeneratedSVG(projectDescription.trim());
    setError("");
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
      const systemPrompt = `# Professional SVG Circuit Diagram Generator
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
**Co
