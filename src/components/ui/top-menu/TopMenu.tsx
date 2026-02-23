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
    <nav className="flex px-5 justify-between items-center w-full sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-pink-900/30 py-3">

      {/* Logo */}
      <div className={isSearchOpen ? 'hidden md:block' : 'block'}>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent`}>
            Psico Web
          </span>
        </Link>
      </div>

      {/* Buscador */}
      <div className={`${isSearchOpen ? 'flex' : 'hidden md:block'} flex-1 max-w-sm mx-4`}>
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            autoFocus={isSearchOpen}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar e-books..."
            className="w-full bg-zinc-900/50 border border-pink-900/20 rounded-full py-1.5 pl-10 pr-10 text-sm text-gray-200 focus:outline-none focus:border-pink-500/50 transition-all"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
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

      {/* Iconos derecha */}
      <div className="flex items-center text-gray-300">
        {!isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden mx-2 hover:text-pink-500 transition-colors"
          >
            <IoSearchOutline className="w-6 h-6" />
          </button>
        )}

        <Link href="/blog" className="hidden md:block mx-4 text-sm font-bold uppercase tracking-widest text-pink-500 hover:text-pink-400 transition-colors">
          Blog
        </Link>

        <div className={`flex items-center ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <Link
            href={totalItemsInCart === 0 && loaded ? '/' : '/cart'}
            className="mx-2 hover:text-pink-500 transition-colors"
          >
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className="fade-in absolute text-[10px] px-1.5 py-0.5 rounded-full font-black -top-2 -right-2 bg-pink-600 text-white">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="w-6 h-6" />
            </div>
          </Link>

          <button
            onClick={openSideMenu}
            className="ml-3 px-4 py-1.5 rounded-full bg-pink-600/10 border border-pink-500/50 text-pink-500 hover:bg-pink-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            Menú
          </button>
        </div>
      </div>
    </nav>
  );
};