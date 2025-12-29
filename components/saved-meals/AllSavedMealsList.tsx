import { blackColor } from '@/consts/colors/colors';
import { addMeal } from '@/db/actions/meals/createMeal';
import { deleteSavedMeal } from '@/db/actions/saved-meals/deleteSavedMeal';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { useSavedMealsStore } from '@/stores/saved-meals/useSavedMealsStore';
import { MealCreate, SavedMeal } from '@/types/meal.type';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import AppTextInput from '../shared/inputs/AppTextInput';
import { AppText } from '../shared/text/AppText';
import SavedMealListElement from './SavedMealListElement';

export default function AllSavedMealsList() {
    const { savedMeals, removeSavedMeal } = useSavedMealsStore()
    const { addMeal: addMealToStore } = useMealStore()
    const router = useRouter()
    const [results, setResults] = useState<SavedMeal[]>(savedMeals)
    const [query, setQuery] = useState<string>('')


    function addSavedMeal(newMeal: MealCreate) {
        const createdMeal = addMeal(newMeal);
        addMealToStore(createdMeal)
        if (createdMeal) router.replace('/(tabs)')
    }
    const deleteSavedMealById = useCallback((id: string) => {
        const res = deleteSavedMeal(id)
        if (res === true) {
            removeSavedMeal(id)
        }
    }, [removeSavedMeal])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 1) {
                const filtered = savedMeals.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } else {
                setResults(savedMeals);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, savedMeals])

    return (
        <>
            <AppTextInput placeholder='Find meal by name' style={{ borderColor: blackColor, borderWidth: 2, width: '100%' }} onChangeText={setQuery} />
            {savedMeals.length > 0 && results.map(sm => <SavedMealListElement key={sm.id} savedMeal={sm} addMealFn={addSavedMeal} deleteFn={deleteSavedMealById} />)}
            {savedMeals.length === 0 && <AppText variant='medium' style={{ textAlign: 'center' }}>No meals saved</AppText>}
            {results.length === 0 && <AppText variant='medium' style={{ textAlign: 'center' }}>No such meals found</AppText>}
        </>
    )
}
