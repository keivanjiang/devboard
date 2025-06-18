import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GitHubStats from './pages/GitHubStats';
import Snippets from './pages/Snippets';
import Kanban from './pages/Kanban';
import Blog from './pages/Blog';
import Jobs from './pages/Jobs';
import Personal from './pages/Personal';
import Playground from './pages/Playground';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="github" element={<GitHubStats />} />
        <Route path="snippets" element={<Snippets />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="blog" element={< Blog />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="personal" element={<Personal/>}/>
        <Route path="playground" element={<Playground />} />

      </Route> 
    </Routes>
  );
}

export default App;
