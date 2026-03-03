'use client'; // Importante añadir esto arriba

import { useState } from 'react';
import { IoLogoWhatsapp, IoMailOutline, IoLogoInstagram } from 'react-icons/io5';
// ... otros imports

export const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, email, mensaje } = formData;
    
    // Construimos el mensaje para la Lic. Gimena
    const texto = `Hola Lic. Gimena, mi nombre es ${nombre}. \nMi contacto: ${email} \nConsulta: ${mensaje}`;
    const url = `https://wa.me/59897464500?text=${encodeURIComponent(texto)}`;
    
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#9ead6b]" id="contacto">
      {/* ... cabecera igual ... */}

      <div className="bg-white/15 border border-white/20 rounded-3xl p-8">
        <form onSubmit={handleWhatsAppSend} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Tu nombre"
            required
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50" 
          />
          <input 
            type="email" 
            placeholder="Tu email"
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50" 
          />
          <textarea 
            rows={4} 
            placeholder="Tu mensaje..."
            required
            onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
            className="sm:col-span-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 resize-none" 
          />
          <button 
            type="submit"
            className="sm:col-span-2 bg-[#2d2d2d] hover:bg-[#444444] text-white font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all active:scale-[0.98]"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
      
      {/* ... resto igual ... */}
    </section>
  );
};