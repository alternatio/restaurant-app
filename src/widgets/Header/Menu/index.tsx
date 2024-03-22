import style from './menu.module.scss'
import CustomLink from '@/shared/ui/Link'
import Button from '@/shared/ui/Button'
import { userSignIn, userSignOut } from '@/features/authorizationMethods.ts'
import { User } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'

interface MenuProps {
	isVisible: boolean
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
	navigate: NavigateFunction
}

export default function Menu({ isVisible, setUser, user, navigate }: MenuProps) {
	return <div className={style.menu} data-is-visible={isVisible}>
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
	</div>
}
