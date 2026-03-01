'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
  IoBookOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoLibraryOutline,
} from 'react-icons/io5';
import { useUIStore } from '@/store';
import { logout } from '@/actions';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  return (
    <div className="z-[999] relative">
      {/* Overlay más claro */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed top-0 left-0 w-screen h-screen z-[60] bg-gray-900/10 backdrop-blur-[1px] transition-all"
        />
      )}

      {/* Nav Blanco/Plata */}
      <nav className={clsx(
        'fixed p-6 right-0 top-0 w-[75%] sm:w-[320px] h-screen bg-white text-gray-800 z-[70] shadow-2xl transform transition-all duration-300 border-l border-gray-100 overflow-y-auto',
        { 'translate-x-full': !isSideMenuOpen }
      )}>

        <div className="flex items-center gap-2 mt-4 mb-10">
          <div className="relative flex-1">
            <IoSearchOutline size={16} className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-50 rounded-xl pl-9 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-sage-300 transition-all"
            />
          </div>
          <button onClick={closeMenu} className="text-gray-400 hover:text-sage-500 transition-colors">
            <IoCloseOutline size={30} />
          </button>
        </div>

        <div className="flex flex-col space-y-2">

          {!isAuthenticated ? (
            <Link 
              href="/auth/login" 
              onClick={closeMenu} 
              className="flex items-center p-3 rounded-xl hover:bg-sage-50 transition-all group"
            >
              <IoLogInOutline size={22} className="text-sage-500" />
              <span className="ml-4 font-light text-gray-600 group-hover:text-gray-900">Ingresar</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/profile" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-sage-50 transition-all group"
              >
                <IoPersonOutline size={22} className="text-sage-500" />
                <span className="ml-4 font-light text-gray-600 group-hover:text-gray-900">Mi Perfil</span>
              </Link>
              <Link 
                href="/orders" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-sage-50 transition-all group"
              >
                <IoTicketOutline size={22} className="text-sage-500" />
                <span className="ml-4 font-light text-gray-600 group-hover:text-gray-900">Mis Descargas</span>
              </Link>
            </>
          )}

          <Link 
            href="/blog" 
            onClick={closeMenu} 
            className="flex items-center p-3 rounded-xl hover:bg-sage-50 transition-all group"
          >
            <IoBookOutline size={22} className="text-sage-500" />
            <span className="ml-4 font-light text-gray-600 group-hover:text-gray-900">Blog</span>
          </Link>

          {isAuthenticated && (
            <button
              onClick={() => { logout(); closeMenu(); }}
              className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all group mt-4"
            >
              <IoLogOutOutline size={22} className="text-gray-400 group-hover:text-red-500" />
              <span className="ml-4 font-light text-gray-500 group-hover:text-red-600">Cerrar Sesión</span>
            </button>
          )}

          {isAdmin && (
            <div className="w-full flex flex-col mt-8 pt-8 border-t border-gray-100 space-y-2">
              <span className="px-3 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">
                Administración
              </span>
              
              <Link 
                href="/admin/products" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <IoLibraryOutline size={20} className="text-gray-400 group-hover:text-sage-500" />
                <span className="ml-4 text-sm font-light text-gray-500 group-hover:text-gray-900">Productos</span>
              </Link>
              
              <Link 
                href="/admin/orders" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <IoTicketOutline size={20} className="text-gray-400 group-hover:text-sage-500" />
                <span className="ml-4 text-sm font-light text-gray-500 group-hover:text-gray-900">Órdenes</span>
              </Link>
              
              <Link 
                href="/admin/posts" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <IoDocumentTextOutline size={20} className="text-gray-400 group-hover:text-sage-500" />
                <span className="ml-4 text-sm font-light text-gray-500 group-hover:text-gray-900">Blog</span>
              </Link>

              <Link 
                href="/admin/users" 
                onClick={closeMenu} 
                className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <IoPeopleOutline size={20} className="text-gray-400 group-hover:text-sage-500" />
                <span className="ml-4 text-sm font-light text-gray-500 group-hover:text-gray-900">Usuarios</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};