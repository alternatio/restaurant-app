import style from './link.module.scss'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface CustomLinkProps {
	children?: ReactNode
	to: string
}

export default function CustomLink({ to, children }: CustomLinkProps) {
	return <Link className={style.link} to={to}>{children}</Link>
}
