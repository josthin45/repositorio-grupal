import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Relacion } from '../types';

export const MatchingGame: React.FC = () => {
  const { supabase } = useAuth();
  const navigate = useNavigate();
  const [relaciones, setRelaciones] = useState<Relacion[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedConcepto, setSelectedConcepto] = useState<string | null>(null);
  const [selectedDefinicion, setSelectedDefinicion] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAll = async () => {
      if (!supabase) return;
      const { data } = await supabase.from('relaciones').select('*').limit(5); // Tomamos máximo 5 para jugar
      setRelaciones(data || []);
      setLoading(false);
    };
    fetchAll();
  }, [supabase]);

  // Aleatorizar listas
  const conceptos = useMemo(() => {
    return [...relaciones].sort(() => Math.random() - 0.5);
  }, [relaciones]);

  const definiciones = useMemo(() => {
    return [...relaciones].sort(() => Math.random() - 0.5);
  }, [relaciones]);

  // Lógica de coincidencia
  useEffect(() => {
    if (selectedConcepto && selectedDefinicion) {
      // Verificar si coinciden (mismo ID de relación original)
      if (selectedConcepto === selectedDefinicion) {
        setMatchedIds(prev => new Set(prev).add(selectedConcepto));
      }
      
      // Limpiar selección después de un breve momento
      setTimeout(() => {
        setSelectedConcepto(null);
        setSelectedDefinicion(null);
      }, 500);
    }
  }, [selectedConcepto, selectedDefinicion]);

  if (loading) return <p>Cargando juego...</p>;
  if (relaciones.length === 0) return <p>No hay datos para jugar.</p>;

  const isCompleted = matchedIds.size === relaciones.length && relaciones.length > 0;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Modo Juego: Matching</h2>
        <button className="btn btn-outline" onClick={() => navigate('/')}>Volver</button>
      </div>
      
      {isCompleted && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px' }}>
          ¡Felicidades! Has completado todas las relaciones.
        </div>
      )}

      <div className="game-grid" style={{ marginTop: '2rem' }}>
        <div className="game-list">
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Conceptos</h3>
          {conceptos.map(c => {
            const isMatched = matchedIds.has(c.id);
            const isSelected = selectedConcepto === c.id;
            return (
              <div 
                key={`c-${c.id}`} 
                className={`match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => !isMatched && setSelectedConcepto(c.id)}
              >
                {c.concepto}
              </div>
            );
          })}
        </div>
        
        <div className="game-list">
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Definiciones</h3>
          {definiciones.map(d => {
            const isMatched = matchedIds.has(d.id);
            const isSelected = selectedDefinicion === d.id;
            return (
              <div 
                key={`d-${d.id}`} 
                className={`match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => !isMatched && setSelectedDefinicion(d.id)}
              >
                {d.definicion}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
