import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchModal from '../ui/SearchModal';
import { Menu, Search } from 'lucide-react';
import clsx from 'clsx';

const Layout = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - Passed mobile state */}
            <Sidebar
                onSearchClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                }}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />

            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-50 flex items-center px-4 justify-between">
                <span className="font-bold text-lg text-primary">Praveen</span>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsSearchOpen(true)} className="text-secondary hover:text-primary">
                        <Search size={22} />
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary hover:text-primary">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 max-md:pt-16">
                <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
                    <Outlet />
                </div>
            </main>

            {/* Global Search Overlay */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Layout;
