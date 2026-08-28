type JewelHireBrandProps = {
  className?: string;
};

export default function JewelHireBrand({
  className = "",
}: JewelHireBrandProps) {
  return (
    <span
      className={`jewelhire-brand${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <span className="jewelhire-brand-mark">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M5.25 9.15 8.3 5.35h7.4l3.05 3.8-6.75 9.1-6.75-9.1Z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.25 9.15h13.5M12 9.15l-3.7-3.8M12 9.15l3.7-3.8"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <strong>JewelHire</strong>
    </span>
  );
}
