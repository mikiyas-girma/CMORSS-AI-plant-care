import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from '@/routes'
import { MediaQueryProvider } from '@/contexts/MediaQueryContext'

function App() {
	return (
		<MediaQueryProvider>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</MediaQueryProvider>
	)
}

export default App
