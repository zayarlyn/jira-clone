import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getTheme } from './utils';
const Welcome = lazy(() => import('./components/auth/Welcome'));

const Setting = lazy(() => import('./components/project/Setting'));
const Project = lazy(() => import('./components/project/Project'));
const Home = lazy(() => import('./components/home/Home'));
const Adios = lazy(() => import('./components/auth/Adios'));

function App() {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => setTheme(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' }));

  return (
    <main
      className={`flex h-screen min-h-fit bg-c-111 bg-gray-500 ${
        theme.mode === 'light' ? 'light-theme' : 'dark-theme'
      }`}
    >
      <Provider store={store}>
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route path='/project' element={<Home theme={theme} toggleTheme={toggleTheme} />}>
                <Route path=':projectId' element={<Setting />} />
                <Route path=':projectId/board' element={<Project />} />
              </Route>
              <Route path='/register' element={<Welcome type='REGISTER' />} />
              <Route path='/login' element={<Welcome type='LOGIN' />} />
              <Route path='/adios' element={<Adios />} />
              <Route path='/' element={<Navigate to='/project' />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </main>
  );
}

export default App;
