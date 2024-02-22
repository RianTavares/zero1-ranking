import Image from 'next/image';
import Logo from '../../assets/images/logo-fm-2.svg';
import FellipeBanner from '../../assets/images/fellipe-menezes-playing-banner-2.png';
import FellipeBannerDesk from '../../assets/images/fellipe-menezes-playing-banner-desk-2.png';
import styles from './bannerTop.module.scss';

const RankingZoom = () => {
    return (
        <div className={styles.bannerContainer}>
            {/* <Image className={styles.bannerDesk} src={FellipeBannerDesk} alt="Fellipe Menezes Playing Beach Tennis" /> */}
            <div className={styles.banner}>
                <div className={styles.textContainer}>
                    <Image src={Logo} alt="logo" />
                    <p>FM Premium Beach Tennis Tour Ranking</p>
                </div>
                {/* <Image className={styles.bannerMobi} src={FellipeBanner} alt="Fellipe Menezes Playing Beach Tennis" /> */}
            </div>
        </div>
    )
}

export default RankingZoom;