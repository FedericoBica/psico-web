import { Footer, Sidebar, TopMenu } from '@/components';
import { ScrollToTop } from '@/components/product/ui/ScrollToTop';
import { Contacto } from '@/components/ui/contacto/Contacto';

export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#2d2d2d]">
      {/* <TopBar dbMessages={topbarConfig} /> */}
      <TopMenu />
      <Sidebar />

      <div className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>

      <ScrollToTop />
      
      <Footer />
    </main>
  );
}