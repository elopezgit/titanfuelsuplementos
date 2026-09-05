import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://koirnjsbkwqqeyusmbgq.supabase.co';
const supabaseKey = 'sb_publishable_VuzjOCnvBEuufNsyrK8gCw_GCFPwBqL';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data: emp, error: empErr } = await supabase
    .from('empresas')
    .insert([{ slug: 'test-agent', name: 'Test Agent Company' }])
    .select()
    .single();
    
  if (empErr) {
    console.error("Error inserting empresa:", empErr);
    return;
  }
  
  console.log("Inserted empresa:", emp);
  
  // clean up
  await supabase.from('empresas').delete().eq('id', emp.id);
  console.log("Cleaned up test empresa");
}

testInsert();
