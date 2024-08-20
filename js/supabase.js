import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bdioilflzboykfitcikg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkaW9pbGZsemJveWtmaXRjaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MzMwMzUsImV4cCI6MjAzODUwOTAzNX0.vWlBAav0uLVzTxldEQ_pFUH2o9hCULgJalmH6Ml9WA0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);