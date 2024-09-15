import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/routes';
import { MediaQueryProvider } from '@/contexts/MediaQueryContext';
import ContainerLayout from '@/gui/layouts/ContainerLayout';
import AuthGuard from '@/gui/components/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <MediaQueryProvider>
      <BrowserRouter>
        <ContainerLayout>
          <AuthProvider>
            <AuthGuard>
              <Router />
              <Toaster position="top-right" richColors closeButton />
            </AuthGuard>
          </AuthProvider>
        </ContainerLayout>
      </BrowserRouter>
    </MediaQueryProvider>
  );
}

export default App;
