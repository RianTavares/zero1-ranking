'use client';

import React, { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {BannerTop, Footer, RankingZoom} from '@/components';
import { fetchWithRetry } from "@/utils/fetchWithRetry";
import { useFilter } from '@/contexts/CategoryFilterContext';
import { useQuery } from '@tanstack/react-query'
import HeaderNav from '@/components/HeaderNav';
import CategorySelect from '@/components/Filters/components/CategorySelect';
import CustomTable from '@/components/CustomTable';
import mobileBannerImage from '@/assets/images/zero1-brand-beach-tennis-banner.png';
import desktopBannerImage from '@/assets/images/zero1-brand-beach-tennis-banner.png';
import styles from './beachtennis.module.scss';

const options = [
  { value: 'Grupo das 18', label: 'Grupo das 18:00 Horas' },
  { value: 'Grupo das 19', label: 'Grupo das 19:00 Horas' },
  { value: 'Grupo das 20', label: 'Grupo das 20:00 Horas' },
  { value: 'Grupo das 21', label: 'Grupo das 21:00 Horas' },
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


async function getPlayers(selectedOption: string | null): Promise<Player[]> {
  if (!selectedOption) {
    throw new Error("Selected option is required");
  }

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/players?sort=points:desc&populate=*`;
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { selectedCategory } = useFilter();

  const { 
    isPending, 
    isError, 
    data, 
    error 
  } = useQuery({ 
    queryKey: ['beachPlayers', selectedCategory], 
    queryFn: () => getPlayers(selectedCategory),
    retry: 2 
  });
  const players = data || [];

  return (
    <>
      <HeaderNav />
      <main className={styles.main}>
        {isTabletLand && (
          <div className={styles.firstFiveChampions}>
            {players.slice(0, 5).map((player, index) => (
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
          <CategorySelect options={options} initialValue="Grupo das 18" />
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
