import re
import json

sql_file = "sql/seed_suplementos.sql"
ts_file = "src/data/fallbackCatalog.ts"

with open(sql_file, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

categories = [
    {"id": "cat-1", "name": "Proteínas", "icon": "🥛"},
    {"id": "cat-2", "name": "Creatinas", "icon": "⚡"},
    {"id": "cat-3", "name": "Pre-Entrenos", "icon": "🚀"},
    {"id": "cat-4", "name": "Quemadores", "icon": "🔥"},
    {"id": "cat-5", "name": "Aminoácidos & BCAA", "icon": "💪"},
    {"id": "cat-6", "name": "Vitaminas & Minerales", "icon": "💊"},
    {"id": "cat-7", "name": "Colágenos & Belleza", "icon": "✨"},
    {"id": "cat-8", "name": "Ganadores & Energía", "icon": "🏋️"},
    {"id": "cat-9", "name": "Accesorios & Snacks", "icon": "🍫"},
]

cat_map = {}
for idx, c in enumerate(categories):
    cat_map[c["name"]] = c["id"]

pattern = re.compile(
    r"SELECT\s+v_emp_id,\s+c\.id,\s+'([^']+)',\s+'([^']+)',\s+([0-9.]+),\s+'([^']+)',\s+'([^']*)',\s+([0-9]+)\s+FROM\s+categories\s+c\s+WHERE[^;]+c\.name\s*=\s*'([^']+)'",
    re.IGNORECASE
)

matches = pattern.findall(content)
print(f"Total product matches: {len(matches)}")

products = []
for idx, m in enumerate(matches):
    name, desc, price, img, code, order, cat_name = m
    cat_id = "cat-1"
    for k, v in cat_map.items():
        if k.lower() in cat_name.lower() or cat_name.lower() in k.lower():
            cat_id = v
            break
    products.append({
        "id": f"prod-{idx+1}",
        "category_id": cat_id,
        "name": name,
        "description": desc,
        "price": float(price),
        "image_url": img,
        "code": code,
        "is_active": True,
        "sort_order": int(order)
    })

print(f"Extracted {len(products)} products.")

default_empresa = {
    "id": "emp-titanfuel-default",
    "slug": "titanfuel",
    "name": "TITAN FUEL SUPLEMENTOS",
    "phone": "5493814751620",
    "instagram_url": "https://www.instagram.com/titanfuelsuplementos",
    "maps_url": "",
    "is_active": True
}

default_banners = [
    {
        "id": "ban-1",
        "title": "COMBUSTIBLE DE TITANES",
        "subtitle": "Envíos a todo el país mayorista y minorista",
        "image_url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
        "sort_order": 1
    },
    {
        "id": "ban-2",
        "title": "POTENCIA TU RENDIMIENTO",
        "subtitle": "Las mejores marcas oficiales al mejor precio",
        "image_url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
        "sort_order": 2
    },
    {
        "id": "ban-3",
        "title": "100% PURA CREATINA & WHEY",
        "subtitle": "Calidad superior en suplementación deportiva",
        "image_url": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&q=80",
        "sort_order": 3
    }
]

ts_content = f"""// Catálogo Completo Lisa Mayorista (1) - 318 Productos Fallback Local
export const FALLBACK_EMPRESA = {json.dumps(default_empresa, ensure_ascii=False, indent=2)};
export const FALLBACK_CATEGORIES = {json.dumps(categories, ensure_ascii=False, indent=2)};
export const FALLBACK_BANNERS = {json.dumps(default_banners, ensure_ascii=False, indent=2)};
export const FALLBACK_PRODUCTS = {json.dumps(products, ensure_ascii=False, indent=2)};
"""

import os
os.makedirs(os.path.dirname(ts_file), exist_ok=True)
with open(ts_file, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {ts_file} with {len(products)} products.")
