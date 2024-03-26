import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ppmcqelguajxxpjhuztd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWNxZWxndWFqeHhwamh1enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTg2NjIsImV4cCI6MjAyNjY5NDY2Mn0.sRJaWYqBcHTW2fPL7xDrI5l1GzRQ6dpvzPCsWobLw-8'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;