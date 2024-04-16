'use client'

import style from './page.module.scss';
import { useRouter } from 'next/navigation'
 
const EnterPage = () => {
  const router = useRouter();

  return (
    <section className={style.enterPage}>
      <div className={style.buttonsContainer}>
        <div className={style.cardButton} onClick={() => router.push('/beach-tennis')}>
          <div className={`${style.categoryButton} ${style.beachTennis}`}>
            <div className={style.overlay}></div>
          </div>
          <div className={style.textContainer}>
            <p>Ranking</p>
            <h2>Beach Tennis</h2>
          </div>
        </div>
        <div className={style.cardButton} onClick={() => router.push('/futevolei')}>
          <div className={`${style.categoryButton} ${style.footvolley}`}>
            <div className={style.overlay}></div>
          </div>
          <div className={style.textContainer}>
            <p>Ranking</p>
            <h2>Futevôlei</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnterPage;