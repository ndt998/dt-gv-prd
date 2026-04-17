# Task 1-b: Google Apps Script Data API Route

## Agent: Backend Developer

## Summary
Created an API route to fetch class schedule data from Google Apps Script with in-memory caching support.

## Files Created

### 1. `/home/z/my-project/src/lib/cache.ts`
**Purpose:** In-memory cache utility for storing fetched data

**Features:**
- Generic `MemoryCache` class with TTL (time-to-live) support
- `get<T>(key)` - Retrieve cached data if not expired
- `set<T>(key, data, ttlMs)` - Store data with expiration
- `delete(key)` - Remove specific cache entry
- `clear()` - Clear all cache entries
- `has(key)` - Check if valid cache exists
- `stats()` - Get cache statistics

**Constants:**
- `DEFAULT_CACHE_TTL` - 5 minutes (300,000ms)
- `GAS_DATA_CACHE_KEY` - Cache key for Google Apps Script data

### 2. `/home/z/my-project/src/app/api/gas-data/route.ts`
**Purpose:** API route for fetching data from Google Apps Script

**Endpoint:** `GET /api/gas-data`

**Query Parameters:**
- `url` (optional) - Custom Google Apps Script URL (defaults to provided URL)
- `force` (optional) - Force refresh cache when set to 'true'

**Features:**
- Caching with 5-minute TTL to reduce API calls
- 30-second timeout for fetch requests
- Graceful error handling with fallback to cached data
- Returns cached data with warning when fetch fails but cache exists

**Response Format:**
```json
{
  "success": true,
  "data": [...class data...],
  "lastUpdated": 1234567890,
  "source": "google-apps-script",
  "cached": true/false,
  "warning": "optional warning message",
  "error": "optional error message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "data": null,
  "lastUpdated": null,
  "source": "google-apps-script"
}
```

## Testing
- Lint passed with no errors
- Dev server running without issues

## Notes for Next Agent
- The API is ready to be consumed by the frontend
- Use `fetch('/api/gas-data')` to get cached data (5-minute TTL)
- Use `fetch('/api/gas-data?force=true')` to force refresh from source
- The cache utility can be used for other data caching needs
