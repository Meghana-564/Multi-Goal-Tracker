// Mock AI Service returning simulated AI responses

exports.generateRoadmap = async (prompt) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    title: `AI Generated: ${prompt.substring(0, 20)}...`,
    description: `A comprehensive roadmap generated based on your goal: "${prompt}".`,
    category: "AI Generated",
    steps: [
      { title: "Understand the Basics", description: "Learn the foundational concepts.", resourceLinks: ["https://example.com/basics"], order: 1 },
      { title: "Intermediate Core Concepts", description: "Dive deeper into the main topics.", resourceLinks: ["https://example.com/intermediate"], order: 2 },
      { title: "Advanced Projects", description: "Build real-world projects to solidify knowledge.", resourceLinks: ["https://example.com/advanced"], order: 3 }
    ]
  };
};

exports.enhanceStep = async (stepContent) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    description: `(Enhanced by AI) ${stepContent.description}. Make sure to practice this thoroughly by building small scripts.`,
    resourceLinks: [...(stepContent.resourceLinks || []), "https://youtube.com/suggested_ai_video"]
  };
};

const roadmapTemplates = {
  python: {
    title: 'Python Developer Roadmap',
    steps: [
      { step: 1, topic: 'Python Basics', subtopics: ['Variables & Data Types', 'Conditionals & Loops', 'Functions', 'Lists, Dicts, Tuples'], project: 'Build a CLI calculator' },
      { step: 2, topic: 'Intermediate Python', subtopics: ['OOP & Classes', 'File I/O', 'Error Handling', 'Modules & Packages'], project: 'Build a contact book app' },
      { step: 3, topic: 'Libraries & Tools', subtopics: ['pip & virtualenv', 'requests', 'json handling', 'datetime'], project: 'Fetch & display weather data from an API' },
      { step: 4, topic: 'Advanced Topics', subtopics: ['Decorators', 'Generators', 'Comprehensions', 'Threading basics'], project: 'Build a web scraper' },
      { step: 5, topic: 'Specialization', subtopics: ['Web (Flask/Django)', 'Data Science (pandas/numpy)', 'Automation (selenium)'], project: 'Build a full project in your chosen area' }
    ]
  },
  javascript: {
    title: 'JavaScript Developer Roadmap',
    steps: [
      { step: 1, topic: 'JS Fundamentals', subtopics: ['Variables (let/const/var)', 'Functions & Arrow Functions', 'Arrays & Objects', 'DOM Manipulation'], project: 'Build an interactive to-do list' },
      { step: 2, topic: 'Intermediate JS', subtopics: ['Promises & async/await', 'Fetch API', 'ES6+ features', 'Error handling'], project: 'Build a weather app using a public API' },
      { step: 3, topic: 'Browser & Tools', subtopics: ['LocalStorage', 'Events & Event Delegation', 'Modules (import/export)', 'npm basics'], project: 'Build a notes app with persistence' },
      { step: 4, topic: 'Frameworks', subtopics: ['React basics', 'Components & Props', 'State & Hooks', 'React Router'], project: 'Build a multi-page React app' },
      { step: 5, topic: 'Backend with Node.js', subtopics: ['Node.js & Express', 'REST APIs', 'MongoDB basics', 'Authentication (JWT)'], project: 'Build a full-stack CRUD app' }
    ]
  },
  react: {
    title: 'React Developer Roadmap',
    steps: [
      { step: 1, topic: 'React Basics', subtopics: ['JSX', 'Components & Props', 'useState & useEffect', 'Conditional Rendering'], project: 'Build a counter and a simple profile card' },
      { step: 2, topic: 'Component Patterns', subtopics: ['Lists & Keys', 'Forms & Controlled Inputs', 'Lifting State Up', 'Component Composition'], project: 'Build a dynamic form with validation' },
      { step: 3, topic: 'Routing & Context', subtopics: ['React Router v6', 'useContext', 'Global State Management', 'Protected Routes'], project: 'Build a multi-page app with auth flow' },
      { step: 4, topic: 'Advanced Hooks & Patterns', subtopics: ['useReducer', 'useMemo & useCallback', 'Custom Hooks', 'Error Boundaries'], project: 'Build a shopping cart with global state' },
      { step: 5, topic: 'Production & Ecosystem', subtopics: ['API integration', 'Performance optimization', 'Testing (React Testing Library)', 'Deployment (Vercel/Netlify)'], project: 'Deploy a full React app with a real API' }
    ]
  },
  frontend: {
    title: 'Frontend Developer Roadmap',
    steps: [
      { step: 1, topic: 'HTML & CSS', subtopics: ['HTML5 Semantics', 'CSS Flexbox & Grid', 'Responsive Design', 'Animations'], project: 'Build a responsive landing page' },
      { step: 2, topic: 'JavaScript', subtopics: ['DOM Manipulation', 'ES6+', 'Fetch API', 'Event Handling'], project: 'Build an interactive quiz app' },
      { step: 3, topic: 'React', subtopics: ['Components & Props', 'Hooks', 'React Router', 'State Management'], project: 'Build a multi-page React app' },
      { step: 4, topic: 'Tooling & Performance', subtopics: ['Webpack/Vite', 'TypeScript basics', 'Lighthouse audits', 'Lazy loading'], project: 'Optimize an existing app for performance' },
      { step: 5, topic: 'Job Ready', subtopics: ['Portfolio projects', 'GitHub profile', 'Tailwind CSS', 'Accessibility (a11y)'], project: 'Build and deploy a full portfolio site' }
    ]
  },
  backend: {
    title: 'Backend Developer Roadmap',
    steps: [
      { step: 1, topic: 'Programming Fundamentals', subtopics: ['Pick a language: Node.js, Python, or Java', 'OOP concepts', 'Error handling', 'File I/O'], project: 'Build a CLI task manager' },
      { step: 2, topic: 'Web Servers & APIs', subtopics: ['HTTP methods', 'REST API design', 'Express/FastAPI', 'Postman testing'], project: 'Build a REST API for a blog' },
      { step: 3, topic: 'Databases', subtopics: ['SQL basics (PostgreSQL)', 'NoSQL (MongoDB)', 'ORMs (Prisma/Mongoose)', 'Indexing & queries'], project: 'Add a database to your blog API' },
      { step: 4, topic: 'Auth & Security', subtopics: ['JWT & Sessions', 'bcrypt hashing', 'CORS & Helmet', 'Rate limiting'], project: 'Add user auth to your API' },
      { step: 5, topic: 'DevOps Basics', subtopics: ['Docker', 'CI/CD pipelines', 'Deploy to Railway/Render', 'Environment variables'], project: 'Dockerize and deploy your API' }
    ]
  },
  fullstack: {
    title: 'Full Stack Developer Roadmap',
    steps: [
      { step: 1, topic: 'Frontend Basics', subtopics: ['HTML, CSS, JavaScript', 'React fundamentals', 'Responsive design'], project: 'Build a responsive React UI' },
      { step: 2, topic: 'Backend Basics', subtopics: ['Node.js & Express', 'REST APIs', 'MongoDB or PostgreSQL'], project: 'Build a REST API with CRUD operations' },
      { step: 3, topic: 'Connecting Frontend & Backend', subtopics: ['Axios/Fetch', 'CORS setup', 'JWT Authentication', 'Protected routes'], project: 'Build a full-stack app with login' },
      { step: 4, topic: 'Advanced Features', subtopics: ['File uploads', 'Real-time (Socket.io)', 'Email (Nodemailer)', 'Payment (Stripe)'], project: 'Add real-time chat to your app' },
      { step: 5, topic: 'Deployment', subtopics: ['Vercel (frontend)', 'Railway/Render (backend)', 'MongoDB Atlas', 'Domain & HTTPS'], project: 'Deploy your full-stack app live' }
    ]
  },
  devops: {
    title: 'DevOps Engineer Roadmap',
    steps: [
      { step: 1, topic: 'Linux & Networking', subtopics: ['Linux CLI basics', 'File permissions', 'SSH', 'TCP/IP & DNS'], project: 'Set up and manage a Linux VPS' },
      { step: 2, topic: 'Version Control & CI/CD', subtopics: ['Git advanced', 'GitHub Actions', 'Jenkins basics', 'Automated testing pipelines'], project: 'Create a CI/CD pipeline for a Node app' },
      { step: 3, topic: 'Containers & Orchestration', subtopics: ['Docker', 'Docker Compose', 'Kubernetes basics', 'Helm charts'], project: 'Dockerize and orchestrate a multi-service app' },
      { step: 4, topic: 'Cloud Platforms', subtopics: ['AWS/GCP/Azure basics', 'EC2, S3, RDS', 'IAM & security groups', 'Load balancers'], project: 'Deploy an app on AWS EC2 with S3 storage' },
      { step: 5, topic: 'Monitoring & IaC', subtopics: ['Terraform', 'Prometheus & Grafana', 'Log management (ELK)', 'Alerting'], project: 'Set up infrastructure with Terraform and monitor it' }
    ]
  },
  cloud: {
    title: 'Cloud Engineer Roadmap',
    steps: [
      { step: 1, topic: 'Cloud Fundamentals', subtopics: ['IaaS vs PaaS vs SaaS', 'Regions & Availability Zones', 'Billing & cost management', 'Shared responsibility model'], project: 'Create a free-tier AWS account and explore services' },
      { step: 2, topic: 'Core AWS Services', subtopics: ['EC2 & S3', 'IAM roles & policies', 'VPC & Security Groups', 'RDS & DynamoDB'], project: 'Host a static website on S3 with CloudFront' },
      { step: 3, topic: 'Infrastructure as Code', subtopics: ['Terraform', 'AWS CloudFormation', 'Ansible basics', 'Version control for infra'], project: 'Provision an EC2 instance using Terraform' },
      { step: 4, topic: 'Containers & Serverless', subtopics: ['Docker on AWS (ECS/EKS)', 'AWS Lambda', 'API Gateway', 'Step Functions'], project: 'Deploy a serverless REST API with Lambda' },
      { step: 5, topic: 'Certifications', subtopics: ['AWS Cloud Practitioner', 'AWS Solutions Architect Associate', 'Practice exams', 'Hands-on labs'], project: 'Pass the AWS Cloud Practitioner exam' }
    ]
  },
  datascience: {
    title: 'Data Scientist Roadmap',
    steps: [
      { step: 1, topic: 'Foundations', subtopics: ['Python basics', 'Statistics & Probability', 'Linear Algebra', 'NumPy & Pandas'], project: 'Analyze and clean a real-world dataset' },
      { step: 2, topic: 'Data Visualization', subtopics: ['Matplotlib & Seaborn', 'Plotly', 'EDA techniques', 'Storytelling with data'], project: 'Create an EDA report on a Kaggle dataset' },
      { step: 3, topic: 'Machine Learning', subtopics: ['Scikit-learn', 'Regression & Classification', 'Model evaluation', 'Feature engineering'], project: 'Build a house price prediction model' },
      { step: 4, topic: 'Deep Learning', subtopics: ['Neural Networks', 'TensorFlow/PyTorch', 'NLP basics', 'Time series'], project: 'Build a sentiment analysis model' },
      { step: 5, topic: 'Production & Portfolio', subtopics: ['Model deployment (Flask/FastAPI)', 'Jupyter notebooks', 'Kaggle competitions', 'GitHub portfolio'], project: 'Deploy a model and publish a Kaggle notebook' }
    ]
  },
  dataanalyst: {
    title: 'Data Analyst Roadmap',
    steps: [
      { step: 1, topic: 'Excel & Spreadsheets', subtopics: ['Pivot tables', 'VLOOKUP & formulas', 'Charts & dashboards', 'Data cleaning'], project: 'Analyze sales data in Excel' },
      { step: 2, topic: 'SQL', subtopics: ['SELECT, WHERE, JOIN', 'GROUP BY & aggregations', 'Subqueries', 'Window functions'], project: 'Query a database to answer 10 business questions' },
      { step: 3, topic: 'Python for Analysis', subtopics: ['Pandas', 'NumPy', 'Matplotlib/Seaborn', 'Jupyter Notebooks'], project: 'Perform EDA on a public dataset' },
      { step: 4, topic: 'BI Tools', subtopics: ['Power BI or Tableau', 'Dashboard design', 'KPIs & metrics', 'Data storytelling'], project: 'Build an interactive sales dashboard' },
      { step: 5, topic: 'Statistics & Reporting', subtopics: ['Descriptive statistics', 'A/B testing basics', 'Correlation vs causation', 'Business reporting'], project: 'Present a full data analysis report' }
    ]
  },
  ml: {
    title: 'Machine Learning Engineer Roadmap',
    steps: [
      { step: 1, topic: 'Math & Python Foundations', subtopics: ['Linear Algebra basics', 'Statistics & Probability', 'NumPy & Pandas', 'Matplotlib'], project: 'Analyze and visualize a real dataset' },
      { step: 2, topic: 'Core ML Concepts', subtopics: ['Supervised vs Unsupervised', 'Train/Test Split', 'Overfitting & Regularization', 'Evaluation Metrics'], project: 'Train a linear regression model on housing data' },
      { step: 3, topic: 'Algorithms', subtopics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'SVM', 'K-Means Clustering'], project: 'Build a spam classifier' },
      { step: 4, topic: 'Deep Learning', subtopics: ['Neural Networks basics', 'TensorFlow or PyTorch', 'CNNs', 'Transfer Learning'], project: 'Build an image classifier' },
      { step: 5, topic: 'MLOps & Deployment', subtopics: ['Model saving & loading', 'Flask/FastAPI for serving', 'Docker basics', 'Cloud deployment'], project: 'Deploy your ML model as a REST API' }
    ]
  },
  cybersecurity: {
    title: 'Cybersecurity Engineer Roadmap',
    steps: [
      { step: 1, topic: 'Networking & OS Basics', subtopics: ['TCP/IP, DNS, HTTP', 'Linux CLI', 'Firewalls & VPNs', 'OSI model'], project: 'Set up a home lab with VirtualBox' },
      { step: 2, topic: 'Security Fundamentals', subtopics: ['CIA Triad', 'Encryption basics', 'Authentication methods', 'Common attack types'], project: 'Complete TryHackMe beginner path' },
      { step: 3, topic: 'Ethical Hacking', subtopics: ['Kali Linux', 'Nmap & Wireshark', 'Metasploit basics', 'OWASP Top 10'], project: 'Complete a CTF (Capture The Flag) challenge' },
      { step: 4, topic: 'Defensive Security', subtopics: ['SIEM tools', 'Incident response', 'Log analysis', 'Vulnerability scanning'], project: 'Set up a SIEM and detect a simulated attack' },
      { step: 5, topic: 'Certifications', subtopics: ['CompTIA Security+', 'CEH or OSCP', 'Cloud security (AWS)', 'Bug bounty programs'], project: 'Submit a bug bounty report on HackerOne' }
    ]
  },
  uiux: {
    title: 'UI/UX Designer Roadmap',
    steps: [
      { step: 1, topic: 'Design Fundamentals', subtopics: ['Color theory', 'Typography', 'Spacing & layout', 'Visual hierarchy'], project: 'Redesign a bad UI screenshot' },
      { step: 2, topic: 'UX Research', subtopics: ['User personas', 'User journey maps', 'Wireframing', 'Usability testing'], project: 'Conduct user research for an app idea' },
      { step: 3, topic: 'Figma', subtopics: ['Frames & components', 'Auto layout', 'Prototyping', 'Design systems'], project: 'Design a mobile app in Figma with a prototype' },
      { step: 4, topic: 'Interaction Design', subtopics: ['Micro-interactions', 'Accessibility (WCAG)', 'Motion design basics', 'Responsive design'], project: 'Add animations and accessibility to your prototype' },
      { step: 5, topic: 'Portfolio & Handoff', subtopics: ['Case studies', 'Dev handoff (Figma)', 'Behance/Dribbble portfolio', 'Interview prep'], project: 'Publish 3 case studies on your portfolio' }
    ]
  },
  android: {
    title: 'Android Developer Roadmap',
    steps: [
      { step: 1, topic: 'Kotlin Basics', subtopics: ['Variables & functions', 'OOP in Kotlin', 'Null safety', 'Collections'], project: 'Build a Kotlin CLI app' },
      { step: 2, topic: 'Android Fundamentals', subtopics: ['Activities & Fragments', 'Layouts & Views', 'RecyclerView', 'Intents'], project: 'Build a to-do list Android app' },
      { step: 3, topic: 'Jetpack & Architecture', subtopics: ['ViewModel & LiveData', 'Room Database', 'Navigation Component', 'MVVM pattern'], project: 'Rebuild the to-do app with MVVM + Room' },
      { step: 4, topic: 'Networking & APIs', subtopics: ['Retrofit', 'Coroutines', 'JSON parsing', 'Image loading (Coil)'], project: 'Build a news reader app with a real API' },
      { step: 5, topic: 'Publishing', subtopics: ['Jetpack Compose basics', 'Firebase integration', 'Play Store publishing', 'App signing & release'], project: 'Publish your app on Google Play Store' }
    ]
  },
  ios: {
    title: 'iOS Developer Roadmap',
    steps: [
      { step: 1, topic: 'Swift Basics', subtopics: ['Variables & Optionals', 'Functions & Closures', 'OOP in Swift', 'Error handling'], project: 'Build a Swift CLI app' },
      { step: 2, topic: 'SwiftUI Fundamentals', subtopics: ['Views & Modifiers', 'State & Binding', 'Lists & Navigation', 'Forms'], project: 'Build a to-do list app in SwiftUI' },
      { step: 3, topic: 'Data & Storage', subtopics: ['UserDefaults', 'Core Data', 'Codable & JSON', 'FileManager'], project: 'Add persistence to your app' },
      { step: 4, topic: 'Networking & APIs', subtopics: ['URLSession', 'async/await', 'Combine basics', 'REST API integration'], project: 'Build a weather app with a live API' },
      { step: 5, topic: 'Publishing', subtopics: ['TestFlight', 'App Store Connect', 'Push notifications (APNs)', 'In-app purchases'], project: 'Submit your app to the App Store' }
    ]
  },
  blockchain: {
    title: 'Blockchain Developer Roadmap',
    steps: [
      { step: 1, topic: 'Blockchain Basics', subtopics: ['How blockchain works', 'Consensus mechanisms', 'Wallets & keys', 'Bitcoin vs Ethereum'], project: 'Set up MetaMask and explore a testnet' },
      { step: 2, topic: 'Solidity', subtopics: ['Data types & variables', 'Functions & modifiers', 'Events & mappings', 'Inheritance'], project: 'Write and deploy a simple smart contract' },
      { step: 3, topic: 'Smart Contract Development', subtopics: ['Hardhat or Truffle', 'OpenZeppelin', 'Testing contracts', 'Gas optimization'], project: 'Build and test an ERC-20 token' },
      { step: 4, topic: 'DApp Frontend', subtopics: ['ethers.js or web3.js', 'React + MetaMask integration', 'IPFS basics', 'The Graph'], project: 'Build a DApp frontend for your smart contract' },
      { step: 5, topic: 'DeFi & NFTs', subtopics: ['ERC-721 (NFTs)', 'DeFi protocols', 'Security auditing', 'Mainnet deployment'], project: 'Deploy an NFT collection on a testnet' }
    ]
  },
  gamedev: {
    title: 'Game Developer Roadmap',
    steps: [
      { step: 1, topic: 'Programming Basics', subtopics: ['C# or C++ basics', 'OOP concepts', 'Math for games (vectors, matrices)', 'Debugging'], project: 'Build a number guessing game in C#' },
      { step: 2, topic: 'Unity/Unreal Fundamentals', subtopics: ['Editor navigation', 'GameObjects & Components', 'Physics & Colliders', 'Scripting basics'], project: 'Build a simple 2D platformer' },
      { step: 3, topic: 'Game Mechanics', subtopics: ['Player movement & input', 'Enemy AI basics', 'UI & HUD', 'Audio integration'], project: 'Add enemies, score, and sound to your platformer' },
      { step: 4, topic: 'Advanced Topics', subtopics: ['Shaders & VFX', 'Pathfinding (A*)', 'Save/Load system', 'Multiplayer basics (Photon)'], project: 'Build a top-down shooter with AI enemies' },
      { step: 5, topic: 'Publishing', subtopics: ['Build optimization', 'Itch.io publishing', 'Steam basics', 'Monetization'], project: 'Publish a complete game on Itch.io' }
    ]
  },
  embedded: {
    title: 'Embedded Systems Engineer Roadmap',
    steps: [
      { step: 1, topic: 'C Programming', subtopics: ['Pointers & memory', 'Structs & unions', 'Bit manipulation', 'File I/O'], project: 'Implement data structures in C' },
      { step: 2, topic: 'Electronics Basics', subtopics: ['Digital vs Analog signals', 'GPIO, UART, SPI, I2C', 'Oscilloscope usage', 'Circuit basics'], project: 'Blink an LED with Arduino' },
      { step: 3, topic: 'Microcontrollers', subtopics: ['Arduino & ESP32', 'Timers & interrupts', 'ADC/DAC', 'Sensor interfacing'], project: 'Build a temperature monitoring system' },
      { step: 4, topic: 'RTOS & Bare Metal', subtopics: ['FreeRTOS basics', 'Task scheduling', 'Memory management', 'STM32 basics'], project: 'Run two concurrent tasks on FreeRTOS' },
      { step: 5, topic: 'Advanced & IoT', subtopics: ['MQTT protocol', 'ESP32 WiFi/BLE', 'PCB design basics (KiCad)', 'Low power design'], project: 'Build an IoT sensor that sends data to a dashboard' }
    ]
  },
  sre: {
    title: 'Site Reliability Engineer (SRE) Roadmap',
    steps: [
      { step: 1, topic: 'Linux & Systems', subtopics: ['Linux internals', 'Process management', 'Networking (TCP/IP)', 'Shell scripting'], project: 'Automate server setup with a bash script' },
      { step: 2, topic: 'Software Engineering', subtopics: ['Python or Go basics', 'REST APIs', 'Git & code review', 'Writing reliable code'], project: 'Build a health-check CLI tool' },
      { step: 3, topic: 'Observability', subtopics: ['Prometheus & Grafana', 'Distributed tracing (Jaeger)', 'Log aggregation (ELK)', 'SLIs, SLOs, SLAs'], project: 'Set up monitoring dashboards for an app' },
      { step: 4, topic: 'Reliability Engineering', subtopics: ['Incident management', 'Postmortems', 'Chaos engineering', 'Capacity planning'], project: 'Run a chaos experiment and write a postmortem' },
      { step: 5, topic: 'Cloud & Automation', subtopics: ['Kubernetes', 'Terraform', 'CI/CD pipelines', 'Auto-scaling'], project: 'Deploy a self-healing app on Kubernetes' }
    ]
  },
  dsa: {
    title: 'Data Structures & Algorithms Roadmap',
    steps: [
      { step: 1, topic: 'Foundations', subtopics: ['Big O Notation', 'Arrays & Strings', 'Hash Maps', 'Two Pointers'], project: 'Solve 10 easy LeetCode problems' },
      { step: 2, topic: 'Core Data Structures', subtopics: ['Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Heaps'], project: 'Implement each structure from scratch' },
      { step: 3, topic: 'Searching & Sorting', subtopics: ['Binary Search', 'Merge Sort', 'Quick Sort', 'BFS & DFS'], project: 'Solve 15 medium problems using these techniques' },
      { step: 4, topic: 'Advanced Topics', subtopics: ['Dynamic Programming', 'Backtracking', 'Graphs', 'Tries'], project: 'Solve classic DP problems (knapsack, LCS, coin change)' },
      { step: 5, topic: 'Interview Prep', subtopics: ['System Design basics', 'Mock interviews', 'Time management', 'Pattern recognition'], project: 'Complete a 30-day LeetCode challenge' }
    ]
  },
  webdev: {
    title: 'Web Development Roadmap',
    steps: [
      { step: 1, topic: 'HTML & CSS', subtopics: ['HTML5 Semantics', 'CSS Flexbox & Grid', 'Responsive Design', 'CSS Variables'], project: 'Build a responsive portfolio page' },
      { step: 2, topic: 'JavaScript', subtopics: ['DOM Manipulation', 'Events', 'Fetch API', 'ES6+'], project: 'Add interactivity to your portfolio' },
      { step: 3, topic: 'Frontend Framework', subtopics: ['React or Vue basics', 'Components', 'State management', 'Routing'], project: 'Rebuild your portfolio as a React SPA' },
      { step: 4, topic: 'Backend Basics', subtopics: ['Node.js & Express', 'REST APIs', 'Databases (MongoDB or PostgreSQL)', 'Authentication'], project: 'Build a REST API with user login' },
      { step: 5, topic: 'DevOps & Deployment', subtopics: ['Git & GitHub', 'Environment variables', 'CI/CD basics', 'Deploy to Vercel/Railway'], project: 'Deploy your full-stack app live' }
    ]
  }
};

const detectRoadmapTopic = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes('python')) return 'python';
  if (msg.includes('react')) return 'react';
  if (msg.includes('javascript') || msg.includes('js roadmap') || msg.includes('js developer')) return 'javascript';
  if (msg.includes('dsa') || msg.includes('data structure') || msg.includes('algorithm') || msg.includes('leetcode')) return 'dsa';
  if (msg.includes('machine learning') || msg.includes('deep learning') || (msg.includes('ml') && msg.includes('roadmap'))) return 'ml';
  if (msg.includes('data scientist') || msg.includes('data science')) return 'datascience';
  if (msg.includes('data analyst') || msg.includes('data analysis')) return 'dataanalyst';
  if (msg.includes('frontend') || msg.includes('front end') || msg.includes('front-end')) return 'frontend';
  if (msg.includes('backend') || msg.includes('back end') || msg.includes('back-end')) return 'backend';
  if (msg.includes('full stack') || msg.includes('fullstack') || msg.includes('full-stack') || msg.includes('web dev') || msg.includes('webdev') || msg.includes('web development')) return 'fullstack';
  if (msg.includes('devops') || msg.includes('dev ops')) return 'devops';
  if (msg.includes('cloud') || msg.includes('aws') || msg.includes('azure') || msg.includes('gcp')) return 'cloud';
  if (msg.includes('cybersecurity') || msg.includes('cyber security') || msg.includes('ethical hacking') || msg.includes('penetration') || msg.includes('security engineer')) return 'cybersecurity';
  if (msg.includes('ui/ux') || msg.includes('ui ux') || msg.includes('uiux') || msg.includes('ux designer') || msg.includes('ui designer') || msg.includes('product design')) return 'uiux';
  if (msg.includes('android')) return 'android';
  if (msg.includes('ios') || msg.includes('swift') || msg.includes('iphone app')) return 'ios';
  if (msg.includes('blockchain') || msg.includes('solidity') || msg.includes('web3') || msg.includes('smart contract') || msg.includes('nft')) return 'blockchain';
  if (msg.includes('game dev') || msg.includes('gamedev') || msg.includes('game development') || msg.includes('unity') || msg.includes('unreal')) return 'gamedev';
  if (msg.includes('embedded') || msg.includes('firmware') || msg.includes('microcontroller') || msg.includes('arduino') || msg.includes('iot')) return 'embedded';
  if (msg.includes('sre') || msg.includes('site reliability') || msg.includes('reliability engineer')) return 'sre';
  return null;
};

const isRoadmapRequest = (message) => {
  const msg = message.toLowerCase();
  return msg.includes('roadmap') || msg.includes('learning path') || msg.includes('how to learn') || msg.includes('how do i learn') || msg.includes('where to start') || msg.includes('guide me') || msg.includes('teach me') || msg.includes('steps to learn') || msg.includes('become a') || msg.includes('become an') || msg.includes('career in') || msg.includes('get into');
};

exports.chat = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (isRoadmapRequest(message)) {
    const topic = detectRoadmapTopic(message);
    if (topic) {
      return { type: 'roadmap', roadmap: roadmapTemplates[topic] };
    }
    return {
      type: 'text',
      reply: `I can create a structured roadmap for any of these roles:\n\n💻 Dev: Frontend, Backend, Full Stack, Python, JavaScript, React\n📊 Data: Data Science, Data Analyst, Machine Learning\n☁️ Infra: DevOps, Cloud Engineer, SRE, Embedded Systems\n🔐 Other: Cybersecurity, UI/UX, Android, iOS, Blockchain, Game Dev\n\nJust ask e.g. "Frontend developer roadmap" or "How to become a Data Scientist"`
    };
  }

  const msg = message.toLowerCase();
  if (msg.includes('what is') || msg.includes('explain') || msg.includes('difference between')) {
    return { type: 'text', reply: `To get a precise answer about "${message}", I'd recommend checking the official documentation or asking me to generate a roadmap for that topic so you can learn it step by step.` };
  }
  if (msg.includes('how long') || msg.includes('how much time')) {
    return { type: 'text', reply: `It depends on your pace. With 1-2 hours/day: beginner topics take 2-4 weeks, intermediate 1-2 months, and advanced 3-6 months. Consistency matters more than speed.` };
  }
  if (msg.includes('best resource') || msg.includes('where to learn') || msg.includes('recommend')) {
    return { type: 'text', reply: `Top free resources: MDN Web Docs (web), docs.python.org (Python), react.dev (React), freeCodeCamp (full stack), CS50 (fundamentals), LeetCode (DSA). Want a full roadmap for any of these?` };
  }

  return { type: 'text', reply: `Could you be more specific? Try asking things like "Give me a roadmap to become a Backend Developer" or "How to get into Cybersecurity". I give direct, structured guidance.` };
};
