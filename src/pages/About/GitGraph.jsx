const gitHistory = [
  {
    hash: "HEAD",
    date: "2025 - Present",
    type: "feat",
    scope: "education",
    subject: "Engineering degree at INSA Rennes",
    detail:
      "Specializing in Computer Science. Building on the foundations of AI and Data Engineering.",
    tags: ["Architecture", "Algorithms", "AI"],
  },
  {
    hash: "fpt01",
    date: "04/2025 - 06/2025",
    type: "feat",
    scope: "internship",
    subject: "AI Engineer Intern – Computer Vision",
    detail:
      "Hanoi, Vietnam. Developed object detection models (YOLO/PyTorch) to automate the identification of defects and cabling anomalies in fiber optic distribution boxes.",
    tags: ["Computer Vision", "Object Detection", "PyTorch", "FPT Telecom"],
  },
  {
    hash: "but23",
    date: "2023 - 2025",
    type: "merge",
    scope: "education",
    subject: "BUT informatique at IUT Nantes",
    detail:
      "Application Development Track. Built full-stack projects: Real Estate Data Analysis (Pandas), Connect 4 (Go/Sockets), and E-commerce sites.",
    tags: ["Go", "React", "Node.js", "SQL", "Pandas"],
  },
  {
    hash: "bmw22",
    date: "08/2022",
    type: "fix",
    scope: "experience",
    subject: "Admin assistant at BMW Alphabet",
    detail:
      "Digitization of contracts and resolving formatting inconsistencies. Developed rigor and adaptability.",
    tags: ["Organization", "Adaptability"],
  },
  {
    hash: "bac20",
    date: "2020 - 2023",
    type: "init",
    scope: "education",
    subject: "Baccalauréat général",
    detail: "Lycée Guy Moquet. Specialized in Mathematics and Physics.",
    tags: ["Maths", "Physics", "Logic"],
  },
  {
    hash: "root",
    date: "2005",
    type: "init",
    scope: "life",
    subject: "System initialization",
    detail: "Hello World. User instance created successfully.",
    tags: ["Human", "v1.0.0"],
  },
];

export default function GitGraph() {
  return (
    <div className="w-full p-6 md:p-10 font-mono text-sm">
      <div className="flex flex-col gap-8">
        {gitHistory.map((commit, i) => (
          <div key={commit.hash} className="relative pl-8 md:pl-12 group">
            {/* Vertical Git Line */}
            {i !== gitHistory.length - 1 && (
              <div className="absolute left-[5px] md:left-[11px] top-2 bottom-[-32px] w-[2px] bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />
            )}

            {/* Commit Node */}
            <div
              className={`absolute left-0 top-1.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-neutral-900 z-10 
                ${
                  commit.type === "feat"
                    ? "bg-green-500"
                    : commit.type === "fix"
                      ? "bg-orange-500"
                      : commit.type === "init"
                        ? "bg-white"
                        : "bg-blue-500"
                }`}
            />

            {/* Commit Header */}
            <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
              <span className="text-orange-500 opacity-70 text-xs">{commit.hash}</span>
              <span className="text-neutral-500 text-xs">[{commit.date}]</span>

              <span
                className={`font-bold ${
                  commit.type === "feat"
                    ? "text-green-400"
                    : commit.type === "fix"
                      ? "text-orange-400"
                      : commit.type === "init"
                        ? "text-white"
                        : "text-blue-400"
                }`}
              >
                {commit.type}({commit.scope}):
              </span>

              <span className="text-white font-bold">{commit.subject}</span>
            </div>

            {/* Commit Details */}
            <p className="text-neutral-400 mb-3 max-w-xl leading-relaxed">{commit.detail}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {commit.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-neutral-800 text-neutral-300 text-[10px] rounded border border-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="pl-12 text-neutral-600 text-xs italic mt-8">-- End of log --</div>
      </div>
    </div>
  );
}
