'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoSearchOutline, IoCartOutline, IoCloseOutline } from 'react-icons/io5';
import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => { setLoaded(true); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length === 0) return;
    router.push(`/search?q=${searchTerm.trim()}`);
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  return (
    <nav className="flex px-5 justify-between items-center w-full sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-sand py-4">
      {/* Logo */}
      <div className={isSearchOpen ? 'hidden md:block' : 'block'}>
        <Link href="/">
          <span className="text-2xl font-serif text-brand-brown tracking-tighter">
            Lic. Gimena <span className="font-light italic text-brand-accent">Medrano</span>
          </span>
        </Link>
      </div>

      {/* Buscador Estilo Plata */}
      <div className={`${isSearchOpen ? 'flex' : 'hidden md:block'} flex-1 max-w-sm mx-4`}>
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            autoFocus={isSearchOpen}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar recursos..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-10 text-sm text-gray-700 focus:outline-none focus:border-sage-300 focus:ring-1 focus:ring-sage-100 transition-all"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          {isSearchOpen && (
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <IoCloseOutline size={20} />
            </button>
          )}
        </form>
      </div>

      {/* Iconos Derecha */}
      <div className="flex items-center text-gray-600">
        {!isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden mx-2 hover:text-sage-500 transition-colors"
          >
            <IoSearchOutline className="w-6 h-6" />
          </button>
        )}

        <Link href="/blog" className="hidden md:block mx-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-sage-600 transition-colors">
          Blog
        </Link>

        <div className={`flex items-center ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <Link
            href={totalItemsInCart === 0 && loaded ? '/' : '/cart'}
            className="mx-2 hover:text-sage-500 transition-colors"
          >
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className="absolute text-[10px] px-1.5 py-0.5 rounded-full font-bold -top-2 -right-2 bg-sage-500 text-white shadow-sm">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="w-6 h-6" />
            </div>
          </Link>

          <button onClick={openSideMenu} className="text-brand-brown uppercase text-xs tracking-widest font-bold">
            Menú
          </button>
        </div>
      </div>
    </nav>
  );
};