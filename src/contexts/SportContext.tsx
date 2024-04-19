import React, { createContext, useContext, useEffect, useState } from 'react';

interface SportContextType {
  lastSport: string | null;
  setLastSport: (sport: string) => void;
};

type WithChildrenProps = {
    children: React.ReactNode;
};

const SportContext = createContext<SportContextType | undefined>(undefined);

export const SportProvider = ({ children }: WithChildrenProps) => {
  const [lastSport, setLastSport] = useState<string | null>(null);

  useEffect(() => {
    const savedSport = localStorage.getItem('zero1-arena@lastSport');
    if (savedSport) {
      setLastSport(savedSport);
    }
  }, []);

  const handleSetLastSport = (sport: string) => {
    localStorage.setItem('zero1-arena@lastSport', sport);
    setLastSport(sport);
  };

  return (
    <SportContext.Provider value={{ lastSport, setLastSport: handleSetLastSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => {
  const context = useContext(SportContext);
  if (context === undefined) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};
