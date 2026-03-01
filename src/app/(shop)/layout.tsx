import { getStoreConfig } from '@/actions';
import { Footer, Sidebar, TopBar, TopMenu } from '@/components';
import { ScrollToTop } from '@/components/product/ui/ScrollToTop';

export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const topbarConfig = await getStoreConfig('topbar');

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-800">
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