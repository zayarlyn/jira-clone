import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Menubar from './components/menubar/Menubar';
import Sidebar from './components/sidebar/Sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Welcome from './components/auth/Welcome';
import Signup from './components/auth/Signup';
import LogIn from './components/auth/Login';

function App() {
  return (
    <main className='flex h-screen bg-light-c-111 bg-gray-500'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* <Route>
              <Sidebar />
              <Menubar />
              <Dashboard />
            </Route> */}
            <Route path='/' element={<Welcome />}>
              <Route path='signup' element={<Signup />} />
              <Route path='login' element={<LogIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
}

export default App;
