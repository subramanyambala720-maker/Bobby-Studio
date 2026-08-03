import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://xdxbuoqspwfrruybqkxd.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_GONsdnlTcVaXHXZwfgPccQ_go-GtU1y';

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
