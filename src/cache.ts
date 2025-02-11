import { MemoryCacheProvider } from "memoose-js";

const memoryCache = new MemoryCacheProvider();

// Set cache with a key and value for a specified TTL (time-to-live)
export async function setCache(key: string, value: any, ttl: number = 180) {  // TTL default to 180 sec
  if (value === null || value === undefined) {
    value = {}; // Default value if provided value is null or undefined
  }
  await memoryCache.set(key, value, ttl); // Store in memory with TTL
}

// Get cache by key
export async function getCache(key: string) {
  const cachedValue = await memoryCache.get(key);
  return cachedValue || {}; // Return cached value or an empty object if not found
}

// Clear cache by key
export async function clearCache(key: string, value: any = null, ttl: number = 0) {
  await memoryCache.set(key, value, ttl); // Clear cache by setting an empty value
}

// Clear all cache 
export async function clearAllCache() {
  console.warn("clearAllCache() not natively supported.");
}

export { memoryCache };
