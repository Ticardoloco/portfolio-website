import React, { Suspense } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminProjectsPage from '@/screen/admin/project';

function ProjectsLoadingFallback() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-44 animate-pulse rounded bg-white/10" />
        <div className="h-9 w-32 animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-white/10 bg-ink-raised/50"
          />
        ))}
      </div>
    </div>
  );
}

const page = () => {
  return (
    <div>
      <Suspense fallback={<ProjectsLoadingFallback />}>
        <AdminAuthGuard>
          <AdminProjectsPage />
        </AdminAuthGuard>
      </Suspense>
    </div>
  );
};

export default page;