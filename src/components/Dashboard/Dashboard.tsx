// dashboard

"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {session.user?.email}</p>
      {/* <p>Role: {session.user?.role || "N/A"}</p> */}
    </div>
  );
}
