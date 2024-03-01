import Image from 'next/image';
import Logo from '../../assets/images/logo-fm-2.svg';
import FellipeBanner from '../../assets/images/fellipe-menezes-playing-banner-2.png';
import FellipeBannerDesk from '../../assets/images/fellipe-menezes-playing-banner-desk-2.png';
import styles from './bannerTop.module.scss';

const RankingZoom = () => {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.banner}>
                <div className={styles.textContainer}>
                    <Image src={Logo} alt="logo" />
                    <p>Premium Beach Tennis Tour Ranking</p>
                </div>
            </div>
        </div>
    )
}

export default RankingZoom;