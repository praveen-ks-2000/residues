import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        blogService.getAllPosts().then((posts) => {
            setRecentPosts(posts.slice(0, 4));
        });
    }, []);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                    Residues <br />
                    <span className="text-2xl md:text-3xl font-normal text-secondary block mt-2">
                        glad to have you here.
                    </span>
                </h1>
                <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                    A collection of residuals—thoughts, notes, and learnings—left behind while exploring the vast landscape of Data Science and machine learning.
                </p>
            </section>

            {/* Recent Blogs */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-primary">Recent Posts</h2>
                    <Link to="/blog" className="text-secondary hover:text-primary transition-colors text-sm flex items-center gap-1">
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group block h-full">
                            <article className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-surface border border-border group-hover:border-primary/50 transition-colors">
                                {/* Full Image Background */}
                                {post.thumbnail ? (
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-surface flex items-center justify-center text-secondary">No Image</div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                                    <div className="text-xs text-primary/80 font-medium">{post.date}</div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
