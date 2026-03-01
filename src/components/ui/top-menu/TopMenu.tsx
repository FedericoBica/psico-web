'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoSearchOutline, IoCartOutline, IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { useCartStore, useUIStore } from '@/store';

export const TopMenu = () => {
  const openSideMenu  = useUIStore((state) => state.openSideMenu);
  const totalItems    = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded]           = useState(false);
  const [searchTerm, setSearchTerm]   = useState('');
  const [searchOpen, setSearchOpen]   = useState(false);
  const router = useRouter();

  useEffect(() => { setLoaded(true); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${searchTerm.trim()}`);
    setSearchTerm('');
    setSearchOpen(false);
  };

  const navLinks = [
    { label: 'Inicio',    href: '/' },
    { label: 'Sobre Mí', href: '/#sobre-mi' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Tienda',    href: '/#tienda' },
    { label: 'Blog',      href: '/blog' },
    { label: 'Contacto',  href: '/#contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e3e3e3]">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* ── Logo ── */}
        <div className={searchOpen ? 'hidden sm:block' : 'block'}>
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-lg md:text-xl text-[#2d2d2d] leading-none tracking-tight">
              Lic. Gimena Medrano
            </span>
            <span className="text-[9px] text-[#9ead6b] uppercase tracking-[0.25em] mt-0.5 font-bold">
              Psicopedagoga
            </span>
          </Link>
        </div>

        {/* ── Nav links desktop ── */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#555555] hover:text-[#9ead6b] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2 text-[#2d2d2d]">

          {/* Búsqueda mobile */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2 sm:hidden">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="bg-[#e3e3e3] rounded-full py-1.5 px-4 text-sm text-[#2d2d2d] focus:outline-none focus:ring-1 focus:ring-[#9ead6b] w-36"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <IoCloseOutline size={20} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-xl hover:bg-[#e3e3e3] transition-colors"
            >
              <IoSearchOutline size={20} />
            </button>
          )}

          {/* Búsqueda desktop */}
          {/* <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
            <IoSearchOutline size={15} className="absolute left-3 text-[#aaaaaa]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar recursos..."
              className="bg-[#e3e3e3] rounded-full py-2 pl-8 pr-4 text-sm text-[#2d2d2d] placeholder:text-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#9ead6b] w-44 transition-all focus:w-52"
            />
          </form> */}

          {/* Carrito */}
          <Link
            href={totalItems === 0 && loaded ? '/' : '/cart'}
            className="relative p-2 rounded-xl hover:bg-[#e3e3e3] transition-colors"
          >
            {loaded && totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[9px] flex items-center justify-center rounded-full font-bold bg-[#9ead6b] text-white">
                {totalItems}
              </span>
            )}
            <IoCartOutline size={20} />
          </Link>

          {/* Botón Menú — abre Sidebar en todos los tamaños */}
          <button
            onClick={openSideMenu}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#9ead6b] hover:bg-[#7a9347] text-white transition-all active:scale-95"
          >
            <IoMenuOutline size={18} />
            {/* <span className="text-[11px] font-bold uppercase tracking-[0.15em] hidden sm:block">
              Menú
            </span> */}
          </button>
        </div>
      </div>
    </nav>
  );
};