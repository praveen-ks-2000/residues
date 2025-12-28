import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import clsx from 'clsx';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            inputRef.current?.focus();
            // Load posts for searching
            blogService.getAllPosts().then(setPosts);
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Handle filtering
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.content.toLowerCase().includes(lowerQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
        setResults(filtered);
    }, [query, posts]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Search Box */}
            <div className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Input Area */}
                <div className="flex items-center px-4 py-4 border-b border-border">
                    <Search className="text-secondary" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search posts..."
                        className="flex-1 bg-transparent border-none focus:outline-none px-4 text-primary placeholder-secondary/50 text-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="p-1 text-secondary hover:text-primary rounded-md hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Results Area */}
                {query && (
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {results.length > 0 ? (
                            <div className="space-y-1">
                                <h3 className="text-xs font-semibold text-secondary px-3 py-2 uppercase tracking-wider">Posts</h3>
                                {results.map(post => (
                                    <Link
                                        key={post.id}
                                        to={`/blog/${post.slug}`}
                                        onClick={onClose}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 group transition-colors"
                                    >
                                        <div>
                                            <h4 className="text-primary font-medium group-hover:text-amber-100 transition-colors">{post.title}</h4>
                                            <p className="text-xs text-secondary mt-0.5 line-clamp-1">{post.date} • {post.tags.join(', ')}</p>
                                        </div>
                                        <ArrowRight size={16} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-secondary">
                                No results found for "{query}"
                            </div>
                        )}
                    </div>
                )}

                {!query && (
                    <div className="p-4 bg-accent/5 text-xs text-secondary text-center">
                        Search by title, content, or tags
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
