import { Dispatch, SetStateAction } from 'react'
import { User } from 'firebase/auth'
import Header from '@/widgets/Header'
import Content from '@/pages/Cart/Content'

interface CartPageProps {
	user: User | undefined
	setUser: Dispatch<SetStateAction<User | undefined>>
}

export default function CartPage({ user, setUser }: CartPageProps) {
	return (
		<>
			<Header user={user} setUser={setUser} />
			<Content user={user} />
		</>
	)
}
