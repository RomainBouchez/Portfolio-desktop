export interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // Icon for the app (emoji or image path)
  image: string; // Chemin depuis le dossier /public (window presentation)
  technologies: string[];
  description: string;
  features: {
    icon: string; // Emoji
    title: string;
    description: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  email: string;
  status?: 'In Progress'; // Champ optionnel pour les projets en cours
}

export const projects: Project[] = [
  {
    id: 'discord-chat',
    title: 'Discord-like',
    subtitle: 'A real-time chat application built with Java Spring Boot, featuring public and private messaging channels.',
    icon: '/icon/discord_icon.png',
    image: '/icon/discord_icon.png',
    technologies: ['Java', 'Spring Boot', 'Maven', 'WebSockets'],
    description: 'A real-time chat application inspired by Discord, developed using Java, Spring Boot, and Maven. The application enables users to chat in public and private channels and manage their accounts.',
    features: [
      { icon: '💬', title: 'Real-time Chat', description: 'Communicate instantly in public servers with multiple users' },
      { icon: '👥', title: 'Private Messaging', description: 'Send direct messages to connected users' },
      { icon: '🔑', title: 'Password Reset', description: 'Secure account recovery through email verification' },
      { icon: '📶', title: 'Online Status', description: 'Track which members are currently active' },
    ],
    githubUrl: 'https://github.com/N3tup/Challenge-technique-JAVA-2024',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Website',
    subtitle: 'A responsive restaurant website featuring product showcases, menu, and reservation system.',
    icon: '/img/Restaurant/Icon_Restaurant.png',
    image: '/img/Restaurant-home.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design'],
    description: 'A fully responsive restaurant website featuring animated product showcases, interactive menus, and a reservation system. The site utilizes GSAP for smooth animations and modern CSS techniques for an engaging user experience.',
    features: [
      { icon: '📱', title: 'Responsive Design', description: 'Fully adaptive layout that works on all device sizes' },
      { icon: '🍔', title: 'Interactive Menu', description: 'Animated menu showcase with hover effects' },
      { icon: '📅', title: 'Reservation System', description: 'User-friendly form with date and time selection' },
      { icon: '🍎', title: 'Product Showcase', description: 'Interactive product catalogs with smooth transitions' },
    ],
    demoUrl: '/RESTAURANT/index.html',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'rdv-php',
    title: 'Prise de RDV',
    subtitle: 'A PHP-based appointment scheduling system with user profile management and real-time availability.',
    icon: '/img/Form/Icon_form.png',
    image: '/img/Form/Icon_form.png',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    description: 'A PHP-based appointment scheduling system with user profile management and real-time availability. Users can create accounts, manage their profiles, and book available time slots.',
    features: [
      { icon: '🗓️', title: 'Online Booking', description: 'Book your time slots in a few clicks from your computer or phone.' },
      { icon: '👤', title: 'Profile Management', description: 'Create your account and manage your personal information securely.' },
      { icon: '⏰', title: 'Real-time Availability', description: 'View available slots and book immediately.' },
      { icon: '📜', title: 'Appointment History', description: 'View and manage all your past and future appointments.' },
    ],
    demoUrl: '/php/index.php',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'fast-typing',
    title: 'Fast-Typing',
    subtitle: 'A bilingual typing test application to measure and improve typing speed and accuracy.',
    icon: '/img/Fast-Typing/Icon_Fast_Typing.png',
    image: '/img/Fast-Typing/Icon_Fast_Typing.png',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML/CSS'],
    description: 'Fast-typing is a comprehensive typing test application that allows users to practice their typing speed and accuracy in both French and English, providing detailed statistics and tracking user progress over time.',
    features: [
      { icon: '💨', title: 'Real-time Typing Test', description: 'Test your typing speed with immediate feedback and accurate metrics' },
      { icon: '🌐', title: 'Bilingual Support', description: 'Practice in both French and English languages' },
      { icon: '📈', title: 'Performance Tracking', description: 'Comprehensive statistics including WPM, accuracy, and error count' },
      { icon: '🏆', title: 'Personal Records', description: 'Track your best performances and monitor your improvement' },
    ],
    demoUrl: 'https://fast-typing.romainbouchez.fr',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'twitthe',
    title: 'Twitthé',
    subtitle: 'A Next.js social media platform for sharing posts, connecting with others, and developing an online identity.',
    icon: '/img/Twitthe/Icon_twitthe.png',
    image: '/img/Twitthe/Icon_twitthe.png',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'Tailwind CSS', 'Clerk Auth'],
    description: 'Twitthé is a comprehensive social media platform that enables users to share posts, follow others, engage with content through likes and comments, and receive real-time notifications. It features a modern UI with dark mode support and responsive design.',
    features: [
      { icon: '👤', title: 'User Profiles', description: 'Customizable profiles with bio, location, and profile pictures' },
      { icon: '💬', title: 'Social Interactions', description: 'Post, like, comment, and @mention other users' },
      { icon: '🔔', title: 'Notifications', description: 'Real-time notification system for likes, comments, follows, and mentions' },
      { icon: '🌙', title: 'Light/Dark Mode', description: 'Seamless theme switching for user comfort' },
    ],
    demoUrl: 'https://social.romainbouchez.fr',
    githubUrl: 'https://github.com/RomainBouchez/Twitthe.git',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'aical',
    title: 'AICal',
    subtitle: 'Next.js application using Google Gemini AI to analyze food images and provide nutritional information.',
    icon: '/img/AiCal/icon_AICal.png',
    image: '/img/AiCal/aical-dashboard.jpg',
    technologies: ['Next.js 15', 'React 19', 'Prisma', 'Tailwind CSS', 'Google Gemini AI'],
    description: 'AI-powered nutrition analysis application that uses computer vision to analyze food images and provide detailed nutritional information including calories, macronutrients, and vitamin content.',
    features: [
      { icon: '📸', title: 'AI Food Analysis', description: 'Image recognition for instant nutritional breakdown' },
      { icon: '📊', title: 'Nutrition Dashboard', description: 'Daily tracking of calories and macronutrients' },
      { icon: '🎯', title: 'Goal Setting', description: 'Customizable daily and meal-specific targets' },
      { icon: '🗂️', title: 'Food Journal', description: 'Historical tracking with date filtering' },
    ],
    demoUrl: 'https://cala-ivercel-zvmo.vercel.app/',
    githubUrl: 'https://github.com/RomainBouchez/CalAi/',
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'ov-amsterdam',
    title: 'OV-AMS',
    subtitle: 'Data analysis project to optimize student discount timing for Amsterdam public transport.',
    icon: '/img/OV/Icon_OV.png',
    image: '',
    technologies: ['Python', 'Folium', 'Pandas', 'Data Analysis', 'Geospatial Visualization'],
    description: 'During my Erasmus at HVA Amsterdam, I worked on a data analysis project for OV (Public Transport). The project focused on analyzing passenger travel data to determine optimal time slots for student fare discounts across Amsterdam\'s transportation network.',
    features: [
      { icon: '📈', title: 'Passenger Data Analysis', description: 'Analysis of travel patterns and peak usage times' },
      { icon: '🗺️', title: 'Geospatial Visualization', description: 'Interactive maps using Folium to visualize travel routes' },
      { icon: '🎓', title: 'Student Fare Optimization', description: 'Identification of optimal time slots for student discounts' },
      { icon: '⏰', title: 'Time-based Analysis', description: 'Hourly and daily travel pattern identification' },
    ],
    email: 'bouchez@et.esiea.fr',
  },
  {
    id: 'chess-robot',
    title: 'Chess Robot',
    subtitle: 'Autonomous chess-playing robot using a 3D printer structure, controlled by Python and Stockfish AI.',
    icon: '/img/PST4A/icon_PST4A.png',
    image: '/img/PST4A/icon_PST4A.png',
    technologies: ['Python', 'Pygame', 'Stockfish AI', '3D Printing', 'Robotics', 'Arduino'],
    description: 'An autonomous chess-playing robot that combines hardware engineering with advanced chess AI. The project features a custom-built robotic arm using a 3D printer structure, controlled through a Python interface.',
    features: [
      { icon: '🤖', title: 'Autonomous Movement', description: 'Physical robot that moves chess pieces' },
      { icon: '🧠', title: 'Stockfish Integration', description: 'Powered by world-class chess engine' },
      { icon: '🎮', title: 'Graphical Interface', description: 'User-friendly chess board with Pygame' },
      { icon: '✅', title: 'Rules Validation', description: 'Complete chess rules enforcement' },
    ],
    email: 'bouchez@et.esiea.fr',
    status: 'In Progress',
  },
];