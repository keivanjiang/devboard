import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <nav style={{ width: 200, background: '#f0f0f0', padding: '1rem' }}>
        <h3>DevBoard</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/github">GitHub Stats</Link></li>
          <li><Link to="/snippets">Snippets</Link></li>
          <li><Link to="/kanban">Kanban</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/personal">Personal</Link></li>
          <li><Link to="/playground">Playground</Link></li>

        </ul>
      </nav>

      {/* Dynamic Page Area */}
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
