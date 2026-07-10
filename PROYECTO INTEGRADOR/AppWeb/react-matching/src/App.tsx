import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { MatchingList } from './components/MatchingList';
import { MatchingForm } from './components/MatchingForm';
import { MatchingGame } from './components/MatchingGame';

function App() {
  const { isReady } = useAuth();

  if (!isReady) {
    return <div className="container"><p>Conectando con QuestiaSpace...</p></div>;
  }

  return (
    <BrowserRouter>
      <div className="container">
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)' }}>Módulo Matching</h1>
          <p>Relaciona conceptos con sus definiciones.</p>
        </header>

        <Routes>
          <Route path="/" element={<MatchingList />} />
          <Route path="/new" element={<MatchingForm />} />
          <Route path="/play" element={<MatchingGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
