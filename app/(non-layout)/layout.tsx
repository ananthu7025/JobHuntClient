"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', icon: 'fas fa-home', label: 'Overview' },
    { href: '/jobs', icon: 'fas fa-briefcase', label: 'Jobs' },
    { href: '/candidates', icon: 'fas fa-users', label: 'Candidates' },
    { href: '/resume-scores', icon: 'fas fa-file-alt', label: 'Resume Scores' },
    { href: '/users', icon: 'fas fa-user-friends', label: 'Users' },
    { href: '/settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  const isActivePath = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="jobhunt-platform">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="brand">JobHunt Platform</div>
          <div className="subtitle">HR Dashboard</div>
        </div>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={isActivePath(item.href) ? 'active' : ''}
              >
                <i className={item.icon}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};
