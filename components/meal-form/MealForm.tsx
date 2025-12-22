import { blackColor, dangerColor, grayBackground } from '@/consts/colors/colors';
import { gapBetweenSection } from '@/consts/spacing/gaps';
import { Meal, MealCreate } from '@/types/meal.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as z from 'zod';
import BaseButton from '../shared/buttons/BaseButton';

const mealSchema = z.object({
    name: z.string().min(3, 'Nazwa musi mieć min. 3 znaki'),
    kcal: z.string().min(1, 'Wartość nie może być ujemna'),
    protein: z.string().min(1),
    carbs: z.string().min(1),
    fat: z.string().min(1),
});

type MealFormValues = z.infer<typeof mealSchema>;

interface MealFormProps {
    initialData?: Meal;
    onSubmit: (data: MealCreate | Meal) => void;
}

export default function MealForm({ initialData, onSubmit }: MealFormProps) {
    const router = useRouter();
    const isEditing = !!initialData;

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
        }

        reset()
        router.replace('/')
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>Meal name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
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
                        <TextInput
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
                            <TextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                        )}
                    />
                </View>
                <View style={styles.macroCol}>
                    <Text style={styles.label}>Carbs (g)</Text>
                    <Controller
                        control={control}
                        name="carbs"
                        render={({ field: { onChange, value } }) => (
                            <TextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                        )}
                    />
                </View>
                <View style={styles.macroCol}>
                    <Text style={styles.label}>Fat (g)</Text>
                    <Controller
                        control={control}
                        name="fat"
                        render={({ field: { onChange, value } }) => (
                            <TextInput style={styles.input} onChangeText={onChange} value={value.toString()} keyboardType="numeric" />
                        )}
                    />
                </View>
            </View>

            <View style={{ marginTop: gapBetweenSection }}>
                <BaseButton
                    title={isEditing ? "Save changes" : "Add"}
                    onPress={handleSubmit(handleFormSubmit)}
                    disabled={!isValid}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    field: {
        marginBottom: gapBetweenSection,
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
    },
    macroCol: {
        flex: 1,
    },
});