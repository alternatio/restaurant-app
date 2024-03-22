import style from './button.module.scss'
import { ReactNode } from 'react'

interface ButtonProps {
	children?: ReactNode
	onClick?: () => void
	type?: 'outline' | 'filled'
	className?: string
}

export default function Button({
	children,
	onClick,
	type = 'filled',
	className
}: ButtonProps) {
	return (
		<button className={`${style.button} ${className}`} onClick={onClick} data-type={type}>
			{children}
		</button>
	)
}
