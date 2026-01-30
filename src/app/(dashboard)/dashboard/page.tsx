import { getAuthenticatedUserUseCase } from "@/entities/user/server/user-server";
import Image from "next/image";

export default async function Page() {
  const user = await getAuthenticatedUserUseCase();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-muted-foreground">
            Logged in as {user.name} ({user.email})
          </span>
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <p className="text-muted-foreground italic">Metric 1</p>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <p className="text-muted-foreground italic">Metric 2</p>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <p className="text-muted-foreground italic">Metric 3</p>
        </div>
      </div>

      <div className="bg-muted/50 min-h-[400px] flex-1 rounded-xl md:min-h-min p-6">
        <h2 className="text-xl font-semibold mb-4">Secure Data Access Layer Demo</h2>
        <p className="text-muted-foreground mb-4">
          This dashboard uses a multi-layered security approach:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><strong>DAL:</strong> Low-level database queries filtered by ID/Email.</li>
          <li><strong>DTO:</strong> Data transfer objects ensure only safe fields are exposed.</li>
          <li><strong>Use Cases / Policy:</strong> Wrappers that enforce authentication and business rules before data retrieval.</li>
        </ul>
      </div>
    </div>
  );
}
