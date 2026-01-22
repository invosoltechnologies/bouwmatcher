# Database Management System

Complete database management toolkit for **Bouwmatcher**, including migrations, backups, seeding, and restore capabilities.

## Table of Contents

- [Quick Start](#quick-start)
- [Setup](#setup)
- [Available Commands](#available-commands)
- [Migrations](#migrations)
- [Backups & Restore](#backups--restore)
- [Seeding](#seeding)
- [Workflow Examples](#workflow-examples)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Install required dependencies
npm install pg @types/pg --save-dev

# 2. Setup environment variables
# Add to .env.local:
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# 3. Check migration status
npm run db:status

# 4. Run pending migrations
npm run db:migrate

# 5. Create a backup
npm run db:backup
```

---

## Setup

### 1. Install PostgreSQL Client Tools

The backup and restore scripts use `pg_dump` and `psql` command-line tools.

**Windows:**
```bash
# Download from: https://www.postgresql.org/download/windows/
# Or use Chocolatey:
choco install postgresql
```

**macOS:**
```bash
brew install postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql-client
```

### 2. Install Node.js Dependencies

```bash
npm install pg @types/pg --save-dev
```

### 3. Configure Environment Variables

Add to your `.env.local` file:

```env
# Get this from Supabase Dashboard > Settings > Database > Connection string
# Choose "Direct connection" (not "Transaction pooler")
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Already existing (keep these):
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**How to get DATABASE_URL:**
1. Go to Supabase Dashboard
2. Navigate to **Settings** > **Database**
3. Scroll to **Connection string**
4. Select **Direct connection**
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your database password

---

## Available Commands

### Migration Commands

| Command | Description |
|---------|-------------|
| `npm run db:status` | Show current migration status |
| `npm run db:migrate` | Run all pending migrations |
| `npm run db:rollback` | Rollback the last migration |
| `npm run db:migrate -- --to=005` | Migrate to specific version |

### Backup & Restore Commands

| Command | Description |
|---------|-------------|
| `npm run db:backup` | Create full database backup (unlimited rows) |
| `npm run db:backup -- --output=mybackup` | Create backup with custom name |
| `npm run db:restore -- --file=backup.sql` | Restore from specific backup |
| `npm run db:restore -- --latest` | Restore from most recent backup |

### Seeding Commands

| Command | Description |
|---------|-------------|
| `npm run db:seed` | Run all development seed files |
| `npm run db:seed -- --file=users` | Run specific seed file |
| `npm run db:seed -- --force` | Skip safety checks |

---

## Migrations

### What are Migrations?

Migrations are version-controlled database schema changes. Each migration is a SQL file that can be applied (UP) or reverted (DOWN).

### Creating a New Migration

1. Create a new file in `migrations/` directory:
   ```
   migrations/002_add_user_preferences.sql
   ```

2. Follow this format:
   ```sql
   -- Add user preferences table
   CREATE TABLE user_preferences (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     theme VARCHAR(20) DEFAULT 'light',
     language VARCHAR(5) DEFAULT 'nl',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

   -- DOWN
   DROP TABLE IF EXISTS user_preferences;
   ```

3. Run the migration:
   ```bash
   npm run db:migrate
   ```

### Migration File Naming Convention

Format: `[VERSION]_[DESCRIPTION].sql`

Examples:
- `001_initial_schema.sql` ✅
- `002_add_notifications.sql` ✅
- `003_update_user_fields.sql` ✅
- `add-notifications.sql` ❌ (missing version number)
- `002_add notifications.sql` ❌ (spaces not allowed)

### UP and DOWN Sections

**UP Section** (top of file):
- Creates tables, adds columns, creates indexes
- Runs when executing `npm run db:migrate`

**DOWN Section** (after `-- DOWN` comment):
- Reverts changes (drops tables, removes columns, drops indexes)
- Runs when executing `npm run db:rollback`

Example:
```sql
-- UP: Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DOWN: Remove notifications table
DROP TABLE IF EXISTS notifications;
```

### Checking Migration Status

```bash
npm run db:status
```

Output example:
```
📊 Migration Status:

Status | Version | Name                           | Applied At          | Time
-------|---------|--------------------------------|---------------------|-------
✅ APP | 000     | schema_migrations              | 2026-01-22 10:30:00 | 0ms
✅ APP | 001     | initial_schema                 | 2026-01-22 10:30:15 | 1523ms
⏳ PEN | 002     | add_user_preferences           | -                   | -

📈 Summary:
   Total migrations: 3
   ✅ Applied:       2
   ⏳ Pending:       1
```

### Migration Safety Features

1. **Checksum Verification**: Detects if applied migrations were modified
2. **Transaction Support**: All statements run in a transaction (all-or-nothing)
3. **Dependency Order**: Run migrations in version order
4. **Rollback Protection**: Won't rollback if no DOWN section exists

---

## Backups & Restore

### Creating Backups

**Full backup (unlimited rows):**
```bash
npm run db:backup
```

This creates: `backups/backup_2026-01-22_14-30-00.sql`

**Custom filename:**
```bash
npm run db:backup -- --output=before-migration
```

This creates: `backups/before-migration.sql`

### Backup Format

Backups are created using `pg_dump` with these options:
- **Full schema + data**: All tables, indexes, constraints
- **Clean format**: Includes DROP statements for safe restore
- **No owner/privileges**: Portable across databases
- **Unlimited rows**: Bypasses Supabase row limits

### Restoring from Backup

**From specific file:**
```bash
npm run db:restore -- --file=backup_2026-01-22_14-30-00.sql
```

**From latest backup:**
```bash
npm run db:restore -- --latest
```

**Safety features:**
- Prompts for confirmation before restoring
- Validates backup file exists and contains SQL
- Shows backup file size before restoring
- Uses transactions for atomic restore

⚠️ **WARNING**: Restore will DROP all existing tables and recreate from backup!

### Backup Storage

- **Local storage**: `backups/` directory (gitignored)
- Backups are NOT committed to git (too large)
- Consider external backup strategy for production

### Recommended Backup Schedule

- **Before migrations**: Always backup before running migrations
- **Daily**: Automate daily backups for production
- **Before major changes**: Manual backup before risky operations

---

## Seeding

### What is Seeding?

Seeding populates your database with **development/testing data**. This is separate from production backups.

### Seed File Location

Create seed files in: `seeds/development/`

### Creating Seed Files

1. Create a new SQL file:
   ```
   seeds/development/001_service_categories.sql
   ```

2. Add INSERT statements:
   ```sql
   -- Service Categories
   INSERT INTO service_categories (name_nl, name_en, slug, icon)
   VALUES
     ('Aannemer', 'Contractor', 'aannemer', 'hammer'),
     ('Schilder', 'Painter', 'schilder', 'paintbrush'),
     ('Loodgieter', 'Plumber', 'loodgieter', 'wrench');

   -- Service Subcategories
   INSERT INTO service_subcategories (category_id, name_nl, name_en, slug)
   SELECT
     id,
     'Nieuwbouw',
     'New Construction',
     'nieuwbouw'
   FROM service_categories WHERE slug = 'aannemer';
   ```

3. Run the seed:
   ```bash
   npm run db:seed
   ```

### Seed vs Backup

| Feature | Seed | Backup |
|---------|------|--------|
| Purpose | Development data | Production data |
| Storage | `seeds/development/` | `backups/` |
| Committed to git | ✅ Yes | ❌ No |
| Data size | Small sample data | Full database |
| Use case | Local development | Disaster recovery |

### Safety Checks

The seed script will warn you if database already has data:
```
⚠️  WARNING: Database already contains data!
   Seeding may cause duplicate key errors or data conflicts.

Continue anyway? Type "yes" to confirm:
```

To skip this check:
```bash
npm run db:seed -- --force
```

---

## Workflow Examples

### Starting a New Feature

```bash
# 1. Backup current state
npm run db:backup -- --output=before-feature-x

# 2. Create migration
# Create: migrations/005_add_feature_x.sql

# 3. Run migration
npm run db:migrate

# 4. Test the feature
npm run dev

# 5. If something breaks, rollback
npm run db:rollback
```

### Setting Up Development Environment

```bash
# 1. Clone repository
git clone <repo>

# 2. Install dependencies
npm install
npm install pg @types/pg --save-dev

# 3. Setup environment variables
# Add DATABASE_URL to .env.local

# 4. Run migrations
npm run db:migrate

# 5. Seed development data
npm run db:seed

# 6. Start development
npm run dev
```

### Production Deployment

```bash
# 1. Backup production database
npm run db:backup -- --output=prod-backup-$(date +%Y-%m-%d)

# 2. Check migration status
npm run db:status

# 3. Test migrations on staging first
npm run db:migrate

# 4. If successful, run on production
npm run db:migrate
```

### Recovering from Mistakes

```bash
# Option 1: Rollback last migration
npm run db:rollback

# Option 2: Restore from backup
npm run db:restore -- --latest

# Option 3: Restore from specific backup
npm run db:restore -- --file=before-migration.sql
```

---

## Troubleshooting

### "pg_dump not found"

**Problem**: PostgreSQL client tools not installed.

**Solution**:
- Windows: Download from https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql`
- Linux: `sudo apt-get install postgresql-client`

### "connection refused" or "could not connect"

**Problem**: Invalid DATABASE_URL or database not accessible.

**Solution**:
1. Verify DATABASE_URL in `.env.local`
2. Check Supabase project is active
3. Verify network connectivity
4. Ensure you're using "Direct connection" string (not pooler)

### "relation does not exist"

**Problem**: Trying to query a table that doesn't exist.

**Solution**:
1. Check if migrations have been run: `npm run db:status`
2. Run pending migrations: `npm run db:migrate`

### "duplicate key value violates unique constraint"

**Problem**: Trying to insert duplicate data.

**Solution**:
- Check if seed data was already inserted
- Use `ON CONFLICT` in your seed SQL
- Clear database and re-seed

### "checksum mismatch"

**Problem**: Applied migration file was modified.

**Solution**:
1. **Never modify applied migrations** - create a new migration instead
2. If absolutely necessary, create a new migration to fix the issue
3. The old migration stays as-is for historical accuracy

### Migration fails mid-execution

**Problem**: Migration error leaves database in inconsistent state.

**Solution**:
1. Migrations use transactions - they should rollback automatically
2. If not, restore from backup: `npm run db:restore -- --latest`
3. Fix the migration SQL
4. Try again: `npm run db:migrate`

---

## Best Practices

### ✅ DO

- Always backup before running migrations on production
- Test migrations on staging/local first
- Create small, focused migrations (one change per migration)
- Write DOWN migrations for all schema changes
- Use descriptive migration names
- Version control all migration files
- Keep seed files small and focused

### ❌ DON'T

- Never modify applied migrations (create new ones instead)
- Don't skip migration versions (001, 002, 003... in order)
- Don't commit backups to git (too large)
- Don't run migrations directly on production without testing
- Don't use seed data in production (use backups instead)
- Don't delete migration files that have been applied

---

## Directory Structure

```
bouwmatcher/
├── migrations/
│   ├── 000_schema_migrations.sql    # Migration tracking table
│   ├── 001_initial_schema.sql       # Initial schema from schema.md
│   └── 002_add_feature_x.sql        # Your new migrations
│
├── seeds/
│   └── development/
│       ├── 001_service_categories.sql
│       ├── 002_users.sql
│       └── ...
│
├── backups/                          # Gitignored
│   ├── backup_2026-01-22_14-30-00.sql
│   └── before-migration.sql
│
├── scripts/
│   └── db/
│       ├── db-client.ts             # Database connection
│       ├── migrate.ts               # Migration runner
│       ├── status.ts                # Status checker
│       ├── backup.ts                # Backup tool
│       ├── restore.ts               # Restore tool
│       └── seed.ts                  # Seed runner
│
└── DATABASE.md                      # This file
```

---

## Support

If you encounter issues:
1. Check this documentation
2. Check [Troubleshooting](#troubleshooting) section
3. Verify environment variables are correct
4. Ensure PostgreSQL client tools are installed
5. Check Supabase Dashboard for database status

---

**Happy migrating!** 🚀
