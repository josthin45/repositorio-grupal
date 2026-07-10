import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Relacion } from '../types';

export const MatchingList: React.FC = () => {
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const [relaciones, setRelaciones] = useState<Relacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelaciones = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('relaciones').select('*');
      if (error) {
        console.error(error);
      } else {
        setRelaciones(data || []);
      }
      setLoading(false);
    };
    fetchRelaciones();
  }, [supabase]);

  if (loading) return <p>Cargando relaciones...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Mis Relaciones (Matching)</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/play')}>Jugar Todos</button>
          <button className="btn btn-primary" onClick={() => navigate('/new')}>Nuevo Par</button>
        </div>
      </div>

      {relaciones.length === 0 ? (
        <p>No tienes pares creados. ¡Crea algunos para empezar a jugar!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {relaciones.map((rel) => (
            <div key={rel.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{rel.concepto}</strong>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>{rel.definicion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
