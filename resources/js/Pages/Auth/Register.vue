<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import UserFields from '@/Components/Form/UserFields.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import PasswordFields from '@/Components/Form/PasswordFields.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import UserService from '@/Services/UserService';

defineOptions({
    layout: AppLayout,
});

// State flags
const usernameExists = ref(false);
const emailExists = ref(false);

// Form fields
const form = useForm({
    first_name: '',
    middle_name: '',
    surname: '',
    mobile_number: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
});

// Initialize service and watchers
const userService = new UserService(form, {
    usernameExists,
    emailExists,
    debounce: 500,
});

userService.watchUsername();
userService.watchEmail();

// Form submit
const showSuccessModal = ref(false);

const submit = () => {
    form.post(route('register'), {
        preserveScroll: true,
        onSuccess: () => {
            showSuccessModal.value = true;
        },
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};

const redirectToLogin = () => {
    showSuccessModal.value = false;
    window.location.href = route('login'); // or `router.visit(route('login'))` if using Ziggy + Inertia
};

</script>

<template>

    <Head title="Register" />
    <template v-if="showSuccessModal">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                <h3 class="text-lg font-semibold text-gray-800">Registration Successful</h3>
                <p class="text-sm text-gray-600 mt-2">You can now log in with your credentials.</p>
                <div class="mt-4">
                    <button @click="redirectToLogin"
                        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </template>
    <form @submit.prevent="submit" class="space-y-8">
        <UserFields :form="form" :emailExists="emailExists" />
        <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Username / Password</h2>
            <div class="space-y-4">
                <div>
                    <InputLabel for="username" value="Username" />
                    <TextInput id="username" type="text" class="mt-1 block w-full" v-model="form.username" required
                        autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.username" />
                    <p v-if="usernameExists" class="text-sm text-red-600 mt-1">
                        This username is already registered.
                    </p>
                </div>

                <PasswordFields :form="form" />
            </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end">
            <Link :href="route('login')"
                class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Already registered?
            </Link>
            <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing || usernameExists || emailExists }"
                :disabled="form.processing || usernameExists || emailExists">
                Register
            </PrimaryButton>
        </div>
    </form>
</template>
