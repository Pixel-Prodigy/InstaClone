import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const superbaseUrl = "https://illkfbyvbqonfqmvmswo.supabase.co";
const supabaseServiceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbGtmYnl2YnFvbmZxbXZtc3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjMzNzMsImV4cCI6MjA1NzAzOTM3M30.5g1nGZ3uaoiWFTIjrEz7SfG7KEh2joj6YgGVe-q7WqI";
export const supabase = createClient(superbaseUrl, supabaseServiceRoleKey);
