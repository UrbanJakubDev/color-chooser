import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export interface SessionUser {
  id: string;
  username: string;
  role: string;
}

export interface Session {
  user: SessionUser;
}

// Helper function to get session on server side
export async function getAuthSession() {
  const session = await getServerSession();
  return session as Session | null;
}

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  const session = await getAuthSession();
  return !!session;
}

// Helper function to check if user is admin
export async function isAdmin() {
  const session = await getAuthSession();
  return session?.user?.role === "admin";
}

// Helper function for API routes to check auth
export async function requireAuth(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }
  return { session };
}

// Helper function for API routes to check admin
export async function requireAdmin(request: NextRequest) {
  const authResult = await requireAuth(request);
  if ("error" in authResult) {
    return authResult;
  }

  if (authResult.session?.user?.role !== "admin") {
    return { error: "Forbidden", status: 403 };
  }

  return { session: authResult.session };
}
