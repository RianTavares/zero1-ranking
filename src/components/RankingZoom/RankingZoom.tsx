import React from 'react';
import Image from 'next/image';
import styles from './rankingZoom.module.scss';
import NoUserImg from '../../assets/images/no-user.jpeg';

const RankingZoom = ({ name, img, position }: {
    name: string,
    img: string | null,
    position: number
}) => {
    return (
        <div className={styles.rankingZoom}>
            <div className={styles.profilePicture}>
                {img ? (
                    <img src={img} alt="Profile" />
                ):(
                    <Image src={NoUserImg} alt="Profile" width={100} height={100}/>
                )}
            </div>
            <div className={styles.textContainer}>
                <div className={styles.position}>{position}</div>
                <p className={styles.name}>
                    {name}
                </p>
            </div>
        </div>
    )
}

export default RankingZoom;