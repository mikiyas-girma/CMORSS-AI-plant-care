import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ContainerLayout from './gui/layouts/ContainerLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerLayout>
      <App />
    </ContainerLayout>
  </StrictMode>
);
