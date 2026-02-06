const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ 
  host: 'localhost',
  port: 5432,
  database: 'pathfinder_ai',
  user: 'postgres',
  password: 'password',
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
