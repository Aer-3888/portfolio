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
    value: "Summer Internship 2026",
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
    imageCredit: "Fun fact: I took this photo myself",
    url: "https://waikiup.com/",
    linkText: "View Project Website",
    logoType: "website",
    offset: 120,
    description:
      "A mobile app that helps people break **social-media addiction**. It blocks distracting apps across the whole phone and only unlocks them when you tap a small **NFC tag**, a physical key that can't be copied, so the barrier feels real instead of a setting you can switch off. Built in **Flutter** for iPhone and Android while leading a small student team.",
    problem:
      "People know they scroll too much, but app blockers are too easy to switch off. The barrier had to feel real, not just a setting you can tap away.",
    approach:
      "We paired phone-wide content filtering with a physical key: to unlock a distracting app, you tap a small **NFC tag** with your phone. The tag can't be copied, so the friction is genuine. Built once in **Flutter** for both iPhone and Android.",
    result:
      "Launched on the **App Store and Google Play**, now live with **1,425+ units sold**. The app keeps running reliably in the background, even on phones that aggressively close apps. I led a team of 3 from first idea to release.",
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
    img: `${import.meta.env.BASE_URL}images/ph-gardefou.svg`, // Placeholder
    url: "https://github.com/Aer-3888/GardeFou",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "An **AI security** lab built around a deliberately vulnerable **RAG** assistant that answers questions over financial documents. It is a hands-on target for learning how to attack large language model apps and then harden them, because with an LLM the prompt is also the data.",
    problem:
      "LLM apps have a new attack surface. The prompt is also the data, so a malicious instruction hidden inside a document can quietly hijack the model. I wanted to study that hands-on instead of just reading about it.",
    approach:
      "Built a small **RAG** Q&A assistant over synthetic financial documents in **Python**, then worked it in phases. First red team it to leak data and follow hidden instructions, then blue team it with guardrails, and finally measure that the same attacks now fail and map each finding to industry frameworks.",
    result:
      "A working lab that demonstrates real prompt-injection attacks and the guardrails that stop them, with before and after evidence for each finding. A clear, repeatable way to show how LLM apps break and how to defend them.",
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
      "An **AI computer-vision** project that detects plant disease from photos. It compares several leading image-recognition models (including YOLO and Faster R-CNN) to find which performs best on real, messy field images.",
    problem:
      "Spotting crop disease early is hard to do by eye at scale. I wanted to know how well today's ready-made AI vision models cope with messy, real-world photos of plants.",
    approach:
      "Trained and compared several leading image-recognition models on public plant-disease datasets, then improved their accuracy by varying the training images to mimic real conditions like odd lighting and busy backgrounds.",
    result:
      "The strongest model (**Faster R-CNN**) correctly located diseased areas around **90% of the time** (mAP@50 0.90, 85.8% recall), showing which approach is genuinely worth using in the field.",
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
    metric: "Hand-written DQN in Rust · no ML framework",
    type: "Reinforcement Learning",
    category: "Personal",
    services: "Reinforcement Learning - Rust - Neural Networks",
    img: `${import.meta.env.BASE_URL}images/optimized/iaj_evades.webp`,
    url: "https://github.com/Aer-3888/iaj_evades",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A **reinforcement-learning** agent that teaches itself to survive an Evades-style dodging arena. The neural network and **Deep Q-Network** training loop are hand-written in **Rust** with no ML framework, alongside a live web dashboard to control and watch training in real time.",
    problem:
      "Most reinforcement-learning projects lean on a big ML framework that hides how the learning actually works. I wanted to build the whole thing from scratch to genuinely understand it, the game, the neural network, and the training loop.",
    approach:
      "Reimplemented the **Evades** dodging game as a fast **Rust** engine, then wrote a **Deep Q-Network** agent by hand, neural net, replay buffer and training loop included. The agent sees the arena through raycast vision and trains in a headless mode for speed, all driven from a live web dashboard.",
    result:
      "A trained agent that dodges a moving arena of enemies on its own, plus a real-time dashboard (React and WebSockets) to start, tune and watch training, with survival-time and loss charts updating live.",
    role: "Solo Project",
    tags: ["Rust", "Deep Q-Network", "Reinforcement Learning", "Neural Networks", "Rayon", "WebSockets"],
    tools: ["Cargo", "Axum", "React", "Recharts"],
    architecture: [
      "Hand-written DQN (No ML Framework)",
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
    img: `${import.meta.env.BASE_URL}images/ph-notes-insa.svg`, // Placeholder
    url: "https://codeberg.org/AerLight/Notes_insa",
    linkText: "View Source Code",
    logoType: "codeberg",
    offset: -50,
    description:
      "A mobile app for INSA Rennes students that pulls your grades from the school portal and lets the class pool their results **anonymously**, so you can see where you stand. The rankings are worked out on your own phone, so the server never stores anything personal.",
    problem:
      "The school portal only shows your own grades, so there's no way to tell whether a 12/20 is below or above the class. Students wanted that context without exposing anyone's marks.",
    approach:
      "Built a mobile app that pulls your grades from the portal and lets students anonymously pool their results. The class averages and rankings are worked out **on your own phone**, so the server never holds anything identifiable.",
    result:
      "A live app that shows, in real time, how your results compare to the rest of the class, while keeping every submission anonymous.",
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
      "A **desktop app** (built in C# / .NET) that lets you search your text and image files by meaning instead of exact filenames, the way you would describe them to a person. Backed by a comparison of several AI models to find the best mix of accuracy and speed.",
    problem:
      "Finding a file usually means remembering its exact name or which folder you buried it in. I wanted to search by meaning instead, the way you'd describe it to a person.",
    approach:
      "Built a **desktop app** (C# / .NET) that understands what's inside your text and image files, so you can search with plain descriptions. I compared several AI text and image models to find the best balance of accuracy and speed.",
    result:
      "A working desktop app that finds files by meaning, including pulling up images from a text description, backed by a clear comparison of which AI models work best for the task.",
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
    img: `${import.meta.env.BASE_URL}images/ph-safewalk.svg`, // Placeholder
    url: "https://github.com/Aer-3888/SafeWalk",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A native **Android** safety app that keeps tracking your location reliably, even when the phone tries to shut it down to save battery, and protects every safety message so it can't be tampered with.",
    problem:
      "If something happens while you're walking alone, a safety app is only useful if it never silently stops tracking you. Phones love to shut background apps down to save battery.",
    approach:
      "Built an **Android** app whose location tracking keeps running even when the system tries to close it, and that signs every safety message so it can't be tampered with. It can also check you in automatically near trusted **Bluetooth beacons**.",
    result:
      "A dependable safety companion that keeps tracking through restarts and low-power modes, with tamper-proof check-ins. Built for situations where reliability genuinely matters.",
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
    year: "2024",
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
      "A desktop tool that automatically syncs accounting entries between **Google Sheets** and the **Sage 50** accounting software, and matches each entry to the right code. A **local AI model** handles the tricky cases that don't fit a simple rule.",
    problem:
      "As treasurer of my school's junior enterprise, I re-typed accounting entries between **Google Sheets** and the accounting software by hand every week. It was slow, and a single wrong code could throw off the books.",
    approach:
      "Built a small desktop tool that syncs the two systems automatically and matches each entry to the right accounting code. For the tricky cases that don't fit a clear rule, a **local AI model** suggests the right one.",
    result:
      "What used to take a few hours a week is now a single click, with far fewer mistakes and a safety check that flags anything suspicious before it's saved.",
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
      "A data analysis of **10 years** of French real estate sales (**~12,000 records**) in the Pays de la Loire region, comparing prices before, during and after COVID across five areas.",
    problem:
      "COVID landed in the middle of a decade of housing data, making it hard to separate the pandemic's real effect on prices from trends that were already underway.",
    approach:
      "Cleaned and analysed about **12,000** property transactions across a French region, split into before, during and after COVID, then mapped the differences area by area on interactive maps.",
    result:
      "Found that prices per square metre **rose 27%** after COVID while the number of sales stayed steady, with clear differences between areas shown on the maps.",
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
      "My personal portfolio website, focused on **animations** and an **immersive user experience** using modern web technologies.",
    problem:
      "Most developer portfolios look the same and just list tools. I wanted mine to actually demonstrate what I can build on the front end.",
    approach:
      "Designed the site so projects move with your scroll for a sense of depth, while staying fast and fully usable on phones, and respecting accessibility settings for people who prefer less motion.",
    result:
      "A fast, responsive site with smooth motion on desktop and a clean layout on mobile, built to stand as a project in its own right.",
    role: "Solo Project",
    tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    tools: ["Vite", "VS Code"],
    architecture: [
      "Component-Driven (Atomic Principles)",
      "Feature-First (Modular Page Structure)",
    ],
  },
];
