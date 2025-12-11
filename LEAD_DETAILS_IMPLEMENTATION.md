# Lead Details Implementation

## Overview
This implementation provides a detailed view of individual leads with **locked contact information** until the professional pays to unlock them. This prevents unauthorized access to sensitive client data while maintaining a smooth user experience.

## Features Implemented

### ✅ Lead Details View
- Full project information display
- Locked/unlocked contact information states
- Project photos display
- Form answers display
- Project metadata (ID, date, time)

### ✅ Security & Privacy
- Contact information is **masked** in the API for unpaid leads
- Phone numbers: `•••••••••`
- Emails: `v••••••••@••.nl`
- Addresses: `•••••••••`
- Postcodes: `••••`
- Names: First initial only (e.g., "E. Goudriaan")

### ✅ Payment Integration Ready
- Database schema for `professional_lead_purchases` table
- API checks purchase status before revealing data
- UI shows unlock button and price (€15.00)
- Ready to integrate with payment provider

## Architecture

### 1. API Endpoint
**File**: `src/app/api/professional/leads/[id]/route.ts`

**Endpoint**: `GET /api/professional/leads/[id]`

**Security Logic**:
```typescript
// 1. Authenticate user
// 2. Check if professional has purchased this lead
// 3. If NOT purchased -> mask sensitive data
// 4. Return lead with is_locked flag
```

**Data Masking Functions**:
- `maskString()` - Generic string masking
- `maskEmail()` - Smart email masking (keeps first char + domain extension)
- `maskPhone()` - Phone number masking
- `maskPostcode()` - Postal code masking

### 2. React Query Hook
**File**: `src/lib/hooks/professional/leads/useLeadDetails.ts`

**Usage**:
```typescript
const { data, isLoading, error } = useLeadDetails(leadId);

// data.lead - Lead details (masked if locked)
// data.photos - Project photos
// data.answers - Form answers
// data.is_locked - Boolean flag
```

### 3. UI Component
**File**: `src/components/professional-dashboard/offerteaanvragen/LeadDetailsView.tsx`

**Sections**:
1. **Header** - Title, client name, lock icon, price badge
2. **Unlock Warning** - Only shown when `is_locked === true`
3. **Request Details** - Description, category, execution date, type
4. **Remark** - Additional notes
5. **Contact Information** - Masked/unmasked based on purchase status
6. **Photos** - Project images grid
7. **Offer Details** - ID, date, time

### 4. Navigation Integration
**File**: `src/components/professional-dashboard/offerteaanvragen/OfferteaanvragenPageClient.tsx`

**Flow**:
1. User clicks on lead card
2. `setSelectedLeadId(leadId)` is called
3. View switches to `LeadDetailsView`
4. Back button returns to list

## Database Requirements

### New Table: `professional_lead_purchases`

**Run this SQL** in your Supabase SQL Editor:

```sql
-- See LEAD_PURCHASES_TABLE.sql for full schema
```

**Purpose**: Track which professionals have paid to unlock specific leads

**Key Fields**:
- `professional_id` - Who purchased
- `project_id` - Which lead
- `amount_paid` - Price paid (e.g., 15.00)
- `payment_status` - 'completed', 'pending', 'failed'
- `transaction_id` - Payment provider reference

**Constraints**:
- Unique constraint on (professional_id, project_id) - prevent double purchase
- Foreign keys with CASCADE delete

## UI Design Details

### Contact Information Card

**When Locked** (is_locked = true):
```
┌─────────────────────────────────────┐
│ 🔒 Contactinformatie                │
├─────────────────────────────────────┤
│ ⚠️ Contactgegevens verborgen –      │
│    ontgrendel om de bedrijven.      │
├─────────────────────────────────────┤
│ Naam:       •••••••••               │
│ E-mail:     v••••••••@••.nl         │
│ Postcode:   ••••                    │
│ Plaats:     •••••••••               │
│ Adres:      •••••••••               │
│ Telefoon:   •••••••••               │
└─────────────────────────────────────┘
```

**When Unlocked** (is_locked = false):
```
┌─────────────────────────────────────┐
│ Contactinformatie                   │
├─────────────────────────────────────┤
│ Naam:       Dhr. Van Der Meulen     │
│ E-mail:     vandermeulen@email.nl   │
│ Postcode:   6273 NB                 │
│ Plaats:     Amstelveen              │
│ Adres:      Lemmensstraat 71-73     │
│ Telefoon:   +31 6 12345678          │
└─────────────────────────────────────┘
```

### Unlock Prompt Card

Only shown when `is_locked === true`:

```
┌─────────────────────────────────────────────┐
│ Wil je reageren op deze opdracht?          │
│                                             │
│ Ontgrendel de contactgegevens door je      │
│ account te verifiëren en het               │
│ toegangstarief te betalen.                 │
│                                             │
│ ✓ Bevestig je e-mail en bedrijfsgegevens  │
│ ✓ Betaal voor het aangegeven tarief       │
│ ✓ Na betaling zie je de contactgegevens   │
│                                             │
│ [Ontgrendel contactgegevens] [Account...]  │
└─────────────────────────────────────────────┘
```

## Payment Flow (To Be Implemented)

### Step 1: User Clicks "Ontgrendel contactgegevens"

**Action**: Trigger payment flow

**Options**:
- Stripe Checkout
- Mollie Payment
- iDEAL (for Dutch market)

### Step 2: Payment Processing

**Create API endpoint**: `POST /api/professional/leads/[id]/unlock`

**Logic**:
```typescript
1. Create payment session with provider
2. Return checkout URL
3. Redirect user to payment page
```

### Step 3: Payment Webhook

**Create API endpoint**: `POST /api/webhooks/payment`

**Logic**:
```typescript
1. Receive payment confirmation
2. Verify payment signature
3. Insert record into professional_lead_purchases
4. Send confirmation email to professional
```

### Step 4: Automatic Unlock

**After payment**:
```typescript
1. User returns to lead details
2. useLeadDetails hook refetches data
3. API detects purchase in professional_lead_purchases
4. Returns unmasked contact information
5. UI updates automatically (is_locked = false)
```

## Testing Checklist

### ✅ Display Tests
- [ ] Lead details card shows correctly
- [ ] Masked data displays with bullets (•••)
- [ ] Unlock warning shows when locked
- [ ] Price badge (€15.00) displays
- [ ] Back button works
- [ ] Photos grid displays (or empty state)

### ✅ API Tests
- [ ] GET /api/professional/leads/[id] returns data
- [ ] Contact info is masked when no purchase exists
- [ ] Contact info is revealed when purchase exists
- [ ] 404 when lead doesn't exist
- [ ] 401 when not authenticated

### ✅ Security Tests
- [ ] Cannot access other professionals' purchases
- [ ] Cannot bypass masking with direct API calls
- [ ] RLS policies work on professional_lead_purchases
- [ ] Foreign key constraints prevent orphan records

## Next Steps

### 1. Create professional_lead_purchases Table
```bash
# Run LEAD_PURCHASES_TABLE.sql in Supabase SQL Editor
```

### 2. Implement Payment Integration
- Choose payment provider (Stripe/Mollie)
- Create payment session endpoint
- Create webhook handler
- Test payment flow
- Handle payment failures

### 3. Add Lead Status Sidebar
Update `QuotationSidebar` to show:
- "Offerteaanvraag status"
- Status badges (locked/unlocked)
- Review steps
- Contact button (when unlocked)

### 4. Email Notifications
- Send email when lead is unlocked
- Include client contact info
- Add "Reply to client" button

### 5. Analytics
- Track unlock conversion rate
- Track time-to-unlock
- Show "X professionals viewing" indicator

## Files Created/Modified

### Created Files:
1. `/src/app/api/professional/leads/[id]/route.ts` - Lead details API
2. `/src/lib/hooks/professional/leads/useLeadDetails.ts` - React Query hook
3. `/src/components/professional-dashboard/offerteaanvragen/LeadDetailsView.tsx` - UI component
4. `/src/types/models/lead.model.ts` - Updated with new interfaces
5. `/LEAD_PURCHASES_TABLE.sql` - Database schema
6. `/LEAD_DETAILS_IMPLEMENTATION.md` - This documentation

### Modified Files:
1. `/src/components/professional-dashboard/offerteaanvragen/OfferteaanvragenPageClient.tsx` - Added navigation logic
2. `/src/lib/hooks/professional/leads/index.ts` - Export new hook

## Configuration

No additional configuration needed. Uses:
- Existing Supabase client
- Existing API client
- Existing React Query setup
- Existing authentication

## Troubleshooting

### Contact info not masked?
Check: Does a record exist in `professional_lead_purchases` for this professional + project?

### Lead details not loading?
Check:
1. Professional is authenticated
2. Lead ID is valid UUID
3. Lead exists in projects table
4. Network tab for API errors

### Photos not displaying?
Check:
1. Storage path is correct
2. Supabase Storage bucket is public or has signed URLs
3. Project has `has_photos = true`

## Cost Structure

Current implementation shows: **€15.00 per lead**

This can be made dynamic by:
```typescript
// Add to projects table
price_per_lead: number

// Or add to service_subcategories
lead_price: number
```

Then display from database instead of hardcoded.
