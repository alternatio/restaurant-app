import style from './alertDialog.module.scss'

interface AlertPopupProps {
	title: string
	message?: string
	isVisible: boolean

	firstButtonLabel?: string
	firstButtonClassName?: string
	firstButtonOnCLick?: () => void

	secondButtonLabel?: string
	secondButtonClassName?: string
	secondButtonOnClick?: () => void
}

export default function AlertPopup({
	title,
	message,
	isVisible,

	firstButtonLabel,
	firstButtonClassName,
	firstButtonOnCLick,

	secondButtonLabel = 'Ок',
	secondButtonClassName,
	secondButtonOnClick,
}: AlertPopupProps) {
	return (
		<div className={style.wrapper} data-is-visible={isVisible}>
			<div className={style.alertDialog}>
				<h2 className={style.title}>{title}</h2>
				{message ? <p className={style.message}>{message}</p> : null}
				<div className={style.buttons}>
					{firstButtonLabel ? (
						<button
							className={`${style.button} ${style.firstButton} ${firstButtonClassName}`}
							onClick={firstButtonOnCLick}>
							{firstButtonLabel}
						</button>
					) : null}
					<button
						className={`${style.button} ${style.secondButton} ${secondButtonClassName}`}
						onClick={secondButtonOnClick}>
						{secondButtonLabel}
					</button>
				</div>
			</div>
		</div>
	)
}
