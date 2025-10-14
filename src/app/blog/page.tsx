import BlogHero from "@/components/Blog/BlogHero";
import BlogList from "@/components/Blog/BlogList";
import DefaultLayout from "@/components/DefaultLayout";

export default function BlogPage() {
  return (
    <DefaultLayout>
      <BlogHero />
      <BlogList />
    </DefaultLayout>
  );
}