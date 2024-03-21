import style from './hero.module.scss'

export default function Hero() {
	return (
		<div className={style.hero}>
			<span className={style.heroTitle}>PizzaPerfecto</span>
			<span className={style.heroDescription}>
				On the Sicilian islands you will find not just pizza, but true... the
				epitome of culinary art that will leave an unforgettable imprint in your
				perception of taste.
			</span>
		</div>
	)
}
