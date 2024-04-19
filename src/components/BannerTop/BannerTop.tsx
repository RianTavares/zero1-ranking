import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import Logo from '../../assets/images/logo-zero1-full-color.webp';
import styles from './bannerTop.module.scss';

interface BannerTopProps {
    title: string;
    mobileImageSrc: string;
    desktopImageSrc: string;
}

const BannerTop: React.FC<BannerTopProps> = ({ title, mobileImageSrc, desktopImageSrc }) => {
  const isTabletLand = useMediaQuery('(min-width: 975px)');
  const imageSrc = isTabletLand ? desktopImageSrc : mobileImageSrc;
  return (
        <div className={styles.bannerContainer} style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className={styles.banner}>
                <div className={styles.textContainer}>
                    <Image src={Logo} alt="logo" />
                    <p>{title}</p>
                </div>
            </div>
        </div>
    );
}

export default BannerTop;