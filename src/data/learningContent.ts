import { Language, Module, TranslationMap } from '../types';

export const UI_TRANSLATIONS: Record<string, TranslationMap> = {
  appName: {
    en: 'Preschool Learning Adventure',
    te: 'ప్రీస్కూల్ నేర్చుకునే సాహసం',
    hi: 'प्रीस्कूल लर्निंग एडवेंचर',
    es: 'Aventura de Aprendizaje Preescolar',
    fr: 'Aventure d\'Apprentissage Préscolaire',
    bn: 'প্রাক-প্রাথমিক শিক্ষা অভিযান',
    ta: 'பாலர் பள்ளி கற்றல் சாகசம்'
  },
  start: {
    en: 'Start Learning',
    te: 'నేర్చుకోవడం ప్రారంభించండి',
    hi: 'सीखना शुरू करें',
    es: 'Empezar a Aprender',
    fr: 'Commencer à Apprendre',
    zh: '开始学习',
    ja: '学習を開始する'
  },
  back: {
    en: 'Back',
    te: 'వెనుకకు',
    hi: 'पीछे',
    es: 'Atrás',
    fr: 'Retour',
    zh: '返回',
    ja: '戻る'
  },
  congrats: {
    en: 'Congratulations!',
    te: 'అభినందనలు!',
    hi: 'बधाई हो!',
    es: '¡Felicidades!',
    fr: 'Félicitations!',
    bn: 'অভিনন্দন!',
    ta: 'வாழ்த்துக்கள்!'
  },
  next: {
    en: 'Next',
    te: 'తదుపరి',
    hi: 'अगला',
    es: 'Siguiente',
    fr: 'Suivant',
    zh: '下一步',
    ja: '次へ'
  },
  language: {
    en: 'Language',
    te: 'భాష',
    hi: 'भाषा',
    es: 'Idioma',
    fr: 'Langue',
    zh: '语言',
    ja: '言語'
  },
  parentSettings: {
    en: 'Parent Settings',
    te: 'తల్లిదండ్రుల సెట్టింగ్స్',
    hi: 'अभिभावक सेटिंग्स',
    es: 'Ajustes de Padres',
    fr: 'Paramètres Parents'
  },
  screenTime: {
    en: 'Screen Time Limit',
    te: 'స్క్రీన్ సమయ పరిమితి',
    hi: 'स्क्रीन समय सीमा',
    es: 'Límite de Tiempo de Pantalla',
    fr: 'Limite de Temps d\'Écran'
  },
  progress: {
    en: 'Learning Progress',
    te: 'నేర్చుకునే పురోగతి',
    hi: 'सीखने की प्रगति',
    es: 'Progreso de Aprendizaje',
    fr: 'Progrès d\'Apprentissage'
  },
  minutes: {
    en: 'minutes',
    te: 'నిమిషాలు',
    hi: 'मिनट',
    es: 'minutos',
    fr: 'minutes'
  },
  adminSection: {
    en: 'Parent / Admin Section',
    te: 'తల్లిదండ్రులు / నిర్వాహకుల విభాగం',
    hi: 'अभिभावक / एडमिन सेक्शन',
    es: 'Sección de Padres / Admin',
    fr: 'Section Parent / Admin'
  },
  resetProgress: {
    en: 'Reset Progress',
    te: 'పురోగతిని రీసెట్ చేయండి',
    hi: 'प्रगति रीसेट करें',
    es: 'Reiniciar Progreso',
    fr: 'Réinitialiser le Progrès'
  },
  welcomePreschool: {
    en: 'Welcome, Little Learner!',
    te: 'స్వాగతం, చిన్నారి అన్వేషకుడా!',
    hi: 'स्वागत है, नन्हे शिक्षार्थी!',
    es: '¡Bienvenido, Pequeño Estudiante!',
    fr: 'Bienvenue, Petit Apprenti!'
  },
  voiceSpeed: {
    en: 'Voice Speed',
    te: 'వాయిస్ వేగం',
    hi: 'आवाज़ की गति'
  },
  monetization: {
    en: 'Ads & Revenue',
    te: 'ప్రకటనలు & ఆదాయం',
    hi: 'विज्ञापन और राजस्व'
  },
  enableAds: {
    en: 'Show Ads',
    te: 'ప్రకటనలను చూపించు',
    hi: 'विज्ञापन दिखाएं'
  },
  adFrequency: {
    en: 'Ad Frequency',
    te: 'ప్రకటనల ఫ్రీక్వెన్సీ',
    hi: 'विज्ञापन आवृत्ति'
  },
  analytics: {
    en: 'Usage Analytics',
    te: 'వినియోగ విశ్లేషణలు',
    hi: 'उपयोग विश्लेषिकी'
  },
  mostPlayed: {
    en: 'Most Played Activity',
    te: 'ఎక్కువగా ఆడిన కార్యాచరణ',
    hi: 'सबसे ज्यादा खेली गई गतिविधि'
  },
  totalTime: {
    en: 'Total Learning Time',
    te: 'మొత్తం నేర్చుకునే సమయం',
    hi: 'कुल सीखने का समय'
  },
  supportUs: {
    en: 'Support Our Mission',
    te: 'మా మిషన్‌కు మద్దతు ఇవ్వండి',
    hi: 'हमारे मिशन का समर्थन करें'
  },
  donationIntro: {
    en: 'Your small contribution helps us keep the app free and safe for all children.',
    te: 'మీ చిన్న సహకారం మాకు ఈ యాప్‌ను అందరు పిల్లల కోసం ఉచితంగా మరియు సురక్షితంగా ఉంచడంలో సహాయపడుతుంది.',
    hi: 'आपका छोटा सा योगदान हमें इस ऐप को सभी बच्चों के लिए मुफ्त और सुरक्षित रखने में मदद करता है।'
  },
  oneTime: {
    en: 'One-time Donation',
    te: 'ఒకసారి విరాళం',
    hi: 'एक बार दान'
  },
  twoTime: {
    en: 'Double Support',
    te: 'రెట్టింపు మద్దతు',
    hi: 'दोगुना समर्थन'
  },
  threeTime: {
    en: 'Triple Support',
    te: 'ముమ్మడి మద్దతు',
    hi: 'तिगुना समर्थन'
  },
  donationSuccess: {
    en: 'Thank you for your generous support! ❤️',
    te: 'మీ ఉదారమైన మద్దతుకు ధన్యవాదాలు! ❤️',
    hi: 'आपके उदार समर्थन के लिए धन्यवाद! ❤️'
  },
  letsLearn: {
    en: "Let's Learn!",
    te: 'నేర్చుకుందాం!',
    hi: 'चलो सीखते हैं!',
    es: '¡Aprendamos!',
    fr: 'Apprenons!'
  },
  amazing: {
    en: "Yay! Amazing!",
    te: 'అద్భుతం!',
    hi: 'वाह! अद्भुत!',
    es: '¡Genial! ¡Increíble!',
    fr: 'Génial! Incroyable!'
  },
  quizTitle: {
    en: 'Quick Quiz!',
    te: 'చిన్న క్విజ్!',
    hi: 'क्विज़!',
    es: '¡Cuestionario Rápido!',
    fr: 'Quiz Rapide!'
  },
  findLetter: {
    en: 'Find the letter',
    te: 'అక్షరాన్ని గుర్తించండి',
    hi: 'अक्षर खोजें',
    es: 'Busca la letra',
    fr: 'Trouve la lettre'
  },
  findObject: {
    en: 'Find the',
    te: 'గుర్తించండి',
    hi: 'खोजें',
    es: 'Busca el',
    fr: 'Trouve le'
  },
  findShape: {
    en: 'Find the shape',
    te: 'ఆకారాన్ని గుర్తించండి',
    hi: 'आकार खोजें',
    es: 'Busca la forma',
    fr: 'Trouve la forme'
  },
  findNumber: {
    en: 'Find the number',
    te: 'అంకెను గుర్తించండి',
    hi: 'संख्या खोजें',
    es: 'Busca el número',
    fr: 'Trouve le nombre'
  },
  wellDone: {
    en: 'Well Done!',
    te: 'చాలా బాగుంది!',
    hi: 'बहुत अच्छे!',
    es: '¡Bien hecho!',
    fr: 'Bien joué!'
  },
  tryAgain: {
    en: 'Try Again!',
    te: 'మళ్ళీ ప్రయత్నించండి!',
    hi: 'फिर से कोशिश करें',
    es: '¡Inténtalo de nuevo!',
    fr: 'Essaie encore!'
  },
  goodHabits: {
    en: 'Good Habits',
    te: 'మంచి అలవాట్లు',
    hi: 'अच्छी आदतें',
    es: 'Buenos Hábitos',
    fr: 'Bonnes Habitudes'
  },
  animals: {
    en: 'Animals',
    te: 'జంతువులు',
    hi: 'जानवर',
    es: 'Animales',
    fr: 'Animaux'
  },
  fruits: {
    en: 'Fruits',
    te: 'పండ్లు',
    hi: 'फल',
    es: 'Frutas',
    fr: 'Fruits'
  },
  vehicles: {
    en: 'Vehicles',
    te: 'వాహనాలు',
    hi: 'वाहन',
    es: 'Vehículos',
    fr: 'Véhicules'
  },
  'body-parts': {
    en: 'Body Parts',
    te: 'శరీర భాగాలు',
    hi: 'शरीर के अंग',
    es: 'Partes del Cuerpo',
    fr: 'Parties du Corps'
  },
  vegetables: {
    en: 'Vegetables',
    te: 'కూరగాయలు',
    hi: 'सब्जियां',
    es: 'Verduras',
    fr: 'Légumes'
  },
  solarSystem: {
    en: 'Solar System',
    te: 'సౌర వ్యవస్థ',
    hi: 'सौर मंडल',
    es: 'Sistema Solar',
    fr: 'Système Solaire'
  },
  dinosaurs: {
    en: 'Dinosaurs',
    te: 'డైనోసార్‌లు',
    hi: 'डायनासोर',
    es: 'Dinosaurios',
    fr: 'Dinosaures'
  },
  numbers: {
    en: 'Numbers',
    te: 'అంకెలు',
    hi: 'अंक',
    es: 'Números',
    fr: 'Nombres'
  },
  shapes: {
    en: 'Shapes',
    te: 'ఆకారాలు',
    hi: 'आकार',
    es: 'Formas',
    fr: 'Formes'
  }
};

export const LANGUAGES_INFO = [
  { id: 'en', name: 'English', label: 'English', group: 'World' },
  { id: 'es', name: 'Spanish', label: 'Español', group: 'World' },
  { id: 'fr', name: 'French', label: 'Français', group: 'World' },
  { id: 'zh', name: 'Chinese', label: '中文', group: 'World' },
  { id: 'ja', name: 'Japanese', label: '日本語', group: 'World' },
  { id: 'hi', name: 'Hindi', label: 'हिन्दी', group: 'India' },
  { id: 'te', name: 'Telugu', label: 'తెలుగు', group: 'India' },
  { id: 'bn', name: 'Bengali', label: 'বাংলা', group: 'India' },
  { id: 'ta', name: 'Tamil', label: 'தமிழ்', group: 'India' },
  { id: 'kn', name: 'Kannada', label: 'ಕನ್ನಡ', group: 'India' },
  { id: 'ml', name: 'Malayalam', label: 'മലയാളം', group: 'India' },
  { id: 'gu', name: 'Gujarati', label: 'ગુજરાતી', group: 'India' },
  { id: 'mr', name: 'Marathi', label: 'మరాఠీ', group: 'India' },
];

export const MASCOT = {
  happy: '🦖',
  waving: '🦖👋',
  thinking: '🦖🤔',
  cheering: '🦖🎉'
};

export const MODULES: Module[] = [
  {
    id: 'quiz',
    title: { en: 'Grand Quiz!', te: 'పెద్ద క్విజ్!', hi: 'महा क्विज़!' },
    icon: 'Star',
    color: 'bg-indigo-500'
  },
  {
    id: 'abc',
    title: { en: 'Alphabets', te: 'అక్షరాలు', hi: 'वर्णमाला' },
    icon: 'Type',
    color: 'bg-pink-400'
  },
  {
    id: 'animals',
    title: { en: 'Animals', te: 'జంతువులు', hi: 'जानवर' },
    icon: 'PawPrint',
    color: 'bg-orange-400'
  },
  {
    id: 'fruits',
    title: { en: 'Fruits', te: 'పండ్లు', hi: 'फल' },
    icon: 'Apple',
    color: 'bg-red-400'
  },
  {
    id: 'vehicles',
    title: { en: 'Vehicles', te: 'వాహనాలు', hi: 'వాహన్' },
    icon: 'Bus',
    color: 'bg-blue-600'
  },
  {
    id: 'body-parts',
    title: { en: 'Body Parts', te: 'శరీర భాగాలు', hi: 'शरीर के अंग' },
    icon: 'User',
    color: 'bg-purple-400'
  },
  {
    id: 'rhymes',
    title: { en: 'Rhymes', te: 'పాటలు', hi: 'कविताएँ' },
    icon: 'Music',
    color: 'bg-purple-500'
  },
  {
    id: 'drawing',
    title: { en: 'Drawing', te: 'డ్రాయింగ్', hi: 'చిత్రకారి' },
    icon: 'Pencil',
    color: 'bg-indigo-400'
  },
  {
    id: 'habits',
    title: { en: 'Good Habits', te: 'మంచి అలవాట్లు', hi: 'अच्छी आदतें' },
    icon: 'Sparkles',
    color: 'bg-green-400'
  },
  {
    id: 'vegetables',
    title: { en: 'Vegetables', te: 'కూరగాయలు', hi: 'सब्जियां' },
    icon: 'Apple',
    color: 'bg-green-500'
  },
  {
    id: 'solar-system',
    title: { en: 'Solar System', te: 'సౌర వ్యవస్థ', hi: 'सौर मंडल' },
    icon: 'Star',
    color: 'bg-indigo-600'
  },
  {
    id: 'dinosaurs',
    title: { en: 'Dinosaurs', te: 'డైనోసార్‌లు', hi: 'डायनासोर' },
    icon: 'PawPrint',
    color: 'bg-emerald-600'
  },
  {
    id: 'numbers-general',
    title: { en: 'Number Cards', te: 'అంకెలు', hi: 'अंक' },
    icon: 'Binary',
    color: 'bg-yellow-400'
  },
  {
    id: 'shapes-general',
    title: { en: 'Shape Cards', te: 'ఆకారాలు', hi: 'आकार' },
    icon: 'Shapes',
    color: 'bg-red-400'
  }
];

export const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(char => ({
  id: char,
  name: { en: char, te: char, hi: char },
  example: {
    A: { en: 'Apple', te: 'ఆపిల్', hi: 'सेब', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b60b0?w=400&q=80' },
    B: { en: 'Ball', te: 'బంతి', hi: 'गेंद', img: 'https://images.unsplash.com/photo-1614633316524-7eb3d3e62f01?w=400&q=80' },
    C: { en: 'Cat', te: 'పిల్లి', hi: 'बिल्ली', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80' },
    D: { en: 'Dog', te: 'కుక్క', hi: 'कुत्ता', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80' },
    E: { en: 'Elephant', te: 'ఏనుగు', hi: 'हाथी', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80' },
    F: { en: 'Fish', te: 'చేప', hi: 'మछలీ', img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&q=80' },
    G: { en: 'Grapes', te: 'ద్రాక్ష', hi: 'అంగూర్', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8c?w=400&q=80' },
    H: { en: 'Horse', te: 'గుర్రం', hi: 'घोड़ा', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80' },
    I: { en: 'Ice Cream', te: 'ఐస్ క్రీం', hi: 'आइसक्रीम', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80' },
    J: { en: 'Jug', te: 'జగ్', hi: 'जग', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e15ca?w=400&q=80' },
    K: { en: 'Kite', te: 'గాలిపటం', hi: 'पतंग', img: 'https://images.unsplash.com/photo-1506501139174-099022df5260?w=400&q=80' },
    L: { en: 'Lion', te: 'సింహం', hi: 'शेर', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80' },
    M: { en: 'Monkey', te: 'కోతి', hi: 'बंदर', img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80' },
    N: { en: 'Nest', te: 'గూడు', hi: 'घोंसला', img: 'https://images.unsplash.com/photo-1522850403397-b0c8f2f75451?w=400&q=80' },
    O: { en: 'Orange', te: 'నారింజ', hi: 'సంత్రం', img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&q=80' },
    P: { en: 'Parrot', te: 'చిలుక', hi: 'तोता', img: 'https://images.unsplash.com/photo-1552728089-57bdde30fc3b?w=400&q=80' },
    Q: { en: 'Queen', te: 'రాణి', hi: 'रानी', img: 'https://images.unsplash.com/photo-1490230230282-358b5cc13c23?w=400&q=80' },
    R: { en: 'Rabbit', te: 'కుందేలు', hi: 'खरगोश', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80' },
    S: { en: 'Sun', te: 'సూర్యుడు', hi: 'सूरज', img: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad0?w=400&q=80' },
    T: { en: 'Tiger', te: 'పులి', hi: 'బాఘ్', img: 'https://images.unsplash.com/photo-1564417947093-6c86b29d4791?w=400&q=80' },
    U: { en: 'Umbrella', te: 'గొడుగు', hi: 'छाता', img: 'https://images.unsplash.com/photo-1511216503930-b3bd3a362f68?w=400&q=80' },
    V: { en: 'Van', te: 'వ్యాన్', hi: 'వैन', img: 'https://images.unsplash.com/photo-1554223090-7e482851df45?w=400&q=80' },
    W: { en: 'Watch', te: 'వాచ్', hi: 'घड़ी', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80' },
    X: { en: 'Xylophone', te: 'జైలోఫోన్', hi: 'జైలోఫోన్', img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80' },
    Y: { en: 'Yak', te: 'యక్', hi: 'యక్', img: 'https://images.unsplash.com/photo-1613919424754-080c55f70bb0?w=400&q=80' },
    Z: { en: 'Zebra', te: 'జెబ్రా', hi: 'జెబ్రా', img: 'https://images.unsplash.com/photo-1526073317351-28562d29486c?w=400&q=80' }
  }[char]
}));

export const GOOD_HABITS = [
  { 
    id: 'brushing', 
    name: { en: 'Brush Teeth', te: 'పళ్ళు తోముకోవడం', hi: 'दांत साफ करना' }, 
    description: { 
      en: 'Brush your teeth twice a day to keep them shining and strong!', 
      te: 'మీ పళ్ళను రోజుకి రెండుసార్లు తోముకోండి, అవి తెల్లగా మరియు బలంగా ఉంటాయి!', 
      hi: 'अपने दांतों को दिन में दो बार ब्रश करें ताकि वे चमकते और मजबूत रहें!' 
    },
    icon: '🪥', 
    img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80' 
  },
  { 
    id: 'handwash', 
    name: { en: 'Wash Hands', te: 'చేతులు కడుక్కోవడం', hi: 'हाथ धोना' }, 
    description: { 
      en: 'Wash your hands with soap before eating and after playing!', 
      te: 'తినడానికి ముందు మరియు ఆడుకున్న తర్వాత మీ చేతులను సబ్బుతో కడుక్కోండి!', 
      hi: 'खाने से पहले और खेलने के बाद अपने हाथों को साबुन से धोएं!' 
    },
    icon: '🧼', 
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' 
  },
  { 
    id: 'bathing', 
    name: { en: 'Bath Daily', te: 'ప్రతిరోజూ స్నానం', hi: 'रोज नहाना' }, 
    description: { 
      en: 'Take a bath every day to stay fresh, clean, and healthy!', 
      te: 'తాజాగా, శుభ్రంగా మరియు ఆరోగ్యంగా ఉండటానికి ప్రతిరోజూ స్నానం చేయండి!', 
      hi: 'ताजा, स्वच्छ और स्वस्थ रहने के लिए हर दिन स्नान करें!' 
    },
    icon: '🚿', 
    img: 'https://images.unsplash.com/photo-1543973003-822055bc5a97?w=400&q=80' 
  },
  { 
    id: 'healthyfood', 
    name: { en: 'Eat Healthy', te: 'ఆరోగ్యకరమైన ఆహారం', hi: 'स्वस्थ भोजन' }, 
    description: { 
      en: 'Eat lots of fruits and vegetables to grow big and strong!', 
      te: 'పెద్దగా మరియు బలంగా పెరగడానికి పండ్లు మరియు కూరగాయలు ఎక్కువగా తినండి!', 
      hi: 'बड़े और मजबूत होने के लिए खूब फल और सब्जियां खाएं!' 
    },
    icon: '🥦', 
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' 
  },
  { 
    id: 'trash', 
    name: { en: 'Use Dustbin', te: 'డస్ట్బిన్ ఉపయోగించండి', hi: 'कूड़ेदान का उपयोग' }, 
    description: { 
      en: 'Always throw trash in the dustbin to keep our world clean!', 
      te: 'మన ప్రపంచాన్ని శుభ్రంగా ఉంచడానికి చెత్తను ఎల్లప్పుడూ డస్ట్బిన్లో వేయండి!', 
      hi: 'हमारी दुनिया को साफ रखने के लिए हमेशा कचरे को कूड़ेदान में फेंकें!' 
    },
    icon: '🗑️', 
    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80' 
  },
  { 
    id: 'sleeping', 
    name: { en: 'Sleep Early', te: 'త్వరగా నిద్రపోవడం', hi: 'जल्दी सोना' }, 
    description: { 
      en: 'Sleep early and wake up early to stay active and full of energy!', 
      te: 'చురుకుగా మరియు శక్తితో ఉండటానికి త్వరగా నిద్రపోండి మరియు త్వరగా మేల్కొనండి!', 
      hi: 'सक्रिय और ऊर्जा से भरपूर रहने के लिए जल्दी सोएं और जल्दी जागें!' 
    },
    icon: '😴', 
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&q=80' 
  }
];

export const SHAPES = [
  { 
    id: 'circle', 
    name: { en: 'Circle', te: 'వృత్తం', hi: 'वृत्त' }, 
    description: {
      en: 'A circle is round like a ball or the sun!',
      te: 'వృత్తం బంతి లేదా సూర్యుడిలా గుండ్రంగా ఉంటుంది!',
      hi: 'एक वृत्त गेंद या सूरज की तरह गोल होता है!'
    },
    symbol: '●', color: '#EF4444', img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=400&q=80' 
  },
  { 
    id: 'square', 
    name: { en: 'Square', te: 'చతురస్రం', hi: 'वर्ग' }, 
    description: {
      en: 'A square has four equal sides, just like a box!',
      te: 'చతురస్రానికి పెట్టెలాగే నాలుగు సమాన భుజాలు ఉంటాయి!',
      hi: 'एक वर्ग की चार समान भुजाएं होती हैं, बिल्कुल एक बक्से की तरह!'
    },
    symbol: '■', color: '#3B82F6', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80' 
  },
  { id: 'triangle', name: { en: 'Triangle', te: 'త్రిభుజం', hi: 'त्रिभुज' }, symbol: '▲', color: '#F59E0B', img: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80' },
  { id: 'star', name: { en: 'Star', te: 'నక్షత్రం', hi: 'तారా' }, symbol: '★', color: '#FCD34D', img: 'https://images.unsplash.com/photo-1611090680582-839556a3e144?w=400&q=80' },
  { id: 'heart', name: { en: 'Heart', te: 'హృదయం', hi: 'दिल' }, symbol: '❤', color: '#EC4899', img: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=400&q=80' },
  { id: 'diamond', name: { en: 'Diamond', te: 'వజ్రం', hi: 'हीरा' }, symbol: '◆', color: '#8B5CF6', img: 'https://images.unsplash.com/photo-1626084300438-687289f64836?w=400&q=80' },
  { id: 'oval', name: { en: 'Oval', te: 'అండాకారం', hi: 'అండాకార్' }, symbol: '⬭', color: '#10B981', img: 'https://images.unsplash.com/photo-1626880053123-d6c5d947265a?w=400&q=80' }
];

export const VEGETABLES = [
  { 
    id: 'carrot', 
    name: { en: 'Carrot', te: 'క్యారెట్', hi: 'गाजर' }, 
    description: { en: 'Crunchy orange carrots are good for your eyes!', te: 'కరకరలాడే నారింజ క్యారెట్లు మీ కళ్ళకు మంచివి!', hi: 'कुरकुरी नारंगी गाजर आपकी आंखों के लिए अच्छी होती है!' },
    img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80' 
  },
  { 
    id: 'broccoli', 
    name: { en: 'Broccoli', te: 'బ్రోకలీ', hi: 'ब्रोकोली' }, 
    description: { en: 'Broccoli looks like a little green tree!', te: 'బ్రోకలీ ఒక చిన్న పచ్చని చెట్టులా కనిపిస్తుంది!', hi: 'ब्रोकोली एक छोटे हरे पेड़ की तरह दिखती है!' },
    img: 'https://images.unsplash.com/photo-1452948491233-ad8a1ed01085?w=400&q=80' 
  },
  { 
    id: 'tomato', 
    name: { en: 'Tomato', te: 'టమోటా', hi: 'टमाटर' }, 
    description: { en: 'Red and juicy tomatoes are tasty in salad!', te: 'ఎర్రటి మరియు జ్యూసీ టమోటాలు సలాడ్‌లో రుచిగా ఉంటాయి!', hi: 'लाल और रसीले टमाटर सलाद में स्वादिष्ट होते हैं!' },
    img: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=400&q=80' 
  },
  { 
    id: 'potato', 
    name: { en: 'Potato', te: 'బంగాళదుంప', hi: 'आलू' }, 
    description: { en: 'Potatoes grow under the ground!', te: 'బంగాళదుంపలు భూమి అడుగున పెరుగుతాయి!', hi: 'आलू जमीन के नीचे उगते हैं!' },
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80' 
  }
];

export const SOLAR_SYSTEM = [
  { 
    id: 'sun', 
    name: { en: 'Sun', te: 'సూర్యుడు', hi: 'सूरज' }, 
    description: { en: 'The Sun is a big hot star that gives us light!', te: 'సూర్యుడు మనకు కాంతిని ఇచ్చే పెద్ద వేడి నక్షత్రం!', hi: 'सूरज एक बड़ा गर्म तारा है जो हमें रोशनी देता है!' },
    img: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad0?w=400&q=80' 
  },
  { 
    id: 'moon', 
    name: { en: 'Moon', te: 'చంద్రుడు', hi: 'चांद' }, 
    description: { en: 'The Moon shines brightly in the night sky!', te: 'చంద్రుడు రాత్రి ఆకాశంలో ప్రకాశవంతంగా మెరుస్తాడు!', hi: 'चांद रात के आसमान में चमकता है!' },
    img: 'https://images.unsplash.com/photo-1522030239044-12f0141365ee?w=400&q=80' 
  },
  { 
    id: 'earth', 
    name: { en: 'Earth', te: 'భూమి', hi: 'पृथ्वी' }, 
    description: { en: 'Earth is our beautiful home with blue oceans!', te: 'నీలి సముద్రాలతో భూమి మన అందమైన ఇల్లు!', hi: 'पृथ्वी नीले महासागरों के साथ हमारा खूबसूरत घर है!' },
    img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&q=80' 
  }
];

export const DINOSAURS = [
  { 
    id: 't-rex', 
    name: { en: 'T-Rex', te: 'టి-రెక్స్', hi: 'टी-रेक्स' }, 
    description: { en: 'The T-Rex was a mighty dino with a big roar!', te: 'టి-రెక్స్ పెద్ద గర్జన చేసే శక్తివంతమైన డైనో!', hi: 'टी-रेक्स एक शक्तिशाली डायनासोर था जिसकी दहाड़ बहुत तेज़ थी!' },
    img: 'https://images.unsplash.com/photo-1525833313266-938951214841?w=400&q=80' 
  },
  { 
    id: 'triceratops', 
    name: { en: 'Triceratops', te: 'ట్రైసెరాటాప్స్', hi: 'ट्राइसेराटॉप्स' }, 
    description: { en: 'This dino had three big horns on its head!', te: 'ఈ డైనోకు తలపై మూడు పెద్ద కొమ్ములు ఉన్నాయి!', hi: 'इस डायनासौर के सिर पर तीन बड़े सींग थे!' },
    img: 'https://images.unsplash.com/photo-1559967139-a1df809a565d?w=400&q=80' 
  }
];

export const NUMBERS_GENERAL = [
  { id: '1', name: { en: 'One', te: 'ఒకటి', hi: 'एक' }, description: { en: 'Number One! Just like you!', te: 'నంబర్ వన్! మీలాగే!', hi: 'नंबर एक! बिल्कुल आपकी तरह!' }, img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&q=80' },
  { id: '2', name: { en: 'Two', te: 'రెండు', hi: 'दो' }, description: { en: 'Two eyes to see the world!', te: 'ప్రపంచాన్ని చూడటానికి రెండు కళ్ళు!', hi: 'दुनिया को देखने के लिए दो आँखें!' }, img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&q=80' },
  { id: '3', name: { en: 'Three', te: 'మూడు', hi: 'तीन' }, description: { en: 'Three wheels on a tricycle!', te: 'ట్రైసైకిల్‌కు మూడు చక్రాలు!', hi: 'ट्राइसाइकिल पर तीन पहिये!' }, img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&q=80' }
];

export const ANIMALS = [
  { id: 'lion', name: { en: 'Lion', te: 'సింహం', hi: 'शेर' }, icon: '🦁', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80' },
  { id: 'elephant', name: { en: 'Elephant', te: 'ఏనుగు', hi: 'हाथी' }, icon: '🐘', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80' },
  { id: 'tiger', name: { en: 'Tiger', te: 'పులి', hi: 'बाघ' }, img: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?w=400&q=80' },
  { id: 'monkey', name: { en: 'Monkey', te: 'కోతి', hi: 'बंदर' }, img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80' },
  { id: 'zebra', name: { en: 'Zebra', te: 'జెబ్రా', hi: 'जेबरा' }, img: 'https://images.unsplash.com/photo-1526073317351-28562d29486c?w=400&q=80' },
  { id: 'giraffe', name: { en: 'Giraffe', te: 'జిరాఫీ', hi: 'जिराफ' }, img: 'https://images.unsplash.com/photo-1547721064-3620263435cc?w=400&q=80' },
  { id: 'panda', name: { en: 'Panda', te: 'పాండా', hi: 'పాండా' }, icon: '🐼', img: 'https://images.unsplash.com/photo-1564349683136-77e08bef1ed0?w=400&q=80' },
  { id: 'koala', name: { en: 'Koala', te: 'కోలా', hi: 'కోఆలా' }, icon: '🐨', img: 'https://images.unsplash.com/photo-1546415717-c14b00ad7335?w=400&q=80' },
  { id: 'fox', name: { en: 'Fox', te: 'నక్క', hi: 'లోమడీ' }, icon: '🦊', img: 'https://images.unsplash.com/photo-1474314881477-04c4aac40a0e?w=400&q=80' },
  { id: 'rabbit', name: { en: 'Rabbit', te: 'కుందేలు', hi: 'ఖరగోష్' }, icon: '🐰', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80' }
];

export const FRUITS = [
  { id: 'apple', name: { en: 'Apple', te: 'ఆపిల్', hi: 'सेब' }, icon: '🍎', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b60b0?w=400&q=80' },
  { id: 'banana', name: { en: 'Banana', te: 'అరటిపండు', hi: 'केला' }, icon: '🍌', img: 'https://images.unsplash.com/photo-1571771894821-ad990bf1577a?w=400&q=80' },
  { id: 'grapes', name: { en: 'Grapes', te: 'ద్రాక్ష', hi: 'అంగూర్' }, icon: '🍇', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8c?w=400&q=80' },
  { id: 'mango', name: { en: 'Mango', te: 'మామిడి', hi: 'आम' }, icon: '🥭', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80' },
  { id: 'watermelon', name: { en: 'Watermelon', te: 'పుచ్చకాయ', hi: 'तरबूज' }, icon: '🍉', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80' }
];

export const VEHICLES = [
  { id: 'car', name: { en: 'Car', te: 'కారు', hi: 'कार' }, icon: '🚗', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80' },
  { id: 'bus', name: { en: 'Bus', te: 'బస్సు', hi: 'बस' }, icon: '🚌', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80' },
  { id: 'train', name: { en: 'Train', te: 'రైలు', hi: 'ट्रेन' }, icon: '🚂', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80' },
  { id: 'airplane', name: { en: 'Airplane', te: 'విమానం', hi: 'हवाई जहाज' }, icon: '✈️', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=400&q=80' },
  { id: 'ship', name: { en: 'Ship', te: 'ఓడ', hi: 'जहाज' }, icon: '🚢', img: 'https://images.unsplash.com/photo-1499859059406-3d31353ff23f?w=400&q=80' }
];

export const BODY_PARTS = [
  { id: 'head', name: { en: 'Head', te: 'తల', hi: 'सिर' }, icon: '👨', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
  { id: 'eyes', name: { en: 'Eyes', te: 'కళ్ళు', hi: 'ఆంఖేం' }, icon: '👀', img: 'https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?w=400&q=80' },
  { id: 'nose', name: { en: 'Nose', te: 'ముక్కు', hi: 'नाक' }, icon: '👃', img: 'https://images.unsplash.com/photo-1509066601438-e6b3607730e2?w=400&q=80' },
  { id: 'ears', name: { en: 'Ears', te: 'చెవులు', hi: 'कान' }, icon: '👂', img: 'https://images.unsplash.com/photo-1563219430-80c10f845d4d?w=400&q=80' },
  { id: 'mouth', name: { en: 'Mouth', te: 'నోరు', hi: 'ముంహ' }, icon: '👄', img: 'https://images.unsplash.com/photo-1506450985934-58bc444d3106?w=400&q=80' },
  { id: 'hands', name: { en: 'Hands', te: 'చేతులు', hi: 'హాథ్' }, icon: '✋', img: 'https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?w=400&q=80' }
];
