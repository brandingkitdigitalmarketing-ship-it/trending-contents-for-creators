import React from 'react';
import {
  Bot,
  Briefcase,
  Megaphone,
  Gamepad2,
  Clapperboard,
  Trophy,
  Sparkles,
  HeartPulse,
  GraduationCap,
  Coins,
  Plane,
  Utensils,
  Sun,
  Globe2,
  Atom,
  Car,
  Home,
  Zap,
  Layers,
  TrendingUp,
} from 'lucide-react';

export type PlatformType =
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'tiktok'
  | 'x'
  | 'reddit'
  | 'pinterest'
  | 'google-trends'
  | 'custom'
  | string;

interface PlatformLogoProps {
  platform: PlatformType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBackground?: boolean;
  className?: string;
}

export function PlatformLogo({
  platform,
  size = 'md',
  showBackground = false,
  className = '',
}: PlatformLogoProps) {
  const norm = (platform || '').toLowerCase();

  // Size dimensions
  const dims = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }[size];

  const containerDims = {
    xs: 'w-6 h-6 rounded-lg text-xs',
    sm: 'w-7 h-7 rounded-xl text-xs',
    md: 'w-9 h-9 rounded-xl text-sm',
    lg: 'w-11 h-11 rounded-2xl text-base',
    xl: 'w-14 h-14 rounded-2xl text-lg',
  }[size];

  let iconContent: React.ReactNode = null;
  let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

  switch (norm) {
    case 'youtube':
      bgClass = 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="YouTube">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
      break;

    case 'instagram':
      bgClass = 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="Instagram">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
      break;

    case 'facebook':
      bgClass = 'bg-[#1877F2] text-white';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="Facebook">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
      break;

    case 'linkedin':
      bgClass = 'bg-[#0A66C2] text-white';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="LinkedIn">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      );
      break;

    case 'tiktok':
      bgClass = 'bg-slate-900 text-white dark:bg-black border border-slate-700/60';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="TikTok">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.7 1.05-.06 2.06-.67 2.56-1.6.22-.44.33-.93.33-1.43.02-4.57 0-9.15.01-13.72z" />
        </svg>
      );
      break;

    case 'x':
    case 'twitter':
      bgClass = 'bg-black text-white dark:bg-white dark:text-black';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="X (Twitter)">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
      break;

    case 'reddit':
      bgClass = 'bg-[#FF4500] text-white';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="Reddit">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.248a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 3.99a.377.377 0 0 0-.106.522c.677 1.077 1.83 1.633 2.821 1.633.99 0 2.144-.556 2.821-1.633a.376.376 0 0 0-.636-.4c-.52.827-1.434 1.233-2.185 1.233-.75 0-1.664-.406-2.185-1.233a.378.378 0 0 0-.53-.122z" />
        </svg>
      );
      break;

    case 'pinterest':
      bgClass = 'bg-[#E60023] text-white';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="Pinterest">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z" />
        </svg>
      );
      break;

    case 'google-trends':
      bgClass = 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400';
      iconContent = (
        <svg className={`${dims} fill-current`} viewBox="0 0 24 24" aria-label="Google Trends">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.09 9.09 16.5 10.5 10 17z" />
        </svg>
      );
      break;

    default:
      bgClass = 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300';
      iconContent = <Layers className={dims} />;
      break;
  }

  if (showBackground) {
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 shadow-sm transition-transform ${containerDims} ${bgClass} ${className}`}
      >
        {iconContent}
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {iconContent}
    </span>
  );
}

interface CategoryLogoProps {
  category: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showBackground?: boolean;
  className?: string;
}

export function CategoryLogo({
  category,
  size = 'md',
  showBackground = true,
  className = '',
}: CategoryLogoProps) {
  const norm = (category || '').toLowerCase();

  const dims = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const containerDims = {
    xs: 'w-7 h-7 rounded-lg',
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-12 h-12 rounded-2xl',
  }[size];

  let Icon = Layers;
  let gradient = 'from-purple-500 to-indigo-600';

  if (norm.includes('tech') || norm.includes('ai') || norm.includes('software')) {
    Icon = Bot;
    gradient = 'from-cyan-500 to-blue-600';
  } else if (norm.includes('business') || norm.includes('entrepreneur')) {
    Icon = Briefcase;
    gradient = 'from-emerald-500 to-teal-700';
  } else if (norm.includes('marketing') || norm.includes('seo')) {
    Icon = Megaphone;
    gradient = 'from-violet-500 to-purple-700';
  } else if (norm.includes('game') || norm.includes('gaming')) {
    Icon = Gamepad2;
    gradient = 'from-fuchsia-500 to-pink-600';
  } else if (norm.includes('entertainment') || norm.includes('movie') || norm.includes('cinema')) {
    Icon = Clapperboard;
    gradient = 'from-rose-500 to-amber-600';
  } else if (norm.includes('sport') || norm.includes('cricket') || norm.includes('football')) {
    Icon = Trophy;
    gradient = 'from-amber-500 to-orange-600';
  } else if (norm.includes('fashion') || norm.includes('beauty')) {
    Icon = Sparkles;
    gradient = 'from-pink-500 to-rose-600';
  } else if (norm.includes('health') || norm.includes('fitness') || norm.includes('wellness')) {
    Icon = HeartPulse;
    gradient = 'from-red-500 to-pink-600';
  } else if (norm.includes('educat') || norm.includes('learn') || norm.includes('study')) {
    Icon = GraduationCap;
    gradient = 'from-sky-500 to-indigo-600';
  } else if (norm.includes('finance') || norm.includes('money') || norm.includes('invest')) {
    Icon = Coins;
    gradient = 'from-emerald-600 to-green-700';
  } else if (norm.includes('travel') || norm.includes('tourism')) {
    Icon = Plane;
    gradient = 'from-blue-400 to-cyan-600';
  } else if (norm.includes('food') || norm.includes('cook') || norm.includes('recipe')) {
    Icon = Utensils;
    gradient = 'from-orange-500 to-amber-600';
  } else if (norm.includes('lifestyle')) {
    Icon = Sun;
    gradient = 'from-amber-400 to-yellow-600';
  } else if (norm.includes('politic') || norm.includes('world') || norm.includes('news')) {
    Icon = Globe2;
    gradient = 'from-slate-600 to-slate-900';
  } else if (norm.includes('science') || norm.includes('space') || norm.includes('physics')) {
    Icon = Atom;
    gradient = 'from-teal-500 to-cyan-700';
  } else if (norm.includes('auto') || norm.includes('car') || norm.includes('ev')) {
    Icon = Car;
    gradient = 'from-red-600 to-zinc-800';
  } else if (norm.includes('real estate') || norm.includes('property') || norm.includes('housing')) {
    Icon = Home;
    gradient = 'from-indigo-500 to-blue-700';
  } else if (norm.includes('creator')) {
    Icon = Zap;
    gradient = 'from-purple-600 to-pink-600';
  }

  if (showBackground) {
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${gradient} shadow-md ${containerDims} ${className}`}
      >
        <Icon className={dims} />
      </div>
    );
  }

  return <Icon className={`${dims} ${className}`} />;
}
