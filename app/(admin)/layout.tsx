import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon' />

      <SidebarTrigger />
      <div className='container mx-auto px-4 py-6 md:py-11'>{children}</div>
    </SidebarProvider>
  );
}

export default AdminLayout;
