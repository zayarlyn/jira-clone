import Menubar from './components/menubar/Menubar';
import Project from './components/project/Project';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <main className='h-screen flex bg-light-c-1'>
      {/* <div className='flex'> */}
        <Sidebar />
        <Menubar />
        <Project />
      {/* </div> */}
    </main>
  );
}

export default App;
