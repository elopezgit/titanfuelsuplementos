import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://koirnjsbkwqqeyusmbgq.supabase.co';
const supabaseKey = 'sb_publishable_VuzjOCnvBEuufNsyrK8gCw_GCFPwBqL';
const TITAN_EMPRESA_ID = '20087e44-b072-44ca-9136-32bc8f9ad94b';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runUpdate() {
  console.log("Iniciando actualización con imágenes reales de producto para TITAN FUEL SUPLEMENTOS...");
  const rawData = fs.readFileSync('titan_products_final_real.json', 'utf8');
  const enrichedProducts = JSON.parse(rawData);

  console.log(`Total de productos a actualizar: ${enrichedProducts.length}`);
  
  let successCount = 0;
  let errorCount = 0;

  const BATCH_SIZE = 25;
  for (let i = 0; i < enrichedProducts.length; i += BATCH_SIZE) {
    const chunk = enrichedProducts.slice(i, i + BATCH_SIZE);
    
    await Promise.all(
      chunk.map(async (prod) => {
        const { error } = await supabase
          .from('products')
          .update({
            image_url: prod.image_url,
            description: prod.description
          })
          .eq('id', prod.id)
          .eq('empresa_id', TITAN_EMPRESA_ID);

        if (error) {
          console.error(`Error en producto ${prod.name}:`, error.message);
          errorCount++;
        } else {
          successCount++;
        }
      })
    );

    console.log(`Progreso: ${Math.min(i + BATCH_SIZE, enrichedProducts.length)} / ${enrichedProducts.length} actualizados.`);
  }

  console.log("--------------------------------------------------");
  console.log(`Resultado final:`);
  console.log(`- Exitosos: ${successCount}`);
  console.log(`- Errores: ${errorCount}`);
  console.log("--------------------------------------------------");
}

runUpdate().catch(console.error);
