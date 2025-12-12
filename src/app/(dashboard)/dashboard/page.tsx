"use client";

import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const {data: session, isPending: loading} = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      toast.error("You are not logged in");
      router.push("/login");
    }
  }, [loading, session, router]);

  // While loading, render nothing
  if (loading) return null;

  // If redirecting, render nothing
  if (!session) return null;

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 px-6 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {session.user?.name ?? "User"} 👋</p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {/* FULL RAW SESSION DATA ONLY */}
        <Card>
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-auto rounded-md p-4 text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* SIGN OUT BUTTON */}
        <div className="flex justify-center pt-4">
          <Button size="lg" variant="destructive" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
