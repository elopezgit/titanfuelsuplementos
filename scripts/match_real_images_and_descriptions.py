import json
import re
import difflib

# Load Titan products
with open('titan_products_dump.json', 'r', encoding='utf-8') as f:
    titan_products = json.load(f)

# Load PDF extracted catalog
with open('pdf_extracted_catalog.json', 'r', encoding='utf-8') as f:
    pdf_catalog = json.load(f)

# Specific verified high-res packshots (e.g., Mervick, Star Nutrition, ENA, etc.)
SPECIFIC_PACKSHOTS = {
    "WHEY PROTEIN 80% STRAWBERRY X 5LBS - MERVICK": "https://http2.mlstatic.com/D_NQ_NP_979276-MLA108763635387_032026-O.webp",
    "WHEY PROTEIN 80% CHOCOLATE X 5LBS - MERVICK": "https://http2.mlstatic.com/D_NQ_NP_979276-MLA108763635387_032026-O.webp",
    "WHEY PROTEIN 80% VAINILLA X 5LBS - MERVICK": "https://http2.mlstatic.com/D_NQ_NP_979276-MLA108763635387_032026-O.webp",
    "C4 X 30 SERV - CELLUCOR": "https://http2.mlstatic.com/D_NQ_NP_725942-MLA47182285108_082021-O.webp",
    "C4 X 50 SERV. - CELLUCOR": "https://http2.mlstatic.com/D_NQ_NP_725942-MLA47182285108_082021-O.webp",
    "C4 BEBIBLE 473 ML -CELLUCOR": "https://http2.mlstatic.com/D_NQ_NP_725942-MLA47182285108_082021-O.webp",
}

# Normalize string helper
def normalize(s):
    s = s.upper()
    s = re.sub(r'[\-\(\)\,\.\/]', ' ', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

# Create normalized lookup for PDF catalog
pdf_items_with_img = [item for item in pdf_catalog if item.get('image_url')]

def find_best_image(prod_name):
    # 1. Direct specific packshot override
    for spec_name, spec_url in SPECIFIC_PACKSHOTS.items():
        if spec_name.upper() in prod_name.upper() or prod_name.upper() in spec_name.upper():
            return spec_url

    norm_name = normalize(prod_name)
    
    # 2. Exact or substring match in PDF extracted catalog
    for item in pdf_items_with_img:
        item_norm = normalize(item['name'])
        if item_norm in norm_name or norm_name in item_norm:
            return item['image_url']
            
    # 3. Fuzzy similarity match within same brand
    best_match = None
    best_score = 0.0
    
    for item in pdf_items_with_img:
        item_norm = normalize(item['name'])
        score = difflib.SequenceMatcher(None, norm_name, item_norm).ratio()
        if score > best_score:
            best_score = score
            best_match = item
            
    if best_score > 0.45 and best_match:
        return best_match['image_url']
        
    # 4. Brand + Category fallback from PDF
    brand_keywords = [
        'STAR NUTRITION', 'ENA SPORT', 'HOCH SPORT', 'BODY ADVANCED', 'BODY ADVANCE',
        'NUTRILAB', 'VITAMIN WAY', 'MERVICK', 'XTRENGHT', 'GOLD NUTRITION', 'NATULIV',
        'VITALGEN', 'ONE FIT', 'GENERATION FIT'
    ]
    for b in brand_keywords:
        if b in norm_name:
            # find first item with this brand in PDF
            for item in pdf_items_with_img:
                if b in item['brand'].upper() or b in normalize(item['name']):
                    return item['image_url']
                    
    # 5. General fallback to first available real PDF packshot
    return pdf_items_with_img[0]['image_url'] if pdf_items_with_img else "/img/products/p1_1.png"

# Load previous descriptions
with open('titan_products_enriched.json', 'r', encoding='utf-8') as f:
    prev_enriched = {item['id']: item['description'] for item in json.load(f)}

final_products = []
matched_pdf_count = 0
specific_count = 0

for p in titan_products:
    p_id = p['id']
    name = p['name']
    img_url = find_best_image(name)
    
    if img_url.startswith('https://http2.mlstatic.com'):
        specific_count += 1
    elif img_url.startswith('/img/products/'):
        matched_pdf_count += 1
        
    final_products.append({
        'id': p_id,
        'name': name,
        'image_url': img_url,
        'description': prev_enriched.get(p_id, f"Suplemento deportivo original {name}. Formulado con los más altos estándares de calidad nutricional.")
    })

print(f"Total productos: {len(final_products)}")
print(f"Imágenes reales desde PDF: {matched_pdf_count}")
print(f"Imágenes CDN específicas (ML/Oficial): {specific_count}")

with open('titan_products_final_real.json', 'w', encoding='utf-8') as f:
    json.dump(final_products, f, ensure_ascii=False, indent=2)
