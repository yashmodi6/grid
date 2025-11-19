export function KeyboardStatus({ focused, caps, num, shift }: KeyboardStatusProps) {
  const show = focused && (caps || num || shift);
  if (!show) return null;

  return (
    <span className="flex items-baseline gap-1 text-xs text-muted-foreground leading-none">
      <span className="leading-none">&#9432;</span>

      <span className="flex items-baseline gap-1 leading-none">
        {caps && <span className="leading-none">Caps Lock is ON</span>}
        {num && <span className="leading-none">Num Lock is ON</span>}
      </span>
    </span>
  );
}