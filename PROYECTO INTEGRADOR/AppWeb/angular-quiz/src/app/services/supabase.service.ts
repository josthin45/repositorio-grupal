import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Pregunta, Categoria } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;
  private readonly supabaseUrl = 'https://vecxhzkwwljcyaltsqpi.supabase.co';
  private readonly supabaseKey = 'sb_publishable_4VlzEYSilkCadwxyfjlfYw_NX8R5lQn';

  constructor() {}

  initClient(accessToken: string) {
    // Inicializamos el cliente con el access token del iframe
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    });
  }

  get isInitialized(): boolean {
    return this.supabase !== null;
  }

  async getCategorias(): Promise<Categoria[]> {
    if (!this.supabase) return [];
    const { data, error } = await this.supabase.from('categorias').select('*');
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  }

  async getPreguntas(categoriaId?: string): Promise<Pregunta[]> {
    if (!this.supabase) return [];
    let query = this.supabase.from('preguntas').select('*');
    if (categoriaId) {
      query = query.eq('categoria_id', categoriaId);
    }
    const { data, error } = await query;
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  }

  async getPregunta(id: string): Promise<Pregunta | null> {
    if (!this.supabase) return null;
    const { data, error } = await this.supabase.from('preguntas').select('*').eq('id', id).single();
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  async createPregunta(pregunta: Partial<Pregunta>, userId: string): Promise<Pregunta | null> {
    if (!this.supabase) return null;
    const { data, error } = await this.supabase.from('preguntas').insert({ ...pregunta, usuario_id: userId }).select().single();
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }
}
