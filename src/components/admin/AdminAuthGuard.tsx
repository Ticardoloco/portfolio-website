import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";

export default async function AdminAuthGuard({
    children,
}: {
    children: React.ReactNode
}) {
     const session = await getServerSession();

     if (!session) {
        redirect("/auth/login");
     }

     return <>{children}</>
}