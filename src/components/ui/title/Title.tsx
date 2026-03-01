import { titleFont } from '@/config/fonts';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={ `mt-3 px-4 sm:px-0 ${ className }` }>
      
      {/* Título en Gris Oscuro Profesional (No Negro puro) */}
      <h1 className={ `${ titleFont.className } antialiased text-3xl sm:text-4xl font-bold my-4 text-gray-800 tracking-tight` }>
        { title }
      </h1>

      {
        subtitle && (
          /* Subtítulo en Verde Sage Suave */
          <h3 className="text-lg sm:text-xl mb-6 text-sage-600/90 font-light italic leading-relaxed">
            { subtitle }
          </h3>
        )
      }

      {/* Una línea divisoria sutil estilo "Plata" opcional */}
      <div className="w-20 h-1 bg-sage-100 rounded-full mb-8"></div>

    </div>
  )
}