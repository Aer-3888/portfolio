export const STATUS_ITEMS = [
  {
    label: "Currently",
    value: "CS Student @ INSA Rennes",
    sub: "First Year Engineering",
  },
  {
    label: "Focus",
    value: "AI & Full-Stack Systems",
    sub: "Computer Vision • Deep Learning",
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

export const PROJECTS = [
  {
    id: "01",
    title: "Waiki",
    year: "2025",
    type: "Mobile Development",
    category: "Freelance",
    services: "Flutter - DNS Filtering - Mobile Development",
    img: `${import.meta.env.BASE_URL}images/waiki.png`,
    url: "https://waikiup.com/",
    linkText: "View Project Website",
    logoType: "website",
    offset: 0,
    description:
      "A digital wellness solution designed to combat **social media addiction**. Waiki combines **system-wide DNS filtering** with a **physical hardware barrier**, requiring users to scan an **NFC device** to unlock distracting apps. Developed in an Agile/Scrum environment by leading a team of fellow engineering students, utilizing issue-driven development, user stories, and Kanban to manage the product lifecycle.",
    problem:
      "Social media addiction lacks effective solutions. Software-only blockers are too easy to bypass, reducing their impact on user behavior.",
    approach:
      "Combined a **physical NFC hardware barrier** with **system-wide DNS filtering** to make screen time a conscious, deliberate act that requires a physical key.",
    result:
      "Shipped to **iOS and Android** with persistent background services that survive power-saving modes. Led a **team of 4 engineers** using Agile/Scrum.",
    role: "Lead Developer, Freelance",
    tags: ["Flutter", "Dart", "Firebase", "Sqlite"],
    tools: ["Android Studio", "Git", "GitHub Issues", "Kanban"],
    architecture: [
      "MVVM (Model-View-ViewModel)",
      "Agile/Scrum Methodology",
      "Issue-Driven Development",
    ],
  },
  {
    id: "02",
    title: "Portfolio",
    year: "2026",
    type: "Web Development",
    category: "Personal",
    services: "Front End - Animation - React",
    img: `${import.meta.env.BASE_URL}images/portfolio.png`,
    url: "https://github.com/Aer-3888/portfolio",
    linkText: "View Source Code",
    logoType: "github",
    offset: 120,
    description:
      "My personal portfolio website, focused on **animations** and an **immersive user experience** using modern web technologies.",
    problem:
      "Standard portfolio templates fail to demonstrate frontend engineering skills. The portfolio itself should be the proof of capability.",
    approach:
      "Mapped **vertical scroll to horizontal movement** to create a tunnel effect where projects float toward the viewer. Each animation gracefully degrades for users who prefer reduced motion.",
    result:
      "A fully responsive portfolio with a unique spatial navigation on desktop and a clean vertical layout on mobile, all driven by **Framer Motion** and **Lenis** scroll physics.",
    role: "Solo Project",
    tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    tools: ["Vite", "VS Code"],
    architecture: [
      "Component-Driven (Atomic Principles)",
      "Feature-First (Modular Page Structure)",
    ],
  },
  {
    id: "03",
    title: "Plant Detection",
    year: "2025",
    type: "Computer Vision",
    category: "Personal",
    services: "Computer Vision - Python",
    img: `${import.meta.env.BASE_URL}images/plant_detection.png`,
    url: "https://github.com/Aer-3888/Plant_detection",
    linkText: "View Repository",
    logoType: "github",
    offset: -50,
    description:
      "A full **computer vision pipeline** for plant disease detection, comparing **EfficientNet B7**, **YOLOv8/v11**, and **Faster R-CNN** (ResNet-50 FPN) across classification and detection tasks on the **PlantVillage** and **PlantDoc** datasets.",
    problem:
      "Manual plant disease identification is slow and error-prone. Automated detection could help farmers respond faster to crop threats.",
    approach:
      "Compared three model families (**EfficientNet**, **YOLOv8/v11**, **Faster R-CNN**) across classification and detection tasks, tackling challenges like background class offsets and input resolution optimization.",
    result:
      "**Faster R-CNN** achieved **mAP@50 of 0.90** and **85.8% recall** on PlantDoc, outperforming YOLO variants on the detection benchmark.",
    role: "Team of 2",
    tags: ["Python", "PyTorch", "EfficientNet", "YOLOv8", "Faster R-CNN", "ResNet-50", "scikit-learn"],
    tools: ["Jupyter Notebook", "Kaggle API"],
    architecture: ["Transfer Learning Pipeline", "Multi-Model Comparative Analysis"],
  },
  {
    id: "04",
    title: "Notes INSA",
    year: "2026",
    type: "Mobile Development",
    category: "Personal",
    services: "Flutter - Cloudflare Workers - D1 Database",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670",
    url: "https://codeberg.org/AerLight/Notes_insa",
    linkText: "View Source Code",
    logoType: "codeberg",
    offset: -30,
    description:
      "A full-stack mobile solution for INSA Rennes students that replaces legacy systems with a **reactive dashboard**. It features a secure **native Android bridge** for grade retrieval and an **anonymous data-sharing engine** using **Cloudflare Workers** and **D1** to calculate class averages and performance metrics without compromising **student privacy**.",
    problem:
      "INSA students had no way to see **class averages** or compare performance. The legacy system only showed individual grades with no context.",
    approach:
      "Built a **privacy-first analytics engine** on **Cloudflare Workers + D1** that collects anonymous data at the edge and computes class-wide metrics without storing identifiable information.",
    result:
      "Deployed to Android with a **native bridge** for grade retrieval, providing students with class averages and performance distributions in real-time.",
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
    title: "EDA Housing",
    year: "2025",
    type: "Data Analysis",
    category: "Personal",
    services: "Exploratory Data Analysis - Python - Data Visualization",
    img: `${import.meta.env.BASE_URL}images/eda_housing.png`,
    url: "https://github.com/Aer-3888/EDA_Housing",
    linkText: "View Repository",
    logoType: "github",
    offset: 0,
    description:
      "An exploratory data analysis of **10 years** of French real estate transactions (**~12,000 records**) in the Pays de la Loire region. The study compares **pre-COVID (2014-2019)**, **COVID (2020-2021)**, and **post-COVID (2022-2023)** periods across five departments, revealing a **~32% surge** in average prices and price per m², with transaction volume remaining stable at ~1,200 annually.",
    problem:
      "Understanding how COVID impacted regional French real estate required isolating pandemic effects from long-term price trends across diverse departments.",
    approach:
      "Segmented **~12,000 transactions** into pre-COVID, COVID, and post-COVID periods across five departments, using **choropleth mapping** and statistical analysis to reveal spatial and temporal patterns.",
    result:
      "Identified COVID as a **price accelerator** (not disruptor): transaction volumes held steady while prices **surged 32%**, with significant inter-departmental variance.",
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
    id: "06",
    title: "Accountant Aut",
    year: "2024",
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
      "A **C++20** automation tool and interactive **dashboard** designed to synchronize accounting entries between **Google Sheets** and **Sage 50**. It provides a centralized interface for monitoring data flows, validating documentation on Google Drive, and programmatically mapping complex **accounting codes**, leveraging a **local LLM** to handle edge cases in the mapping logic.",
    problem:
      "Manual accounting entry transfer between **Google Sheets** and **Sage 50** was error-prone and time-consuming, with complex code mapping rules defined by a professional Quality Manual.",
    approach:
      "Built a **C++20 dashboard** with a rule-based mapping engine augmented by a **local LLM** for edge cases, providing real-time monitoring of data flows and document validation.",
    result:
      "Automated the full sync pipeline between cloud spreadsheets and legacy accounting software, eliminating manual entry errors.",
    role: "Solo Project",
    tags: ["C++", "Qt", "Google API", "OpenXLSX", "Ollama"],
    tools: ["CMake", "Git"],
    architecture: [
      "Modular (Core/Network Architecture)",
      "Logic-Driven Mapping",
      "OAuth2 Authentication",
    ],
  },
];
