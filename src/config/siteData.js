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
  { label: "About", path: "/about" },
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
    insight:
      "Using a **physical hardware barrier** as the only key to a **software lock** — making screen time a conscious, deliberate act.",
    challenge:
      "Developing a reliable **background NFC service** and system-wide DNS filtering that persists across iOS and Android **power-saving modes**.",
    tags: ["Flutter", "Dart", "DNS Filtering", "Firebase", "Sqlite"],
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
    insight:
      "Creating a **tunnel** navigation using **vertical-to-horizontal scroll mapping**.",
    challenge:
      "Adapting the **horizontal scroll tunnel** to fully **responsive layouts** while keeping **scroll-driven animations** smooth and consistent across devices.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    tools: ["Vite", "VS Code", "Lenis Scroll"],
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
    url: "https://github.com/Aer-3888/plant-detection",
    linkText: "View Repository",
    logoType: "github",
    offset: -50,
    description:
      "An object detection system trained on **PlantDoc** and **PlantVillage** datasets to identify plant species and diseases **in real-time**. Features comparative performance analysis between **YOLO** and **Faster R-CNN** using a **ResNet-50** backbone.",
    insight: "Comparative study of **real-time detection speed** vs. **classification accuracy**.",
    challenge:
      "Training a custom **YOLOv8** model on a diverse dataset with significant **class imbalance** and varying lighting conditions.",
    tags: ["Python", "PyTorch", "OpenCV"],
    tools: ["Jupyter Notebook", "Anaconda"],
    architecture: [
      "YOLO (You Only Look Once)",
      "Faster R-CNN (Region-based CNN)",
      "ResNet-50 (Residual Backbone)",
    ],
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
    insight:
      "Building a **privacy-first** community analytics engine to provide missing academic context like **class averages** and distributions.",
    challenge:
      "Ensuring **student privacy** while collecting enough anonymous data to calculate accurate **class-wide metrics at the edge**.",
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
      "An exploratory data analysis of **10 years** of French real estate transactions (**~12,000 records**) in the Pays de la Loire region. The study compares **pre-COVID (2014–2019)**, **COVID (2020–2021)**, and **post-COVID (2022–2023)** periods across five departments, revealing a **~32% surge** in average prices and price per m², with transaction volume remaining stable at ~1,200 annually.",
    insight:
      "COVID acted as a **price accelerator** rather than a market disruptor — transaction volumes held steady while prices **surged 32%** over the decade.",
    challenge:
      "Isolating the **COVID signal** from long-term price trends in a regional dataset with significant **inter-departmental variance**.",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Folium"],
    tools: ["Jupyter Notebook", "Anaconda", "data.gouv.fr"],
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
    insight:
      "Providing a **high-visibility dashboard** to monitor and manage the bridge between **cloud spreadsheets** and **legacy accounting software**.",
    challenge:
      "Developing a robust engine to handle complex **accounting code mapping** and entry validation as defined by the professional **Quality Manual**.",
    tags: ["C++", "Qt", "Google API", "OpenXLSX", "Local LLM"],
    tools: ["CMake", "Git", "OpenXLSX"],
    architecture: [
      "Modular (Core/Network Architecture)",
      "Logic-Driven Mapping",
      "OAuth2 Authentication",
    ],
  },
];
