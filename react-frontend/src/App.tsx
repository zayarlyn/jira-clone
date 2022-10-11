import { BrowserRouter as BR, Navigate, Route as R, Routes } from 'react-router-dom';
import { lazy, Suspense as S, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getTheme } from './utils';
import Welcome from './components/auth/Welcome';
import Home from './components/home/Home';
import { Toaster } from 'react-hot-toast';

const Setting = lazy(() => import('./components/project/Setting'));
const Project = lazy(() => import('./components/project/Project'));
const Adios = lazy(() => import('./components/auth/Adios'));

function App() {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => setTheme(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' }));

  return (
    <main className={`bg-c-111 flex ${theme.mode === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <Provider store={store}>
        <BR>
          <Routes>
            <R path='/project' element={<Home theme={theme} toggleTheme={toggleTheme} />}>
              <R
                path=':projectId'
                element={
                  <S>
                    <Setting />
                  </S>
                }
              />
              <R
                path=':projectId/board'
                element={
                  <S>
                    <Project />
                  </S>
                }
              />
            </R>
            <R path='/register' element={<Welcome type='REGISTER' />} />
            <R path='/login' element={<Welcome type='LOGIN' />} />
            <R
              path='/adios'
              element={
                <S>
                  <Adios />
                </S>
              }
            />
            <R path='/' element={<Navigate to='/project' />} />
          </Routes>
        </BR>
      </Provider>
      <Toaster />
    </main>
  );
}

export default App;
