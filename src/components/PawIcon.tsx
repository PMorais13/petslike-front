interface PawIconProps {
  className?: string;
  filled?: boolean;
}

export function PawIcon({ className = "w-5 h-5", filled = false }: PawIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 2}
    >
      {/* Almofada principal */}
      <ellipse cx="12" cy="16" rx="4" ry="3" />
      
      {/* Dedos */}
      <ellipse cx="8" cy="10" rx="1.8" ry="2.5" />
      <ellipse cx="16" cy="10" rx="1.8" ry="2.5" />
      <ellipse cx="10" cy="8" rx="1.5" ry="2" />
      <ellipse cx="14" cy="8" rx="1.5" ry="2" />
    </svg>
  );
}