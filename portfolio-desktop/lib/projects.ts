export interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  modalImage?: string; // Image spécifique pour la modale
  technologies: string[];
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  email: string;
  status?: 'In Progress'; // Champ optionnel pour les projets en cours
  modalTheme?: 'light' | 'dark';
}

export const projects: Project[] = [
  {
    id: 'isitopen',
    title: 'Is It Open?',
    subtitle: 'Real-time store status checker with ray-traced lighting effects.',
    icon: '/img/isitopen/isitopen_icon.png',
    image: '/img/isitopen/isitopen_preview.png',
    modalImage: '/img/isitopen/isitopen_check.png',
    technologies: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Google Maps API'],
    demoUrl: 'https://isitopen.romainbouchez.fr',
    description: 'An interactive, real-time store status checker leveraging the Google Places API. It features a unique ray-traced "Lamp" UI that visually signals store status (Open/Closed) through dynamic lighting effects and glassmorphism.',
    features: [
      { icon: '🕒', title: 'Real-Time Status', description: 'Instantly checks opening hours based on current time and day.' },
      { icon: '💡', title: 'Ray-Traced UI', description: 'Dynamic lighting effects (Cyan/Green/Red) reflecting business state.' },
      { icon: '🔍', title: 'Smart Search', description: 'Integrated Google Places Autocomplete for easy establishment finding.' },
      { icon: '📱', title: 'Mobile First', description: 'Responsive layout with touch-optimized controls and animations.' },
    ],
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'ghost-note',
    title: 'Ghost Note',
    subtitle: 'Zero-Knowledge, Read-Once Ephemeral Note Sharing Application.',
    icon: '/img/ghost_note/ghost_note_icon.png',
    image: '/img/ghost_note/ghost_note_preview.png',
    modalTheme: 'dark',
    technologies: ['Next.js', 'Tailwind CSS', 'CryptoJS', 'Node.js', 'NeonDB'],
    demoUrl: 'https://ghostnote.romainbouchez.fr',
    description: 'A secure note sharing application where data is encrypted in the browser before reaching the server. Guarantees privacy via a read-once policy and immediate auto-destruction of decrypted content.',
    features: [
      { icon: '🔒', title: 'Client-Side Encryption', description: 'AES-256 encryption in browser; key never sent to server.' },
      { icon: '🚫', title: 'Read-Once Privacy', description: 'Data is permanently deleted from the database immediately after retrieval.' },
      { icon: '🙈', title: 'Zero-Knowledge', description: 'Server cannot read notes; only the recipient with the link key can decrypt.' },
      { icon: '⏱️', title: 'Auto-Destruction', description: 'Unread notes expire and are cleaned up after 24 hours.' },
    ],
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'discord-chat',
    title: 'Harmony Chat',
    subtitle: 'High-performance messaging architecture powered by Spring Boot & WebSockets.',
    icon: '/icon/discord_icon.png',
    image: '/img/projet_1_acceuil.png',
    technologies: ['Java Spring Boot', 'WebSockets', 'Maven', 'Thymeleaf', 'MySQL'],
    description: 'A robust, low-latency messaging platform engineered to replicate core discord functionalities. Built on a Spring Boot backend, it leverages persistent WebSocket connections for instant bi-directional communication, supporting concurrent public channels and secure private messaging rooms.',
    features: [
      { icon: '⚡', title: 'WebSocket Architecture', description: 'Full-duplex communication channels ensuring <50ms message delivery latency.' },
      { icon: '🔒', title: 'Private Sessions', description: 'Secure, ephemeral one-on-one messaging rooms with session isolation.' },
      { icon: '🛡️', title: 'Auth Security', description: 'Custom authentication flow with hashed credentials and session management.' },
      { icon: '👥', title: 'Live Presence', description: 'Real-time user state tracking synchronized across all connected clients.' },
    ],
    githubUrl: 'https://github.com/N3tup/Challenge-technique-JAVA-2024',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'restaurant',
    title: 'Fresh Foods',
    subtitle: 'Immersive culinary digital experience featuring fluid GSAP animations.',
    icon: '/img/Restaurant/Icon_Restaurant.png',
    image: '/img/Restaurant/Restaurant-home.png',
    technologies: ['GSAP Animation', 'Modern CSS', 'JavaScript', 'Responsive Design'],
    description: 'A visually arresting restaurant interface designed to maximize user engagement. creating a cinematic browsing experience that highlights culinary craftsmanship through complex scroll-triggered reveal sequences and element morphing.',
    features: [
      { icon: '✨', title: 'GSAP Choreography', description: 'Complex scroll-triggered reveal sequences and element morphing.' },
      { icon: '🎨', title: 'Visual Hierarchy', description: 'Strategic layout design guiding user attention to high-value menu items.' },
      { icon: '📅', title: 'Booking Engine', description: 'Custom validation logic for seamless table reservation management.' },
      { icon: '📱', title: 'Adaptive Layout', description: 'Fluid responsiveness ensuring brand consistency across all viewports.' },
    ],
    demoUrl: '/RESTAURANT/index.html',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'rdv-php',
    title: 'SystemeRDV',
    subtitle: 'Comprehensive scheduling platform enabling booking & profile management.',
    icon: '/img/Form_logo.png',
    image: '/img/RDV-1.png',
    technologies: ['PHP 8', 'MySQL', 'PDO', 'Auth Security'],
    description: 'A full-stack appointment management solution focused on data integrity and user workflow optimization. Handles complex scheduling constraints, user role definition, and persistent availability tracking through a normalized relational database.',
    features: [
      { icon: '📅', title: 'Slot Management', description: 'Dynamic conflict detection algorithm preventing double-bookings.' },
      { icon: '👤', title: 'User Roles', description: 'Granular permission systems separating client and admin capabilities.' },
      { icon: '💾', title: 'Data Persistence', description: 'PDO abstraction layer ensuring secure and efficient SQL transactions.' },
      { icon: '🔐', title: 'Session Control', description: 'Robust login mechanisms protecting user profile data.' },
    ],
    demoUrl: '/php/index.php',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'fast-typing',
    title: 'Fast-Typing',
    subtitle: 'Competitive typing analytics tool designed for speed and accuracy improvement.',
    icon: '/img/Fast-Typing/Icon_Fast_Typing.png',
    image: '/img/Fast-Typing/Fast-typing-menu.png',
    technologies: ['Vanilla JS', 'Async/Await', 'MySQL', 'Statistical Analysis'],
    description: 'An interactive performance tracking application that gamifies touch-typing mastery. It captures micro-interactions to generate detailed statistical reports on words-per-minute (WPM) and accuracy rates, fostering continuous user improvement through data feedback.',
    features: [
      { icon: '⚡', title: 'Real-time Metrics', description: 'Live calculation of WPM and keystroke accuracy with zero input lag.' },
      { icon: '🌍', title: 'Bilingual Engine', description: 'Dynamic corpus generation supporting both French and English dictionaries.' },
      { icon: '📊', title: 'Data Visualization', description: 'Historical performance graphing to visualize learning curves.' },
      { icon: '🏆', title: 'Leaderboard System', description: 'Global ranking infrastructure fostering competitive user engagement.' },
    ],
    demoUrl: 'https://fast-typing.romainbouchez.fr',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'twitthe',
    title: 'Twitthé',
    subtitle: 'Next-gen social network architecture built for scalability and real-time interaction.',
    icon: '/img/Twitthe/Icon_twitthe.png',
    image: '/img/Twitthe/Twitthe-home.png',
    technologies: ['Next.js 15', 'Prisma ORM', 'Deep Learning', 'PostgreSQL', 'Clerk Auth'],
    description: 'A modern social media ecosystem engineered with the T3 stack principles. It features a high-performance relational backend, optimistic UI updates for instant feedback, and a fully type-safe development environment ensuring production-grade reliability.',
    features: [
      { icon: '🔄', title: 'Optimistic UI', description: 'Immediate state updates for interactions before server confirmation.' },
      { icon: '🔔', title: 'Event System', description: 'Complex notification dispatch logic for social graph activities.' },
      { icon: '🛡️', title: 'Type Safety', description: 'End-to-end type validation from database schema to client components.' },
      { icon: '🎨', title: 'Modern Theming', description: 'Context-aware dark/light mode implementation with Tailwind CSS.' },
    ],
    //demoUrl: 'https://social.romainbouchez.fr',
    githubUrl: 'https://github.com/RomainBouchez/Twitthe.git',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'aical',
    title: 'AICal',
    subtitle: 'Computer Vision nutrition assistant powered by Gemini Multimodal AI.',
    icon: '/img/AiCal/icon_AICal.png',
    image: '/img/AiCal/aical-mainpage.jpg',
    modalTheme: 'dark',
    technologies: ['Gemini Vision Pro', 'Next.js 15', 'Computer Vision', 'Data Vis'],
    description: 'A cutting-edge health application bridging computer vision and nutritional science. By leveraging Multimodal LLMs, it transforms raw food imagery into structured macro-nutrient data, enabling effortless dietary tracking and analysis.',
    features: [
      { icon: '👁️', title: 'AI Vision Analysis', description: 'Zero-shot food recognition and volumetric estimation via Gemini Pro.' },
      { icon: '📊', title: 'Nutrient Aggregation', description: 'Complex data transformation pipelines for daily macro calculation.' },
      { icon: '🎯', title: 'Goal Tracking', description: 'Dynamic progress visualization against personalized physiological targets.' },
      { icon: '📅', title: 'History Indexing', description: 'Efficient temporal querying of past nutritional logs.' },
    ],
    demoUrl: 'https://aical.romainbouchez.fr/',
    githubUrl: 'https://github.com/RomainBouchez/CalAi/',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'ov-amsterdam',
    title: 'OV-AMS Analysis',
    subtitle: 'Big Data geospatial analysis optimizing Amsterdam\'s transport network.',
    icon: '/img/OV/Icon_OV.png',
    image: '/img/OV/ov-amsterdam-map.png',
    technologies: ['Python Pandas', 'Folium GIS', 'Data Science', 'Statistical Modeling'],
    description: 'A data science initiative conducted at HVA Amsterdam, utilizing massive datasets to optimize public transit fare models. The project applied geospatial clustering and time-series analysis to identify inefficiency hotspots and propose cost-saving algorithmic adjustments.',
    features: [
      { icon: '🗺️', title: 'Geospatial Mapping', description: 'Interactive heatmap generation visualizing high-traffic flows.' },
      { icon: '📈', title: 'Pattern Recognition', description: 'Identification of commuter temporal behaviors via statistical analysis.' },
      { icon: '💶', title: 'Cost Optimization', description: 'Algorithmic remodeling of fare structures to benefit student demographics.' },
      { icon: '🐍', title: 'Pandas Pipelines', description: 'High-volume ETL processes cleaning and structuring raw transport logs.' },
    ],
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'chess-robot',
    title: 'AutoChess Bot',
    subtitle: 'Autonomous mechatronic system integrating Stockfish AI with physical actuation.',
    icon: '/img/PST4A/icon_PST4A.png',
    image: '/img/PST4A/chess-robot-preview.png',
    technologies: ['Robotics', 'Python', 'Arduino', 'Stockfish Engine', '3D Printing'],
    description: 'An interdisciplinary engineering project merging digital strategy with physical reality. A custom 3-axis robotic arm, controlled by a Python orchestrator, executes Stockfish AI moves in real-time, requiring precise coordinate mapping and inverse kinematics.',
    features: [
      { icon: '🤖', title: 'Inverse Kinematics', description: 'Complex motor coordination logic translating A1-H8 grid to map spatial moves.' },
      { icon: '♟️', title: 'Stockfish Brain', description: 'Integration with the world\'s strongest open-source chess engine.' },
      { icon: '🖨️', title: 'Custom Hardware', description: 'End-to-end fabrication of mechanical parts via CAD and 3D printing.' },
      { icon: '🎮', title: 'Hybrid Interface', description: 'Seamless synchronization between physical board state and digital UI.' },
    ],
    email: 'bouchez@et.esiea.fr',
    status: 'In Progress',
  },
  {
    id: 'iads-project',
    title: 'Oncology AI Research',
    subtitle: 'Deep Learning initiative for predictive breast cancer analysis using clinical data.',
    icon: '/img/IADS/icon_IADS.png',
    image: '/img/IADS/iads-main.svg',
    technologies: ['Deep Learning', 'PyTorch', 'Medical Imaging', 'Bioinformatics'],
    description: 'A multi-year research capstone focusing on the application of Convolutional Neural Networks (CNNs) to histological data. Working with real-world hospital datasets to increase diagnostic accuracy through predictive modeling and feature extraction.',
    features: [
      { icon: '🧬', title: 'Clinical ETL', description: 'Secure processing and normalization of sensitive medical datasets.' },
      { icon: '🧠', title: 'Model Architecture', description: 'Design and training of specialized neural networks for measuring malignancy.' },
      { icon: '📊', title: 'Predictive Analytics', description: 'Statistical evaluation of model recall/precision in clinical contexts.' },
      { icon: '🔬', title: 'Research Methodology', description: 'Rigorous scientific approach to validation and hyperparameter tuning.' },
    ],
    email: 'bouchez@et.esiea.fr',
    status: 'In Progress',
  },
];