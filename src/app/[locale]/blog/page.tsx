import BlogHero from "@/components/Blog/BlogHero";
import BlogList from "@/components/Blog/BlogList";
import DefaultLayout from "@/components/DefaultLayout";
import { createClient } from '@/lib/supabase/server';
import type { BlogPostFull } from '@/types/models/blog-post.model';

async function getPublishedBlogs(): Promise<BlogPostFull[]> {
  try {
    const supabase = await createClient();

    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        service_category_id,
        service_subcategory_id,
        published_at,
        service_categories (
          id,
          name_nl,
          name_en
        ),
        service_subcategories (
          id,
          name_nl,
          name_en
        ),
        blog_post_content (
          title_nl,
          title_en,
          excerpt_nl,
          excerpt_en,
          content_nl,
          content_en,
          featured_image_url
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching published blog posts:', error);
      return [];
    }

    // Map the response to flatten the structure
    const mappedPosts = (blogPosts || []).map((post: any) => ({
      id: post.id,
      slug: post.slug,
      service_category_id: post.service_category_id,
      service_subcategory_id: post.service_subcategory_id,
      published_at: post.published_at,
      service_category: post.service_categories,
      service_subcategory: post.service_subcategories,
      content: post.blog_post_content || null,
    }));

    return mappedPosts as BlogPostFull[];
  } catch (error) {
    console.error('Error in getPublishedBlogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  // Fetch all published blogs on the server
  const blogs = await getPublishedBlogs();

  // Split blogs: first one is featured, rest go to BlogList
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <DefaultLayout>
      <BlogHero featuredBlog={featuredBlog} />
      <BlogList blogs={remainingBlogs} />
    </DefaultLayout>
  );
}

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;
