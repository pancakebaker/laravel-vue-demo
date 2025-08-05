<script setup>
import { computed } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    form: Object,
    passwordLabel: {
        type: String,
        default: 'Password',
    },
});

// Computed property to check if passwords match
const passwordMismatch = computed(() => {
    return (
        props.form.password &&
        props.form.password_confirmation &&
        props.form.password !== props.form.password_confirmation
    );
});
</script>

<template>
    <div>
        <InputLabel for="password" :value="passwordLabel" />
        <PasswordInput
            id="password"
            v-model="form.password"
            required
            autocomplete="new-password"
            class="mt-1 block w-full pr-10"
            :showStrength="true"
        />
        <small class="text-gray-500">
            Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.
        </small>
        <InputError class="mt-2" :message="form.errors.password" />
    </div>

    <div>
        <InputLabel for="password_confirmation" value="Confirm Password" />
        <PasswordInput
            id="password_confirmation"
            v-model="form.password_confirmation"
            required
            autocomplete="new-password"
            class="mt-1 block w-full pr-10"
        />
        <InputError class="mt-2" :message="form.errors.password_confirmation" />
        <InputError v-if="passwordMismatch" class="mt-1" message="Passwords do not match." />
    </div>
</template>
