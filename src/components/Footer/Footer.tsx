import Image from 'next/image';
import WaveBlue from '../../assets/images/wave-blue.svg';
import WaveWhite from '../../assets/images/wave-white.svg';
import WaveYellow from '../../assets/images/wave-yellow.svg';
import styles from './footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerBlue}>
            <Image src={WaveBlue} alt="Wave Blue" />
            </div>
            <div className={styles.footerWhite}>
            <Image src={WaveWhite} alt="Wave White" />
            </div>
            <div className={styles.footerYellow}>
            <Image src={WaveYellow} alt="Wave Yellow" />
            </div>
            <div className={styles.copyrights}>
            ©Copyright 2024 | Desenvolvido por <a href="https://www.codeduals.com/">Code Duals</a>
            </div>
        </footer>
    )
}
