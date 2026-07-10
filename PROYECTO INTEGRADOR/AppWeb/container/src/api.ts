import { createClient } from '@supabase/supabase-js';

// En un entorno Vite, las variables de entorno se acceden con import.meta.env
// Para este proyecto, vamos a usar las variables globales que están en la raíz
// pero Vite requiere que estén precedidas por VITE_. 
// Alternativamente, como el requerimiento es NEXT_PUBLIC_SUPABASE_URL, podemos leerlas si configuramos vite,
// o hardcodear para la demo ya que es Vanilla TS sin backend Node.
// Para hacerlo dinámico en Vite, lo normal es usar import.meta.env.VITE_...
// Dado que la DB se pasó explícitamente:

const supabaseUrl = 'https://vecxhzkwwljcyaltsqpi.supabase.co';
const supabaseKey = 'sb_publishable_4VlzEYSilkCadwxyfjlfYw_NX8R5lQn';

export const supabase = createClient(supabaseUrl, supabaseKey);
