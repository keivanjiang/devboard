//imports
import { useState } from 'react';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DEFAULT_USER = 'keivanjiang'; //thats me!

function GitHubStats() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [repos, setRepos] = useState<any[]>([]);
  useEffect(() => {
    setUsername(DEFAULT_USER);
    fetchGitHubData(DEFAULT_USER);
  },[]);

  const fetchGitHubData = async (user: string = username) => {
    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      if (!res.ok) throw new Error('User not found');
      const json = await res.json();
      setData(json);
      const reposRes = await fetch(`https://api.github.com/users/${user}/repos`);
      const reposJson = await reposRes.json();
      setRepos(reposJson);
      setError('');
    } catch (err: any) {
      setData(null);
      setError(err.message);
    }
  };

  const languageCount: Record<string, number> = {};
  repos.forEach((repo) => {
    const lang = repo.language || 'Unknown';
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        label: 'Repos per Language',
        data: Object.values(languageCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Repositories by Language' },
    },
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
      <button onClick= {() => fetchGitHubData()}>Fetch</button>

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
          {repos.length > 0 && (
            <div>
              <h3>Repositories:</h3>
              <ul>
                {repos.map((r) => (
                  <li key={r.id}>
                    <a href={r.html_url} target="_blank">{r.name}</a> – ⭐{r.stargazers_count}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {repos.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Language Breakdown:</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

        </div>

      )}
    </div>

  );
}

export default GitHubStats;
