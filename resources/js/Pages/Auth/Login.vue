<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});


defineOptions({
    layout: AppLayout,
});

const form = useForm({
    username: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>

    <Head title="Log in" />
    <div class="flex flex-col lg:flex-row items-stretch justify-center bg-gray-50">
        <!-- Left column -->
        <div class="w-full lg:w-1/2 p-8 flex flex-col justify-center text-center">
            <h1 class="text-3xl lg:text-5xl font-bold text-gray-800">Take charge of yourself</h1>
            <p class="mt-4 text-gray-600 text-sm lg:text-base max-w-md mx-auto">
                Manage your account with ease, from registration to updating your profile
            </p>
            <img src="/images/relaxed-man.webp" alt="relaxed-man" class="mt-8 w-full max-w-sm mx-auto" />
        </div>

        <!-- Right column (form) -->
        <div class="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
                {{ status }}
            </div>

            <form @submit.prevent="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <InputLabel for="username" value="Username" />
                    <TextInput id="username" type="text" class="mt-1 block w-full" v-model="form.username" required
                        autofocus autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.username" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password" value="Password" />
                    <PasswordInput id="password" v-model="form.password" required autocomplete="current-password"
                        class="mt-1 block w-full pr-10" />
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="mt-4 block">
                    <label class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span class="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div class="mt-4 flex justify-end">
                    <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </div>
</template>
