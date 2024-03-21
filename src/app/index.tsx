import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/fonts.scss'
import './styles/reset.scss'
import './styles/variables.scss'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from '@/app/store'

import App from './App.tsx'
import Wrapper from '@/app/Wrapper.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Wrapper>
					<App />
				</Wrapper>
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
)
