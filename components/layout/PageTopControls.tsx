'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

export default function PageTopControls() {
  const pathname = usePathname();

  // Do not show on homepage
  if (!pathname || pathname === '/') return null;

  return (
    <div className="fixed top-6 left-6 z-[10001]">
      <BackButton />
    </div>
  );
}
