'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  IoCloseOutline, IoLogInOutline, IoLogOutOutline,
  IoPeopleOutline, IoPersonOutline, IoSearchOutline,
  IoTicketOutline, IoBookOutline, IoDocumentTextOutline,
  IoSettingsOutline, IoLibraryOutline, IoAddCircleOutline,
  IoHomeOutline, IoMailOutline,
} from 'react-icons/io5';
import { useUIStore } from '@/store';
import { logout } from '@/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu      = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated   = !!session?.user;
  const isAdmin           = session?.user.role === 'admin';
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${searchTerm.trim()}`);
    setSearchTerm('');
    closeMenu();
  };

  const NavItem = ({
    href, icon: Icon, label, green = false,
  }: { href: string; icon: any; label: string; green?: boolean }) => (
    <Link
      href={href}
      onClick={closeMenu}
      className={clsx(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group',
        green
          ? 'bg-[#9ead6b] hover:bg-[#7a9347] text-white'
          : 'hover:bg-[#e3e3e3] text-[#555555] hover:text-[#2d2d2d]'
      )}
    >
      <Icon size={18} className={green ? 'text-white' : 'text-[#9ead6b]'} />
      <span className={clsx('text-sm font-medium', green && 'font-bold text-white')}>
        {label}
      </span>
    </Link>
  );

  return (
    <div className="z-[999] relative">

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px]"
        />
      )}

      {/* Panel */}
      <nav className={clsx(
        'fixed right-0 top-0 h-screen w-[80%] sm:w-[320px] z-[70]',
        'bg-white border-l border-[#e3e3e3] shadow-2xl',
        'flex flex-col px-5 py-6 overflow-y-auto',
        'transform transition-all duration-300',
        { 'translate-x-full': !isSideMenuOpen }
      )}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-serif text-base text-[#2d2d2d] leading-none">
              Lic. Gimena Medrano
            </p>
            <p className="text-[10px] text-[#9ead6b] uppercase tracking-[0.2em] mt-0.5 font-bold">
              {isAuthenticated ? session.user.name : 'Bienvenida'}
            </p>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-xl text-[#aaaaaa] hover:bg-[#e3e3e3] hover:text-[#2d2d2d] transition-colors"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <IoSearchOutline size={15} className="absolute top-1/2 -translate-y-1/2 left-3 text-[#aaaaaa]" />
          <input
            type="text"
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#e3e3e3] rounded-xl pl-8 py-2.5 text-sm text-[#2d2d2d] placeholder:text-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#9ead6b] transition-all"
          />
        </form>

        {/* ── Navegación ──
             Todos los links están siempre disponibles en el sidebar.
             En mobile (< md) el TopMenu los oculta, así que aquí
             son el único acceso. En desktop también están por comodidad. */}
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#aaaaaa] font-bold mb-1 px-1">
            Navegación
          </p>
          <NavItem href="/"           icon={IoHomeOutline}          label="Inicio" />
          <NavItem href="/#sobre-mi"  icon={IoPersonOutline}        label="Sobre Mí" />
          <NavItem href="/#servicios" icon={IoBookOutline}          label="Servicios" />
          <NavItem href="/tienda"    icon={IoLibraryOutline}       label="Tienda" />
          <NavItem href="/blog"       icon={IoDocumentTextOutline}  label="Blog" />
          <NavItem href="/#contacto"  icon={IoMailOutline}          label="Contacto" />
        </div>

        {/* ── Mi cuenta ── */}
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#aaaaaa] font-bold mb-1 px-1">
            Mi cuenta
          </p>

          {!isAuthenticated ? (
            <NavItem href="/auth/login" icon={IoLogInOutline} label="Ingresar" />
          ) : (
            <>
              <NavItem href="/profile" icon={IoPersonOutline}  label="Mi Perfil" />
              <NavItem href="/orders"  icon={IoTicketOutline}  label="Mis Descargas" />
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all group mt-1"
              >
                <IoLogOutOutline size={18} className="text-[#aaaaaa] group-hover:text-red-500" />
                <span className="text-sm font-medium text-[#777777] group-hover:text-red-600">
                  Cerrar Sesión
                </span>
              </button>
            </>
          )}
        </div>

        {/* ── Panel Admin ── */}
        {isAdmin && (
          <div className="flex flex-col gap-1 pt-5 border-t border-[#e3e3e3]">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#aaaaaa] font-bold mb-2 px-1">
              Administración
            </p>

            {/* Botón destacado verde */}
            <NavItem
              href="/admin/product/new"
              icon={IoAddCircleOutline}
              label="+ Nuevo E-book"
              green
            />

            <div className="mt-1 flex flex-col gap-1">
              <NavItem href="/admin/products" icon={IoLibraryOutline}       label="Gestionar Productos" />
              <NavItem href="/admin/orders"   icon={IoTicketOutline}         label="Órdenes" />
              <NavItem href="/admin/posts"    icon={IoDocumentTextOutline}   label="Blog" />
              <NavItem href="/admin/users"    icon={IoPeopleOutline}         label="Usuarios" />
              <NavItem href="/admin/coupons"  icon={IoSettingsOutline}       label="Cupones" />
              <NavItem href="/admin/settings" icon={IoSettingsOutline}       label="Configuración" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6">
          <p className="text-[10px] text-[#aaaaaa] text-center">
            © {new Date().getFullYear()} Lic. Gimena Medrano
          </p>
        </div>
      </nav>
    </div>
  );
};