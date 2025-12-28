import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, User, Mail, Github, Linkedin, Twitter, Search } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'About', path: '/about', icon: User },
    { label: 'Contact', path: '/contact', icon: Mail },
];

const SOCIAL_LINKS = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
];

const Sidebar = ({ onSearchClick, isOpen, onClose }) => {
    return (
        <aside
            className={clsx(
                "bg-surface border-r border-border flex flex-col p-6 transition-transform duration-300 ease-in-out",
                // Desktop styles
                "md:w-64 md:h-screen md:sticky md:top-0 md:translate-x-0 md:z-auto",
                // Mobile styles
                "fixed bottom-0 left-0 z-50 w-64 top-16",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
        >
            {/* Profile Section */}
            <div className="flex flex-col gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 overflow-hidden shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-md:hidden">
                    <h2 className="font-bold text-lg text-primary">Praveen</h2>
                    <p className="text-sm text-secondary">Product Designer</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium",
                            isActive
                                ? "bg-accent/10 text-primary"
                                : "text-secondary hover:text-primary hover:bg-accent/5"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </NavLink>
                ))}

                {/* Search Trigger */}
                <button
                    onClick={onSearchClick}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium text-secondary hover:text-primary hover:bg-accent/5 text-left w-full"
                >
                    <Search size={18} />
                    Search
                </button>
            </nav>

            {/* Socials */}
            <div className="flex gap-4 px-4 pt-6 border-t border-border mt-auto">
                {SOCIAL_LINKS.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary transition-colors"
                    >
                        <link.icon size={20} />
                    </a>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
