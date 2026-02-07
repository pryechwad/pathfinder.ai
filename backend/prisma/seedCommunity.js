const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedForumCategories() {
  const categories = [
    {
      name: 'Data Science & AI',
      description: 'Discuss machine learning, data analysis, and AI careers',
      icon: '🤖',
      color: 'blue'
    },
    {
      name: 'Engineering',
      description: 'Software, mechanical, civil, and other engineering fields',
      icon: '⚙️',
      color: 'purple'
    },
    {
      name: 'Medical & Healthcare',
      description: 'MBBS, nursing, pharmacy, and healthcare careers',
      icon: '🏥',
      color: 'red'
    },
    {
      name: 'Business & Management',
      description: 'MBA, entrepreneurship, and business careers',
      icon: '💼',
      color: 'green'
    },
    {
      name: 'Creative Arts',
      description: 'Design, fashion, music, and creative careers',
      icon: '🎨',
      color: 'pink'
    },
    {
      name: 'Law & Civil Services',
      description: 'Legal careers, UPSC, and government jobs',
      icon: '⚖️',
      color: 'yellow'
    },
    {
      name: 'Career Guidance',
      description: 'General career advice and guidance',
      icon: '🎯',
      color: 'indigo'
    },
    {
      name: 'Study Tips',
      description: 'Study techniques, time management, and productivity',
      icon: '📚',
      color: 'orange'
    }
  ];

  for (const category of categories) {
    await prisma.forumCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  console.log('✅ Forum categories seeded');
}

async function main() {
  try {
    await seedForumCategories();
    console.log('🌱 Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
