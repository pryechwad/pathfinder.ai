# Database Migration Instructions

## After updating the Prisma schema, run these commands:

1. Generate Prisma Client:
```bash
cd backend
npx prisma generate
```

2. Create and apply migration:
```bash
npx prisma migrate dev --name add_contact_model
```

3. (Optional) If you want to reset the database:
```bash
npx prisma migrate reset
```

## Changes Made:
- Added Contact model to store contact form submissions
- Fields: id, name, email, subject, message, createdAt
