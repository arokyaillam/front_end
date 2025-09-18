// App.tsx
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './lib/providers';
import { router } from './router';
import { initializeTheme } from './store/index';

function App() {
  // Initialize theme on app load
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;