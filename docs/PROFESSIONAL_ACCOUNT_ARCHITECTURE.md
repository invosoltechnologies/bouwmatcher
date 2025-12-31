# Professional Account Module Architecture

## Overview
This document describes the architecture and data flow for the Professional Account module, which manages professional user profiles, company information, and account settings.

## Architecture Pattern

The module follows a **layered architecture** with clear separation of concerns:

```
UI Components → React Query Hooks → API Service Layer → API Client → Backend API
```

## Directory Structure

```
src/
├── types/
│   ├── enums/professional/
│   │   └── verification-status.enum.ts    # Enums for statuses and codes
│   ├── models/
│   │   ├── professional-profile.model.ts  # Database table schema
│   │   └── professional-company.model.ts  # Database table schema
│   └── dto/professional/account/
│       ├── account.dto.ts                 # GET /api/account
│       ├── profile.dto.ts                 # PATCH /api/account/contact
│       └── company.dto.ts                 # PATCH /api/account/company
│
├── lib/
│   ├── api/
│   │   ├── client.ts                      # Base API client with error handling
│   │   └── professional/
│   │       └── account.api.ts             # Account API service functions
│   └── hooks/professional/account/
│       ├── useAccount.ts                  # Query hook for account data
│       ├── useUpdateProfile.ts            # Mutation hook for profile updates
│       ├── useUpdateCompany.ts            # Mutation hook for company updates
│       └── index.ts                       # Barrel export
│
└── components/professional-dashboard/account/
    ├── AccountPageClient.tsx              # Main page component
    ├── EditCompanyModal.tsx               # Company edit modal
    └── EditContactModal.tsx               # Contact edit modal
```

## Data Flow

### 1. Fetching Account Data

```
AccountPageClient.tsx
  ↓ uses
useAccount() hook
  ↓ calls
getAccount() service
  ↓ uses
apiClient.get()
  ↓ fetches
GET /api/account
  ↓ returns
GetAccountResponse DTO
```

**Code Example:**
```typescript
// Component
const { data, isLoading, isError } = useAccount();
const accountData = data?.accountData;

// Hook
export function useAccount() {
  return useQuery<GetAccountResponse>({
    queryKey: accountKeys.detail(),
    queryFn: getAccount,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Service
export async function getAccount(): Promise<GetAccountResponse> {
  return apiClient.get<GetAccountResponse>('/api/account');
}
```

### 2. Updating Profile (Contact Info)

```
EditContactModal.tsx
  ↓ uses
useUpdateProfile() hook
  ↓ calls
updateProfile() service
  ↓ uses
apiClient.patch()
  ↓ sends
PATCH /api/account/contact
  ↓ with
UpdateProfileRequest DTO
  ↓ returns
UpdateProfileResponse DTO
  ↓ triggers
automatic cache invalidation & refetch
```

**Code Example:**
```typescript
// Component
const updateProfileMutation = useUpdateProfile({
  onSuccess: () => {
    toast.success('Contactgegevens succesvol bijgewerkt');
    onClose();
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

const onSubmit = (data: ContactFormData) => {
  updateProfileMutation.mutate({
    firstName: data.firstName,
    lastName: data.lastName,
    quotesEmail: data.quotesEmail || null,
    invoicesEmail: data.invoicesEmail || null,
    phoneNumber: data.phoneNumber,
    gender: data.gender || null,
  });
};

// Hook
export function useUpdateProfile(options?: UseUpdateProfileOptions) {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
  });
}
```

### 3. Updating Company Info

Similar pattern to profile updates:

```
EditCompanyModal.tsx
  ↓ uses
useUpdateCompany() hook
  ↓ calls
updateCompany() service
  ↓ sends
PATCH /api/account/company
  ↓ with
UpdateCompanyRequest DTO
  ↓ triggers
automatic cache invalidation & refetch
```

## Type Safety

### Database Models
Database table schemas matching exact column names:

```typescript
// professional_profiles table
export interface ProfessionalProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  quotes_email: string | null;    // For quote notifications
  invoices_email: string | null;  // For invoice notifications
  gender: Gender | string | null; // male, female, other, prefer_not_to_say
  is_verified: ProfileVerificationStatus | string | null; // VARCHAR status
  // ... other fields
}

// professional_companies table
export interface ProfessionalCompany {
  id: string;
  company_name: string;
  full_address: string | null;
  postal_code: string | null;
  city: string | null;
  website: string | null;
  business_id: string | null;
  is_verified: boolean | null;  // BOOLEAN for KVK API verification
  // ... other fields
}
```

### DTOs (Data Transfer Objects)

DTOs define the shape of API requests and responses:

```typescript
// GET /api/account response
export interface GetAccountResponse {
  accountData: {
    accountStatus: {
      status: string;
      description: string;
      statusCode: -1 | 1 | 2;  // -1=blocked, 1=verified, 2=in_process
      documentRequired: boolean;
    };
    companyInfo: {
      companyName: string;
      address: string;
      postalCode: string;
      city: string;
      website: string;
      businessId: string;
    };
    contactInfo: {
      contactPerson: string;      // first_name + last_name
      quotesEmail: string;        // quotes_email
      invoicesEmail: string;      // invoices_email
      generalEmail: string;       // main email (read-only)
      phoneNumber: string;        // phone
    };
    profileCompletion: {
      percentage: number;
      tasks: ProfileTask[];
    };
  };
}

// PATCH /api/account/contact request
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  quotesEmail?: string | null;
  invoicesEmail?: string | null;
  phoneNumber: string;
  gender?: string | null;
}

// PATCH /api/account/company request
export interface UpdateCompanyRequest {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  website?: string | null;
  businessId?: string | null;
}
```

### Enums

Centralized enums for consistent typing:

```typescript
export enum ProfileVerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum AccountStatusCode {
  BLOCKED = -1,
  VERIFIED = 1,
  IN_PROCESS = 2,
}
```

## API Client

The base API client provides:
- Type-safe HTTP methods (GET, POST, PATCH, PUT, DELETE)
- Automatic JSON serialization
- Centralized error handling
- Custom `ApiError` class

```typescript
class ApiClient {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T>
  async post<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T>
  async patch<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T>
  async put<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T>
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T>
}

export class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: any)
}
```

## React Query Configuration

Global configuration in `Providers.tsx`:

```typescript
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutes - data fresh for this long
      gcTime: 1000 * 60 * 10,         // 10 minutes - keep in cache
      refetchOnWindowFocus: false,    // Don't refetch on window focus
      retry: 1,                       // Retry failed requests once
    },
  },
})
```

### Query Keys

Organized query keys for cache management:

```typescript
export const accountKeys = {
  all: ['account'] as const,
  detail: () => [...accountKeys.all, 'detail'] as const,
};
```

## Database Schema

### professional_profiles Table

**Key Fields:**
- `first_name`, `last_name` - Personal name
- `email` - Main account email (shown as "General Email" on frontend)
- `quotes_email` - Optional email for quote notifications
- `invoices_email` - Optional email for invoice notifications
- `phone` - Required phone number
- `gender` - Optional: male, female, other, prefer_not_to_say
- `is_verified` - VARCHAR status (unverified, pending, in_review, verified, rejected, suspended)

**Verification Logic:**
- Only profile `is_verified` status determines account status
- Company `is_verified` is separate (for KVK API verification)

### professional_companies Table

**Key Fields:**
- `company_name` - Business name
- `full_address` - Complete address
- `postal_code`, `city` - Location details
- `website` - Optional company website
- `business_id` - Optional KVK/Chamber of Commerce ID
- `is_verified` - BOOLEAN for KVK API verification (separate from profile verification)

## Component Patterns

### Modal Components

Modals no longer need `onSuccess` callback prop:

```typescript
// ❌ Old pattern (manual refetch)
interface EditModalProps {
  onSuccess: () => void;  // Manual callback
}

// ✅ New pattern (automatic refetch)
interface EditModalProps {
  // No onSuccess needed - React Query handles it
}

// Mutation automatically invalidates cache
const mutation = useUpdateProfile({
  onSuccess: () => {
    toast.success('Updated!');
    onClose();
    // React Query automatically refetches account data
  },
});
```

### Loading & Error States

React Query provides built-in state management:

```typescript
const { data, isLoading, isError, error } = useAccount();

// Loading state
if (isLoading) return <LoadingSpinner />;

// Error state
if (isError) {
  toast.error('Failed to load account data');
  return <ErrorMessage />;
}

// Success state
const accountData = data.accountData;
```

## Benefits of This Architecture

### 1. Type Safety
- End-to-end TypeScript coverage
- DTOs ensure API contract compliance
- Models match exact database schema

### 2. Separation of Concerns
- **Components** - Focus only on UI rendering
- **Hooks** - Manage data fetching/mutations
- **Services** - Handle API communication
- **Client** - Centralized HTTP logic

### 3. Automatic Cache Management
- React Query handles caching
- Automatic refetching after mutations
- Stale-while-revalidate pattern
- Optimistic updates support

### 4. Error Handling
- Centralized error handling in API client
- Custom `ApiError` class with status codes
- Consistent error messages across app

### 5. Developer Experience
- Clean, readable component code
- Easy to add new endpoints
- Simple testing with mock hooks
- Clear data flow

## Adding New Features

### To add a new API endpoint:

1. **Create DTO** in `src/types/dto/professional/account/`
```typescript
export interface NewFeatureRequest { /* ... */ }
export interface NewFeatureResponse { /* ... */ }
```

2. **Add service function** in `src/lib/api/professional/account.api.ts`
```typescript
export async function newFeature(data: NewFeatureRequest): Promise<NewFeatureResponse> {
  return apiClient.post<NewFeatureResponse>('/api/new-feature', data);
}
```

3. **Create hook** in `src/lib/hooks/professional/account/`
```typescript
export function useNewFeature() {
  return useMutation<NewFeatureResponse, Error, NewFeatureRequest>({
    mutationFn: newFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
    },
  });
}
```

4. **Use in component**
```typescript
const mutation = useNewFeature({
  onSuccess: () => toast.success('Success!'),
  onError: (error) => toast.error(error.message),
});

mutation.mutate(formData);
```

## API Endpoints

| Method | Endpoint | Purpose | Request DTO | Response DTO |
|--------|----------|---------|-------------|--------------|
| GET | `/api/account` | Fetch account data | - | `GetAccountResponse` |
| PATCH | `/api/account/contact` | Update profile | `UpdateProfileRequest` | `UpdateProfileResponse` |
| PATCH | `/api/account/company` | Update company | `UpdateCompanyRequest` | `UpdateCompanyResponse` |

## Common Patterns

### Form Submission with React Query

```typescript
const mutation = useUpdateProfile();

const onSubmit = (formData: FormData) => {
  mutation.mutate({
    firstName: formData.firstName,
    lastName: formData.lastName,
    // ... other fields
  });
};

// In form
<Button
  disabled={mutation.isPending}
  type="submit"
>
  {mutation.isPending ? 'Saving...' : 'Save'}
</Button>
```

### Conditional Rendering

```typescript
const { data, isLoading } = useAccount();

if (isLoading) return <LoadingSkeleton />;
if (!data?.accountData) return <EmptyState />;

return <AccountContent data={data.accountData} />;
```

## Testing Strategy

### Unit Tests
- Test hooks with `@testing-library/react-hooks`
- Test service functions with mocked `apiClient`
- Test components with mocked hooks

### Integration Tests
- Test full data flow from component to API
- Mock backend API responses
- Verify cache invalidation

## Future Improvements

1. **Optimistic Updates** - Update UI immediately before API response
2. **Infinite Queries** - For paginated data
3. **Prefetching** - Preload data on hover/route change
4. **React Query Devtools** - Add for development debugging
5. **Error Boundaries** - Better error handling at component level

## Troubleshooting

### Common Issues

**Issue: "No QueryClient set"**
- Ensure `QueryClientProvider` wraps the app in `Providers.tsx`

**Issue: Cache not updating after mutation**
- Verify `queryClient.invalidateQueries()` is called in mutation's `onSuccess`

**Issue: Stale data showing**
- Check `staleTime` configuration in React Query config

**Issue: Type errors with DTOs**
- Ensure backend response matches DTO structure exactly
- Check for snake_case vs camelCase mismatches

## Related Documentation

- [React Query Docs](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
