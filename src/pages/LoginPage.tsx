import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { Location } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../services/api';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login({ username, password });
      const from = (location.state as { from?: Location })?.from;
      navigate(from ?? '/', { replace: true });
    } catch (caught) {
      const isNetworkFailure = caught instanceof ApiError && caught.status === undefined;
      setError(
        isNetworkFailure
          ? 'Impossible de contacter le serveur. Vérifiez votre connexion internet.'
          : 'Identifiants incorrects.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Connexion</h1>
      <p>Connectez-vous pour proposer une recette</p>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p>Compte de test : emilys / emilyspass</p>
    </section>
  );
}
