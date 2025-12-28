import React, { useEffect, useState, useMemo } from 'react';
import { blogService } from '../services/blogService';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import clsx from 'clsx';

const BlogListPage = () => {
    const [posts, setPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(false);

    useEffect(() => {
        // In a real app, we might fetch only fields needed for the list
        blogService.getAllPosts().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set();
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
            return matchesTag;
        });
    }, [posts, selectedTag]);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-primary">Writing</h1>
                <p className="text-secondary max-w-xl mt-2">
                    Thoughts on design, development, and the future of digital experiences.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-12 items-start">

                {/* Sidebar: Tags - Order first on mobile, last on desktop */}
                <aside className="md:col-span-1 md:order-last space-y-6">
                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsTagsOpen(!isTagsOpen)}
                            className="flex items-center gap-2 w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary font-medium"
                        >
                            <Tag size={18} />
                            {isTagsOpen ? 'Hide Tags' : 'Filter by Tags'}
                        </button>
                    </div>

                    <div className={clsx("space-y-4", isTagsOpen ? "block" : "hidden md:block")}>
                        <h3 className="text-lg font-bold text-primary max-md:hidden">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={clsx(
                                    "px-3 py-1.5 rounded-full border text-sm transition-colors",
                                    !selectedTag ? "bg-primary text-background border-primary" : "bg-surface border-border text-secondary hover:text-primary hover:border-primary"
                                )}
                            >
                                All
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                    className={clsx(
                                        "px-3 py-1.5 rounded-full border text-sm transition-colors",
                                        selectedTag === tag ? "bg-primary text-background border-primary" : "bg-surface border-border text-secondary hover:text-primary hover:border-primary"
                                    )}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content: Blog List */}
                <div className="md:col-span-3 space-y-8">
                    {loading ? (
                        <div className="text-secondary">Loading posts...</div>
                    ) : (
                        <div className="grid gap-8">
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                                        <article className="grid md:grid-cols-4 gap-6 items-start p-4 -mx-4 rounded-xl hover:bg-surface/50 transition-colors">
                                            <div className="md:col-span-1 aspect-video md:aspect-square rounded-lg bg-surface overflow-hidden">
                                                {post.thumbnail && (
                                                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                )}
                                            </div>
                                            <div className="md:col-span-3 space-y-3">
                                                <div className="flex items-center gap-3 text-xs text-secondary">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <div className="flex gap-2">
                                                        {post.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="bg-accent/10 px-2 py-0.5 rounded text-primary">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <h2 className="text-xl font-bold text-primary group-hover:text-amber-100 transition-colors">
                                                    {post.title}
                                                </h2>
                                                <p className="text-secondary line-clamp-2">
                                                    {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
                                                </p>
                                                <span className="inline-block text-sm font-medium text-primary border-b border-primary/20 pb-0.5 group-hover:border-primary transition-colors">
                                                    Read Article
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-20 text-secondary">
                                    No posts found matching the filtered tag.
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BlogListPage;
