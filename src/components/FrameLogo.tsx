interface FrameLogoProps {
  className?: string;
  dark?: boolean;
  size?: number;
}

export default function FrameLogo({ className = '', dark = false, size = 28 }: FrameLogoProps) {
  const letterColor = dark ? '#F7F5F0' : '#111111';
  const barGap = size * 0.16;
  const barH = size * 0.14;
  return (
    <span className={`inline-flex items-end select-none ${className}`} aria-label="FRAME">
      <span
        className="font-display font-medium leading-none"
        style={{ color: letterColor, fontSize: size, letterSpacing: size * 0.14 }}
      >
        FRAM
      </span>
      <span
        className="inline-flex flex-col justify-between"
        style={{ height: size * 0.72, gap: barGap, marginLeft: size * 0.06, marginBottom: size * 0.02 }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: size * 0.5, height: barH, background: '#D62828', display: 'block' }} />
        ))}
      </span>
    </span>
  );
}
