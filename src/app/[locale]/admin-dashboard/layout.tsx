import AdminSidebar from '@/components/admin-dashboard/layout/AdminSidebar';
import AdminTopBar from '@/components/admin-dashboard/layout/AdminTopBar';
import Footer from '@/components/Footer';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <AdminTopBar />

        {/* Page Content with gradient background */}
        <main
          className="flex-1 p-2 md:p-6"
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 178, 126, 0.035) 0%, rgba(2, 58, 162, 0.035) 100%)',
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
