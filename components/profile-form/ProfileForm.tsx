import { blackColor, dangerColor, grayBackground } from '@/consts/colors/colors';
import { gapBetweenSection } from '@/consts/spacing/gaps';
import { ProfileFormValues, profileSchema } from '@/schemas/profile-schema/profileSchema';
import { GenderType, GoalType, User } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import BaseButton from '../shared/buttons/BaseButton';

type PropsType = {
    initialData: User;
    onSubmit: (data: User) => void;
}

export default function ProfileForm({ initialData: user, onSubmit }: PropsType) {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: user.username,
            birthDate: new Date(user.birthDate),
            calorieRequirement: user.calorieRequirement.toString(),
            proteinRequirement: user.proteinRequirement.toString(),
            carbsRequirement: user.carbsRequirement.toString(),
            fatRequirement: user.fatRequirement.toString(),
            waterGoal: user.waterGoal.toString(),
            weight: user.weight.toString(),
            height: user.height.toString(),
            gender: user.gender,
            goal: user.goal
        }
    });

    function handleFormSubmit(data: ProfileFormValues) {
        const convertedData: User = {
            username: data.username,
            birthDate: data.birthDate.toISOString().split('T')[0],
            calorieRequirement: parseInt(data.calorieRequirement),
            proteinRequirement: parseInt(data.proteinRequirement),
            carbsRequirement: parseInt(data.carbsRequirement),
            fatRequirement: parseInt(data.fatRequirement),
            waterGoal: parseInt(data.waterGoal),
            weight: parseInt(data.weight),
            height: parseInt(data.height),
            gender: data.gender as GenderType,
            goal: data.goal as GoalType
        }
        onSubmit(convertedData)
    }

    return (
        <AppCard>
            <ScrollView style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Username</Text>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.username && styles.inputError]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Username"
                            />
                        )}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Birth date</Text>
                    <Controller
                        control={control}
                        name="birthDate"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Pressable
                                    onPress={() => setShowDatePicker(true)}
                                    style={[styles.input, errors.birthDate && styles.inputError, { justifyContent: 'center' }]}
                                >
                                    <Text style={{ color: value ? 'black' : '#aaa' }}>
                                        {value instanceof Date
                                            ? value.toLocaleDateString('pl-PL')
                                            : "Select date"}
                                    </Text>
                                </Pressable>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={value instanceof Date ? value : new Date()}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) {
                                                onChange(selectedDate);
                                            }
                                        }}
                                        maximumDate={new Date()}
                                    />
                                )}
                            </>
                        )}
                    />
                    {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
                </View>

                <View style={styles.macroRow}>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Weight (kg)</Text>
                        <Controller
                            control={control}
                            name="weight"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.weight && styles.inputError]}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                    </View>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Height (cm)</Text>
                        <Controller
                            control={control}
                            name="height"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.height && styles.inputError]}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Gender</Text>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.input, { padding: 0 }, errors.gender && styles.inputError]}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Goal</Text>
                    <Controller
                        control={control}
                        name="goal"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.input, { padding: 0 }, errors.goal && styles.inputError]}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Weight loss" value="loseWeight" />
                                    <Picker.Item label="Weight maintenance" value="maintain" />
                                    <Picker.Item label="Weight gain" value="gainMuscle" />
                                </Picker>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.macroRow}>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Calories Requirement (kcal)</Text>
                        <Controller
                            control={control}
                            name="calorieRequirement"
                            render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
                            )}
                        />
                    </View>
                </View>

                <View style={styles.macroRow}>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Water Requirement (ml)</Text>
                        <Controller
                            control={control}
                            name="waterGoal"
                            render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
                            )}
                        />
                    </View>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Protein Requirement (g)</Text>
                        <Controller
                            control={control}
                            name="proteinRequirement"
                            render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
                            )}
                        />
                    </View>

                </View>
                <View style={styles.macroRow}>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Carbs Requirement (g)</Text>
                        <Controller
                            control={control}
                            name="carbsRequirement"
                            render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
                            )}
                        />
                    </View>
                    <View style={styles.macroCol}>
                        <Text style={styles.label}>Fat Requirement (g)</Text>
                        <Controller
                            control={control}
                            name="fatRequirement"
                            render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
                            )}
                        />
                    </View>
                </View>

                <View style={{ marginTop: gapBetweenSection }}>
                    <BaseButton
                        title="Save Profile"
                        onPress={handleSubmit(handleFormSubmit)}
                        disabled={!isValid}
                    />
                </View>
            </ScrollView>
        </AppCard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: gapBetweenSection / 2
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
        marginBottom: gapBetweenSection,
    },
    macroCol: {
        flex: 1,
    },
});