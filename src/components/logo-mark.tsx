export function WaveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 26"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 22.5C6.2 9.5 10.4 9.5 13.6 22.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M13.6 22.5C15.9 16.8 18.9 16.8 21.2 22.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M21.2 22.5C24.4 9.5 28.6 9.5 31.8 22.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}