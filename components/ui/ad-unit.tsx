// /home/marco/calcular-media-fai/app/components/AdUnit.tsx
"use client";

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  adClient: string; // Seu ID de editor, ex: "ca-pub-xxxxxxxxxxxxxxxx"
  adSlot: string;   // O ID do bloco de anúncio específico
  adFormat?: string; // Formato do anúncio, ex: "auto", "rectangle", "vertical"
  style?: React.CSSProperties; // Estilos inline para o contêiner do anúncio
  className?: string; // Classes CSS adicionais
  fullWidthResponsive?: boolean; // Para anúncios responsivos de largura total
}

const AdUnit: React.FC<AdUnitProps> = ({
  adClient,
  adSlot,
  adFormat = "auto",
  style = { display: 'block' }, // Estilo padrão do AdSense
  className,
  fullWidthResponsive = true,
}) => {
  const adPushed = useRef(false);

  useEffect(() => {
    // Garante que o push só ocorra uma vez e em ambiente de produção
    // window.adsbygoogle será definido pelo script carregado em layout.tsx (via GoogleAdsense component)
    if (process.env.NODE_ENV === "production" && !adPushed.current && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        adPushed.current = true; // Marca que o anúncio foi "empurrado"
      } catch (err) {
        console.error(`AdSense push error for slot ${adSlot}:`, err);
      }
    }
  }, [adSlot]); 

  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        style={{
          ...style,
          minHeight: typeof style?.height === 'number' ? style.height : 90, // Altura mínima para visualização
          width: '100%',
          backgroundColor: '#2d2d2d', // Cor de fundo para o placeholder no tema escuro
          border: '1px dashed #555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '10px',
          boxSizing: 'border-box',
          margin: '10px 0', // Margem para separar visualmente
        }}
        className={className}
      >
        Espaço para Anúncio (Slot: {adSlot})<br />
        (Anúncios aparecerão em produção)
      </div>
    );
  }

  // Em produção, renderiza a tag <ins> do AdSense
  return (
    <div className={className} style={{ margin: '10px 0' }}> {/* Wrapper para margem, se necessário */}
      <ins
        className="adsbygoogle" // Classe padrão do AdSense
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdUnit;
