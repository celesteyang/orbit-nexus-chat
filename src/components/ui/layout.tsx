
import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {children}
    </div>
  );
};

export const Container = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export const Card = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("card-orbit", className)}>
      {children}
    </div>
  );
};
