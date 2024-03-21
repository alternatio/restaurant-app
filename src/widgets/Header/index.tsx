import style from './header.module.scss'
import Logo from '@/widgets/Header/logo.tsx'
import CustomLink from '@/shared/ui/Link'
import Button from '@/shared/ui/Button'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { userSignIn, userSignOut } from '@/features/authorizationMethods.ts'
import { User } from 'firebase/auth'
import { Link } from 'react-router-dom'

interface HeaderProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function Header({ user, setUser }: HeaderProps) {

	// logging
	useEffect(() => {
		console.log(user)
	}, [user])

	return (
		<header className={style.header}>
			<Link to={'/'}><Logo /></Link>
			<div className={style.links}>
				{user?.uid ? (
					<>
						<CustomLink to={'/menu'}>Меню</CustomLink>
						<CustomLink to={'/orders'}>Корзина</CustomLink>
						<Button onClick={() => userSignOut(setUser)}>Выйти из аккаунта</Button>
					</>
				) : (
					<Button onClick={() => userSignIn(setUser)}>Войти в аккаунт</Button>
				)}
			</div>
		</header>
	)
}
