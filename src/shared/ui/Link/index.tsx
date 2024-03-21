import style from './link.module.scss'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface CustomLinkProps {
	children?: ReactNode
	to: string
	className?: string
}

export default function CustomLink({
	to,
	children,
	className,
}: CustomLinkProps) {
	return (
		<Link className={`${style.link} ${className}`} to={to}>
			{children}
		</Link>
	)
}
