import Link from "next/link";
import {GalleryVerticalEnd} from "lucide-react";
import {SignUpForm} from "@/features/auth";
import {requireUnAuth} from "@/shared/lib/auth/auth-utils";

export default async function LoginPage() {
  await requireUnAuth();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* Header */}
      <div className="mb-6 flex justify-center gap-2">
        <Link href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Grid
        </Link>
      </div>

      {/* Form */}
      <div className="w-full max-w-[350px]">
        <SignUpForm />
      </div>
    </div>
  );
}
