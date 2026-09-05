import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://koirnjsbkwqqeyusmbgq.supabase.co';
const supabaseKey = 'sb_publishable_VuzjOCnvBEuufNsyrK8gCw_GCFPwBqL';
const supabase = createClient(supabaseUrl, supabaseKey);

const COMPANY_SLUG = 'catalogo-050926';
const COMPANY_NAME = 'Catálogo Oficial (Lista 050926)';

function parseTxt(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const products = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // The line format usually is: "NAME    PRICE1    [PRICE2]"
    // e.g. "AMINO ENERGY 240 COMP - NUTRILAB		11971.00	10900.00"
    // e.g. "100% BETA ALANINA X 300GRS. STAR NUTRITION		23874.46	"
    
    // Replace tabs with spaces and collapse spaces
    const parts = line.split(/\t+/).map(p => p.trim()).filter(Boolean);
    
    if (parts.length >= 2) {
      // Name is everything except the last 1 or 2 parts if they are numbers
      let prices = [];
      let nameParts = [];
      
      for (let i = 0; i < parts.length; i++) {
        // match numbers like 11971.00 or 10900
        if (/^\d+(\.\d+)?$/.test(parts[i]) && i >= parts.length - 2) {
          prices.push(parseFloat(parts[i]));
        } else {
          nameParts.push(parts[i]);
        }
      }
      
      const name = nameParts.join(' ');
      
      let price = null;
      let offerPrice = null;
      
      if (prices.length === 1) {
        price = prices[0];
      } else if (prices.length === 2) {
        price = Math.max(prices[0], prices[1]);
        offerPrice = Math.min(prices[0], prices[1]);
      } else if (prices.length === 0) {
        // maybe price was separated by space instead of tab
        const spaceParts = name.split(/\s+/);
        const lastPart = spaceParts[spaceParts.length - 1];
        const secondLastPart = spaceParts[spaceParts.length - 2];
        
        let p1 = parseFloat(lastPart);
        let p2 = parseFloat(secondLastPart);
        
        if (!isNaN(p1) && !isNaN(p2)) {
          price = Math.max(p1, p2);
          offerPrice = Math.min(p1, p2);
          nameParts = [spaceParts.slice(0, -2).join(' ')];
        } else if (!isNaN(p1)) {
          price = p1;
          nameParts = [spaceParts.slice(0, -1).join(' ')];
        }
      }

      if (price !== null) {
        products.push({
          name: nameParts.join(' ').replace(/\s+/g, ' ').trim(),
          price: price,
          price_half: offerPrice,
        });
      }
    }
  }
  return products;
}

function determineCategory(productName) {
  const upper = productName.toUpperCase();
  if (upper.includes('WHEY') || upper.includes('PROTEIN') || upper.includes('PROT') || upper.includes('CARNIVOR')) return 'Proteínas';
  if (upper.includes('CREATIN') || upper.includes('CREATINE')) return 'Creatinas';
  if (upper.includes('PRE') || upper.includes('PUMP') || upper.includes('C4') || upper.includes('NOX') || upper.includes('BETA ALANINA') || upper.includes('CAFFEINE') || upper.includes('CAFEINA')) return 'Pre-Entrenos';
  if (upper.includes('BURN') || upper.includes('LIPO') || upper.includes('CARNITIN') || upper.includes('THERMO')) return 'Quemadores';
  if (upper.includes('AMINO') || upper.includes('BCAA') || upper.includes('GLUTAMIN') || upper.includes('ARGININ') || upper.includes('CITRULIN')) return 'Aminoácidos & BCAA';
  if (upper.includes('VITAMIN') || upper.includes('MAGNESIO') || upper.includes('ZINC') || upper.includes('OMEGA') || upper.includes('MULTIVIT')) return 'Vitaminas & Minerales';
  if (upper.includes('COLAGENO') || upper.includes('BEAUTY') || upper.includes('HAIR')) return 'Colágenos & Belleza';
  if (upper.includes('MASS') || upper.includes('GANADOR') || upper.includes('GAINER') || upper.includes('CARBO')) return 'Ganadores & Energía';
  return 'Accesorios & Snacks'; // Default
}

async function run() {
  console.log("Starting seed process...");
  
  // 1. Get or Create Empresa
  let empresaId;
  const { data: existingEmp } = await supabase.from('empresas').select('id').eq('slug', COMPANY_SLUG).maybeSingle();
  if (existingEmp) {
    empresaId = existingEmp.id;
    console.log(`Empresa '${COMPANY_SLUG}' found with ID: ${empresaId}`);
  } else {
    const { data: newEmp, error: empErr } = await supabase.from('empresas').insert({
      slug: COMPANY_SLUG,
      name: COMPANY_NAME,
      is_active: true
    }).select().single();
    if (empErr) throw new Error(`Error creating empresa: ${JSON.stringify(empErr)}`);
    empresaId = newEmp.id;
    console.log(`Created new Empresa '${COMPANY_SLUG}' with ID: ${empresaId}`);
  }

  // 2. Parse Products
  const filePath = path.join(process.cwd(), 'infoBase', 'ListaDePrecios050926.txt');
  const productsRaw = parseTxt(filePath);
  console.log(`Parsed ${productsRaw.length} products from TXT.`);

  // 3. Create Categories
  const categoryNames = [...new Set(productsRaw.map(p => determineCategory(p.name)))];
  const categoriesMap = {}; // name -> id
  
  // fetch existing to avoid duplicates in case of rerun
  const { data: existingCats } = await supabase.from('categories').select('id, name').eq('empresa_id', empresaId);
  if (existingCats) {
    existingCats.forEach(c => categoriesMap[c.name] = c.id);
  }

  for (const catName of categoryNames) {
    if (!categoriesMap[catName]) {
      const { data: newCat, error: catErr } = await supabase.from('categories').insert({
        empresa_id: empresaId,
        name: catName,
        icon: '📌' // default icon
      }).select().single();
      if (catErr) throw new Error(`Error creating category ${catName}: ${JSON.stringify(catErr)}`);
      categoriesMap[catName] = newCat.id;
    }
  }
  console.log(`Ensured ${categoryNames.length} categories.`);

  // 4. Create Banners (3 initial banners)
  const initialBanners = [
    { title: 'OFERTAS DEL MES', image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80', sort_order: 1 },
    { title: 'NUEVOS INGRESOS', image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80', sort_order: 2 },
    { title: 'ENVÍOS A TODO EL PAÍS', image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&q=80', sort_order: 3 },
  ];

  const { data: existingBanners } = await supabase.from('banners').select('id').eq('empresa_id', empresaId);
  if (!existingBanners || existingBanners.length === 0) {
    for (const b of initialBanners) {
      await supabase.from('banners').insert({
        empresa_id: empresaId,
        image_url: b.image_url,
        link: b.title, // using link as a title placeholder if title doesn't exist in schema
        is_active: true
      });
    }
    console.log("Created 3 initial banners.");
  }

  // 5. Insert Products
  // Let's delete existing products for this company to ensure idempotency (or we could upsert by name, but delete is cleaner since it's an isolated company)
  console.log("Clearing existing products for this company...");
  await supabase.from('products').delete().eq('empresa_id', empresaId);

  const productsToInsert = productsRaw.map((p, index) => ({
    empresa_id: empresaId,
    category_id: categoriesMap[determineCategory(p.name)],
    name: p.name,
    price: p.price,
    price_half: p.price_half,
    code: `PROD-${(index + 1).toString().padStart(4, '0')}`,
    is_active: true,
    sort_order: index,
  }));

  console.log("Inserting products in chunks...");
  const chunkSize = 50;
  for (let i = 0; i < productsToInsert.length; i += chunkSize) {
    const chunk = productsToInsert.slice(i, i + chunkSize);
    const { error: pErr } = await supabase.from('products').insert(chunk);
    if (pErr) {
      console.error("Error inserting chunk:", pErr);
    }
  }

  console.log(`Successfully inserted ${productsToInsert.length} products.`);
  
  // Validation counts
  const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact', head: true }).eq('empresa_id', empresaId);
  console.log(`Total products in DB for this company: ${prodCount}`);
}

run().catch(console.error);
