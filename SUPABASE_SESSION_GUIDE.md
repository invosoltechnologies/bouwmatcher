# Supabase Session Management Guide

## How It Works (No Manual Token Management Needed!)

### 📦 Where Sessions Are Stored

Supabase automatically stores your session in:

1. **localStorage**: `sb-gjlyhshagnuibywjxamo-auth-token`
   ```json
   {
     "access_token": "eyJhbGc...",
     "refresh_token": "abc123...",
     "expires_at": 1729767890,
     "user": { ... }
   }
   ```

2. **Cookies** (for server-side):
   - Used by middleware
   - Automatically set by Supabase

### 🔄 Automatic Features

#### ✅ Auto Token Refresh
```typescript
// This happens automatically every ~55 minutes
// You don't need to do ANYTHING!
{
  auth: {
    autoRefreshToken: true,  // ← Handles token refresh
  }
}
```

#### ✅ Session Persistence
```typescript
// User stays logged in after page refresh
{
  auth: {
    persistSession: true,  // ← Saves to localStorage
  }
}
```

#### ✅ OAuth Detection
```typescript
// Handles OAuth redirects automatically
{
  auth: {
    detectSessionInUrl: true,  // ← Processes OAuth codes
  }
}
```

## Usage in Your App

### 1. Check if User is Logged In

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, loading, session } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <p>Welcome {user.email}</p>
      <p>Token expires: {new Date(session.expires_at * 1000).toLocaleString()}</p>
    </div>
  );
}
```

### 2. Protected Pages

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Dashboard Content</div>;
}
```

### 3. Logout

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button onClick={signOut}>
      Logout
    </button>
  );
}
```

## Redirect After Login

### How It Works

1. **User visits protected page**: `/dashboard/projects`
2. **Middleware catches**: No session found
3. **Redirects to login**: `/auth/login?redirect=/dashboard/projects`
4. **User logs in**: Login form reads `redirect` param
5. **Redirects back**: User goes to `/dashboard/projects`

### Implementation

Already implemented in your app:

**Middleware** ([src/middleware.ts](src/middleware.ts)):
```typescript
// Saves original URL
redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
```

**Login Page** ([src/app/auth/login/page.tsx](src/app/auth/login/page.tsx)):
```typescript
// Reads redirect URL
const redirectUrl = searchParams.get('redirect') || '/dashboard';

// Redirects after login
router.push(redirectUrl);
```

## Behind the Scenes

### What Supabase Does Automatically

```
Every API call to Supabase:
    ↓
Check access token expiry
    ↓
Expired? → Use refresh token to get new access token
    ↓
Update localStorage automatically
    ↓
Make the API call with fresh token
```

### vs Manual Token Management (Old Way)

**Old Way (Manual):**
```typescript
// ❌ You had to do this manually
const token = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expiresAt');

if (Date.now() > expiresAt) {
  const newToken = await refreshToken();
  localStorage.setItem('token', newToken);
}

fetch('/api/data', {
  headers: { Authorization: `Bearer ${token}` }
});
```

**New Way (Supabase):**
```typescript
// ✅ This is ALL you need!
const { data } = await supabase
  .from('professional_profiles')
  .select('*');

// Supabase handles EVERYTHING automatically:
// - Token expiry check
// - Token refresh
// - Storage updates
// - Authorization headers
```

## Security

### Is It Safe?

✅ **YES!** Here's why:

1. **Secure Storage**: Uses httpOnly cookies for sensitive data
2. **Auto Refresh**: Tokens expire and refresh automatically
3. **JWT Tokens**: Cryptographically signed, can't be forged
4. **RLS Policies**: Database enforces user-level security

### Token Lifecycle

```
Access Token: 1 hour (auto-refreshed)
Refresh Token: 7 days (can be configured)
Session: Persistent until logout
```

## Common Questions

### Q: What if localStorage is cleared?
**A:** User is logged out. They need to log in again.

### Q: What if token expires while user is active?
**A:** Supabase refreshes it automatically. User doesn't notice.

### Q: Can I check token expiry manually?
**A:** Yes, but you don't need to!
```typescript
const { user, session } = useAuth();
const expiresAt = new Date(session.expires_at * 1000);
console.log('Token expires:', expiresAt);
```

### Q: Do I need to send tokens in API calls?
**A:** No! Supabase client handles it:
```typescript
// ✅ Correct - token sent automatically
await supabase.from('table').select();

// ❌ Wrong - don't do this
fetch('/api/data', {
  headers: { Authorization: `Bearer ${token}` } // Not needed!
});
```

## Debugging Sessions

### Check Current Session

```typescript
import { supabase } from '@/lib/supabase/client';

// Get current session
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);

// Get current user
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

### View in Browser

1. **DevTools → Application → Local Storage**
   - Look for: `sb-gjlyhshagnuibywjxamo-auth-token`

2. **DevTools → Application → Cookies**
   - Look for Supabase cookies

3. **DevTools → Console**
   ```javascript
   localStorage.getItem('sb-gjlyhshagnuibywjxamo-auth-token')
   ```

## Summary

### What You Don't Need to Do
- ❌ Manually save tokens
- ❌ Check token expiry
- ❌ Refresh tokens
- ❌ Add Authorization headers
- ❌ Handle token rotation

### What Happens Automatically
- ✅ Token storage
- ✅ Token refresh
- ✅ Session persistence
- ✅ Authorization headers
- ✅ OAuth handling

**Your job:** Just use `useAuth()` hook and let Supabase handle the rest!
