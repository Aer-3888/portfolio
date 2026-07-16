export const EMAIL = "theo.phan.quoc.huy@gmail.com";

export const STATUS_ITEMS = [
  {
    label: "Currently",
    value: "CS Student @ INSA Rennes",
    sub: "3rd-year engineering · AI specialization",
  },
  {
    label: "Focus",
    value: "Mobile, Security & AI",
    sub: "Computer Vision • Native Mobile • Cryptography",
  },
  {
    label: "Availability",
    value: "Summer Internship 2027",
    sub: "Open for Global Opportunities",
  },
];

export const NAV_ITEMS = [
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/", scrollTo: "about" },
  { label: "Contact", path: "/contact" },
];

export const SOCIALS = [
  { label: "GitHub", url: "https://github.com/Aer-3888", id: "GH-REP" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/theophanquochuy/", id: "LN-PRO" },
  { label: "Instagram", url: "https://www.instagram.com/phan.theo.huy/", id: "IG-VIS" },
];

export const EXPERIENCES = [
  {
    date: "2025 - Present",
    title: "Founding Engineer & Tech Lead",
    org: "Waiki (Freelance)",
    detail:
      "Led a team of 3 engineering students (Agile/Scrum) from idea to iOS and Android release, now live with 1,425+ units sold. Built the cross-platform Flutter app with phone-wide app blocking and an NFC tap-to-unlock key, reliable even on phones that aggressively close apps.",
    tags: ["Flutter", "NFC", "DNS Filtering", "Leadership"],
  },
  {
    date: "04/2025 - 06/2025",
    title: "AI Engineer Intern",
    org: "FPT Telecom",
    detail:
      "Built a Python computer-vision pipeline to detect defects on fiber-optic cabling, comparing YOLOv8 and Faster R-CNN on mAP, precision/recall and latency. Delivered a working pipeline and full technical documentation for the internal team.",
    tags: ["Computer Vision", "PyTorch", "YOLOv8"],
  },
  {
    date: "2025 - 2028",
    title: "Engineering Degree, Computer Science",
    org: "INSA Rennes",
    detail:
      "Five-year French engineering degree, specializing in Artificial Intelligence.",
    tags: ["Artificial Intelligence", "Algorithms", "Architecture"],
  },
  {
    date: "2026 - Present",
    title: "Backend Developer (Volunteer)",
    org: "Gnut06",
    detail:
      "Building features and the Doctrine/MySQL data layer on the association's Symfony 7.1 / PHP platform that powers VR/AR experiences and tech workshops for people with disabilities.",
    tags: ["Symfony", "PHP", "MySQL", "Docker"],
  },
  {
    date: "2026",
    title: "Cybersecurity Competitor",
    org: "CTF · Team Crabe",
    detail:
      "71st/757 worldwide at Midnight Flag CTF 2026 and 2nd place at IUT CTF. Focused on cryptography, OSINT, forensics, and network security.",
    tags: ["Security", "Cryptography", "CTF"],
  },
  {
    date: "2026",
    title: "AI for Business Hackathon",
    org: "Team Project",
    detail:
      "Built an AI and data driven solution to a real business challenge with a small team, taking it from problem framing to a working prototype under a tight deadline.",
    tags: ["AI", "Data", "Hackathon", "Teamwork"],
  },
  {
    date: "2025 - Present",
    title: "Accountant",
    org: "Junior Entreprise Ouest INSA",
    detail:
      "Managing financial flows and budget tracking for a student-led engineering consultancy. Built a custom tool to automate accounting entries and streamline admin workflows.",
    tags: ["Management", "Automation", "Rigour"],
  },
  {
    date: "2023 - 2025",
    title: "BUT Informatique",
    org: "IUT Nantes",
    detail:
      "Application development track: design, development and validation. Built full-stack projects including real-estate data analysis and e-commerce platforms.",
    tags: ["React", "Node.js", "Go", "SQL", "Pandas"],
  },
  {
    date: "2022",
    title: "Admin Assistant",
    org: "BMW Alphabet",
    detail:
      "Digitized contracts and resolved formatting inconsistencies. Developed rigor and professional adaptability.",
    tags: ["Organization", "Adaptability"],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Waiki",
    year: "2025",
    metric: "Live on iOS + Android · 1,425+ units sold",
    type: "Mobile Development",
    category: "Freelance",
    services: "Flutter - NFC Auth - DNS Filtering",
    img: `${import.meta.env.BASE_URL}images/optimized/waiki.webp`,
    imageCredit: "Photo: Théo Phan",
    url: "https://waikiup.com/",
    linkText: "View Project Website",
    logoType: "website",
    offset: 120,
    description:
      "A mobile app that helps people break out of compulsive scrolling. It blocks distracting apps across the whole phone, and you unlock them by tapping a physical NFC tag rather than flipping a setting. I built it in Flutter for iPhone and Android while leading a small student team.",
    problem:
      "People already know they scroll too much. The trouble is that most app blockers are one tap away from being switched off, so the moment the itch hits, they give in. The barrier needed to cost something.",
    approach:
      "We paired phone-wide content filtering with a physical key. To open a blocked app you tap an NFC tag, and since the tag can't be cloned, there is no shortcut buried in the settings. We built it once in Flutter so iPhone and Android shipped from one codebase.",
    result:
      "It launched on the App Store and Google Play and has sold 1,425+ units. The hard part was staying alive in the background on phones that aggressively kill apps, which it now does reliably. I led a team of three from the first sketch to release.",
    role: "Founding Engineer & Tech Lead, Freelance",
    tags: ["Flutter", "Dart", "Kotlin/Swift", "Firebase", "NFC"],
    tools: ["Android Studio", "Git", "GitHub Issues", "Kanban"],
    architecture: [
      "MethodChannels for Native Bridges",
      "Agile/Scrum Methodology",
      "Hardware-backed Auth",
    ],
  },
  {
    id: "09",
    title: "GardeFou",
    year: "2026",
    metric: "Prompt-injection lab · red team then blue team",
    type: "AI Security",
    category: "Personal",
    services: "LLM Security - RAG - Python",
    img: `${import.meta.env.BASE_URL}images/optimized/t1-injection-demo.webp`,
    detailImg: `${import.meta.env.BASE_URL}images/optimized/gardefou-hero.webp`,
    url: "https://github.com/Aer-3888/GardeFou",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A security lab built around a deliberately vulnerable AI assistant that answers questions over financial documents. It is a hands-on target for learning how to attack large language model apps and then harden them.",
    problem:
      "LLM apps open a new kind of hole. Because the model reads instructions and data in the same breath, a command hidden inside an ordinary document can quietly take it over. I wanted to see that happen with my own hands rather than just read about it.",
    approach:
      "I built a small retrieval assistant over synthetic financial documents in Python, then attacked my own work in stages. First I red-teamed it to leak data and obey hidden instructions, then I added guardrails as the blue team, and finally I reran every attack to confirm it now fails and mapped each finding to a known security framework.",
    result:
      "The same injections that used to walk straight through are now caught, each one documented with its before and after. It ended up being a repeatable way to show exactly how an LLM app breaks and what actually stops it.",
    role: "Solo Project",
    tags: ["Python", "RAG", "LLM Security", "Prompt Injection", "Chroma", "Ollama"],
    tools: ["FastAPI", "Streamlit", "sentence-transformers"],
    architecture: [
      "Local RAG Pipeline",
      "Red Team / Blue Team",
      "Framework-Mapped Findings",
    ],
  },
  {
    id: "03",
    title: "Plant Detection",
    year: "2025",
    metric: "mAP@50 0.90 · 85.8% recall",
    type: "Computer Vision",
    category: "Personal",
    services: "Computer Vision - Python",
    img: `${import.meta.env.BASE_URL}images/optimized/plant_detection.webp`,
    url: "https://github.com/Aer-3888/Plant_detection",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A computer-vision project that spots plant disease from photos. It puts several image-recognition models side by side, including YOLO and Faster R-CNN, to see which one holds up on real field images rather than clean lab shots.",
    problem:
      "Catching crop disease early is hard to do by eye once you are looking at whole fields. I wanted to know how well off-the-shelf vision models cope with the awkward photos you actually get outdoors, with odd light and cluttered backgrounds.",
    approach:
      "I trained and compared the models on public plant-disease datasets, then pushed their accuracy up by augmenting the training images to imitate those field conditions on purpose.",
    result:
      "Faster R-CNN came out on top, locating diseased areas around 90% of the time (mAP@50 0.90, 85.8% recall). That gave a clear answer on which approach is worth taking out of the notebook and into a real field.",
    role: "Solo Project",
    tags: ["Python", "PyTorch", "EfficientNet", "YOLOv8", "Faster R-CNN", "OpenCV"],
    tools: ["Jupyter Notebook", "Kaggle API"],
    architecture: [
      "Transfer Learning Pipeline",
      "Multi-Model Comparative Analysis",
      "Custom Augmentation",
    ],
  },
  {
    id: "10",
    title: "IAJ Evades",
    year: "2026",
    metric: "DQN",
    type: "Reinforcement Learning",
    category: "Personal",
    services: "Reinforcement Learning - Rust - Neural Networks",
    img: `${import.meta.env.BASE_URL}images/optimized/iaj_evades-gameplay.webp`,
    detailImg: `${import.meta.env.BASE_URL}images/optimized/iaj_evades-gameplay.gif`,
    url: "https://github.com/Aer-3888/iaj_evades",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A reinforcement-learning agent that teaches itself to survive an Evades-style dodging arena. The Deep Q-Network runs in Rust, with a live web dashboard to steer and watch training as it happens.",
    problem:
      "I wanted to see inside the learning process for myself. How a frame of the game turns into a move, how each bit of experience nudges the network, and how the agent slowly gets better at staying alive.",
    approach:
      "I rebuilt the Evades dodging game as a fast Rust engine, then wrote the Deep Q-Network from the parts up, its neural net, replay buffer and training loop. The agent reads the arena through raycast vision and trains headless for speed, all driven from a live dashboard.",
    result:
      "The agent learns to weave through a moving crowd of enemies on its own. Alongside it, a React and WebSockets dashboard lets me start, tune and watch a run, with survival-time and loss charts updating live.",
    role: "Solo Project",
    tags: ["Rust", "Deep Q-Network", "Reinforcement Learning", "Neural Networks", "Rayon", "WebSockets"],
    tools: ["Cargo", "Axum", "React", "Recharts"],
    architecture: [
      "DQN",
      "Headless Parallel Training (Rayon)",
      "Live Dashboard over WebSockets",
    ],
  },
  {
    id: "04",
    title: "Notes INSA",
    year: "2026",
    metric: "Cloudflare Workers + D1 · client-side stats",
    type: "Mobile Development",
    category: "Personal",
    services: "Flutter - Cloudflare Workers - D1 Database",
    img: `${import.meta.env.BASE_URL}images/optimized/notes-insa-collage.webp`,
    url: "https://codeberg.org/AerLight/Notes_insa",
    linkText: "View Source Code",
    logoType: "codeberg",
    offset: -50,
    description:
      "A mobile app for INSA Rennes students that pulls your grades from the school portal and lets a class pool their results anonymously, so everyone can see where they stand.",
    problem:
      "The portal only ever shows you your own grades. There is no way to tell whether a 12 out of 20 sits above or below the class, and students wanted that context without putting anyone's marks on display.",
    approach:
      "We built an app that reads your grades from the portal and pools them with the rest of the class. The averages and rankings are computed on your own phone, so the server never holds anything that could identify a person.",
    result:
      "The result is a live app that tells you, at a glance, how your marks land against the rest of the class, while keeping every submission anonymous.",
    role: "Team of 2",
    tags: ["Flutter", "Cloudflare Workers", "D1 Database", "Riverpod", "SQL"],
    tools: ["Android Studio", "Wrangler", "VS Code", "Git"],
    architecture: [
      "Riverpod (State Management)",
      "Edge Computing (Serverless)",
      "Feature-First Architecture",
    ],
  },
  {
    id: "05",
    title: "Intelligent File Manager",
    year: "2026",
    metric: "Desktop semantic search · SBERT + CLIP",
    type: "AI Desktop App",
    category: "Personal",
    services: "C# / .NET 10 - Avalonia - Semantic Search",
    img: `${import.meta.env.BASE_URL}images/ph-file-manager.svg`, // Placeholder
    url: "#",
    linkText: "Personal Project",
    logoType: "github",
    offset: -30,
    description:
      "A desktop app, built in C# and .NET, that searches your text and image files by meaning instead of exact filenames. Ask for what you remember about a file and it finds it, even pulling up a photo from a written description.",
    problem:
      "Finding a file usually means recalling its exact name or the folder you buried it in. I wanted to search the way you would describe something to a friend, by what it is rather than what it is called.",
    approach:
      "I built the app around models that read what is actually inside your files, so plain-language search works across both text and images. Along the way I compared several text and image models to find the best trade-off between accuracy and speed.",
    result:
      "It finds files by meaning across a folder, and behind it sits a clear comparison of the models I tested to decide which ones earned their place.",
    role: "Solo Project",
    tags: ["C#", ".NET 10", "Avalonia", "SBERT", "CLIP", "Machine Learning"],
    tools: ["Avalonia", "Skia", "JetBrains Rider"],
    architecture: ["Vector Embeddings", "Cross-modal Retrieval", "MVVM Desktop"],
  },
  {
    id: "02",
    title: "SafeWalk",
    year: "2026",
    metric: "Always-on tracking · tamper-proof check-ins",
    type: "Mobile Security",
    category: "Personal",
    services: "Android - Geolocation - Security",
    img: `${import.meta.env.BASE_URL}images/safewalk-collage.png`,
    url: "https://github.com/Aer-3888/SafeWalk",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A native Android safety app for walking alone. It keeps tracking your location even when the phone tries to kill it to save battery, and it signs every check-in so no one can forge one.",
    problem:
      "A safety app is only worth having if it never quietly stops. The catch is that phones are built to shut background apps down the moment they want to save power, which is exactly when you would need it running.",
    approach:
      "I built the tracking as a service the system struggles to kill, so it survives low-power modes and restarts. Each safety message is cryptographically signed, and the app can check you in on its own when it detects a trusted Bluetooth beacon nearby.",
    result:
      "It holds a reliable trail through the exact conditions that usually break these apps, restarts, battery savers and background limits. Reliability was the whole point, so that is where the effort went.",
    role: "Solo Project",
    tags: ["Android Native", "Kotlin", "Cryptography", "BLE", "Foreground Services"],
    tools: ["Android Studio", "Android Keystore API"],
    architecture: [
      "Native Android Architecture",
      "Secure Geolocation",
      "Resilient Background Services",
    ],
  },
  {
    id: "06",
    title: "Accountant Aut",
    year: "2026",
    metric: "~2-3h/week of manual entry, automated",
    type: "Automation Tool",
    category: "Personal",
    services: "C++ - GUI Dashboard - Automation",
    img: `${import.meta.env.BASE_URL}images/optimized/accountant.webp`,
    url: "https://github.com/Aer-3888/accountant_aut",
    linkText: "Closed Source Project",
    isClosedSource: true,
    logoType: "github",
    offset: 0,
    description:
      "A desktop tool that keeps the accounting entries in Google Sheets and Sage 50 in sync, and files each one under the right code on its own. A local AI model steps in for the awkward entries that no simple rule covers.",
    problem:
      "As the accountant of my school's junior enterprise, I retyped entries between Google Sheets and the accounting software by hand every week. It was slow, and one wrong code was enough to throw the books off.",
    approach:
      "I built a small tool that moves entries between the two systems automatically and assigns each one a code. Where a clear rule runs out, a local AI model reads the entry and suggests where it belongs, so I only weigh in on the outliers.",
    result:
      "A few hours of weekly retyping collapsed into a single click, with far fewer slips and a check that flags anything odd before it is saved.",
    role: "Solo Project",
    tags: ["C++", "Qt", "Google API", "OpenXLSX", "Ollama"],
    tools: ["CMake", "Git"],
    architecture: [
      "Modular (Core/Network Architecture)",
      "Logic-Driven Mapping",
      "OAuth2 Authentication",
    ],
  },
  {
    id: "07",
    title: "EDA Housing Market",
    year: "2025",
    metric: "12k records · price/m² +27% post-COVID",
    type: "Data Analysis",
    category: "Personal",
    services: "Exploratory Data Analysis - Python - Data Visualization",
    img: `${import.meta.env.BASE_URL}images/optimized/eda_housing.webp`,
    url: "https://github.com/Aer-3888/EDA_Housing",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A study of ten years of French property sales in the Pays de la Loire region, around 12,000 transactions, asking what COVID actually did to prices across five areas.",
    problem:
      "COVID landed right in the middle of the decade I was looking at, which made it hard to tell the pandemic's real effect on prices apart from trends that were already running.",
    approach:
      "I cleaned the transactions and split them into before, during and after COVID, then mapped the differences area by area so the patterns were something you could see rather than just read in a table.",
    result:
      "Prices per square metre rose 27% after COVID while the number of sales barely moved, and the maps made clear that some areas carried far more of that jump than others.",
    role: "Solo Project",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Folium"],
    tools: ["Jupyter Notebook", "Anaconda"],
    architecture: [
      "Exploratory Data Analysis (EDA)",
      "Period-Based Comparative Analysis",
      "Interactive Choropleth Mapping",
    ],
  },
  {
    id: "08",
    title: "Portfolio",
    year: "2026",
    metric: "Scroll-driven spatial UI",
    type: "Web Development",
    category: "Personal",
    services: "Front End - Animation - React",
    img: `${import.meta.env.BASE_URL}images/optimized/portfolio.webp`,
    url: "https://github.com/Aer-3888/portfolio",
    linkText: "View Source Code",
    logoType: "github",
    offset: 0,
    description:
      "The site you are reading. I treated my own portfolio as a front-end project in its own right, built around scroll-driven motion rather than a plain list of links.",
    problem:
      "Most developer portfolios look identical and just list tools. I wanted mine to show what I can actually build on the front end, not simply claim it.",
    approach:
      "I designed the site so the projects move with your scroll to give a sense of depth, while keeping it quick to load, comfortable on a phone, and calm for anyone who prefers reduced motion.",
    result:
      "A fast, responsive site where the motion carries the story on desktop and gives way to a clean layout on mobile. If it makes you curious how it was built, it is doing its job.",
    role: "Solo Project",
    tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    tools: ["Vite", "VS Code"],
    architecture: [
      "Component-Driven (Atomic Principles)",
      "Feature-First (Modular Page Structure)",
    ],
  },
];
