import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Menubar from './components/menubar/Menubar';
import Sidebar from './components/sidebar/Sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import { QueryClientProvider, QueryClient } from 'react-query';

// export const client = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

function App() {
  return (
    <main className='flex h-screen bg-light-c-1'>
      <Provider store={store}>
        {/* <QueryClientProvider client={client}> */}
        <BrowserRouter>
          <Sidebar />
          <Menubar />
          <Dashboard />
        </BrowserRouter>
        {/* </QueryClientProvider> */}
      </Provider>
    </main>
  );
}

export default App;
