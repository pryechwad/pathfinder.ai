const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('📊 Connection string:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
    
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('⏰ Database time:', result.rows[0].now);
    
    client.release();
    await pool.end();
    
    console.log('\n✨ Connection test passed! You can now run: node prisma/seed.js');
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Fix:');
    console.log('1. Open backend/.env');
    console.log('2. Replace YOUR_POSTGRES_PASSWORD_HERE with your actual PostgreSQL password');
    console.log('3. Make sure PostgreSQL is running');
    process.exit(1);
  }
}

testConnection();
