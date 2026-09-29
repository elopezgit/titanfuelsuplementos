import fitz
import os
import re
import json

doc = fitz.open(r'infoBase\Suplement Facts.xlsx - Lisa Mayorista (1).pdf')
os.makedirs(r'public\img\products', exist_ok=True)

# 1. Extract all images and map to page & vertical order
extracted_map = {} # (page_num, img_index) -> filepath

known_brands = [
    'STAR NUTRITION', 'HOCH SPORT', 'ENA SPORT', 'GENERATION FIT',
    'NUTRILAB', 'BODY ADVANCED', 'BODY ADVANCE', 'VITAMIN WAY', 'MERVICK',
    'XTRENGHT', 'GOLD NUTRITION', 'NATULIV', 'OPTIMUN NUTRITION', 'OPTIMUM NUTRITION',
    'SYNTHA 6', 'BSN', 'DYMATIZE', 'UNIVERSAL', 'VITALGEN', 'ONE FIT', 'RACERS LABS', 'GENTECH', 'GAT SPORT', 'NUTREX', 'GOOD ENERGY', 'SPX', 'RED UNLIMITED'
]

page_catalog = [] # list of (product_name, brand, img_path)

for page_num in range(len(doc)):
    page = doc[page_num]
    
    # Text blocks
    blocks = page.get_text('blocks')
    current_brand = 'STAR NUTRITION'
    prod_lines = []
    
    for b in blocks:
        text = b[4].strip()
        if not text: continue
        for line in text.split('\n'):
            line_clean = line.strip()
            if not line_clean: continue
            if any(line_clean.upper() == kb for kb in known_brands):
                current_brand = line_clean.upper()
                continue
            if line_clean.upper() in ['PRODUCTO', 'PRECIO', 'PRODUCTO PRECIO', 'PRECIO PRODUCTO']:
                continue
            if re.match(r'^\$\s*[0-9\.\,]+', line_clean):
                continue
            if len(line_clean) < 3:
                continue
            
            clean_name = re.sub(r'\$\s*[0-9\.\,]+.*', '', line_clean).strip()
            if clean_name and len(clean_name) > 3:
                prod_lines.append({
                    'name': clean_name,
                    'brand': current_brand,
                    'y0': b[1],
                    'y1': b[3],
                    'y_center': (b[1] + b[3]) / 2
                })
                
    # Page images
    img_infos = page.get_images(full=True)
    page_images = []
    for img_idx, img in enumerate(img_infos):
        xref = img[0]
        rects = page.get_image_rects(xref)
        if rects:
            r = rects[0]
            if (r.y1 - r.y0) < 25 or (r.x1 - r.x0) < 25: continue
            if r.x0 > 200 and r.y0 < 250: continue # Header banner
            page_images.append({
                'xref': xref,
                'y0': r.y0,
                'y1': r.y1,
                'y_center': (r.y0 + r.y1) / 2
            })
            
    page_images.sort(key=lambda x: x['y_center'])
    
    # Save image files and pair with product lines
    for idx, pinfo in enumerate(prod_lines):
        img_file_path = None
        if idx < len(page_images):
            img_info = page_images[idx]
            base_image = doc.extract_image(img_info['xref'])
            image_bytes = base_image['image']
            image_ext = base_image['ext']
            safe_name = f"p{page_num+1}_{idx+1}.{image_ext}"
            disk_path = os.path.join(r'public\img\products', safe_name)
            with open(disk_path, 'wb') as img_out:
                img_out.write(image_bytes)
            img_file_path = f"/img/products/{safe_name}"
            
        page_catalog.append({
            'page': page_num + 1,
            'name': pinfo['name'],
            'brand': pinfo['brand'],
            'image_url': img_file_path
        })

print(f"Extracted and mapped {len(page_catalog)} products from PDF!")
with open('pdf_extracted_catalog.json', 'w', encoding='utf-8') as f:
    json.dump(page_catalog, f, ensure_ascii=False, indent=2)
