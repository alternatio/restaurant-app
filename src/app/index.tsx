import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/fonts.scss'
import './styles/reset.scss'
import './styles/variables.scss'

import App from './App.tsx'
import Wrapper from '@/app/Wrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Wrapper>
			<App />
		</Wrapper>
	</React.StrictMode>
)
