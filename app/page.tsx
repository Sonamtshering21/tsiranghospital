import { authOptions } from "@/components/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Get the session on the server side
  const session = await getServerSession(authOptions);

  // Redirect to the dashboard if a session exists
  if (session) {
    redirect("/dashboard");
  } else {
    // Redirect to the home page if no session exists
    redirect("/home");
  }

  // Optionally, you can return null here if redirecting immediately
  return null;
}
