"use client"
import React from 'react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 

  return (
      
      <div className="main-content">
        {children}
      </div>
  );
};
