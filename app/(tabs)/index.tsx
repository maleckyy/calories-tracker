import { HydrationLevel } from '@/components/charts/hydration/HydrationLevel';
import MacrosChart from '@/components/charts/macros-chart/MacrosChart';
import CaloriesAmount from '@/components/dashboard-components/CaloriesAmount';
import LastMeals from '@/components/dashboard-components/LastMeals';
import MacrosCounter from '@/components/dashboard-components/MacrosCounter';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import { getHydration } from '@/db/actions/hydration/getHydration';
import { getAllMeals } from '@/db/actions/meals/getMeals';
import { getUserData } from '@/db/actions/user/getUserData';
import { useHydrationStore } from '@/stores/hydration/useHydrationStore';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { useUserStore } from '@/stores/user/useUserStore';
import { getTodayHydrationLevel } from '@/utils/hydration/getTodayHydrationLevel';
import { getTodayMeals } from '@/utils/meals/getTodayMeals';
import { useCallback, useEffect, useMemo } from 'react';

export default function Index() {
  const { setMeals } = useMealStore()
  const meals = useMealStore(state => state.meals)
  const { user, setUser } = useUserStore()
  const { hydration, setHydration } = useHydrationStore()

  const fetchMeals = useCallback(() => {
    const rows = getAllMeals()
    setMeals(rows);
  }, [setMeals]);

  const fetchHydration = useCallback(() => {
    const hydrationData = getHydration()
    setHydration(hydrationData);
  }, [setHydration]);

  const todayMeals = useMemo(() => {
    return getTodayMeals(meals)
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [meals]);

  const todayCalories = useMemo(() => {
    return todayMeals.reduce((acc, meal) => {
      acc.kcal += meal.kcal
      return acc
    }, { kcal: 0 }
    )
  }, [todayMeals])

  const currentHydrationLevel = useMemo(() => {
    const todayItems = getTodayHydrationLevel(hydration);
    return todayItems.reduce((acc, entry) => {
      return acc + entry.waterAmount;
    }, 0);
  }, [hydration]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    fetchHydration();
  }, [fetchHydration]);

  useEffect(() => {
    const user = getUserData()
    if (user) setUser(user)
  }, [setUser])

  if (!user) return

  return (
    <AppSafeView>
      <AppContainer>
        <CaloriesAmount kcal={todayCalories.kcal} goalCalories={user.calorieRequirement} />
        <MacrosCounter meals={todayMeals} user={user} />
        <MacrosChart meals={todayMeals} user={user} />
        <HydrationLevel value={currentHydrationLevel} max={user.waterGoal} />
        <LastMeals meals={todayMeals} />
      </AppContainer>
    </AppSafeView>
  );
}
