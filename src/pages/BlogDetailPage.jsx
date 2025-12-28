import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogService } from '../services/blogService';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll on navigation
        if (slug) {
            setLoading(true);
            blogService.getPostBySlug(slug).then(async (data) => {
                if (!data) {
                    navigate('/blog'); // Or 404
                } else {
                    setPost(data);
                    // Fetch related posts if IDs exist
                    if (data.relatedPostIds && data.relatedPostIds.length > 0) {
                        const allPosts = await blogService.getAllPosts();
                        const related = allPosts.filter(p => data.relatedPostIds.includes(p.id));
                        setRelatedPosts(related);
                    } else {
                        setRelatedPosts([]);
                    }
                }
                setLoading(false);
            });
        }
    }, [slug, navigate]);

    if (loading) return <div className="text-secondary">Loading...</div>;
    if (!post) return null;

    return (
        <article className="max-w-3xl mx-auto space-y-10">
            {/* Back Link */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                <ArrowLeft size={20} />
                Back to blog
            </Link>

            {/* Header */}
            <header className="space-y-6">
                <div className="space-y-4">
                    <div className="flex gap-2 text-sm text-secondary">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                        <span>•</span>
                        <span className="text-primary">{post.author}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
                        {post.title}
                    </h1>
                </div>

                {post.thumbnail && (
                    <div className="aspect-video rounded-xl overflow-hidden bg-surface">
                        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}
            </header>



            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({ node, ...props }) => <div className="overflow-x-auto my-8"><table className="min-w-full divide-y divide-border text-left" {...props} /></div>,
                        thead: ({ node, ...props }) => <thead className="bg-surface" {...props} />,
                        th: ({ node, ...props }) => <th className="px-6 py-3 text-sm font-semibold text-primary uppercase tracking-wider" {...props} />,
                        tbody: ({ node, ...props }) => <tbody className="divide-y divide-border" {...props} />,
                        tr: ({ node, ...props }) => <tr className="hover:bg-surface/50 transition-colors" {...props} />,
                        td: ({ node, ...props }) => <td className="px-6 py-4 text-secondary whitespace-nowrap" {...props} />,
                        h1: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
                        h2: ({ node, ...props }) => <h3 className="text-xl font-bold mt-8 mb-4 text-primary" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-secondary/90" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-outside mb-6 ml-6 text-secondary" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-secondary" {...props} />,
                        a: ({ node, ...props }) => <a className="text-primary underline underline-offset-4 hover:text-amber-100" {...props} />,
                        code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={dracula}
                                    customStyle={{ background: '#18181b', borderRadius: '0.5rem', padding: '1.5rem', margin: '2rem 0' }}
                                />
                            ) : (
                                <code {...rest} className="bg-surface px-1.5 py-0.5 rounded text-sm text-primary font-mono">
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            {/* Footer / Tags */}
            <div className="pt-10 border-t border-border mt-10">
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-surface border border-border px-3 py-1 rounded-full text-sm text-secondary">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <div className="pt-16 border-t border-border mt-10">
                    <h3 className="text-2xl font-bold text-primary mb-8">You might also like</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map(related => (
                            <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
                                <article className="relative h-64 rounded-xl overflow-hidden bg-surface border border-border group-hover:border-primary/50 transition-colors">
                                    {related.thumbnail ? (
                                        <img
                                            src={related.thumbnail}
                                            alt={related.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-surface flex items-center justify-center text-secondary">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                                        <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-tight">
                                            {related.title}
                                        </h4>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
};

export default BlogDetailPage;
