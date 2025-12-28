import postsData from '../data/posts.json';

// Map of markdown files using Vite's glob import
// This allows us to dynamic import the content based on the filename in JSON
const markdownFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });

export const blogService = {
    getAllPostsWithContent: async () => {
        // Sort by date desc
        const sorted = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));
        // Load content for all
        const promises = sorted.map(async (post) => {
            const path = `../content/posts/${post.content}`;
            const loadContent = markdownFiles[path];
            let content = "";
            if (loadContent) {
                content = await loadContent();
            }
            return { ...post, content };
        });
        return Promise.all(promises);
    },

    getPostBySlug: async (slug) => {
        const post = postsData.find(p => p.slug === slug);
        if (!post) {
            return null;
        }

        try {
            // Construct path key to match glob
            const path = `../content/posts/${post.content}`;
            const loadContent = markdownFiles[path];

            if (loadContent) {
                const content = await loadContent();

                // Polyfill for UI compatibility
                const relatedPostIds = (post.related_slugs || []).map(s => {
                    const r = postsData.find(p => p.slug === s);
                    return r ? r.id : null;
                }).filter(Boolean);

                return {
                    ...post,
                    content: content,
                    relatedPostIds
                };
            } else {
                console.error(`Markdown file not found: ${path}`);
                return { ...post, content: "Content not found." };
            }
        } catch (error) {
            console.error("Error loading markdown:", error);
            return null;
        }
    },

    // Alias for compatibility
    getAllPosts: () => blogService.getAllPostsWithContent()
};
