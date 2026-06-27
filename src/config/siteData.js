export const EMAIL = "theo.phan.quoc.huy@gmail.com";

export const STATUS_ITEMS = [
  {
    label: "Currently",
    value: "CS Student @ INSA Rennes",
    sub: "3rd-year engineering (INFO)",
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
    title: "Engineering Degree",
    org: "INSA Rennes",
    detail:
      "Specializing in Computer Science. Building on the foundations of AI and Data Engineering.",
    tags: ["Architecture", "Algorithms", "AI"],
  },
  {
    date: "12/2025 - Present",
    title: "Freelance Developer",
    org: "Waiki",
    detail:
      "Collaborated on building and optimizing full-stack features and user experiences for client platforms.",
    tags: ["Freelance", "Full-Stack", "Optimization"],
  },
  {
    date: "04/2025 - 06/2025",
    title: "AI Engineer Intern",
    org: "FPT Telecom",
    detail:
      "Developed object detection models (YOLO/PyTorch) to automate identification of anomalies in fiber optic distribution.",
    tags: ["Computer Vision", "Object Detection", "PyTorch"],
  },
  {
    date: "2026",
    title: "Cybersecurity Competitor",
    org: "CTF Tournaments",
    detail:
      "71st/757 worldwide at Midnight Flag CTF 2026. 2nd Place at IUT CTF. Specializing in Cryptography, OSINT, and Network Security.",
    tags: ["Security", "Cryptography", "CTF"],
  },
  {
    date: "12/2025 - Present",
    title: "Accountant",
    org: "Ouest INSA",
    detail:
      "Managing financial oversight and budget tracking. Developed a custom AI solution to automate accounting entries and streamline administrative workflows.",
    tags: ["AI Automation", "Management", "Rigour"],
  },
  {
    date: "2023 - 2025",
    title: "BUT Informatique",
    org: "IUT Nantes",
    detail:
      "Application Development Track. Built full-stack projects: Real Estate Data Analysis (Pandas) and E-commerce platforms.",
    tags: ["Go", "React", "Node.js", "SQL", "Pandas"],
  },
  {
    date: "08/2022",
    title: "Admin Assistant",
    org: "BMW Alphabet",
    detail:
      "Digitization of contracts and resolving formatting inconsistencies. Developed rigor and professional adaptability.",
    tags: ["Organization", "Adaptability"],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "SafeWalk",
    year: "2026",
    metric: "Survives OS kills · HMAC-SHA256",
    type: "Mobile Security",
    category: "Personal",
    services: "Android - Fused Location - Cryptography",
    img: "https://images.unsplash.com/photo-1555861496-faa3a07675f9?q=80&w=2670", // Placeholder
    url: "#",
    linkText: "Security Project",
    logoType: "github",
    offset: 0,
    description:
      "A native Android application focused on continuous user safety through geolocation and cryptographic verification. Features continuous GPS tracking via **Fused Location Provider** within a `START_STICKY` Foreground Service.",
    problem:
      "Needed a resilient mobile safety solution that guarantees location tracking continuity and message integrity even in constrained OS environments.",
    approach:
      "Implemented a background service robust against OS kills, coupled with **HMAC-SHA256** signing via **Android Keystore** for secure message verification and BLE scanning for beacon check-ins.",
    result:
      "A highly resilient safety application with session persistence that survives service restarts, tailored for security-first environments.",
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
    id: "02",
    title: "Waiki",
    year: "2025",
    metric: "Shipped iOS + Android · led team of 3",
    type: "Mobile Development",
    category: "Freelance",
    services: "Flutter - NFC Auth - DNS Filtering",
    img: `${import.meta.env.BASE_URL}images/waiki.png`,
    url: "https://waikiup.com/",
    linkText: "View Project Website",
    logoType: "website",
    offset: 120,
    description:
      "A digital wellness solution designed to combat **social media addiction**. Waiki combines **system-wide DNS filtering** (via a VPN service) and an **AccessibilityService** with a physical hardware barrier, requiring users to scan an **NFC device** (NTAG 424 DNA with AES-128 CMAC) to unlock distracting apps. Developed in an Agile/Scrum environment by leading a team of fellow engineering students.",
    problem:
      "Software blockers are bypassable in seconds. The friction has to be physical, not digital, or people just won't feel it.",
    approach:
      "Paired system-wide DNS filtering and accessibility monitoring with a hardware-backed anti-cloning NFC tag as a physical key via native MethodChannels.",
    result:
      "Shipped on **iOS and Android** with resilient background processes (`START_STICKY`) that survive power-saving modes like MIUI. Led a team of 3 engineering students through the full product cycle.",
    role: "Lead Developer, Freelance",
    tags: ["Flutter", "Dart", "Kotlin/Swift", "Firebase", "NFC"],
    tools: ["Android Studio", "Git", "GitHub Issues", "Kanban"],
    architecture: [
      "MethodChannels for Native Bridges",
      "Agile/Scrum Methodology",
      "Hardware-backed Auth",
    ],
  },
  {
    id: "03",
    title: "Notes INSA",
    year: "2026",
    metric: "Cloudflare Workers + D1 · client-side stats",
    type: "Mobile Development",
    category: "Personal",
    services: "Flutter - Cloudflare Workers - D1 Database",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670",
    url: "https://codeberg.org/AerLight/Notes_insa",
    linkText: "View Source Code",
    logoType: "codeberg",
    offset: -50,
    description:
      "A full-stack mobile solution for INSA Rennes students that replaces legacy systems with a **reactive dashboard**. It features a secure **native Android bridge** for grade retrieval and an **anonymous data-sharing engine** using **Cloudflare Workers** and **D1** to store peer submissions, with all class averages and performance metrics computed client-side to keep the backend logic-free.",
    problem:
      "The school portal only shows your own grades. There was no way to know if a 12/20 was average or the top of the class.",
    approach:
      "Built an anonymous submission system on **Cloudflare Workers + D1** as a thin storage layer, with no computation on the backend. The Flutter app fetches the raw anonymized submissions and computes class stats locally.",
    result:
      "Android app with a **native bridge** that pulls grades directly from the portal and shows real-time class averages and distributions alongside your own results.",
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
    id: "04",
    title: "Intelligent File Manager",
    year: "2025",
    metric: "SBERT vs CLIP comparative study",
    type: "AI Research",
    category: "Research",
    services: "Semantic Search - SBERT - CLIP",
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670", // Placeholder
    url: "#",
    linkText: "Research Project",
    logoType: "github",
    offset: -30,
    description:
      "A conceptual file management system using semantic embeddings to organize and retrieve files. Conducted comparative research studies evaluating **SBERT** and **CLIP** for cross-modal search capabilities, specifically analyzing precision versus latency trade-offs.",
    problem:
      "Traditional file managers rely on strict hierarchical structures and exact keyword matches, making retrieval difficult when exact filenames are forgotten.",
    approach:
      "Explored replacing traditional indexing with vector embeddings, allowing natural language and cross-modal queries to find relevant files based on semantic meaning.",
    result:
      "Produced comprehensive research comparing embedding models, establishing foundational metrics for a future functional prototype.",
    role: "Solo Project",
    tags: ["Python", "SBERT", "CLIP", "Machine Learning"],
    tools: ["Jupyter Notebook", "PyTorch"],
    architecture: ["Vector Embeddings", "Semantic Search", "Cross-modal Retrieval"],
  },
  {
    id: "05",
    title: "Plant Detection",
    year: "2025",
    metric: "mAP@50 0.90 · 85.8% recall",
    type: "Computer Vision",
    category: "Personal",
    services: "Computer Vision - Python",
    img: `${import.meta.env.BASE_URL}images/plant_detection.png`,
    url: "https://github.com/Aer-3888/Plant_detection",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "A full **computer vision pipeline** for plant disease detection, comparing **YOLOv8/v11** and **Faster R-CNN** (ResNet-50 FPN) across classification and detection tasks on the **PlantVillage** and **PlantDoc** datasets.",
    problem:
      "I wanted to see how far off-the-shelf models could get on a real agricultural problem, and which family was actually worth using for detection versus classification.",
    approach:
      "Evaluated YOLOv8/v11 against Faster R-CNN on diverse datasets. Handled complex backgrounds and varying lighting conditions by implementing custom data augmentation pipelines.",
    result:
      "**Faster R-CNN** achieved a **mAP@50 of 0.90** and **85.8% recall** on PlantDoc, demonstrating superior detection performance despite YOLO's speed advantage.",
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
    id: "06",
    title: "Accountant Aut",
    year: "2024",
    metric: "Hours of manual entry → one click",
    type: "Automation Tool",
    category: "Personal",
    services: "C++ - GUI Dashboard - Automation",
    img: `${import.meta.env.BASE_URL}images/accountant.png`,
    url: "https://github.com/Aer-3888/accountant_aut",
    linkText: "Closed Source Project",
    isClosedSource: true,
    logoType: "github",
    offset: 0,
    description:
      "A **C++20** automation tool and interactive **dashboard** designed to synchronize accounting entries between **Google Sheets** and **Sage 50**. It provides a centralized interface for monitoring data flows, validating documentation on Google Drive, and programmatically mapping complex **accounting codes**, leveraging a **local LLM (Ollama)** to handle edge cases in the mapping logic.",
    problem:
      "As the accountant at my school's Junior Enterprise, I was copying entries between **Google Sheets** and **Sage 50** by hand every week. The mapping rules were complex enough that one wrong code could throw off the whole ledger.",
    approach:
      "Built a **C++20 dashboard** (Qt) with a rule-based mapper for the common cases and a **local LLM** to handle the edge cases that didn't fit neatly into any rule.",
    result:
      "The full sync runs automatically now, significantly reducing manual entry errors. What used to take hours is down to a button click, with a validation layer that flags suspicious data.",
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
    metric: "12k records · prices +32% post-COVID",
    type: "Data Analysis",
    category: "Personal",
    services: "Exploratory Data Analysis - Python - Data Visualization",
    img: `${import.meta.env.BASE_URL}images/eda_housing.png`,
    url: "https://github.com/Aer-3888/EDA_Housing",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "An exploratory data analysis of **10 years** of French real estate transactions (**~12,000 records**) in the Pays de la Loire region. The study compares **pre-COVID (2014-2019)**, **COVID (2020-2021)**, and **post-COVID (2022-2023)** periods across five departments.",
    problem:
      "COVID hit right in the middle of a decade of real estate data. It was hard to tell which price movements were the pandemic and which were already in motion.",
    approach:
      "Split transactions from Pays de la Loire into three periods and mapped the patterns using interactive **choropleth visualizations** (Folium) to make spatial differences visible.",
    result:
      "Identified that COVID acted as a price accelerator. Volumes remained stable while average prices **surged 32%**, highlighting distinct regional trends.",
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
    img: `${import.meta.env.BASE_URL}images/portfolio.png`,
    url: "https://github.com/Aer-3888/portfolio",
    linkText: "View Source Code",
    logoType: "github",
    offset: 0,
    description:
      "My personal portfolio website, focused on **animations** and an **immersive user experience** using modern web technologies.",
    problem:
      "Most portfolio sites look the same. I wanted mine to actually show what I can do with frontend, not just list the tools I know.",
    approach:
      "Mapped scroll position to horizontal movement so projects feel like they float toward you. On mobile it falls back to a clean vertical list, and the whole thing respects reduced motion preferences.",
    result:
      "Fully responsive with a spatial tunnel on desktop and a clean card layout on mobile, driven by **Framer Motion** and **Lenis** scroll physics.",
    role: "Solo Project",
    tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    tools: ["Vite", "VS Code"],
    architecture: [
      "Component-Driven (Atomic Principles)",
      "Feature-First (Modular Page Structure)",
    ],
  },
];
