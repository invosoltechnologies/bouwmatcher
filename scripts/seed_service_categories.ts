import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { servicesData } from '@/data/services';

export default async function seedServiceCategories() {
  console.log('🌱 Seeding service_categories...');

  const servicesToInsert = servicesData.map((service) => ({
    name_nl: service.name_nl,
    name_en: service.name_en,
    slug: service.slug,
  }));

  const { data, error } = await supabaseAdmin
    .from('service_categories')
    .insert(servicesToInsert)
    .select();

  if (error) {
    console.error('❌ Error:', error);
    throw error;
  }

  console.log(`✅ Successfully seeded ${data.length} service categories!`);
}
