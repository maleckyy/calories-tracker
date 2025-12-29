import { blackColor, dangerColor, grayBackground, grayMutedBackground, mainColor } from '@/consts/colors/colors';
import { gapBetweenElements, gapBetweenSection } from '@/consts/spacing/gaps';
import { saveMeal } from '@/db/actions/saved-meals/saveMeal';
import { MealFormValues, mealSchema } from '@/schemas/meal-schema/mealSchema';
import { useSavedMealsStore } from '@/stores/saved-meals/useSavedMealsStore';
import { Meal, MealCreate } from '@/types/meal.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import BaseButton from '../shared/buttons/BaseButton';
import AppTextInput from '../shared/inputs/AppTextInput';
import { AppText } from '../shared/text/AppText';

interface MealFormProps {
    initialData?: Meal;
    onSubmit: (data: MealCreate | Meal) => void;
}

export default function MealForm({ initialData, onSubmit }: MealFormProps) {
    const router = useRouter();
    const isEditing = !!initialData;
    const [enabled, setEnabled] = useState(false);
    const { addSavedMeal } = useSavedMealsStore()

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<MealFormValues>({
        resolver: zodResolver(mealSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            kcal: initialData.kcal.toString(),
            protein: initialData.protein.toString(),
            carbs: initialData.carbs.toString(),
            fat: initialData.fat.toString(),
        } : {
            name: '',
            kcal: '',
            protein: '',
            carbs: '',
            fat: '',
        },
    });

    const handleFormSubmit = (data: MealFormValues) => {
        const convertedData: MealCreate = {
            name: data.name.trim(),
            kcal: parseInt(data.kcal),
            protein: parseInt(data.protein),
            carbs: parseInt(data.carbs),
            fat: parseInt(data.fat)
        }

        if (isEditing) {
            onSubmit({ ...initialData, ...convertedData })
        } else {
            onSubmit({ ...convertedData })
            if (enabled) {
                const savedMeal = saveMeal(convertedData)
                addSavedMeal(savedMeal)
            }
        }

        reset()
        router.replace('/')
    };

    return (
        <AppCard>
            <ScrollView style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Meal name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <AppTextInput
                                style={[styles.input, errors.name && styles.inputError]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Steak with potatos"
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Calories (kcal)</Text>
                    <Controller
                        control={control}
                        name="kcal"
                        render={({ field: { onChange, value } }) => (
                            <AppTextInput
                                style={styles.input}
                                onChangeText={onChange}
                                value={value.toString()}
                                keyboardType="numeric"
                            />
                        )}
                    />
                </View>

                <View style={styles.macroRow}>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Protein (g)</Text>
                        <Controller
                            control={control}
                            name="protein"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                            )}
                        />
                    </View>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Carbs (g)</Text>
                        <Controller
                            control={control}
                            name="carbs"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                            )}
                        />
                    </View>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Fat (g)</Text>
                        <Controller
                            control={control}
                            name="fat"
                            render={({ field: { onChange, value } }) => (
                                <AppTextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                            )}
                        />
                    </View>
                </View>

                {!isEditing && <View style={[styles.field, styles.toggleWrapper]}>
                    <Pressable
                        style={[styles.toggle, enabled && styles.toggleOn]}
                        onPress={() => setEnabled(prev => !prev)}
                    >
                        <View style={[styles.circle, enabled && styles.circleOn]} />
                    </Pressable>

                    <AppText variant='medium'>Add to favourites?</AppText>
                </View>}

                <View style={{ marginTop: isEditing ? gapBetweenSection : 0 }}>
                    <BaseButton
                        title={isEditing ? "Save changes" : "Add"}
                        onPress={handleSubmit(handleFormSubmit)}
                        disabled={!isValid}
                    />
                </View>
            </ScrollView>
        </AppCard>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: gapBetweenElements / 2
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    field: {
        marginBottom: gapBetweenElements,
    },
    label: {
        fontSize: 14,
        color: blackColor,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: grayBackground,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    inputError: {
        borderColor: dangerColor,
    },
    errorText: {
        color: dangerColor,
        fontSize: 12,
        marginTop: 4,
    },
    macroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: gapBetweenElements,
    },
    macroCol: {
        flex: 1,
    },
    toggleWrapper: {
        flexDirection: 'row',
        gap: gapBetweenElements,
        alignItems: 'center',
    },
    toggle: {
        width: 60,
        height: 28,
        borderRadius: 16,
        backgroundColor: grayMutedBackground,
        padding: 2,
    },
    toggleOn: {
        backgroundColor: mainColor,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 14,
        backgroundColor: "#fff",
    },
    circleOn: {
        alignSelf: "flex-end",
    },
});