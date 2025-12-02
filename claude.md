# Claude Project Context - Bouwmatcher

## Instructions (STRICT - ALWAYS FOLLOW)
- Do not install or run any package installation commands
- Do not suggest new packages for similar functionality - always check package.json first
- Do not create custom components - always use existing ones or check package.json for available libraries
- Strictly use Tailwind classes, don't add inline styles unless absolutely necessary
- Don't use grid; use flexbox instead unless grid is absolutely necessary
- For Icons: use lucide-react
- For Forms: use React Hook Form
- For APIs: use React Query

---

## Project Overview

**Bouwmatcher** is an online platform connecting homeowners with home improvement professionals. It enables project creation, professional registration, company verification, and comprehensive rating systems.

### Key Stakeholders
- **Personal Users**: Homeowners creating projects and requesting quotes
- **Professionals**: Individual tradespeople with specializations
- **Companies**: Business entities with multiple professionals
- **Admins**: System administrators managing verification

---

## Technical Stack

### Frontend
- **Framework**: Next.js 15.5.2 with Turbopack
- **React**: 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + tailwind-merge
- **UI Components**: shadcn 3.2.1 (Radix UI)
- **State Management**: React Query 5.9 (@tanstack/react-query)
- **Forms**: React Hook Form 7.62.0
- **Icons**: lucide-react 0.543.0
- **Validation**: Zod 4.1.12
- **Notifications**: react-hot-toast 2.6.0
- **Phone Input**: react-phone-number-input 3.4.14
- **Maps**: @vis.gl/react-google-maps 1.6.1
- **Auth**: Next.js with Supabase SSR

### Backend/Database
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth with OAuth support
- **Email**: Resend 6.4.2
- **SMS/OTP**: Twilio 5.10.5
- **Admin SDK**: @supabase/supabase-js, @supabase/ssr

### Development
- **Linting**: ESLint with Next.js config
- **Build**: Turbopack
- **Package Manager**: npm

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── account/              # Account management
│   │   ├── auth/                 # Authentication
│   │   ├── otp/                  # OTP verification
│   │   ├── project-draft/        # Project drafts
│   │   ├── registration/         # Professional registration
│   │   ├── service-categories/   # Service data
│   │   ├── companies/            # Company endpoints
│   │   └── geocode/              # Geolocation
│   ├── auth/                     # Auth pages
│   ├── dashboard/                # User dashboards
│   ├── pro-dashboard/            # Professional dashboard
│   ├── create-project/           # Project creation
│   └── [pages]/                  # Other pages
│
├── components/                   # React components
│   ├── auth/                     # Login/registration
│   ├── professional-dashboard/   # Pro dashboard
│   ├── ui/                       # shadcn UI components
│   ├── Homepage/                 # Landing page
│   ├── Questionnaire/            # Form components
│   ├── providers/                # Context providers
│   └── [other]/                  # Feature components
│
├── contexts/                     # React Context
├── lib/
│   ├── supabase/                # Supabase setup
│   ├── api/                     # API utilities
│   ├── hooks/                   # Custom hooks
│   │   └── professional/        # Pro-specific hooks
│   ├── utils/                   # Helper functions
│   └── [services]/              # Business logic
│
├── types/                        # TypeScript types
│   ├── models/                  # Database models
│   ├── dto/                     # Data transfer objects
│   ├── enums/                   # Enums
│   └── [other]/                 # Other types
│
├── data/                         # Static data
├── middleware.ts                # Next.js middleware
└── globals.css                  # Global styles
```

---

## Database Schema

### User Tables
1. **personal_users**
   - Homeowners/project creators
   - Email and phone verification
   - Password hashing

2. **professional_profiles**
   - Individual professionals
   - Verification status: unverified → pending → in_review → verified
   - Experience, specializations, certifications
   - Work location with service radius
   - Portfolio photos
   - Onboarding step (1-6)

3. **professional_companies**
   - Business entities
   - VAT/KVK numbers
   - Verification workflow
   - Service categories & areas
   - Aggregate ratings (1-5 stars)
   - Logo & branding

4. **companies** (Legacy)
   - Basic company registration

### Project Management
1. **projects** - Completed project requests
   - Service category & subcategory
   - Request type (private/business)
   - Location & description
   - Photos
   - Status tracking

2. **project_drafts** - In-progress forms
   - Session-based (7-day expiration)
   - Multi-step progress
   - Phone verification

3. **project_form_questions** - Dynamic questionnaire
   - Multi-language (NL/EN)
   - Conditional logic via parent_question_id
   - Types: radio, checkbox, text, date, etc.
   - Step-based organization

4. **project_form_answers** - User responses

### Service Taxonomy
1. **service_categories** - Top-level categories
2. **service_subcategories** - Subcategories with pricing
3. **professional_specializations** - Mapping (professional → category)
4. **professional_subcategories** - Mapping (professional → subcategory)

### Reviews
1. **professional_company_ratings** - Company reviews (1-5 stars with text)
2. **professional_certificates** - Professional credentials

### Supporting
- **project_photos** - Project images
- **project_progress** - Step tracking
- **project_form_steps** - Workflow definition

---

## Authentication & Authorization

### Client-Side
- **Supabase SSR Client** (`lib/supabase/client.ts`)
- **AuthContext** (`contexts/AuthContext.tsx`) - Manages user state
- Session persistence & token refresh
- Logout navigation

### Server-Side
- **Supabase Server Client** (`lib/supabase/server.ts`)
- **Middleware** (`middleware.ts`) - Route protection
- **Admin SDK** - Elevated operations

### OAuth
- Google integration
- Provider tracking in auth_provider field

---

## API Endpoints

### Authentication
- `POST /api/auth/logout` - Sign out
- `POST /api/auth/callback` - OAuth callback

### Project Drafts
- `POST /api/project-draft/initialize` - Create draft
- `GET /api/project-draft/questions` - Fetch questions
- `POST /api/project-draft/save-answer` - Save answer
- `POST /api/project-draft/upload-photo` - Upload photo
- `DELETE /api/project-draft/delete-photo` - Delete photo
- `POST /api/project-draft/verify/send-code` - Send OTP
- `POST /api/project-draft/verify/confirm-code` - Verify OTP

### Professional Registration
- `GET/POST /api/registration/service-categories` - Service data
- `GET/POST /api/registration/company` - Company registration
- `POST /api/registration/profile-data` - Profile setup
- `POST /api/registration/work-area` - Work area & radius
- `POST /api/registration/current-step` - Track step
- `POST /api/registration/update-contact-info` - Update contact

### Account Management
- `GET /api/account` - Fetch account
- `PATCH /api/account/contact` - Update contact
- `PATCH /api/account/company` - Update company
- `POST /api/account/company/logo` - Upload logo
- `POST /api/account/company/description` - Update description
- `POST /api/account/certificates` - Upload certificate
- `POST /api/account/profile-picture` - Upload profile pic
- `POST /api/account/portfolio` - Upload portfolio photo
- `POST /api/account/profile-answers` - Store answers

### Service Data
- `GET /api/service-categories` - All categories
- `GET /api/service-subcategories` - Subcategories
- `GET /api/professional-specializations` - Specializations
- `PATCH /api/professional-specializations/reorder` - Reorder

### Company & Reviews
- `GET /api/companies/[companyId]/ratings` - Company reviews
- `GET /api/company-search` - Search companies

### Utilities
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP
- `GET /api/geocode` - Geocoding

---

## Key Workflows

### 1. Project Creation
```
Start → Initialize Draft → Answer Questions → Upload Photos
  → Verify Phone → Submit Project → Professionals see it
```
**Features**:
- Session-based with 7-day expiration
- Dynamic questionnaire with conditional logic
- Multi-language (NL/EN)
- Phone OTP verification via Twilio

### 2. Professional Registration (6 Steps)
```
Sign Up → Personal Info → Company Setup → Service Selection
  → Work Area (Map) → Profile Completion → Verification Queue
```
**Features**:
- Step tracking (current_step field)
- Company verification workflow
- Service radius definition
- Profile completeness tracking

### 3. Company Verification
```
Submit → Admin Review → Documents Check → Approved/Rejected/Suspended
```
**Features**:
- Multi-stage status: pending → in_review → verified/rejected/suspended
- Document verification (JSONB storage)
- Admin assignment & timestamps

### 4. Rating & Review System
- Professionals/users rate companies
- 1-5 star system with text
- Aggregate rating calculation

---

## Custom React Hooks

### Professional Account (`lib/hooks/professional/account/`)
- `useAccount()` - Fetch professional account
- `useUpdateProfile()` - Update profile info
- `useUpdateCompany()` - Update company details
- `useUpdateCompanyLogo()` - Upload logo
- `useUpdateCompanyDescription()` - Update description
- `useWorkArea()` - Fetch work area
- `useUpdateWorkArea()` - Update work area
- `useSaveWorkArea()` - Persist work area
- `useCertificates()` - Fetch credentials
- `useProfilePicture()` - Upload profile pic
- `useProfileAnswers()` - Store answers

### Professional Ratings (`lib/hooks/professional/ratings/`)
- `useCompanyRatings()` - Fetch reviews
- `useCreateCompanyRating()` - Submit review
- `useDeleteCompanyRating()` - Remove review

### Portfolio (`lib/hooks/professional/portfolio/`)
- `useUploadPortfolioPhoto()` - Add photo
- `useDeletePortfolioPhoto()` - Remove photo

### Generic
- `useDebounce()` - Debounce hook
- `useAuth()` - Access AuthContext

---

## Utilities & Helpers

### API Client (`lib/api/client.ts`)
- Type-safe HTTP methods (GET, POST, PATCH, PUT, DELETE)
- Automatic JSON serialization
- FormData support for files
- Custom ApiError class with status codes

### Supabase
- **Client** (`lib/supabase/client.ts`) - Browser auth
- **Server** (`lib/supabase/server.ts`) - Server operations
- **Admin** (`lib/supabaseAdmin.ts`) - Elevated operations

### Key Utilities
- `lib/utils.ts` - General helpers (tailwind merge)
- `lib/utils/password-validator.ts` - Password validation
- `lib/utils/address-parser.ts` - Address parsing
- `lib/utils/account-data.ts` - Data formatting
- `lib/projectStatus.ts` - Status constants
- `lib/emailService.ts` - Email logic
- `lib/config.ts` - Configuration
- Map hooks for geolocation

---

## UI Component Conventions

### shadcn/Radix UI Components (`components/ui/`)
**DO NOT MODIFY** these reusable components:
- Buttons, inputs, selects, dialogs
- Accordions, tabs, cards
- Checkboxes, radio groups, switches
- Popovers, commands, progress bars
- Alerts, badges, labels

### Feature Components
- `components/auth/` - Login & registration forms
- `components/professional-dashboard/` - Pro dashboard sections
- `components/Homepage/` - Landing page sections
- `components/Questionnaire/` - Project form components
- `components/providers/` - Context providers

### Component Patterns
- Use React Hook Form for all forms
- Use React Query hooks for data fetching
- Use Tailwind classes exclusively
- Use lucide-react for icons
- Prefer composition over custom styling
- Validate with React Hook Form built-in validation (no Zod currently used)

---

## Code Style & Development Rules

### Strict Rules (ALWAYS FOLLOW)
✅ Use existing UI components - never create custom ones
✅ Always check package.json before suggesting packages
✅ Tailwind CSS classes only - no inline styles (unless critical)
✅ Flexbox layout (not grid) unless absolutely necessary
✅ lucide-react for all icons
✅ React Hook Form for all forms
✅ React Query for all API calls
✅ NEVER run package installation commands

### TypeScript
- Strict mode enabled
- Interfaces for all data structures
- Type-safe API calls
- Enums for constants (statuses, genders, etc.)
- DTOs for API requests/responses

### File Organization
- One component per file
- Organize by feature domain
- Keep utilities in lib/utils/
- Keep hooks in lib/hooks/
- Keep types in types/ with appropriate subdirectories

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Public key
- Other secrets handled server-side

---

## Key Models & Interfaces

### ProfessionalProfile (`types/models/professional-profile.model.ts`)
- Personal info (name, email, phone)
- Company association
- Verification status & profile completion
- Experience & specializations
- Certifications & portfolio
- Availability & preferences
- Work location with service radius
- Current onboarding step (1-6)

### ProfessionalCompany (`types/models/professional-company.model.ts`)
- Company details (name, address, contact)
- Business identifiers (VAT, KVK)
- Verification workflow & documents
- Service categories & areas
- Aggregate ratings
- Logo & branding

---

## Common Development Patterns

### 1. Fetch Data with React Query
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['account'],
  queryFn: () => apiClient.get('/api/account'),
});
```

### 2. Update Data with Mutation
```typescript
const mutation = useMutation({
  mutationFn: (data) => apiClient.patch('/api/account/contact', data),
  onSuccess: () => queryClient.invalidateQueries(['account']),
});
```

### 3. Forms with React Hook Form
```typescript
const { register, handleSubmit, watch, formState: { errors } } = useForm<FormDataType>({
  defaultValues: {},
});

// Validation is done inline with register()
register('firstName', { required: 'Field is required' })
```

### 4. File Uploads
```typescript
const formData = new FormData();
formData.append('file', file);
const response = await apiClient.post('/api/account/profile-picture', formData);
```

### 5. Conditional Rendering
Use standard React patterns - avoid custom helpers unless necessary

---

## Testing & Deployment

### Local Development
```bash
npm run dev  # Start dev server with Turbopack
```

### Build & Production
```bash
npm run build  # Build for production
npm start      # Start production server
```

### Linting
```bash
npm run lint   # Run ESLint
```

### Database Seeding
```bash
npm run seed   # Populate with sample data
```

---

## Current Git Status
- **Current Branch**: `dev`
- **Main Branch**: `master`
- **Working Tree**: Clean
- **Recent Commits**:
  - Fix linting errors
  - Login with user
  - Update Google auth integration
  - Complete User Dashboard
  - Update Review Section

---

## Important Implementation Notes

1. **Multi-Language Support**: System supports NL (Dutch) and EN (English)
2. **Phone Verification**: OTP-based via Twilio (10+ digit numbers)
3. **Service Taxonomy**: Hierarchical (categories → subcategories)
4. **Dynamic Forms**: Database-driven questionnaire with conditional logic
5. **File Storage**: Uses Supabase Storage with signed URLs
6. **Session Management**: Project drafts expire after 7 days
7. **Verification Workflows**: Multi-stage for both professionals and companies
8. **Location Services**: Google Maps integration for service areas
9. **Email & SMS**: Resend for email, Twilio for SMS/OTP
10. **Rate Limiting**: Consider implementing for OTP endpoints

---

## Quick Reference - Common Tasks

### Add a New API Endpoint
1. Create route: `src/app/api/[domain]/[action]/route.ts`
2. Import Supabase server client
3. Implement handler with proper error handling
4. Return JSON response
5. Create React Query hook in `lib/hooks/`
6. Export from hook index file

### Add a New Component Page
1. Create file: `src/app/[route]/page.tsx`
2. Use existing UI components from `components/ui/`
3. Wrap with appropriate layout if needed
4. Style exclusively with Tailwind classes
5. Implement proper TypeScript types

### Update Professional Profile
1. Use `useUpdateProfile()` hook from `lib/hooks/professional/account/`
2. Submit data via `PATCH /api/account`
3. Hook automatically invalidates React Query cache
4. Component re-renders with updated data

### Handle File Uploads
1. Create FormData object
2. Use API client for POST request
3. Files stored in Supabase Storage
4. Signed URL returned for display
5. Store URL reference in database

### Add Form Validation
1. Use React Hook Form's built-in validation in `register()`
2. Add validation rules: `{ required: 'message', minLength: 3 }`, etc.
3. Display `formState.errors` in UI
4. Show real-time validation feedback with Controller for complex inputs

### IMPORTANT: 
This context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.
ENDFILE