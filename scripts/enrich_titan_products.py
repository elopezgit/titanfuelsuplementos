import json
import re

with open('titan_products_dump.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# High quality, ultra-clean product photos for sports nutrition
IMAGE_CATALOG = {
    # Proteínas
    "whey_protein": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&auto=format&fit=crop&q=80",
    "whey_isolate": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
    "whey_gourmet": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    "protein_blend": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&auto=format&fit=crop&q=80",
    "vegan_protein": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    
    # Creatinas
    "creatina_monohidrato": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    "creapure": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    "creatina_caps": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80",
    
    # Pre-Entrenos
    "pre_entreno_powder": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80",
    "c4_cellucor": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    "oxido_nitrico": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
    
    # Aminoácidos & BCAA
    "bcaa": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80",
    "glutamina": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    "amino_liquid": "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=800&auto=format&fit=crop&q=80",
    
    # Quemadores
    "quemador_termogenico": "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&auto=format&fit=crop&q=80",
    "carnitina": "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&auto=format&fit=crop&q=80",
    "ripped": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    
    # Ganadores & Energía
    "gainer": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
    "energia_gel": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&auto=format&fit=crop&q=80",
    "carbohidratos": "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&auto=format&fit=crop&q=80",
    
    # Vitaminas & Minerales
    "multivitaminico": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80",
    "magnesio_potasio": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80",
    "vitamina_c_d": "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&auto=format&fit=crop&q=80",
    "omega_3": "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&auto=format&fit=crop&q=80",
    "zma": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    
    # Colágenos & Belleza
    "colageno": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    "colageno_sobres": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
    "resveratrol_antiox": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80",
    
    # Accesorios & Snacks
    "shaker": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&auto=format&fit=crop&q=80",
    "barrita": "https://images.unsplash.com/photo-1622484216802-99037c222ff4?w=800&auto=format&fit=crop&q=80"
}

def determine_product_details(p):
    name_upper = p['name'].upper()
    
    # Flavors
    flavors = ["CHOCOLATE", "VAINILLA", "FRUTILLA", "DULCE DE LECHE", "COOKIES", "BANANA", "FRUTOS ROJOS", "MANGO", "LIMONADA", "NARANJA", "NEUTRO", "BLUEBERRY", "MANZANA", "UVA", "FRUIT PUNCH", "SANDIA"]
    found_flavor = None
    for f in flavors:
        if f in name_upper:
            found_flavor = f.title()
            break
            
    # Brand detection
    brand = "Calidad Premium"
    for b in [
        "STAR NUTRITION", "ENA SPORT", "HOCH SPORT", "BODY ADVANCE", "BODY ADVANCED",
        "NUTRILAB", "VITAMIN WAY", "MERVICK", "XTRENGHT", "GOLD NUTRITION", "NATULIV",
        "OPTIMUN NUTRITION", "OPTIMUM NUTRITION", "SYNTHA 6", "BSN", "DYMATIZE",
        "CELLUCOR", "VITALGEN", "ONE FIT NUTRITION", "ONE FIT", "GENERATION FIT",
        "RACERS LABS", "GENTECH", "GAT SPORT", "NUTREX", "GOOD ENERGY", "SPX", "RED UNLIMITED"
    ]:
        if b in name_upper:
            brand = b.title()
            break

    # 1. PLANT PROTEIN / VEGAN
    if "PLANT" in name_upper or "VEGAN" in name_upper or "VEGETAL" in name_upper:
        img_url = IMAGE_CATALOG["vegan_protein"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Proteína vegetal aislada de alta biodisponibilidad de {brand}{flavor_text}. Perfil completo de aminoácidos esenciales de origen 100% vegetal sin lactosa, gluten ni azúcares añadidos. Ideal para atletas veganos, personas con sensibilidad digestiva y desarrollo muscular limpio. Modo de uso: Disolver 1 scoop (30g) en 250ml de agua o leche vegetal después de entrenar."

    # 2. PROTEÍNAS ISOLATE / HYDRO
    elif any(k in name_upper for k in ["ISOLATE", "ISO WHEY", "HYDRO", "HYDROLYZED"]):
        img_url = IMAGE_CATALOG["whey_isolate"]
        flavor_text = f" en delicioso sabor {found_flavor}" if found_flavor else ""
        desc = f"Proteína de suero aislada (Isolate) de {brand}{flavor_text}. Máxima pureza con casi cero carbohidratos, grasas y lactosa. Formulada para una digestión ultrarrápida y óptima definición muscular. Ideal para etapas de déficit calórico o recuperación muscular inmediata. Modo de uso: Tomar 1 scoop (30g) diluido en 200ml de agua post-entreno."

    # 3. PROTEÍNAS GOURMET / COOKIES
    elif any(k in name_upper for k in ["GOURMET", "COOKIES & CREAM", "COOKIES"]):
        img_url = IMAGE_CATALOG["whey_gourmet"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Proteína de suero lácteo línea Gourmet de {brand}{flavor_text}. Combina un perfil nutricional superior de 25g de proteína por porción con una textura cremosa y sabor inigualable. Rica en BCAA y aminoácidos esenciales. Modo de uso: Mezclar 1 servicio en 250ml de agua o leche descremada después de entrenar o como snack proteico."

    # 4. ALBÚMINA / HUEVO
    elif any(k in name_upper for k in ["ALBUMINA", "EGG PROTEIN"]):
        img_url = IMAGE_CATALOG["protein_blend"]
        desc = f"Albúmina de huevo pura de {brand}. Proteína de alto valor biológico y absorción media-lenta, ideal para mantener un aporte sostenido de aminoácidos durante el día o antes de dormir. Libre de grasas. Modo de uso: Disolver 1 porción en agua o batidos."

    # 5. WHEY PROTEIN CONCENTRADA / BLEND
    elif any(k in name_upper for k in ["WHEY", "PROTEIN", "SYNTHA", "CARNIVOR", "100% PURE"]):
        img_url = IMAGE_CATALOG["whey_protein"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Proteína 100% Whey concentrada de suero lácteo de {brand}{flavor_text}. Aporta más de 24g de proteína de máxima biodisponibilidad por porción, acelerando la recuperación muscular y promoviendo el crecimiento de masa magra. Modo de uso: Disolver 1 scoop (30g) en 200-250ml de agua inmediatamente después del entrenamiento."

    # 6. CREATINA CREAPURE
    elif "CREAPURE" in name_upper:
        img_url = IMAGE_CATALOG["creapure"]
        desc = f"Creatina Monohidrato con sello Creapure® de {brand}. La materia prima de mayor pureza y control de calidad del mundo. Diseñada para aumentar la fuerza explosiva, la resistencia anaeróbica y la potencia muscular. Modo de uso: Tomar 1 servicio (5g) diariamente con agua o jugo natural."

    # 7. CREATINA CÁPSULAS / COMPRIMIDOS / MASTICABLE
    elif any(k in name_upper for k in ["CREATINA", "CREATINE"]) and any(k in name_upper for k in ["CAPS", "COMP", "MASTICABLE", "TABLETAS"]):
        img_url = IMAGE_CATALOG["creatina_caps"]
        desc = f"Creatina micronizada en formato comprimidos/cápsulas de {brand}. Práctica y precisa para transportar e ingerir en cualquier momento. Aumenta la fuerza muscular y acelera la recuperación de ATP celular. Modo de uso: Tomar la dosis sugerida (4-5 comprimidos) antes o después de entrenar."

    # 8. CREATINA MONOHIDRATO POLVO
    elif any(k in name_upper for k in ["CREATINA", "CREATINE"]):
        img_url = IMAGE_CATALOG["creatina_monohidrato"]
        desc = f"Creatina Monohidrato 100% pura y micronizada de {brand}. Optimiza la resíntesis de fosfocreatina muscular, incrementando significativamente la fuerza, resistencia y congestión muscular en entrenamientos intensos. Modo de uso: Consumir 1 scoop (5g) al día, preferentemente post-entreno con carbohidratos."

    # 9. PRE-ENTRENO C4 / FORMULAS
    elif "C4" in name_upper:
        img_url = IMAGE_CATALOG["c4_cellucor"]
        desc = f"Pre-entrenamiento de élite C4 de Cellucor. Fórmula legendaria con CarnoSyn® Beta-Alanina, Cafeína y Nitrato de Creatina para energía explosiva, resistencia muscular prolongada y un enfoque mental extremo. Modo de uso: Tomar 1 porción disuelta en agua 20-30 minutos antes del entrenamiento."

    # 10. PRECURSORES DE ÓXIDO NÍTRICO / ARGININA / CITRULINA / BETA ALANINA
    elif any(k in name_upper for k in ["BETA ALANINA", "ARGININA", "CITRULINA", "OXIDO", "PUMP", "NITRO", "EXPLODE", "WARCRY", "PRE ENTR", "PRE WORKOUT", "PRE-WORKOUT"]):
        img_url = IMAGE_CATALOG["pre_entreno_powder"]
        desc = f"Potente complejo Pre-Entrenamiento y precursor de Óxido Nítrico de {brand}. Estimula la vasodilatación, mejorando el flujo sanguíneo, el transporte de oxígeno y nutrientes directo a las fibras musculares para un bombeo y energía superior. Modo de uso: Tomar 1 porción 20-30 minutos antes del entrenamiento intenso."

    # 11. GLUTAMINA
    elif any(k in name_upper for k in ["GLUTAMINA", "GLUTAMINE"]):
        img_url = IMAGE_CATALOG["glutamina"]
        desc = f"L-Glutamina 100% pura micronizada de {brand}. El aminoácido más abundante en el tejido muscular; fundamental para la regeneración tisular, refuerzo del sistema inmune y prevención del catabolismo muscular. Modo de uso: Tomar 1 servicio (5g) post-entreno o antes de dormir."

    # 12. AMINOÁCIDOS LÍQUIDOS
    elif any(k in name_upper for k in ["AMINO LIQUID", "BEBIBLE", "AMINO 473"]):
        img_url = IMAGE_CATALOG["amino_liquid"]
        desc = f"Aminoácidos líquidos de absorción instantánea de {brand}. Evitan la degradación muscular durante el esfuerzo atlético y aceleran la rehidratación celular. Modo de uso: Consumir 1 servicio antes o durante la actividad física."

    # 13. BCAA / AMINOÁCIDOS
    elif any(k in name_upper for k in ["BCAA", "AMINO", "EAA", "LEUCINA"]):
        img_url = IMAGE_CATALOG["bcaa"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Aminoácidos de Cadena Ramificada (BCAA ratio óptimo) de {brand}{flavor_text}. Estimulan directamente la síntesis proteica (vía mTOR), protegen la masa muscular y disminuyen la fatiga durante el ejercicio. Modo de uso: Tomar 1 servicio antes, durante o después de entrenar."

    # 14. L-CARNITINA
    elif any(k in name_upper for k in ["CARNITINA", "CARNITINE"]):
        img_url = IMAGE_CATALOG["carnitina"]
        desc = f"L-Carnitina pura de {brand}. Facilita el transporte de ácidos grasos hacia las mitocondrias para convertirlos en energía utilizable, favoreciendo la quema de grasa y mejorando la resistencia aeróbica. Modo de uso: Tomar 1 porción 30 minutos antes del ejercicio cardiovascular o de fuerza."

    # 15. QUEMADORES TERMOGÉNICOS / RIPPED
    elif any(k in name_upper for k in ["RIPPED", "QUEMADOR", "BURNER", "FAT BURNER", "LIPO", "CLA", "TERMOGENICO", "THERMO"]):
        img_url = IMAGE_CATALOG["ripped"]
        desc = f"Quemador termogénico avanzado de {brand}. Matriz multifásica con extractos naturales y estimulantes que aceleran el metabolismo basal, favorecen la termogénesis y ayudan en la definición muscular. Modo de uso: Consumir 1 dosis por la mañana o antes del entrenamiento."

    # 16. GELES ENERGÉTICOS
    elif "GEL" in name_upper:
        img_url = IMAGE_CATALOG["energia_gel"]
        desc = f"Gel energético de acción rápida de {brand}. Aporte inmediato de carbohidratos simples y electrolitos para evitar caídas de glucógeno y mantener un ritmo sostenido en deportes de resistencia. Modo de uso: Consumir 1 sachet durante el entrenamiento o competición."

    # 17. CARBOHIDRATOS / MALTODEXTRINA / DEXTROSA
    elif any(k in name_upper for k in ["MALTODEXTRINA", "DEXTROSA", "CARBO"]):
        img_url = IMAGE_CATALOG["carbohidratos"]
        desc = f"Carbohidratos complejos de recarga de glucógeno de {brand}. Esenciales para restaurar las reservas energéticas musculares y potenciar la recuperación post-esfuerzo. Modo de uso: Disolver 1 porción en agua o batido proteico post-entreno."

    # 18. MASS GAINERS / GANADORES DE PESO
    elif any(k in name_upper for k in ["MASS", "GAINER", "MUTANT", "SUPER GAIN"]):
        img_url = IMAGE_CATALOG["gainer"]
        desc = f"Ganador de masa muscular hipercalórico de {brand}. Combinación equilibrada de carbohidratos de asimilación gradual, proteínas de alto valor biológico y micronutrientes para maximizar volumen corporal magro. Modo de uso: Consumir 1 a 2 porciones al día entre comidas y/o post-entreno."

    # 19. COLÁGENO EN SOBRES
    elif any(k in name_upper for k in ["COLAGENO", "COLLAGEN"]) and any(k in name_upper for k in ["SOBRES", "CAJA"]):
        img_url = IMAGE_CATALOG["colageno_sobres"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Colágeno hidrolizado en prácticos sobres individuales de {brand}{flavor_text}. Enriquecido con Ácido Hialurónico, Coenzima Q10 y Vitamina C para rejuvenecer la piel, fortalecer uñas y regenerar articulaciones. Modo de uso: Disolver 1 sobre al día en un vaso de agua."

    # 20. COLÁGENO POLVO / COMPRIMIDOS
    elif any(k in name_upper for k in ["COLAGENO", "COLLAGEN", "BEAUTY", "HYALURONIC"]):
        img_url = IMAGE_CATALOG["colageno"]
        flavor_text = f" sabor {found_flavor}" if found_flavor else ""
        desc = f"Colágeno Hidrolizado de alta pureza y biodisponibilidad de {brand}{flavor_text}. Restaura la elasticidad de la piel, fortalece tendones, ligamentos y cartílagos, y combate el desgaste articular. Modo de uso: Disolver 1 scoop (10-12g) en agua o jugo diariamente."

    # 21. RESVERATROL / ANTIOXIDANTES
    elif "RESVERATROL" in name_upper:
        img_url = IMAGE_CATALOG["resveratrol_antiox"]
        desc = f"Potente complejo antioxidante con Resveratrol de {brand}. Neutraliza el estrés oxidativo celular, protege la salud cardiovascular y favorece la longevidad celular activa. Modo de uso: Tomar 1 cápsula diaria con una comida principal."

    # 22. CITRATO DE MAGNESIO / POTASIO
    elif any(k in name_upper for k in ["MAGNESIO", "POTASIO"]):
        img_url = IMAGE_CATALOG["magnesio_potasio"]
        desc = f"Citrato de Magnesio / Potasio de alta biodisponibilidad de {brand}. Previene calambres musculares, optimiza la función neuromuscular y mejora la calidad del descanso reparador. Modo de uso: Tomar 1 porción diaria disuelta en agua por la noche o post-entreno."

    # 23. ZMA
    elif "ZMA" in name_upper:
        img_url = IMAGE_CATALOG["zma"]
        desc = f"Fórmula ZMA (Zinc, Magnesio y Vitamina B6) de {brand}. Promueve la recuperación neuromuscular profunda nocturna, el equilibrio hormonal y la fuerza muscular. Modo de uso: Tomar 2 a 3 cápsulas 30-60 minutos antes de acostarse."

    # 24. OMEGA 3
    elif "OMEGA" in name_upper:
        img_url = IMAGE_CATALOG["omega_3"]
        desc = f"Aceite de Pescado puro rico en Omega 3 (EPA y DHA) de {brand}. Acción antiinflamatoria muscular, protección cardiovascular y apoyo integral a la función cerebral. Modo de uso: Tomar 1 a 2 cápsulas blandas diarias junto a las comidas."

    # 25. VITAMINA C / VITAMINA D / MULTIVITAMÍNICOS
    elif any(k in name_upper for k in ["VITAMINA", "MULTIVIT", "ZINC", "CALCIO", "SPIRULINA", "GINKGO", "MELATONINA", "VALERIANA", "PROPOLIS", "FOSFO"]):
        img_url = IMAGE_CATALOG["vitamina_c_d"]
        desc = f"Complejo vitamínico & mineral de alta concentración de {brand}. Refuerza las defensas del sistema inmunológico, combate el estrés oxidativo y garantiza vitalidad diaria para deportistas. Modo de uso: Tomar 1 porción diaria con el desayuno."

    # 26. SHAKERS & BOTELLAS
    elif any(k in name_upper for k in ["SHAKER", "VASO", "BOTELLA"]):
        img_url = IMAGE_CATALOG["shaker"]
        desc = f"Vaso mezclador Shaker ergonómico de alta resistencia y libre de BPA. Cuenta con rejilla mezcladora antigrumos y tapa hermética a prueba de fugas para tus batidos de entrenamiento."

    # 27. BARRITAS & SNACKS
    elif any(k in name_upper for k in ["BARRA", "BARRITA", "ALFAJOR", "SNACK"]):
        img_url = IMAGE_CATALOG["barrita"]
        desc = f"Barra proteica gourmet de alto valor biológico. Excelente opción de snack saludable para consumir entre comidas, post-entreno o durante la jornada."

    # 28. COMBOS & PACKS
    elif "COMBO" in name_upper or "PACK" in name_upper:
        img_url = IMAGE_CATALOG["whey_protein"]
        desc = f"Combo integral de suplementación deportiva de {brand}. Diseñado para brindar una sinergia completa en fuerza, recuperación y desarrollo muscular al mejor valor."

    # DEFAULT
    else:
        img_url = IMAGE_CATALOG["whey_protein"]
        desc = f"Suplemento nutricional deportivo premium de {brand}. Formulado bajo rigurosos estándares de calidad para optimizar el rendimiento atlético y el bienestar físico integral. Modo de uso: Consumir según indicación del fabricante."

    return img_url, desc

enriched = []
for p in products:
    img_url, desc = determine_product_details(p)
    enriched.append({
        "id": p["id"],
        "name": p["name"],
        "image_url": img_url,
        "description": desc
    })

with open("titan_products_enriched.json", "w", encoding="utf-8") as f:
    json.dump(enriched, f, ensure_ascii=False, indent=2)

print(f"Generated {len(enriched)} enriched products.")
