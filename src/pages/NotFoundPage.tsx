import { Link } from 'react-router';

// Écran F — route "*" : toute URL inconnue.
export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/">Retour au catalogue</Link>
    </section>
  );
}
