import style from './styles/wrapper.module.scss'
import { ReactNode } from 'react'

interface WrapperProps {
	children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
	return <main className={style.wrapper}>{children}</main>
}
