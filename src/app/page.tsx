'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSport } from '@/contexts/SportContext';
import style from './page.module.scss';

const EnterPage = () => {
  const { lastSport, setLastSport } = useSport();
  const router = useRouter();
  
  useEffect(() => {

    if (lastSport) {
      router.push(`/${lastSport}`);
    }
  }, [lastSport]);

  return (
    <section className={style.enterPage}>
      <div className={style.buttonsContainer}>
        <div className={style.cardButton} onClick={() => setLastSport('beach-tennis')}>
          <div className={`${style.categoryButton} ${style.beachTennis}`}>
            <div className={style.overlay}></div>
          </div>
          <div className={style.textContainer}>
            <p>Ranking</p>
            <h2>Beach Tennis</h2>
          </div>
        </div>
        <div className={style.cardButton} onClick={() => setLastSport('futevolei')}>
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