'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MentorPromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    setIsMounted(true);

    const hasSeenPromo = localStorage.getItem('hasSeenMentorPromo');
    
    if (!hasSeenPromo) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-close after 20 seconds
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenMentorPromo', 'true');
  };

  const handleActionClick = () => {
    localStorage.setItem('hasSeenMentorPromo', 'true');
    setIsOpen(true);
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        
        {/* Top Progress Bar */}
        <div className="h-0.5 w-full bg-gray-100 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 px-8 py-10 text-center relative">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 01-5.356-1.857M17 20H7m5-2v-2c0-.656-.126-1.284-.356-1.852M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.284.356-1.852m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Become a Mentor
          </h2>
          <p className="mt-2 text-blue-100 text-[15px]">
            Share your expertise • Build your legacy
          </p>
        </div>

        {/* Close Button - Fixed & Professional */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6L18 18" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-8 pb-9 pt-8 text-center">
          <p className="text-gray-600 leading-relaxed text-[15.5px]">
            Join our platform as a mentor and guide the next generation of professionals. 
            Earn respect, expand your network, and create meaningful impact.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link 
              href="/mentor/login" 
              onClick={handleActionClick}
              className="w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.985]"
            >
              Become a Mentor Now
            </Link>

            <button
              onClick={handleClose}
              className="w-full rounded-2xl py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all border border-gray-200"
            >
              Maybe Later ({timeLeft}s)
            </button>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            This offer will close automatically in a few seconds
          </p>
        </div>
      </div>
    </div>
  );
}