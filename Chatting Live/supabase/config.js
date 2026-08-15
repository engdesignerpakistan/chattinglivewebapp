// ======================================
// Chatting Live - Supabase Configuration
// ======================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Project URL
const SUPABASE_URL = "https://nfljqhraphnyghzkpaqh.supabase.co";

// Publishable (Anon) Key
const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY";

// Create Client
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Export Client
export default supabase;