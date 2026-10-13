// Fait avec Claude.ai
/** Les trois états génériques d'un écran alimenté par le réseau (écran F). */

export function Loader() {
  return <p role="status">Chargement…</p>;
}

type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Réessayer
      </button>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <p>{message}</p>;
}
