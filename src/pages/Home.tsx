import PageTitle from '../components/PageTitle';
import CreateNote from '../components/CreateNote';


function Home() {
  return (
    <div>
      <PageTitle title="Home" />
      <h1>Welcome to DevBoard</h1>
      <p>This is your central hub. Pick a tool from the sidebar to get started.</p>


      <div>
        <h4>Notes</h4>
        <CreateNote />
      </div>
    </div>
  );
}

export default Home;
