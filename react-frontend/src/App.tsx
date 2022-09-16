import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Welcome from './components/auth/Welcome';
import Signup from './components/auth/Signup';
import LogIn from './components/auth/Login';
import Setting from './components/project/Setting';
import Project from './components/project/Project';
import Home from './components/home/Home';

function App() {
  return (
    <main className='flex h-screen bg-light-c-111 bg-gray-500'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/project/:projectId' element={<Home />}>
              <Route path='board' element={<Project />} />
              <Route path='setting' element={<Setting />} />
            </Route>
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
