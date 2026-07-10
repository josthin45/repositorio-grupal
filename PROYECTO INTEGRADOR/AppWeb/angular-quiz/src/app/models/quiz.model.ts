export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  color?: string;
}

export interface Pregunta {
  id: string;
  usuario_id: string;
  categoria_id: string;
  enunciado: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  respuesta: string;
}
