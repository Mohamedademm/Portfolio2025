import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traductions
const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.resume": "Resume",
      
      // Home Page
      "home.greeting": "Hi There!",
      "home.intro": "I'M",
      "home.name": "BEN AMARA Mohamed",
      "home.introduce": "LET ME INTRODUCE MYSELF",
      "home.love": "I fell in love with programming and technology, and I've been constantly learning and building exciting projects!",
      "home.languages": "I am proficient in languages like",
      "home.languages.list": "C, C++, Java, Python, JavaScript, and PHP.",
      "home.interests": "My field of interests include building",
      "home.interests.list": "Web Applications, Mobile Apps",
      "home.interests.ai": "and exploring AI & Big Data",
      "home.stack": "I love developing with modern tech stacks like the",
      "home.stack.mern": "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
      "home.stack.spring": "Spring Boot",
      "home.stack.flutter": "Flutter",
      "home.competitive": "I'm also passionate about",
      "home.competitive.text": "Competitive Programming",
      "home.competitive.end": "and continuously improving my problem-solving skills.",
      "home.findme": "FIND ME ON",
      "home.connect": "Feel free to connect with me",
      
      // About Page
      "about.title": "Know Who I'M",
      "about.greeting": "Hi Everyone, I am",
      "about.name": "BEN AMARA Mohamed",
      "about.from": "from",
      "about.location": "Monastir, Tunisia.",
      "about.study": "I study computer system development at ISET Sousse and will graduate this year.",
      "about.skills": "I'm skilled in programming, web development, and IT support, with expertise in C, C++, Java, Python, and SQL.",
      "about.passion": "I'm passionate about AI, big data, and competitive programming.",
      "about.activities": "Apart from coding, some other activities that I love to do!",
      "about.activity1": "Playing Games",
      "about.activity2": "Trying new experiences",
      "about.activity3": "Travelling",
      "about.quote": "Strive to build things that make a difference!",
      "about.skillset": "Professional Skillset",
      "about.tools": "Tools I use",
      
      // Projects Page
      "projects.title": "My Recent Works",
      "projects.subtitle": "Here are a few projects I've worked on recently.",
      
      // Services Page
      "services.title": "Services",
      "services.offer": "I Offer",
      "services.subtitle": "Professional development services to bring your ideas to life",
      "services.fullstack.title": "Full Stack Development",
      "services.fullstack.description": "Build modern, scalable web applications with cutting-edge technologies",
      "services.mobile.title": "Mobile Development",
      "services.mobile.description": "Cross-platform mobile apps for iOS and Android",
      "services.database.title": "Database Design",
      "services.database.description": "Efficient and optimized database architecture",
      "services.backend.title": "Backend Development",
      "services.backend.description": "Robust server-side solutions with RESTful APIs",
      "services.ai.title": "AI & Data Science",
      "services.ai.description": "Machine learning solutions and data analysis",
      "services.uiux.title": "UI/UX Design",
      "services.uiux.description": "Beautiful and intuitive user interfaces",
      
      // Resume Page
      "resume.download": "Download CV",
      
      // Footer
      "footer.designed": "Designed and Developed by BEN AMARA Mohamed",
      "footer.copyright": "Copyright",
      
      // Language Selector
      "language.select": "Language"
    }
  },
  fr: {
    translation: {
      // Navbar
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.projects": "Projets",
      "nav.resume": "CV",
      
      // Home Page
      "home.greeting": "Salut à tous!",
      "home.intro": "JE SUIS",
      "home.name": "BEN AMARA Mohamed",
      "home.introduce": "PERMETTEZ-MOI DE ME PRÉSENTER",
      "home.love": "Je suis passionné par la programmation et la technologie, et j'apprends constamment en créant des projets passionnants!",
      "home.languages": "Je maîtrise des langages comme",
      "home.languages.list": "C, C++, Java, Python, JavaScript et PHP.",
      "home.interests": "Mes domaines d'intérêt incluent le développement de",
      "home.interests.list": "Applications Web, Applications Mobiles",
      "home.interests.ai": "et l'exploration de l'IA & Big Data",
      "home.stack": "J'adore développer avec des technologies modernes comme",
      "home.stack.mern": "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
      "home.stack.spring": "Spring Boot",
      "home.stack.flutter": "Flutter",
      "home.competitive": "Je suis également passionné par",
      "home.competitive.text": "la Programmation Compétitive",
      "home.competitive.end": "et j'améliore continuellement mes compétences en résolution de problèmes.",
      "home.findme": "RETROUVEZ-MOI SUR",
      "home.connect": "N'hésitez pas à me contacter",
      
      // About Page
      "about.title": "Qui suis-je",
      "about.greeting": "Bonjour à tous, je suis",
      "about.name": "BEN AMARA Mohamed",
      "about.from": "de",
      "about.location": "Monastir, Tunisie.",
      "about.study": "J'étudie le développement de systèmes informatiques à l'ISET Sousse et j'obtiendrai mon diplôme cette année.",
      "about.skills": "Je suis compétent en programmation, développement web et support IT, avec une expertise en C, C++, Java, Python et SQL.",
      "about.passion": "Je suis passionné par l'IA, le big data et la programmation compétitive.",
      "about.activities": "En dehors du codage, d'autres activités que j'aime faire!",
      "about.activity1": "Jouer aux jeux vidéo",
      "about.activity2": "Essayer de nouvelles expériences",
      "about.activity3": "Voyager",
      "about.quote": "Efforcez-vous de créer des choses qui font la différence!",
      "about.skillset": "Compétences Professionnelles",
      "about.tools": "Outils que j'utilise",
      
      // Projects Page
      "projects.title": "Mes Travaux Récents",
      "projects.subtitle": "Voici quelques projets sur lesquels j'ai travaillé récemment.",
      
      // Services Page
      "services.title": "Services",
      "services.offer": "Que J'offre",
      "services.subtitle": "Services de développement professionnels pour donner vie à vos idées",
      "services.fullstack.title": "Développement Full Stack",
      "services.fullstack.description": "Créer des applications web modernes et évolutives avec des technologies de pointe",
      "services.mobile.title": "Développement Mobile",
      "services.mobile.description": "Applications mobiles multiplateformes pour iOS et Android",
      "services.database.title": "Conception de Base de Données",
      "services.database.description": "Architecture de base de données efficace et optimisée",
      "services.backend.title": "Développement Backend",
      "services.backend.description": "Solutions serveur robustes avec des API RESTful",
      "services.ai.title": "IA & Data Science",
      "services.ai.description": "Solutions de machine learning et analyse de données",
      "services.uiux.title": "Design UI/UX",
      "services.uiux.description": "Interfaces utilisateur belles et intuitives",
      
      // Resume Page
      "resume.download": "Télécharger CV",
      
      // Footer
      "footer.designed": "Conçu et Développé par BEN AMARA Mohamed",
      "footer.copyright": "Droits d'auteur",
      
      // Language Selector
      "language.select": "Langue"
    }
  },
  it: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.about": "Chi sono",
      "nav.projects": "Progetti",
      "nav.resume": "CV",
      
      // Home Page
      "home.greeting": "Ciao a tutti!",
      "home.intro": "SONO",
      "home.name": "BEN AMARA Mohamed",
      "home.introduce": "PERMETTETEMI DI PRESENTARMI",
      "home.love": "Mi sono innamorato della programmazione e della tecnologia, e continuo ad imparare creando progetti entusiasmanti!",
      "home.languages": "Sono competente in linguaggi come",
      "home.languages.list": "C, C++, Java, Python, JavaScript e PHP.",
      "home.interests": "I miei campi di interesse includono lo sviluppo di",
      "home.interests.list": "Applicazioni Web, App Mobili",
      "home.interests.ai": "ed esplorare AI & Big Data",
      "home.stack": "Amo sviluppare con tecnologie moderne come",
      "home.stack.mern": "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
      "home.stack.spring": "Spring Boot",
      "home.stack.flutter": "Flutter",
      "home.competitive": "Sono anche appassionato di",
      "home.competitive.text": "Programmazione Competitiva",
      "home.competitive.end": "e miglioro continuamente le mie capacità di problem solving.",
      "home.findme": "TROVAMI SU",
      "home.connect": "Sentiti libero di connetterti con me",
      
      // About Page
      "about.title": "Chi sono",
      "about.greeting": "Ciao a tutti, sono",
      "about.name": "BEN AMARA Mohamed",
      "about.from": "da",
      "about.location": "Monastir, Tunisia.",
      "about.study": "Studio sviluppo di sistemi informatici presso ISET Sousse e mi diplomerò quest'anno.",
      "about.skills": "Sono competente in programmazione, sviluppo web e supporto IT, con esperienza in C, C++, Java, Python e SQL.",
      "about.passion": "Sono appassionato di AI, big data e programmazione competitiva.",
      "about.activities": "Oltre al coding, altre attività che amo fare!",
      "about.activity1": "Giocare ai videogiochi",
      "about.activity2": "Provare nuove esperienze",
      "about.activity3": "Viaggiare",
      "about.quote": "Sforzati di costruire cose che fanno la differenza!",
      "about.skillset": "Competenze Professionali",
      "about.tools": "Strumenti che uso",
      
      // Projects Page
      "projects.title": "I Miei Lavori Recenti",
      "projects.subtitle": "Ecco alcuni progetti su cui ho lavorato recentemente.",
      
      // Resume Page
      "resume.download": "Scarica CV",
      
      // Footer
      "footer.designed": "Progettato e Sviluppato da BEN AMARA Mohamed",
      "footer.copyright": "Copyright",
      
      // Language Selector
      "language.select": "Lingua"
    }
  },
  de: {
    translation: {
      // Navbar
      "nav.home": "Startseite",
      "nav.about": "Über mich",
      "nav.projects": "Projekte",
      "nav.resume": "Lebenslauf",
      
      // Home Page
      "home.greeting": "Hallo zusammen!",
      "home.intro": "ICH BIN",
      "home.name": "BEN AMARA Mohamed",
      "home.introduce": "LASSEN SIE MICH VORSTELLEN",
      "home.love": "Ich habe mich in Programmierung und Technologie verliebt und lerne ständig, indem ich spannende Projekte entwickle!",
      "home.languages": "Ich beherrsche Sprachen wie",
      "home.languages.list": "C, C++, Java, Python, JavaScript und PHP.",
      "home.interests": "Meine Interessengebiete umfassen die Entwicklung von",
      "home.interests.list": "Webanwendungen, Mobile Apps",
      "home.interests.ai": "und die Erforschung von AI & Big Data",
      "home.stack": "Ich liebe es, mit modernen Tech-Stacks zu entwickeln wie",
      "home.stack.mern": "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
      "home.stack.spring": "Spring Boot",
      "home.stack.flutter": "Flutter",
      "home.competitive": "Ich bin auch leidenschaftlich interessiert an",
      "home.competitive.text": "Competitive Programming",
      "home.competitive.end": "und verbessere kontinuierlich meine Problemlösungsfähigkeiten.",
      "home.findme": "FINDEN SIE MICH AUF",
      "home.connect": "Verbinden Sie sich gerne mit mir",
      
      // About Page
      "about.title": "Wer bin ich",
      "about.greeting": "Hallo zusammen, ich bin",
      "about.name": "BEN AMARA Mohamed",
      "about.from": "aus",
      "about.location": "Monastir, Tunesien.",
      "about.study": "Ich studiere Computersystementwicklung an der ISET Sousse und werde dieses Jahr meinen Abschluss machen.",
      "about.skills": "Ich bin kompetent in Programmierung, Webentwicklung und IT-Support, mit Expertise in C, C++, Java, Python und SQL.",
      "about.passion": "Ich bin leidenschaftlich an AI, Big Data und Competitive Programming interessiert.",
      "about.activities": "Neben dem Programmieren, andere Aktivitäten, die ich liebe!",
      "about.activity1": "Videospiele spielen",
      "about.activity2": "Neue Erfahrungen ausprobieren",
      "about.activity3": "Reisen",
      "about.quote": "Bemühen Sie sich, Dinge zu schaffen, die einen Unterschied machen!",
      "about.skillset": "Berufliche Fähigkeiten",
      "about.tools": "Werkzeuge, die ich verwende",
      
      // Projects Page
      "projects.title": "Meine neuesten Arbeiten",
      "projects.subtitle": "Hier sind einige Projekte, an denen ich kürzlich gearbeitet habe.",
      
      // Resume Page
      "resume.download": "Lebenslauf herunterladen",
      
      // Footer
      "footer.designed": "Entworfen und Entwickelt von BEN AMARA Mohamed",
      "footer.copyright": "Urheberrecht",
      
      // Language Selector
      "language.select": "Sprache"
    }
  },
  ar: {
    translation: {
      // Navbar
      "nav.home": "الرئيسية",
      "nav.about": "عني",
      "nav.projects": "المشاريع",
      "nav.resume": "السيرة الذاتية",
      
      // Home Page
      "home.greeting": "مرحبا بكم!",
      "home.intro": "أنا",
      "home.name": "بن عمارة محمد",
      "home.introduce": "دعوني أقدم نفسي",
      "home.love": "لقد أحببت البرمجة والتكنولوجيا، وأتعلم باستمرار من خلال بناء مشاريع مثيرة!",
      "home.languages": "أتقن لغات البرمجة مثل",
      "home.languages.list": "C، C++، Java، Python، JavaScript و PHP.",
      "home.interests": "مجالات اهتمامي تشمل بناء",
      "home.interests.list": "تطبيقات الويب، تطبيقات الهاتف المحمول",
      "home.interests.ai": "واستكشاف الذكاء الاصطناعي والبيانات الضخمة",
      "home.stack": "أحب التطوير باستخدام التقنيات الحديثة مثل",
      "home.stack.mern": "MERN Stack (MongoDB، Express.js، React.js، Node.js)",
      "home.stack.spring": "Spring Boot",
      "home.stack.flutter": "Flutter",
      "home.competitive": "أنا أيضًا شغوف بـ",
      "home.competitive.text": "البرمجة التنافسية",
      "home.competitive.end": "وأحسن باستمرار مهاراتي في حل المشكلات.",
      "home.findme": "تواصل معي على",
      "home.connect": "لا تتردد في التواصل معي",
      
      // About Page
      "about.title": "من أنا",
      "about.greeting": "مرحبا بالجميع، أنا",
      "about.name": "بن عمارة محمد",
      "about.from": "من",
      "about.location": "المنستير، تونس.",
      "about.study": "أدرس تطوير الأنظمة الحاسوبية في المعهد العالي للدراسات التكنولوجية بسوسة وسأتخرج هذا العام.",
      "about.skills": "لدي مهارات في البرمجة، تطوير الويب، والدعم التقني، مع خبرة في C، C++، Java، Python و SQL.",
      "about.passion": "أنا شغوف بالذكاء الاصطناعي، البيانات الضخمة، والبرمجة التنافسية.",
      "about.activities": "بعيدًا عن البرمجة، بعض الأنشطة الأخرى التي أحب القيام بها!",
      "about.activity1": "لعب الألعاب",
      "about.activity2": "تجربة تجارب جديدة",
      "about.activity3": "السفر",
      "about.quote": "اسع لبناء أشياء تحدث فرقًا!",
      "about.skillset": "المهارات المهنية",
      "about.tools": "الأدوات التي أستخدمها",
      
      // Projects Page
      "projects.title": "أعمالي الأخيرة",
      "projects.subtitle": "إليك بعض المشاريع التي عملت عليها مؤخرًا.",
      
      // Resume Page
      "resume.download": "تحميل السيرة الذاتية",
      
      // Footer
      "footer.designed": "صمم وطور بواسطة بن عمارة محمد",
      "footer.copyright": "حقوق النشر",
      
      // Language Selector
      "language.select": "اللغة"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
