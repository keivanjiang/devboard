import { useState, useEffect } from 'react';

function MinecraftStatus({ address }: { address: string }) {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/${address}`)
      .then((res) => res.json())
      .then(setStatus)
      .catch(console.error);
  }, [address]);

  if (!status) return <p>Loading server status...</p>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
      {status.icon && (
        <img src={status.icon} alt="Server Icon" width="64" height="64" />
      )}
      <div style={{ marginLeft: '1rem' }}>
        <p><strong>Players:</strong> {status.players.online} / {status.players.max}</p>
        <p><strong>MOTD:</strong> <span dangerouslySetInnerHTML={{ __html: status.motd.html }} /></p>
      </div>
    </div>
  );
}
export default MinecraftStatus;
