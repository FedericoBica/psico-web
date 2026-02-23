import { getStoreConfig } from '@/actions';
import { Footer, Sidebar, TopBar, TopMenu } from '@/components';
import { ScrollToTop } from '@/components/product/ui/ScrollToTop';

export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const topbarConfig = await getStoreConfig('topbar');

  return (
    <main className="min-h-screen flex flex-col bg-zinc-950 text-gray-100">
      {/* <TopBar dbMessages={topbarConfig} /> */}
      <TopMenu />
      <Sidebar />

      <div className="flex-grow px-0 sm:px-1">
        {children}
      </div>

      <ScrollToTop />
      <Footer />
    </main>
  );
}