import { useNavigate } from "react-router-dom";

export default function HomeButton({ className = "", label = null, onClick }) {
  const navigate = useNavigate();
  const handle = onClick ?? (() => navigate("/"));

  const defaultClass =
    "flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/10 transition-colors cursor-pointer mix-blend-difference";

  return (
    <button type="button" onClick={handle} className={`${defaultClass} ${className}`}>
      {label ? (
        label
      ) : (
        <>
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">Home</span>
        </>
      )}
    </button>
  );
}
