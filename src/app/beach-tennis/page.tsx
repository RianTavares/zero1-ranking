'use client';
import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFilter } from '@/contexts/CategoryFilterContext';
import { useQuery } from '@tanstack/react-query';
import HeaderNav from '@/components/HeaderNav';
import BannerTop from '@/components/BannerTop';
import CategorySelect from '@/components/Filters/components/CategorySelect';
import CustomTable from '@/components/CustomTable';
import RankingZoom from '@/components/RankingZoom';
import Footer from '@/components/Footer';
import mobileBannerImage from '@/assets/images/zero1-arena-banner-top-mobile-smooth-blue.png';
import desktopBannerImage from '@/assets/images/zero1-arena-brand-new-banner-top.png';
import styles from './beachtennis.module.scss';
const options = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
];

interface Player {
  attributes: {
    name: string;
    tournaments: number;
    points: number;
    profile: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}


async function getBeachPlayers(selectedOption: string | null): Promise<Player[]> {
  if (!selectedOption) {
    throw new Error("Selected option is required");
  }

  let url = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_BEACH_ENDPOINT}?sort=points:desc&populate=*`;
  if (selectedOption) {
    url += `&filters[groups][$eq]=${encodeURIComponent(selectedOption)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const result = await response.json();
  return result.data;
}

export default function BeachTennisHome() {
  const isTabletLand = useMediaQuery('(min-width:975px)');
  const smallerThanLarge = useMediaQuery('(max-width:1200px)');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { selectedCategory } = useFilter();
  const numberOfPlayersToShow = smallerThanLarge ? 3 : 5;

  const { 
    isPending, 
    isError, 
    data, 
    error 
  } = useQuery({ 
    queryKey: ['beachPlayers', selectedCategory], 
    queryFn: () => getBeachPlayers(selectedCategory),
    retry: 2 
  });
  const players = data || [];

  return (
    <>
      <HeaderNav />
      <main className={styles.main}>
        {isTabletLand && (
          <div className={styles.firstFiveChampions}>
            {players.slice(0, numberOfPlayersToShow).map((player, index) => (
              <RankingZoom
                key={index}
                name={player.attributes.name}
                img={player.attributes.profile.data? player.attributes.profile.data.attributes.url : null}
                position={index + 1}
              />
            ))}
          </div>
        )}

        <BannerTop 
          title="BEACH TENNIS TOUR RANKING"
          mobileImageSrc={mobileBannerImage.src}
          desktopImageSrc={desktopBannerImage.src}
        />

        <div className={styles.selectCategoryContainer}>
          <CategorySelect options={options} initialValue="iniciante" />
        </div>

        <CustomTable 
          players={players}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />

        <Footer />
      </main>
    </>
  )
}
