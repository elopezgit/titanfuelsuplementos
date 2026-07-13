import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BRAND_IMAGE_LOGOS: Record<string, string> = {
  'NUTRILAB': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhcgfosLAAxGFioWUil4z2nYoZPp2D29ZtCKEVETfOxfxEGEU81qpAyG8&s=10',
  'STAR NUTRITION': 'https://acdn.mitiendanube.com/stores/001/144/598/themes/common/logo-1725540306-1725540306-05658e3981881ceb904df2ecbc5816961725540306.png?0',
  'ENA SPORT': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/ENA_logo.svg',
  'ENA': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/ENA_logo.svg',
  'HOCH SPORT': 'https://hochsport.com/wp-content/uploads/2021/04/logo-hoch.png',
  'BODY ADVANCED': 'https://bodyadvanced.com.ar/wp-content/uploads/2021/08/logo-ba.png',
  'GENERATION FIT': 'https://generationfit.com.ar/wp-content/uploads/2023/05/logo-gf.png',
  'VITAMIN WAY': 'https://vitaminway.com.ar/wp-content/uploads/2020/07/logo-vw.png',
  'MERVICK': 'https://mervicklab.com/images/logo.png',
  'XTRENGHT': 'https://xtrenght.com/wp-content/uploads/2020/08/logo-xtrenght.png',
  'GOLD NUTRITION': 'https://goldnutrition.com.ar/wp-content/uploads/2021/03/logo-gn.png',
  'NATULIV': 'https://natuliv.com.ar/wp-content/uploads/2020/09/logo-natuliv.png',
};

const getBrandLogoUrl = (cleanBrand: string): string | null => {
  if (cleanBrand.includes('NUTRILAB')) return BRAND_IMAGE_LOGOS['NUTRILAB'];
  if (cleanBrand.includes('STAR NUTRITION') || cleanBrand === 'STAR') return BRAND_IMAGE_LOGOS['STAR NUTRITION'];
  if (cleanBrand.includes('ENA')) return BRAND_IMAGE_LOGOS['ENA'];
  if (cleanBrand.includes('HOCH')) return BRAND_IMAGE_LOGOS['HOCH SPORT'];
  if (cleanBrand.includes('BODY ADVANCED')) return BRAND_IMAGE_LOGOS['BODY ADVANCED'];
  if (cleanBrand.includes('GENERATION FIT')) return BRAND_IMAGE_LOGOS['GENERATION FIT'];
  if (cleanBrand.includes('VITAMIN WAY')) return BRAND_IMAGE_LOGOS['VITAMIN WAY'];
  if (cleanBrand.includes('MERVICK')) return BRAND_IMAGE_LOGOS['MERVICK'];
  if (cleanBrand.includes('XTRENGHT')) return BRAND_IMAGE_LOGOS['XTRENGHT'];
  if (cleanBrand.includes('GOLD NUTRITION')) return BRAND_IMAGE_LOGOS['GOLD NUTRITION'];
  if (cleanBrand.includes('NATULIV')) return BRAND_IMAGE_LOGOS['NATULIV'];
  return null;
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = '', size = 'md' }) => {
  const cleanBrand = brand.toUpperCase().trim();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [cleanBrand]);

  const sizeClasses = {
    sm: 'h-7 max-w-[120px]',
    md: 'h-9 max-w-[160px]',
    lg: 'h-12 max-w-[220px]',
  }[size];

  const logoUrl = getBrandLogoUrl(cleanBrand);

  if (logoUrl && !imageError) {
    return (
      <div className={`inline-flex items-center justify-center bg-white/95 border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-md overflow-hidden ${sizeClasses} ${className}`}>
        <img
          src={logoUrl}
          alt={brand}
          onError={() => setImageError(true)}
          className="h-full w-auto max-w-full object-contain"
        />
      </div>
    );
  }

  // 1. STAR NUTRITION
  if (cleanBrand.includes('STAR NUTRITION') || cleanBrand === 'STAR') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#0B0B12]/90 border border-yellow-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">
          <polygon points="16,2 20.3,10.7 30,12.1 23,18.9 24.6,28.5 16,24 7.4,28.5 9,18.9 2,12.1 11.7,10.7" />
        </svg>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tighter text-white text-xs sm:text-sm font-display">STAR</span>
          <span className="font-extrabold tracking-widest text-yellow-400 text-[8px] uppercase">NUTRITION</span>
        </div>
      </div>
    );
  }

  // 2. ENA SPORT
  if (cleanBrand.includes('ENA')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#0A1020]/90 border border-blue-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="bg-blue-600 text-white font-black italic text-xs px-1.5 py-0.5 rounded skew-x-[-12deg] tracking-tighter">
          ENA
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase italic">SPORT</span>
          <span className="font-bold tracking-widest text-blue-400 text-[7px] uppercase">NUTRITION</span>
        </div>
      </div>
    );
  }

  // 3. HOCH SPORT
  if (cleanBrand.includes('HOCH')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#14080A]/90 border border-red-600/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="w-5 h-5 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-xs">
          H
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-wider text-white text-xs uppercase">HOCH</span>
          <span className="font-bold tracking-widest text-red-500 text-[7px] uppercase">SPORT</span>
        </div>
      </div>
    );
  }

  // 4. NUTRILAB
  if (cleanBrand.includes('NUTRILAB')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#0D0B16]/90 border border-purple-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-purple-400 stroke-[2.5]">
          <path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
        </svg>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase">NUTRILAB</span>
          <span className="font-bold tracking-widest text-purple-400 text-[7px] uppercase">PHARMA NUTRITION</span>
        </div>
      </div>
    );
  }

  // 5. BODY ADVANCED
  if (cleanBrand.includes('BODY ADVANCED') || cleanBrand.includes('BODY')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#140D08]/90 border border-orange-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center font-black text-white text-[10px]">
          BA
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase">BODY</span>
          <span className="font-bold tracking-wider text-orange-400 text-[7px] uppercase">ADVANCED</span>
        </div>
      </div>
    );
  }

  // 6. GENERATION FIT
  if (cleanBrand.includes('GENERATION FIT') || cleanBrand.includes('GENERATION')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#08140F]/90 border border-emerald-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center font-black text-white text-[10px]">
          GF
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase">GENERATION</span>
          <span className="font-bold tracking-wider text-emerald-400 text-[7px] uppercase">FIT NUTRITION</span>
        </div>
      </div>
    );
  }

  // 7. VITAMIN WAY
  if (cleanBrand.includes('VITAMIN WAY') || cleanBrand.includes('VITAMIN')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#081214]/90 border border-cyan-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center font-black text-white text-[10px]">
          VW
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase">VITAMIN</span>
          <span className="font-bold tracking-wider text-cyan-400 text-[7px] uppercase">WAY</span>
        </div>
      </div>
    );
  }

  // 8. MERVICK
  if (cleanBrand.includes('MERVICK')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#14080D]/90 border border-pink-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="bg-pink-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
          MV
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase">MERVICK</span>
          <span className="font-bold tracking-widest text-pink-400 text-[7px] uppercase">LAB</span>
        </div>
      </div>
    );
  }

  // 9. XTRENGHT
  if (cleanBrand.includes('XTRENGHT')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#140A0D]/90 border border-rose-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center font-black text-white text-xs italic">
          X
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-white text-xs uppercase italic">XTRENGHT</span>
          <span className="font-bold tracking-widest text-rose-400 text-[7px] uppercase">NUTRITION</span>
        </div>
      </div>
    );
  }

  // 10. GOLD NUTRITION
  if (cleanBrand.includes('GOLD NUTRITION') || cleanBrand.includes('GOLD')) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-[#141008]/90 border border-amber-500/40 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
          <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
        </svg>
        <div className="flex flex-col justify-center leading-none">
          <span className="font-black tracking-tight text-amber-300 text-xs uppercase">GOLD</span>
          <span className="font-bold tracking-widest text-amber-500 text-[7px] uppercase">NUTRITION</span>
        </div>
      </div>
    );
  }

  // Fallback for any other brand
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#13131F]/90 border border-slate-700 px-2.5 py-1 rounded-lg shadow-md ${sizeClasses} ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#FF1E27]"></span>
      <span className="font-black text-white text-xs uppercase tracking-wider">{brand || 'TITAN FUEL'}</span>
    </div>
  );
};
