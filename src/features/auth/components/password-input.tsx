"use client";

import {useState} from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {Eye, EyeOff} from "lucide-react";

export function PasswordInput({
  id,
  placeholder = "••••••••",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...rest}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility">
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
