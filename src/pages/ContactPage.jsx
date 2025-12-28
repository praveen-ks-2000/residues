import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! This is a demo form.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">Get in Touch</h1>
                <p className="text-secondary max-w-xl mx-auto">
                    Have a project in mind or just want to chat? I'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-primary">Contact Info</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-surface border border-border text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary">Email</h3>
                                <p className="text-secondary">hello@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-surface border border-border text-primary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary">Phone</h3>
                                <p className="text-secondary">+1 (555) 000-0000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-surface border border-border text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary">Location</h3>
                                <p className="text-secondary">Remote / India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-surface border border-border">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Message</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-colors">
                        Send Message <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
