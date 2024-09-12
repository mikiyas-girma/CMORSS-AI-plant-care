import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/routes';
import { MediaQueryProvider } from '@/contexts/MediaQueryContext';
import ContainerLayout from '@/gui/layouts/ContainerLayout';
import AuthGuard from '@/gui/components/AuthGuard';

function App() {
	return (
		<MediaQueryProvider>
			<BrowserRouter>
				<ContainerLayout>
					<AuthGuard>
						<Router />
					</AuthGuard>
				</ContainerLayout>
			</BrowserRouter>
		</MediaQueryProvider>
	)
}

export default App
