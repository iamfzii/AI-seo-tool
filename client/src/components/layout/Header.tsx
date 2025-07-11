import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Github, Worm } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;
  
  // Check if user is on dashboard/authenticated pages
  const isAuthenticated = location.startsWith('/dashboard') || location.startsWith('/reports') || location.startsWith('/history');
  
  // Check if on landing page
  const isLandingPage = location === '/';

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Worm className="text-primary text-2xl" />
            <span className="text-xl font-bold">Crawlin.io</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {isLandingPage ? (
              <>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#pricing" className="hover:text-primary transition-colors">
                  Pricing
                </a>
                <a href="#about" className="hover:text-primary transition-colors">
                  About
                </a>
              </>
            ) : (
              <>
                <Link href="/dashboard" className={`hover:text-primary transition-colors ${isActive('/dashboard') ? 'text-primary' : ''}`}>
                  Dashboard
                </Link>
                <Link href="/reports" className={`hover:text-primary transition-colors ${isActive('/reports') ? 'text-primary' : ''}`}>
                  Reports
                </Link>
                <Link href="/history" className={`hover:text-primary transition-colors ${isActive('/history') ? 'text-primary' : ''}`}>
                  History
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 text-sm">
                <Github className="w-4 h-4" />
                <span>john.doe</span>
              </div>
            ) : (
              <Button size="sm" className="glow-effect" onClick={() => window.location.href = '/api/login'}>
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
