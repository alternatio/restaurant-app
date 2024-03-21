import style from './header.module.scss'
import Logo from '@/widgets/Header/logo.tsx'
import CustomLink from '@/shared/ui/Link'
import Button from '@/shared/ui/Button'
import { Dispatch, SetStateAction } from 'react'
import { userSignIn, userSignOut } from '@/features/authorizationMethods.ts'
import { User } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

interface HeaderProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function Header({ user, setUser }: HeaderProps) {
	const navigate = useNavigate()

	return (
		<header className={style.header}>
			<Link to={'/'}>
				<Logo />
			</Link>
			<div className={style.links}>
				{user?.uid ? (
					<>
						<CustomLink to={'/menu'}>Меню</CustomLink>
						<CustomLink to={'/cart'}>Корзина</CustomLink>
						<CustomLink to={'/orders'}>Заказы</CustomLink>
						<Button
							onClick={() => {
								userSignOut(setUser)
								navigate('/')
							}}>
							Выйти из аккаунта
						</Button>
					</>
				) : (
					<Button onClick={() => userSignIn(setUser)}>Войти в аккаунт</Button>
				)}
			</div>
		</header>
	)
}
