import {createClient} from "@supabase/supabase-js";
//connect supabase to react
export const supabaseUrl = "https://ghyfwjiwsgsdjnbgmnvf.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoeWZ3aml3c2dzZGpuYmdtbnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4NzQ2MDcsImV4cCI6MjAxMzQ1MDYwN30.KeyL6vxgYiGKhMpA1TNuVlzy1t4ch8BqojWm1TTB-5M";
//This key is safe to use in browser if we have enable Row Level Security for the tables and configured policies;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
