import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from '@/routes'
import { MediaQueryProvider } from '@/contexts/MediaQueryContext'
import ContainerLayout from './gui/layouts/ContainerLayout'

function App() {
	return (
		<MediaQueryProvider>
			<BrowserRouter>
				<ContainerLayout>
					<Router />
				</ContainerLayout>
			</BrowserRouter>
		</MediaQueryProvider>
	)
}

export default App
