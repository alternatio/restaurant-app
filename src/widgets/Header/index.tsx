import style from './header.module.scss'
import Logo from '@/widgets/Header/logo.tsx'
import CustomLink from '@/shared/ui/Link'
import Button from '@/shared/ui/Button'
import { Dispatch, SetStateAction, useState } from 'react'
import { userSignIn, userSignOut } from '@/features/authorizationMethods.ts'
import { User } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '@/widgets/Header/Menu'

interface HeaderProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function Header({ user, setUser }: HeaderProps) {
	const [menuIsVisible, setMenuVisible] = useState(false)
	const navigate = useNavigate()

	return (
		<header className={style.header}>
			<Menu isVisible={menuIsVisible} user={user} setUser={setUser} navigate={navigate} />
			<Link to={'/'}>
				<Logo />
			</Link>
			<div className={style.links} data-is-mobile={'true'}>
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
			<Button className={style.menuButton} onClick={() => setMenuVisible(!menuIsVisible)}>
				<img src="src/app/images/menu-veggie-burger.svg" alt="veggie-burger-icon" />
			</Button>
		</header>
	)
}
