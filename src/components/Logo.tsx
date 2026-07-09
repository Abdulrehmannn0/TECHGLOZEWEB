/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Logo({ className = "h-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exquisite SVG Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto filter drop-shadow-[0_2px_8px_rgba(201,162,39,0.2)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="50%" stopColor="#D6B85A" />
            <stop offset="100%" stopColor="#F8F4E8" />
          </linearGradient>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx="50" cy="50" r="45" />
          </clipPath>
        </defs>

        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          strokeDasharray="6 3"
          className="animate-[spin_120s_linear_infinite]"
        />

        {/* Inner Abstract Geometric Shapes representing T & G */}
        <g clipPath="url(#circleClip)">
          {/* Subtly moving glowing core */}
          <circle cx="50" cy="50" r="30" fill="url(#darkGradient)" />
          
          {/* The T Bar (Gold) */}
          <path
            d="M32 36H68V42H32V36Z"
            fill="url(#goldGradient)"
          />
          {/* The T Stem */}
          <path
            d="M47 42H53V68H47V42Z"
            fill="url(#goldGradient)"
          />
          {/* The G Curve */}
          <path
            d="M36 50C36 57.732 42.268 64 50 64C57.732 64 64 57.732 64 50H58C58 54.418 54.418 58 50 58C45.582 58 42 54.418 42 50C42 45.582 45.582 42 50 42H56V48H50V52H64V38C59 38 41 38 36 50Z"
            fill="url(#goldGradient)"
            opacity="0.85"
          />
        </g>
      </svg>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className="font-display font-extrabold text-[1.25rem] tracking-[0.05em] text-brand-dark dark:text-white">
            TECH<span className="text-brand-gold">GLOZE</span>
          </span>
          <span className="font-mono text-[0.55rem] tracking-[0.45em] text-brand-gold-sec mt-1 uppercase font-semibold">
            IT Solutions
          </span>
        </div>
      )}
    </div>
  );
}
