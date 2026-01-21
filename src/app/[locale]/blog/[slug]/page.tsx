import DefaultLayout from "@/components/DefaultLayout";
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { notFound } from 'next/navigation';
import type { BlogPostFull } from '@/types/models/blog-post.model';
import BlogHero from '@/components/Blog/BlogHero';
import BlogDetailContent from '@/components/Blog/BlogDetailContent';
import BlogFAQ from '@/components/Blog/BlogFAQ';
import RelatedBlogs from '@/components/Blog/RelatedBlogs';

async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  try {
    const supabase = await createClient();

    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        status,
        service_category_id,
        service_subcategory_id,
        published_at,
        created_at,
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
          id,
          blog_post_id,
          title_nl,
          title_en,
          excerpt_nl,
          excerpt_en,
          content_nl,
          content_en,
          featured_image_url,
          featured_image_alt,
          created_at,
          updated_at
        ),
        blog_post_meta (
          id,
          blog_post_id,
          meta_title_nl,
          meta_title_en,
          meta_description_nl,
          meta_description_en,
          created_at,
          updated_at
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !blogPost) {
      return null;
    }

    // Map the response to flatten the structure
    // Note: one-to-one relationships return arrays, but we need single objects
    const contentArray = Array.isArray(blogPost.blog_post_content) ? blogPost.blog_post_content : [blogPost.blog_post_content];
    const metaArray = Array.isArray(blogPost.blog_post_meta) ? blogPost.blog_post_meta : [blogPost.blog_post_meta];

    return {
      id: blogPost.id,
      slug: blogPost.slug,
      status: blogPost.status,
      service_category_id: blogPost.service_category_id,
      service_subcategory_id: blogPost.service_subcategory_id,
      published_at: blogPost.published_at,
      created_at: blogPost.created_at,
      created_by: null,
      published_by: null,
      updated_by: null,
      updated_at: blogPost.created_at,
      service_category: blogPost.service_categories,
      service_subcategory: blogPost.service_subcategories,
      content: contentArray && contentArray[0] ? contentArray[0] : null,
      meta: metaArray && metaArray[0] ? metaArray[0] : null,
    } as BlogPostFull;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
}

async function getRelatedBlogs(currentBlogPostId: string): Promise<BlogPostFull[]> {
  try {
    const supabase = await createClient();

    const { data: relatedPosts, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        status,
        service_category_id,
        service_subcategory_id,
        published_at,
        created_at,
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
          id,
          blog_post_id,
          title_nl,
          title_en,
          excerpt_nl,
          excerpt_en,
          content_nl,
          content_en,
          featured_image_url,
          featured_image_alt,
          created_at,
          updated_at
        )
      `)
      .eq('status', 'published')
      .neq('id', currentBlogPostId)
      .order('published_at', { ascending: false })
      .limit(10);

    if (error || !relatedPosts) {
      return [];
    }

    // Map the response to flatten the structure
    return relatedPosts.map((post: any) => {
      // Handle one-to-one relationships that may return arrays
      const contentArray = Array.isArray(post.blog_post_content) ? post.blog_post_content : [post.blog_post_content];

      return {
        id: post.id,
        slug: post.slug,
        status: post.status,
        service_category_id: post.service_category_id,
        service_subcategory_id: post.service_subcategory_id,
        published_at: post.published_at,
        created_at: post.created_at,
        created_by: null,
        published_by: null,
        updated_by: null,
        updated_at: post.created_at,
        service_category: post.service_categories,
        service_subcategory: post.service_subcategories,
        content: contentArray && contentArray[0] ? contentArray[0] : null,
        meta: null,
      };
    }) as BlogPostFull[];
  } catch (error) {
    console.error('Error in getRelatedBlogs:', error);
    return [];
  }
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  // Show 404 if blog post not found
  if (!blogPost) {
    notFound();
  }

  // Fetch related blogs
  const relatedBlogs = await getRelatedBlogs(blogPost.id);

  return (
    <DefaultLayout>
      <BlogHero featuredBlog={blogPost} showReadMore={false} />
      <BlogDetailContent blogPost={blogPost} />
      <BlogFAQ blogPost={blogPost} />
      {relatedBlogs.length > 0 && <RelatedBlogs currentBlogId={blogPost.id} blogs={relatedBlogs} />}
    </DefaultLayout>
  );
}

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for published blog posts
export async function generateStaticParams() {
  // Use admin client for build-time static generation (no cookies available)
  const { data: blogPosts } = await supabaseAdmin
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');

  return (blogPosts || []).map((post) => ({
    slug: post.slug,
  }));
}
