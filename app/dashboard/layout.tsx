import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import { SidebarComponent } from '@/components/dashboard/sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { createOrUpdateUser } from '@/lib/user-creation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  
  if (!session || !session.user) {
    redirect('/auth/login');
  }

  const auth0User = session.user;

  // Create or update user in database (gère le rôle PRO avec statut PENDING)
  const user = await createOrUpdateUser(auth0User);

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardClient />
      <div className="flex min-h-screen w-full bg-background">
        <SidebarComponent user={user} />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
