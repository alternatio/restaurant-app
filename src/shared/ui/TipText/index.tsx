import style from './tipText.module.scss'
import { ReactNode } from 'react'

interface TipTextProps {
	children?: ReactNode
}

export default function TipText({ children }: TipTextProps) {
	return <p className={style.text}>{children}</p>
}
