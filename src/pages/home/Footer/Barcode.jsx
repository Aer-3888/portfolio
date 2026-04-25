const BAR_WIDTHS = [3, 8, 3, 3, 8, 3, 8, 3, 8, 3, 3, 8, 3, 8, 3, 3, 8, 3, 8, 3, 3, 8, 3];

export default function Barcode() {
  return (
    <div className="flex items-end gap-[2px] h-8 opacity-40 select-none" aria-hidden="true">
      {BAR_WIDTHS.map((width, i) => (
        <div
          key={i}
          className="bg-white shrink-0"
          style={{ width: `${width}px`, height: "100%" }}
        />
      ))}
    </div>
  );
}
