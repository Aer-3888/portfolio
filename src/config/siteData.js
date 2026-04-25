export const EMAIL = "theo.phan.quoc.huy@gmail.com";

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
      "Software blockers are bypassable in seconds. The friction has to be physical, not digital, or people just won't feel it.",
    approach:
      "Paired **system-wide DNS filtering** with an NFC tag as a physical key. No tap, no access, it forces a moment of intention before you open Instagram.",
    result:
      "Shipped on **iOS and Android** with background services that survive power-saving modes. Led a team of 2 other engineer students through the full product cycle using Scrum.",
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
      "I wanted to see how far off-the-shelf models could get on a real agricultural problem, and which family was actually worth using for detection versus classification.",
    approach:
      "Ran **EfficientNet**, **YOLOv8/v11**, and **Faster R-CNN** against the same datasets and compared them honestly, including the messy parts like background class offsets and resolution tuning.",
    result:
      "**Faster R-CNN** came out ahead with **mAP@50 of 0.90** and **85.8% recall** on PlantDoc. YOLO was faster but couldn't match it on the detection benchmark.",
    role: "Solo Project",
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
      "The school portal only shows your own grades. There was no way to know if a 12/20 was average or the top of the class.",
    approach:
      "Built an anonymous submission system on **Cloudflare Workers + D1** at the edge, so grades get aggregated into class stats without anyone's identity being stored.",
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
      "COVID hit right in the middle of a decade of real estate data. It was hard to tell which price movements were the pandemic and which were already in motion.",
    approach:
      "Split **~12,000 transactions** from Pays de la Loire into three periods across five departments and mapped the patterns with **choropleth visualizations** to make the spatial differences visible.",
    result:
      "COVID turned out to be a price accelerator, not a disruptor. Volumes barely moved while average prices **surged 32%**, with big differences between departments.",
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
      "As the accountant at my school's Junior Enterprise, I was copying entries between **Google Sheets** and **Sage 50** by hand every week. The mapping rules were complex enough that one wrong code could throw off the whole ledger.",
    approach:
      "Built a **C++20 dashboard** with a rule-based mapper for the common cases and a **local LLM** to handle the edge cases that didn't fit neatly into any rule.",
    result:
      "The full sync runs automatically now. What used to take hours of careful manual entry is down to a button click, with a validation layer that flags anything suspicious.",
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
