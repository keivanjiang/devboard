import { useState } from 'react';

function GitHubStats() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchGitHubData = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('User not found');
      const json = await res.json();
      setData(json);
      setError('');
    } catch (err: any) {
      setData(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>GitHub Stats</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchGitHubData}>Fetch</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '1rem' }}>
          <img src={data.avatar_url} alt="avatar" width={100} />
          <h2>{data.name || data.login}</h2>
          <p>{data.bio}</p>
          <p>Public Repos: {data.public_repos}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
          <a href={data.html_url} target="_blank">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default GitHubStats;
