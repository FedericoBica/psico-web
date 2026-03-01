'use client';

interface TopbarConfig {
  messages: string[];
  backgroundColor?: string;
  isActive?: boolean;
}

interface Props {
  dbMessages?: TopbarConfig;
}

export const TopBar = ({ dbMessages }: Props) => {
  const messages = dbMessages?.messages ?? [
    "📚 Descargá tus e-books al instante después del pago",
    "🔒 Compra 100% segura con Mercado Pago",
  ];

  const scrollingContent = [...messages, ...messages, ...messages];

return (
    <div className="bg-sage-600 text-white py-1.5 overflow-hidden border-b border-sage-700 relative z-[60]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="text-[10px] md:text-xs font-medium uppercase tracking-[0.1em] px-10 flex items-center">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};