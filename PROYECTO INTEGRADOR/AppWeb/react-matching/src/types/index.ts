export interface Relacion {
  id: string;
  usuario_id: string;
  categoria_id: string;
  concepto: string;
  definicion: string;
}

export interface Categoria {
  id: string;
  nombre: string;
}
