export default function Barcode() {
  return (
    <div className="flex items-end gap-1 h-16 opacity-50 select-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="bg-neutral-900"
          style={{
            width: Math.random() > 0.5 ? "4px" : "12px",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}
