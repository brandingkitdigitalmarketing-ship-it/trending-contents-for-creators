'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Home, Compass, Bookmark, Calendar, Layers } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const update = () => setBookmarkCount(storage.getBookmarks().length);
    update();
    window.addEventListener('creator_trends_storage_updated', update);
    return () => window.removeEventListener('creator_trends_storage_updated', update);
  }, []);

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Categories', href: '/categories', icon: Layers },
    { label: 'Explore', href: '/trends', icon: Compass },
    { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark, badge: bookmarkCount },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-purple-600 text-white text-[9px] font-extrabold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
