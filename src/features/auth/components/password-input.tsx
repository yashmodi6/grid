"use client";

import {useState} from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {Eye, EyeOff} from "lucide-react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showToggle?: boolean;
};

export function PasswordInput({
  id,
  placeholder = "••••••••",
  showToggle = true,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...rest}
      />

      {showToggle && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label="Toggle password visibility">
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
