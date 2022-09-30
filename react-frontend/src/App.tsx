import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/Login';
import Setting from './components/project/Setting';
import Project from './components/project/Project';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import { useState } from 'react';
import Authenticated from './components/auth/Authenticated';

function App() {
  const [theme, setTheme] = useState<Theme>(getTheme());

  const toggleTheme = () => setTheme(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' }));

  return (
    <main
      className={`flex h-screen bg-c-111 bg-gray-500 ${
        theme.mode === 'light' ? 'light-theme' : 'dark-theme'
      }`}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/project' element={<Home theme={theme} toggleTheme={toggleTheme} />}>
              <Route path=':projectId' element={<Setting />} />
              <Route path=':projectId/board' element={<Project />} />
            </Route>
            <Route path='/register/*' element={<Welcome children={Register} />} />
            <Route path='/login/*' element={<Welcome children={LogIn} />} />
            {/* <Route path='/authenticated' element={<Authenticated />} /> */}
            <Route path='/' element={<Navigate to='/project' />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
}

export default App;

function getTheme() {
  const localTheme = localStorage.getItem('jira-clone-theme');
  return localTheme ? JSON.parse(localTheme) : { mode: 'light' };
}

export type Theme = { mode: 'light' | 'dark' };
