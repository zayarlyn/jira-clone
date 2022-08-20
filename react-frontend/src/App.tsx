import Project from './components/project/Project';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <main className='h-screen bg-light-c-1'>
      <div className='flex'>
        <Sidebar />
        <Project />
      </div>
    </main>
  );
}

export default App;
