'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import BlogPostsTable from '@/components/admin-dashboard/blog/BlogPostsTable';
import AddBlogDialog from '@/components/admin-dashboard/blog/AddBlogDialog';
import {
  useBlogPosts,
  useCreateBlogPost,
  useDeleteBlogPost,
  usePublishBlogPost,
} from '@/lib/hooks/admin/blog-post';
import type { BlogPostFull } from '@/types/models/blog-post.model';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function BlogManagementPage() {
  const locale = useLocale();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'published'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletePost, setDeletePost] = useState<BlogPostFull | null>(null);

  // Fetch blog posts
  const { data: posts = [], isLoading } = useBlogPosts({
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: search || undefined,
  });

  // Mutations
  const createMutation = useCreateBlogPost();
  const deleteMutation = useDeleteBlogPost();
  const publishMutation = usePublishBlogPost();

  const handleCreatePost = async (data: { slug: string; title_nl: string; title_en: string }) => {
    await createMutation.mutateAsync(data);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (post: BlogPostFull) => {
    router.push(`/${locale}/admin-dashboard/blog/post-builder?id=${post.id}`);
  };

  const handleDelete = (post: BlogPostFull) => {
    setDeletePost(post);
  };

  const confirmDelete = async () => {
    if (deletePost) {
      await deleteMutation.mutateAsync(deletePost.id);
      setDeletePost(null);
    }
  };

  const handleStatusChange = async (
    post: BlogPostFull,
    status: 'draft' | 'pending' | 'published'
  ) => {
    await publishMutation.mutateAsync({ id: post.id, status });
  };

  return (
    <div className="">
      {/* Filters */}
      <div className="flex justify-between items-center bg-white p-4 rounded-t-lg border border-slate-200">
   <div className="flex items-center gap-4">

                      
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={locale === 'nl' ? 'Zoek op titel...' : 'Search by title...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-300"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
        >
          <SelectTrigger className="w-48 bg-slate-50 border-slate-300" iconHeight={20} iconWidth={20}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {locale === 'nl' ? 'Alle Statussen' : 'All Statuses'}
            </SelectItem>
            <SelectItem value="draft">
              {locale === 'nl' ? 'Concept' : 'Draft'}
            </SelectItem>
            <SelectItem value="pending">
              {locale === 'nl' ? 'In behandeling' : 'Pending'}
            </SelectItem>
            <SelectItem value="published">
              {locale === 'nl' ? 'Gepubliceerd' : 'Published'}
            </SelectItem>
          </SelectContent>
        </Select>
</div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          {locale === 'nl' ? 'Nieuwe Blogpost' : 'New Blog Post'}
        </Button>

      </div>

      {/* Table */}
      <div className="bg-white rounded-b-lg border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            {locale === 'nl' ? 'Laden...' : 'Loading...'}
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {locale === 'nl' ? 'Geen blogposts gevonden' : 'No blog posts found'}
          </div>
        ) : (
          <BlogPostsTable
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Add Blog Dialog */}
      <AddBlogDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleCreatePost}
        isLoading={createMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePost} onOpenChange={() => setDeletePost(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {locale === 'nl' ? 'Blogpost verwijderen?' : 'Delete blog post?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {locale === 'nl'
                ? 'Weet je zeker dat je deze blogpost wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
                : 'Are you sure you want to delete this blog post? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending
                ? locale === 'nl'
                  ? 'Verwijderen...'
                  : 'Deleting...'
                : locale === 'nl'
                ? 'Verwijderen'
                : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
