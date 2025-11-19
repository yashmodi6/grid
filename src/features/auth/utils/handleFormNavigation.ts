export function handleFormNavigation(
  e: React.KeyboardEvent<HTMLFormElement>,
  submitForm: () => void
) {
  const keys = ["Enter", "ArrowDown", "ArrowUp"];
  if (!keys.includes(e.key)) return;

  const form = e.currentTarget;

  // Precisely typed: HTMLInputElement | HTMLButtonElement
  const inputs = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
      "input:not([type=hidden]), button[type='submit']"
    )
  );

  const current = e.target as HTMLElement;

  // Find index safely (avoids any)
  const index = inputs.findIndex((el) => el === current);

  // Prevent unwanted browser submit
  if (e.key !== "Enter" || current.tagName !== "BUTTON") {
    e.preventDefault();
  }

  // ---- Enter / ArrowDown ----
  if (e.key === "Enter" || e.key === "ArrowDown") {
    // Enter on password → submit
    if (current.id === "password" && e.key === "Enter") {
      submitForm();
      return;
    }

    // Enter on submit button → submit
    if (current.tagName === "BUTTON" && e.key === "Enter") {
      submitForm();
      return;
    }

    // Move to next focusable element
    const next = inputs[index + 1];
    if (next) {
      next.focus();
      return;
    }
  }

  // ---- ArrowUp ----
  if (e.key === "ArrowUp") {
    const prev = inputs[index - 1];
    if (prev) {
      prev.focus();
      return;
    }
  }
}
