// hooks/useKeyboardStatus.ts
import { useState } from "react";

export function useKeyboardStatus() {
  const [keyboardInfo, setKeyboardInfo] = useState({
    caps: false,
    num: false,
  });

  function handleKeyboardState(e: React.KeyboardEvent<HTMLInputElement>) {
    setKeyboardInfo({
      caps: e.getModifierState("CapsLock"),
      num: e.getModifierState("NumLock"),
    });
  }

  function resetKeyboardState() {
    setKeyboardInfo({ caps: false, num: false });
  }

  return { keyboardInfo, handleKeyboardState, resetKeyboardState };
}