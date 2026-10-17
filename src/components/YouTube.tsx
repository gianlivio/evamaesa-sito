/*
 * Video YouTube incorporato dal dominio senza cookie di profilazione.
 * Parte da solo, muto e in loop: l'audio si attiva dai controlli del player.
 */
export function urlYouTube(id: string, { autoplay = true } = {}) {
  const p = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    loop: "1",
    playlist: id,
    ...(autoplay ? { autoplay: "1", mute: "1" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
}

export function YouTube({ id, titolo }: { id: string; titolo: string }) {
  return (
    <div className="youtube">
      <iframe
        src={urlYouTube(id)}
        title={titolo}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
