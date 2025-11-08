import DashboardSidebar from '@/components/professional-dashboard/layout/DashboardSidebar';
import DashboardTopBar from '@/components/professional-dashboard/layout/DashboardTopBar';
import Footer from '@/components/Footer';

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <DashboardTopBar />

        {/* Page Content with gradient background */}
        <main
          className="flex-1 p-8"
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 178, 126, 0.035) 0%, rgba(2, 58, 162, 0.035) 100%)',
            backdropFilter: 'blur(66.5px)',
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
