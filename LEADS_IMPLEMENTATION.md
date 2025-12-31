# Real-Time Lead Matching Implementation

## Overview
This implementation provides a real-time lead matching system for professionals, similar to platforms like Upwork. Leads are automatically matched based on:

1. **Subcategory matching**: Professional's subscribed subcategories vs. project subcategories
2. **Geographic proximity**: Professional's work location + service radius vs. project location (using Haversine formula)

## Features

### ✅ Real-Time Updates
- Supabase real-time subscriptions detect new projects instantly
- Automatic UI updates without page refresh
- Fallback polling every 60 seconds for reliability

### ✅ Smart Filtering
- Date range filtering
- Project type (service category) filtering
- Search by client name
- Tab filtering (locked/unlocked/latest 10)

### ✅ Lead Locking System
- All leads are locked by default (requires payment to unlock)
- Ready for integration with payment system

## Architecture

### 1. API Endpoint
**File**: `src/app/api/professional/leads/route.ts`

**Endpoint**: `GET /api/professional/leads`

**Logic**:
1. Authenticates user
2. Fetches professional profile with work location and service radius
3. Retrieves subscribed subcategories from `professional_subcategories` table
4. Fetches projects matching subcategories with status `pending_quotes`
5. Filters by geographic proximity using Haversine formula
6. Returns matched leads with distance

**Distance Calculation**:
```typescript
// Haversine formula for calculating distance between two lat/long points
function calculateDistance(lat1, lon1, lat2, lon2): number {
  // Returns distance in kilometers
}
```

### 2. React Query Hook with Real-Time
**File**: `src/lib/hooks/professional/leads/useLeads.ts`

**Features**:
- React Query for data fetching and caching
- Supabase real-time subscription to `projects` table
- Automatic cache invalidation on project changes
- 60-second refetch interval as fallback

**Real-Time Subscription**:
```typescript
supabase
  .channel('projects-changes')
  .on('postgres_changes', {
    event: '*', // INSERT, UPDATE, DELETE
    schema: 'public',
    table: 'projects',
  }, (payload) => {
    // Invalidate and refetch leads
    queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY });
  })
  .subscribe();
```

### 3. UI Component
**File**: `src/components/professional-dashboard/offerteaanvragen/OfferteaanvragenPageClient.tsx`

**Features**:
- Real-time data display
- Client-side filtering (date, type, name)
- Loading and error states
- Empty state with helpful messages
- Tab-based navigation

## Database Requirements

### Required Tables
1. **projects**
   - Must have: `subcategory_id`, `latitude`, `longitude`
   - Status field for tracking project state

2. **professional_subcategories**
   - Links professionals to their subscribed subcategories
   - Fields: `professional_id`, `subcategory_id`

3. **professional_profiles**
   - Must have: `work_latitude`, `work_longitude`, `service_radius_km`

### Required Data
For the system to work, ensure:
- ✅ Professional has configured work location (lat/long)
- ✅ Professional has set service radius
- ✅ Professional has subscribed to subcategories
- ✅ Projects have location data (lat/long)
- ✅ Projects have subcategory_id set

## Usage

### In Your Component
```typescript
import { useLeads } from '@/lib/hooks/professional/leads';

function YourComponent() {
  const { data, isLoading, error } = useLeads();

  // data.leads contains matched leads with real-time updates
  // Automatically refreshes when new projects are created
}
```

### Matching Algorithm Example

**Professional**:
- Location: `50.81548930, 5.80229950` (Margraten, NL)
- Service radius: `50 km`
- Subscribed subcategories: `[1, 2, 5]`

**Project**:
- Location: `50.8148744, 5.8579161` (Ingber, NL)
- Subcategory: `2`
- Status: `pending_quotes`

**Result**: ✅ **MATCH**
- Subcategory match: ✅ (subcategory 2 in [1, 2, 5])
- Distance: ~3.7 km (within 50 km radius) ✅

## Next Steps

### 1. Payment Integration
Currently all leads are locked. To implement unlocking:
- Create payment table: `professional_lead_purchases`
- Add endpoint: `POST /api/professional/leads/unlock`
- Update `QuotationRequestCard` to show unlock button
- After payment, set `isLocked: false` for purchased leads

### 2. Lead Details
- Create endpoint: `GET /api/professional/leads/[id]`
- Show full project details after unlocking
- Display photos, answers, contact info

### 3. Notifications
- Email notifications for new matched leads
- Push notifications (optional)
- Daily digest of new leads

### 4. Analytics
- Track lead views
- Track unlock rates
- Show "X professionals viewing" indicator

## Testing

### Test Scenario 1: New Project Created
1. Create a new project with matching subcategory and location
2. Lead should appear in professional dashboard within 1-2 seconds
3. No page refresh required

### Test Scenario 2: Filtering
1. Use date range filter - should filter client-side
2. Use project type filter - should filter by service category
3. Use name search - should filter by client name

### Test Scenario 3: Geographic Matching
1. Set professional's service radius to 10 km
2. Create project 15 km away - should NOT appear
3. Create project 5 km away - should appear

## Troubleshooting

### Leads not appearing?
Check:
1. Professional has work location configured
2. Professional has subscribed to subcategories
3. Projects have `subcategory_id` set
4. Projects have `latitude`/`longitude` set
5. Project status is `pending_quotes`
6. Project is within service radius

### Real-time not working?
Check:
1. Supabase real-time is enabled in dashboard
2. Browser console for subscription errors
3. Network tab for WebSocket connection

### Performance issues?
- Real-time subscription is lightweight (WebSocket)
- Filtering happens client-side (fast)
- Consider pagination if >100 leads

## Files Created

1. `/src/app/api/professional/leads/route.ts` - API endpoint
2. `/src/lib/hooks/professional/leads/useLeads.ts` - React Query hook
3. `/src/lib/hooks/professional/leads/index.ts` - Export file
4. `/src/types/models/lead.model.ts` - TypeScript interfaces
5. `/src/components/professional-dashboard/offerteaanvragen/OfferteaanvragenPageClient.tsx` - Updated UI

## Configuration

No additional configuration needed. The system uses:
- Existing Supabase client
- Existing API client
- Existing React Query setup
- Existing authentication
