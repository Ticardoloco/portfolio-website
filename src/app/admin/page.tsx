import React, { Suspense } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminDashboardPage from "@/screen/admin";

function AdminFallback() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-44 animate-pulse rounded bg-white/10" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-white/10 bg-ink-raised/50"
          />
        ))}
      </div>
    </div>
  );
}

const page = () => {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminAuthGuard>
        <AdminDashboardPage />
      </AdminAuthGuard>
    </Suspense>
  );
};

export default page;