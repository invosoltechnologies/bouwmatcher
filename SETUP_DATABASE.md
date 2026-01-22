# Database Management Setup

Quick setup guide for the database migration and backup system.

## Prerequisites

Before you can use the database management tools, you need to install the required dependencies.

## 1. Install Node.js Package

The migration system uses the `pg` (node-postgres) library for direct PostgreSQL access.

```bash
npm install pg @types/pg --save-dev
```

This package is required for:
- Running migrations
- Creating backups
- Restoring from backups
- Seeding data
- Checking migration status

## 2. Install PostgreSQL Client Tools

The backup and restore commands use `pg_dump` and `psql` command-line tools.

### Windows

Download and install PostgreSQL from:
https://www.postgresql.org/download/windows/

**Or use Chocolatey:**
```bash
choco install postgresql
```

### macOS

```bash
brew install postgresql
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-get install postgresql-client
```

### Verify Installation

```bash
# Check pg_dump
pg_dump --version

# Check psql
psql --version
```

You should see version information for both commands.

## 3. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Database connection string
# Get this from: Supabase Dashboard > Settings > Database > Connection string > Direct connection
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# These should already exist:
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### How to Get DATABASE_URL

1. Go to your Supabase Dashboard
2. Navigate to **Settings** (⚙️) → **Database**
3. Scroll to **Connection string** section
4. Select **Direct connection** (NOT "Transaction pooler")
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual database password
7. Add to `.env.local`

**Example:**
```env
DATABASE_URL=postgresql://postgres:mySecretPassword@db.abcdefghijklm.supabase.co:5432/postgres
```

## 4. Verify Setup

Test that everything is configured correctly:

```bash
# Check migration status (should connect successfully)
npm run db:status
```

Expected output:
```
🗄️  Database Migration Status

📁 Migrations directory: d:\code\bouwmatcher\migrations
🔗 Connected to database

📋 Found 2 migration files
✅ 0 migrations already applied
```

## 5. Run Initial Migration (Optional)

If you want to create all tables from scratch:

```bash
# Check what migrations are pending
npm run db:status

# Run all pending migrations
npm run db:migrate
```

**⚠️ WARNING**: This will create all tables in your database. Make sure you're running this on the correct database (dev/staging, not production if you already have data there).

## Troubleshooting

### "pg_dump: command not found"

**Problem**: PostgreSQL client tools not installed or not in PATH.

**Solution**:
- Install PostgreSQL client tools (see step 2 above)
- On Windows, you may need to add `C:\Program Files\PostgreSQL\[version]\bin` to your PATH
- Restart your terminal after installation

### "Error: getaddrinfo ENOTFOUND"

**Problem**: DATABASE_URL is incorrect or not set.

**Solution**:
- Verify DATABASE_URL is in `.env.local`
- Check the connection string format is correct
- Ensure project reference matches your Supabase project

### "password authentication failed"

**Problem**: Database password is incorrect.

**Solution**:
- Double-check your database password in Supabase Dashboard
- Reset database password if needed (Settings > Database > Database Password)
- Update DATABASE_URL with new password

### "Cannot find module 'pg'"

**Problem**: The `pg` package is not installed.

**Solution**:
```bash
npm install pg @types/pg --save-dev
```

## Next Steps

Once setup is complete, see [DATABASE.md](./DATABASE.md) for:
- Full documentation of all commands
- How to create migrations
- How to backup and restore
- How to seed development data
- Workflow examples
- Best practices

## Available Commands

Quick reference:

```bash
# Migrations
npm run db:status      # Show migration status
npm run db:migrate     # Run pending migrations
npm run db:rollback    # Rollback last migration

# Backups
npm run db:backup      # Create full backup
npm run db:restore -- --latest  # Restore latest backup

# Seeding
npm run db:seed        # Seed development data
```

For detailed usage, see [DATABASE.md](./DATABASE.md).
