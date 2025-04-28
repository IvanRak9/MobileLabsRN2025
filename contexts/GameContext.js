import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stats, setStats] = useState({
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    swipesUp: 0,
    swipesRight: 0,
    swipesLeft: 0,
    panMoves: 0,
    pinches: 0,
    totalPoints: 0,
  });

  const incrementStat = (type, points = 0) => {
    setStats(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
      totalPoints: prev.totalPoints + points,
    }));
  };

  const resetStats = () => {
    setStats({
      taps: 0,
      doubleTaps: 0,
      longPresses: 0,
      swipesUp: 0,
      swipesRight: 0,
      swipesLeft: 0,
      panMoves: 0,
      pinches: 0,
      totalPoints: 0,
    });
  };

  return (
    <GameContext.Provider value={{ stats, incrementStat, resetStats }}>
      {children}
    </GameContext.Provider>
  );
};
