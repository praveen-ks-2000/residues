import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="space-y-16">
            {/* Hero */}
            <section className="grid md:grid-cols-2 gap-12 items-center text-primary">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        I'm Praveen. <br />
                        <span className="text-secondary">Product Designer from India.</span>
                    </h1>
                    <p className="text-lg text-secondary leading-relaxed">
                        I specialize in building high-quality design systems and user interfaces.
                        With a background in both development and design, I bridge the gap between
                        functionality and aesthetics.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/contact" className="px-6 py-2.5 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 transition-colors">
                            Get in Touch
                        </Link>
                    </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                        alt="Praveen"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Experience / Story */}
            <section className="max-w-2xl space-y-8">
                <h2 className="text-2xl font-bold text-primary">My Story</h2>
                <div className="space-y-4 text-secondary leading-relaxed">
                    <p>
                        I started my journey as a graphic designer, eventually falling in love with
                        interactive media. Over the years, I've worked with startups and established
                        companies to ship products that people love.
                    </p>
                    <p>
                        Currently, I'm focusing on inclusive design practices and accessibility.
                        I believe the web should be accessible to everyone.
                    </p>
                </div>
            </section>

            {/* Facts / Skills */}
            <section className="grid sm:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="text-xl font-bold text-primary mb-2">Design</h3>
                    <p className="text-secondary">UI/UX, prototyping, design systems, and interaction design.</p>
                </div>
                <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="text-xl font-bold text-primary mb-2">Development</h3>
                    <p className="text-secondary">React, Tailwind CSS, and frontend architecture.</p>
                </div>
                <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="text-xl font-bold text-primary mb-2">Tools</h3>
                    <p className="text-secondary">Figma, VS Code, Notion, and Linear.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
