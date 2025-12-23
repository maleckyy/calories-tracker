import { HydrationLevel } from '@/components/charts/hydration/HydrationLevel';
import MacrosChart from '@/components/charts/macros-chart/MacrosChart';
import CaloriesAmount from '@/components/dashboard-components/CaloriesAmount';
import LastMeals from '@/components/dashboard-components/LastMeals';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import { getAllMeals } from '@/db/actions/meals/getMeals';
import { getUserData } from '@/db/actions/user/getUserData';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { useUserStore } from '@/stores/user/useUserStore';
import { getTodayMeals } from '@/utils/meals/getTodayMeals';
import { useCallback, useEffect, useMemo } from 'react';

export default function Index() {
  const { setMeals } = useMealStore()
  const meals = useMealStore(state => state.meals)
  const { user, setUser } = useUserStore()

  const fetchMeals = useCallback(() => {
    const rows = getAllMeals()
    setMeals(rows);
  }, [setMeals]);

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

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    const user = getUserData()
    if (user) setUser(user)
  }, [setUser])

  if (!user) return

  return (
    <AppSafeView>
      <AppContainer>
        <CaloriesAmount kcal={todayCalories.kcal} goalCalories={user.calorieRequirement} />
        <MacrosChart meals={todayMeals} user={user} />
        <HydrationLevel value={1000} max={user.waterGoal} />
        <LastMeals meals={todayMeals} />
      </AppContainer>
    </AppSafeView>
  );
}
