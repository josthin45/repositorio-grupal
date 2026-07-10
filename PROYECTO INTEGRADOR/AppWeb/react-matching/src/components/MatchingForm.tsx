import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const MatchingForm: React.FC = () => {
  const { supabase, userId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoria_id: '',
    concepto: '',
    definicion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !userId) return;

    setLoading(true);
    const { error } = await supabase.from('relaciones').insert({
      ...formData,
      usuario_id: userId
    });

    setLoading(false);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="card">
      <h2>Nuevo Par de Conceptos</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>ID Categoría (Temporal)</label>
          <input 
            type="text" 
            required
            value={formData.categoria_id}
            onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Concepto</label>
          <input 
            type="text" 
            required
            value={formData.concepto}
            onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Definición</label>
          <input 
            type="text" 
            required
            value={formData.definicion}
            onChange={(e) => setFormData({ ...formData, definicion: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Par'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
