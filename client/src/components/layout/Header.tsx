import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Github, Worm } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Worm className="text-primary text-2xl" />
            <span className="text-xl font-bold">Crawlin.io</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : ''}`}>
              Home
            </Link>
            <Link href="/dashboard" className={`hover:text-primary transition-colors ${isActive('/dashboard') ? 'text-primary' : ''}`}>
              Dashboard
            </Link>
            <Link href="/reports" className={`hover:text-primary transition-colors ${isActive('/reports') ? 'text-primary' : ''}`}>
              Reports
            </Link>
            <Link href="/history" className={`hover:text-primary transition-colors ${isActive('/history') ? 'text-primary' : ''}`}>
              History
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Github className="w-4 h-4" />
              <span>john.doe</span>
            </div>
            <Button size="sm" className="glow-effect">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
