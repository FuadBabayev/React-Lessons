### SUPABASE
**Supabase** Service that allows developers to easily `create a Back-end with Postgres database`


# Creating New DataBase
1. `https://supabase.com/` go to this site and `Start your Project with Github`
2. `Create New Organization` Create you own Database
3. `New project`  Give Name and Password (FuadBabayev)


# Creating new Tables
All states will be **Global Remote State**, stored within **Supabase** and There will be **one table for each state** "slice" in the database
Booking hansi guest-den ve hansi cabinden sifaris edildiyini bilmek ucun Guest ve Cabin tablelerden id alir buna hemin idler `foreign keys` adlanir
1. `Table Editor/Create a new Table` then give **Name** there is no need any **Description** make **Enable Row Level Security(RSL)** marked then `Save` 
2. While creating in `Columns` there are mor types: `text` -> string,  `int2` -> numbers, `float4` -> 9.99, `bool` -> boolean, `timestamp` -> current time
3. Adding some date to that table `Insert -> Insert Now`


# Relationship Between Tables
1. You will do all ways of Creating new Table additionally you give link with previously created table with `Edit foreign key relation`


# Adding Security Policies (RLS)
1. `API Docs/cabins/hide&anon(public)&service_role(secret)/` buradan **anon(public)** edib asagida **READ ALL ROWS** COPY edib teminalda PASTE et
```bash
curl 'https://ppmcqelguajxxpjhuztd.supabase.co/rest/v1/cabins?select=*' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWNxZWxndWFqeHhwamh1enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTg2NjIsImV4cCI6MjAyNjY5NDY2Mn0.sRJaWYqBcHTW2fPL7xDrI5l1GzRQ6dpvzPCsWobLw-8" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWNxZWxndWFqeHhwamh1enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTg2NjIsImV4cCI6MjAyNjY5NDY2Mn0.sRJaWYqBcHTW2fPL7xDrI5l1GzRQ6dpvzPCsWobLw-8"
```
And Terminal cannot read the data because of Security Policies
2. `Authentication/policies/tableWeWantToChange/New Policy/Get Started Quickly/Enable read access to everyone/Use this template/Review/Save policy`


# Connecting Supabase with our React App
1. `npm install --save @supabase/supabase-js`
2. Create file `services/supabase.js`
```bash
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ppmcqelguajxxpjhuztd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
```
3. `Project Settings/API/Copy Project API keys` and replace const supabaseKey = process.env.SUPABASE_KEY (LINK)
```bash
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ppmcqelguajxxpjhuztd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWNxZWxndWFqeHhwamh1enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTg2NjIsImV4cCI6MjAyNjY5NDY2Mn0.sRJaWYqBcHTW2fPL7xDrI5l1GzRQ6dpvzPCsWobLw-8'
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
```
4. Create file `services/apiCabins.js`
```bash
import supabase from "./supabase";
export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.warn(error);
        throw new Error('Cabins could not be loaded');
    }
    return data;
}
```
5. Use it whichever component you want
```bash
function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
```


# Setting Up Storage Buckets (Where we can upload large files)
1. `Storage/New Bucket/Make it Public Bucket/Save` and we upload large files into them and use URL to render images
2. Press one of the uploaded files and `Get URL` to use it in order to render
3. And also we can add this url into Tables we created 
```bash
Before: {id: 1, name: '001', maxCapacity: 2, ... , image: null}
After:  {id: 1, name: '001', maxCapacity: 2, ... , image: "https://ppmcqelguajxxpjhuztd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"}
```

