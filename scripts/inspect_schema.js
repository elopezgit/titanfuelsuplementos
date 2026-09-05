import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://koirnjsbkwqqeyusmbgq.supabase.co';
const supabaseKey = 'sb_publishable_VuzjOCnvBEuufNsyrK8gCw_GCFPwBqL';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  console.log("Inspecting 'products' table...");
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("Products data:", data);
    if (data && data.length > 0) {
      console.log("Columns:", Object.keys(data[0]));
    } else {
      console.log("No data found in 'products' table, cannot infer columns.");
      // If no data, maybe we can query information_schema? Not possible via REST usually unless exposed.
    }
  }
}

inspectSchema();
