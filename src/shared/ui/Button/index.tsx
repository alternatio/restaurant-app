import style from './button.module.scss'
import { ReactNode } from 'react'

interface ButtonProps {
	children?: ReactNode
	onClick?: () => void
	type?: 'outline' | 'filled'
}

export default function Button({
	children,
	onClick,
	type = 'filled',
}: ButtonProps) {
	return (
		<button className={style.button} onClick={onClick} data-type={type}>
			{children}
		</button>
	)
}
