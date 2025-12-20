import MacrosChart from '@/components/charts/MacrosChart';
import CaloriesAmount from '@/components/dashboard-components/CaloriesAmount';
import LastMeals from '@/components/dashboard-components/LastMeals';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import { getAllMeals } from '@/db/actions/getMeals';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { getTodayMeals } from '@/utils/meals/getTodayMeals';
import { useCallback, useEffect, useMemo } from 'react';

export default function Index() {
  const { setMeals } = useMealStore()
  const meals = useMealStore(state => state.meals)

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

  return (
    <AppSafeView>
      <AppContainer>
        <CaloriesAmount kcal={todayCalories.kcal} />
        <MacrosChart meals={todayMeals} />
        <LastMeals meals={todayMeals} />
      </AppContainer>
    </AppSafeView>
  );
}
