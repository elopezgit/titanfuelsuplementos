import { supabase } from './supabase';

export async function getEmpresaId(slug?: string): Promise<string | null> {
  const data = await getEmpresaData(slug);
  return data?.id || null;
}

export async function getEmpresaData(slug?: string): Promise<any | null> {
  const targetSlug = slug || 'Titan Fuel Suplementos';

  const { data } = await supabase
    .from('empresas')
    .select('*')
    .eq('slug', targetSlug)
    .maybeSingle();

  if (data) {
    return data;
  }

  // Si no encuentra el slug exacto (por ejemplo, si envían 'titanfuel'), 
  // buscamos la compañía oficial de Titan Fuel por su nuevo slug o por ID.
  const { data: fallbackData } = await supabase
    .from('empresas')
    .select('*')
    .or(`slug.ilike.%Titan Fuel%,name.ilike.%Titan Fuel%`)
    .limit(1)
    .maybeSingle();
    
  return fallbackData || null;
}
