import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client that returns standard empty responses to prevent crashes
// when environment variables are not set in hosted environments (e.g., Vercel settings).
const createDummyClient = () => {
  console.warn('Supabase credentials missing. Client is running in offline fallback mode.');
  const dummyHandler = {
    get(_target: any, prop: string): any {
      if (prop === 'from') {
        return () => ({
          insert: () => ({
            select: () => Promise.resolve({ data: null, error: new Error('Supabase client not configured in environment variables') })
          }),
          update: () => ({
            eq: () => Promise.resolve({ data: null, error: new Error('Supabase client not configured in environment variables') })
          })
        });
      }
      return () => Promise.resolve({ data: null, error: new Error('Supabase client not configured in environment variables') });
    }
  };
  return new Proxy({}, dummyHandler) as ReturnType<typeof createClient>;
};

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient();
