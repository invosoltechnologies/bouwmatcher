const fileName = process.argv[2];

if (!fileName) {
  console.error('❌ Please provide a seed file name');
  console.log('Usage: npm run seed <filename>');
  console.log('Example: npm run seed service_categories');
  process.exit(1);
}

async function runSeed() {
  try {
    const seedModule = await import(`./${fileName}`);

    if (typeof seedModule.default === 'function') {
      await seedModule.default();
    } else if (typeof seedModule.seed === 'function') {
      await seedModule.seed();
    } else {
      console.error(
        '❌ Seed file must export a default function or named "seed" function'
      );
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error running seed:', error.message);
    process.exit(1);
  }
}

runSeed();
