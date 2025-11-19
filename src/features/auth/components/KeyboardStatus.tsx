interface KeyboardStatusProps {
  focused: boolean;
  caps: boolean;
  num: boolean;
}

export function KeyboardStatus({ focused, caps, num }: KeyboardStatusProps) {
  const show = focused && (caps || num);
  if (!show) return null;

  return (
    <span className="flex items-baseline gap-1 text-xs leading-none text-yellow-600 dark:text-amber-500">
      <span className="text-sm leading-none">&#9432;</span>

      <span className="flex items-baseline gap-1 leading-none">
        {caps && <span className="leading-none">Caps Lock is On</span>}
        {num && <span className="leading-none">Num Lock is On</span>}
      </span>
    </span>
  );
}
