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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || "API returned an error object.");
      }
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I received an empty or unreadable response from the API.";
      if (aiResponseText !== "Sorry, I received an empty or unreadable response from the API.") {
        const aiResponse = aiResponseText.trim();
        const svgMatch = aiResponse.match(/```svg\s*([\s\S]*?)\s*```/);
        if (svgMatch && svgMatch[1]) {
          setGeneratedSVG(svgMatch[1]);
        } else {
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
      <HomeButton onClick={() => setCurrentPage("home")} />
      <nav className="glass-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">Générateur de Schémas Circuits</span>
            </div>
            {/* API Key Input and Toggle */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Votre clé API"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="glass-input px-4 py-2 rounded-lg"
              />
              <button
                onClick={() => setUseCustomApiKey(!useCustomApiKey)}
                className={`glass-button px-4 py-2 rounded-lg ${
                  useCustomApiKey ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {useCustomApiKey ? "Utiliser la clé personnalisée" : "Utiliser la clé par défaut"}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Générateur de Schémas Circuits avec IA</h1>
          <p className="text-xl text-gray-600">Décrivez votre projet et laissez l'IA générer un schéma de circuit SVG complet</p>
        </div>
        <div className="glass-card rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description de votre projet</h2>
          <p className="text-gray-600 mb-4">Décrivez en détail votre projet, y compris les composants utilisés, leurs connexions, et toute information pertinente.</p>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Ex: Je veux créer un système d'arrosage automatique avec un ESP32, un capteur d'humidité du sol, une pompe à eau et un relais. Le capteur est connecté à GPIO34, le relais à GPIO26..."
            className="glass-input w-full h-40 p-4 rounded-2xl resize-none text-gray-800"
          ></textarea>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={generateCircuitSVG}
              disabled={isLoading}
              className="glass-button px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 text-blue-600"
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
            <button
              onClick={copySystemPrompt}
              className="glass-button px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 text-purple-600"
            >
              <Copy size={20} />
              <span>Copier le Prompt</span>
            </button>
            <button
              onClick={renderSVFFromDescription}
              className="glass-button px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 text-indigo-600"
            >
              <Zap size={20} />
              <span>Visualiser SVG</span>
            </button>
            {generatedSVG && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="glass-button px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 text-gray-700"
                >
                  <Copy size={20} />
                  <span>Copier SVG</span>
                </button>
                <button
                  onClick={downloadSVG}
                  className="glass-button px-6 py-3 rounded-2xl font-semibold flex items-center justify-center space-x-2 text-green-600"
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
          <div className="glass-card rounded-3xl p-8">
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

  // 🔥 Gemini API Call to Generate Arduino Code
  const generateCode = async (component: Component) => {
    setLoadingCode(true);
    setGeneratedCode(null);
    const systemPrompt = `
Génère une explication simple et détaillée du fonctionnement du composant suivant :
${component.name} (${component.description}).
Ensuite, propose un petit code d’exemple en Arduino C++ montrant comment utiliser ce composant.
Le code doit être minimaliste, clair et pédagogique, avec des commentaires en français expliquant chaque étape (initialisation, configuration, boucle, etc.).
`;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || "API returned an error object.");
      }
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I received an empty or unreadable response from the API.";
      setGeneratedCode(aiResponseText);
    } catch (error) {
      console.error("Erreur API Gemini:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
      setGeneratedCode(`❌ Échec de la connexion ou erreur API. Détails: ${errorMessage}`);
    } finally {
      setLoadingCode(false);
    }
  };

  // --- Page Components ---
  const HomePage = () => {
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [userType, setUserType] = useState<'tester' | 'user' | null>(null);
    const [testerId, setTesterId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [downloadError, setDownloadError] = useState('');
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

    const handleFinalDownload = () => {
      window.open("https://github.com/SmartESP-Team/Site_de_smart_ESP/releases/download/v1.0/arduino.ide.hepler.zip", "_blank", "noopener,noreferrer");
    };

    const handleDownloadFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setDownloadError('');
      if (userType === 'tester') {
        if (validTesterIds.includes(testerId.trim().toUpperCase())) {
          alert('✅ Accès de testeur confirmé. Téléchargement en cours...');
          setShowDownloadModal(false);
          handleFinalDownload();
          setUserType(null);
          setTesterId('');
        } else {
          setDownloadError('❌ ID de testeur invalide. Veuillez vérifier et réessayer.');
        }
      } else if (userType === 'user') {
        setDownloadError('🚧 Cette fonctionnalité n’est pas encore disponible pour les utilisateurs. Rejoignez notre communauté Discord pour un accès gratuit et exclusif !');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white scroll-smooth">
        <IconBackground />
        <nav className="glass-nav sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="text-blue-600" size={32} />
                <span className="text-2xl font-bold text-gray-800">IOT4YOU2</span>
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
                    IOT4YOU2 – L’IoT pour tous : créez, innovez et partagez vos <span className="text-blue-600">projets connectés</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    <span>
                      IOT4YOU2 :
                      L’application <strong className="text-green-600">IoT qui libère votre potentiel</strong>, conçue pour <strong className="text-purple-600">étudiants</strong>, <strong className="text-purple-600">débutants</strong> et passionnés curieux.
                      Avec IOT4YOU2, transformez vos <strong className="text-orange-600">idées ESP32/ESP8266</strong> en projets réels, utiles et concrets pour votre entourage.
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
                    <span>IOT4YOU2 Premium Workflow </span>
                  </button>
                  <button
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white border-2 border-[#5865F2] px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
                    onClick={() => window.open("https://discord.gg/GE5RVBab", "_blank", "noopener,noreferrer")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                    <span>Rejoindre la communauté Discord</span>
                  </button>
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
                    onClick={() => setShowDownloadModal(true)}
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
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://fayrviwbbspmiqztcyhv.supabase.co/storage/v1/object/public/iotimages/screen%20%20shot/Green%20and%20Yellow%20Playful%20Illustrative%20What%20are%20the%20parts%20of%20a%20Plant%20Presentation%20(2).png"
                  alt="Capture d'écran de l'application IOT4YOU2"
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
            Notre Mission
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <p className="text-lg md:text-xl leading-relaxed">
              Notre mission est de permettre à chacun de créer des projets IoT, même avec très peu de connaissances techniques. Grâce à notre dévouement, de plus en plus de personnes osent entrer dans le domaine de l’IoT, découvrant qu’il est possible d’utiliser la technologie pour résoudre leurs problèmes rapidement et efficacement.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mt-6">
              Chez IOT4YOU2, nous mettons toutes les ressources à portée de main, afin que chacun, quel que soit son niveau, puisse explorer, apprendre et innover dans un environnement connecté et une communauté solidaire.
            </p>
          </div>
        </div>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explorer IOT4YOU2</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour le développement IoT</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group glass-card p-8 rounded-3xl relative">
              <div className="text-center space-y-6">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Download className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Télécharger IOT4YOU2</h3>
                <p className="text-gray-600">Obtenez l'application IOT4YOU2 complète avec toutes les bibliothèques et pilotes</p>
                <button
                  onClick={() => setCurrentPage("download")}
                  className="glass-button px-6 py-3 rounded-2xl font-semibold w-full text-blue-600"
                >
                  Voir les Téléchargements
                </button>
              </div>
              <div className="absolute top-4 right-4 text-blue-200/50">
                <Smartphone size={24} />
              </div>
            </div>
            <div className="group glass-card p-8 rounded-3xl relative">
              <div className="text-center space-y-6">
                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Cpu className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Catalogue de Composants IoT</h3>
                <p className="text-gray-600">Parcourez notre vaste catalogue de plus de 100 composants IoT avec des spécifications détaillées</p>
                <button
                  onClick={() => setCurrentPage("components")}
                  className="glass-button px-6 py-3 rounded-2xl font-semibold w-full text-green-600"
                >
                  Parcourir les Composants
                </button>
              </div>
              <div className="absolute top-4 right-4 text-green-200/50">
                <Zap size={24} />
              </div>
            </div>
            <div className="group glass-card p-8 rounded-3xl relative">
              <div className="text-center space-y-6">
                <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</h3>
                <p className="text-gray-600">Commandez des applications IoT personnalisées adaptées à vos besoins spécifiques</p>
                <button
                  onClick={() => setCurrentPage("custom")}
                  className="glass-button px-6 py-3 rounded-2xl font-semibold w-full text-purple-600"
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
                <span className="text-xl font-bold">IOT4YOU2</span>
              </div>
              <p className="text-gray-400">Revolutionizing IoT development with AI-powered tools and seamless integrations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Application IOT4YOU2</li>
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
                <li>iot4you2services@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IOT4YOU2. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl max-w-md w-full p-6">
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
                    className="flex-1 glass-button py-2 px-4 rounded-2xl text-blue-600"
                  >
                    Testeur
                  </button>
                  <button
                    onClick={() => setUserType('user')}
                    className="flex-1 glass-button py-2 px-4 rounded-2xl text-green-600"
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
                    className="flex-1 glass-button py-2 px-4 rounded-2xl text-blue-600"
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
                    onClick={() => window.open("https://discord.gg/GE5RVBab", "_blank", "noopener,noreferrer")}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                    <span>Rejoindre Discord</span>
                  </button>
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
      </div>
    );
  };

  const DownloadPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <IconBackground />
      <HomeButton onClick={() => setCurrentPage("home")} />
      <nav className="glass-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <Cpu className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Téléchargements IOT4YOU2</span>
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
                className="glass-card rounded-3xl overflow-hidden"
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
            <span>Application IOT4YOU2</span>
          </a>
          <a
            href="https://github.com/SmartESP-Team/SmartESP32Utils/archive/refs/heads/main.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-6 rounded-3xl font-semibold text-lg flex items-center justify-center space-x-3 text-green-600"
          >
            <Download size={24} />
            <span>Bibliothèque ESP32</span>
          </a>
          <a
            href="https://github.com/SmartESP-Team/SmartESP8266Utils/archive/refs/heads/main.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-6 rounded-3xl font-semibold text-lg flex items-center justify-center space-x-3 text-purple-600"
          >
            <Download size={24} />
            <span>Bibliothèque ESP8266</span>
          </a>
          <a
            href="https://github.com/user-attachments/files/21894487/CH341SER.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-6 rounded-3xl font-semibold text-lg flex items-center justify-center space-x-3 text-orange-600"
          >
            <Download size={24} />
            <span>Fichier Pilote ESP</span>
          </a>
        </div>
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Vidéo de Démarrage</h3>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/9jcOBSLE75o?si=0N8tn40SZiQ2cGVw"
              title="Tutoriel IOT4YOU2"
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
    const [selectedComponentsForAI, setSelectedComponentsForAI] = useState<Component[]>(() => {
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
    const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setAppliedSearchTerm(searchTerm);
        e.preventDefault();
      }
    };

    useEffect(() => {
      const ids = selectedComponentsForAI.map(comp => comp.id);
      localStorage.setItem('selectedComponentIds', JSON.stringify(ids));
    }, [selectedComponentsForAI]);

    const toggleComponentSelectionForAI = (component: Component) => {
      setSelectedComponentsForAI(prev => {
        if (prev.find(c => c.id === component.id)) {
          return prev.filter(c => c.id !== component.id);
        } else {
          return [...prev, component];
        }
      });
    };

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
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
          }),
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message || "API returned an error object.");
        }
        const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I received an empty or unreadable response from the API.";
        setCustomGeneratedCode(aiResponseText);
      } catch (error) {
        console.error("Erreur API Gemini (Custom):", error);
        setCustomGeneratedCode("❌ Échec de la connexion à l'IA. Vérifiez le réseau ou l'API key.");
      } finally {
        setLoadingCustomCode(false);
      }
    };

    const clearSelection = () => {
      setSelectedComponentsForAI([]);
      setCustomPrompt("");
      setCustomGeneratedCode(null);
    };

    const filteredComponents = iotComponents.filter((component) =>
      component.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <IconBackground />
        <HomeButton onClick={() => setCurrentPage("home")} />
        <nav className="glass-nav sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center space-x-2">
              <Cpu className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">
                IOT4YOU2 – Catalogue de composants IoT
              </span>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un composant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="glass-input w-full pl-10 pr-4 py-3 rounded-2xl"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="glass-button flex items-center space-x-2 px-4 py-3 rounded-2xl text-blue-600"
            >
              <Filter size={20} />
              <span>Filtres</span>
            </button>
          </div>
          <div className="mb-8 p-6 glass-card rounded-3xl">
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
                onChange={(e) => setCustomPrompt(e.target.value.substring(0, 500))}
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
            {customGeneratedCode && (
              <div className="mt-6 p-4 glass rounded-2xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`glass-card rounded-3xl overflow-hidden cursor-pointer relative ${
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComponentSelectionForAI(component);
                  }}
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-md hover:shadow-lg transition-all z-10"
                  title="Ajouter à la liste pour l'IA"
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
        {selectedComponent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
      <HomeButton onClick={() => setCurrentPage("home")} />
      <nav className="glass-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <Globe className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Applications IoT Personnalisées</span>
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
              <div key={index} className="glass-card rounded-3xl overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{app.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{app.desc}</p>
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
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
            onClick={() => window.open("https://smartesp-premium.vercel.app/")}
          >
            <ExternalLink size={20} />
            <span>IOT4YOU2 Premium Workflow </span>
          </button>
          <button
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white border-2 border-[#5865F2] px-6 py-3 rounded-lg text-base font-semibold transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
            onClick={() => window.open("https://discord.gg/GE5RVBab", "_blank", "noopener,noreferrer")}
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
