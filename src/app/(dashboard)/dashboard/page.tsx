import { requireAuth } from "@/shared/lib/auth/auth-utils";

export default async function Page() {
  await requireAuth();

  return (
    <>
      {" "}
      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>

        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
