export const passwordRequirements = [
  { regex: /.{12,}/, text: "At least 12 characters" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[0-9]/, text: "At least 1 number" },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?]/,
    text: "At least 1 special character",
  },
];

export function getPasswordStrength(password: string) {
  const requirements = passwordRequirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }));

  const score = requirements.filter((r) => r.met).length;

  const barColor =
    score === 0
      ? "bg-border"
      : score <= 1
        ? "bg-red-500"
        : score <= 2
          ? "bg-orange-500"
          : score <= 3
            ? "bg-amber-500"
            : score === 4
              ? "bg-yellow-400"
              : "bg-green-500";

  const label =
    score === 0
      ? "Enter a password"
      : score <= 2
        ? "Weak password"
        : score <= 3
          ? "Medium password"
          : score === 4
            ? "Strong password"
            : "Very strong password";

  return {
    score,
    requirements,
    barColor,
    label,
  };
}
