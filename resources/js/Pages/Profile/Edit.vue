<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    mustVerifyEmail: Boolean,
    status: String,
});

defineOptions({
    layout: AppLayout,
});
</script>

<template>

    <Head title="Profile" />

    <!-- 👇 H1 Heading -->
    <h1 class="text-3xl font-bold text-center text-indigo-700 mt-8">
        Hello, World
    </h1>

    <section class="py-12">
        <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <!-- Update Profile Info -->
            <div class="bg-white shadow sm:rounded-lg p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Update Profile Information</h2>
                <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" class="max-w-xl" />
            </div>

            <!-- Update Password -->
            <div class="bg-white shadow sm:rounded-lg p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                <UpdatePasswordForm class="max-w-xl" />
            </div>

            <!-- Delete Account -->
            <div class="bg-white shadow sm:rounded-lg p-6">
                <h2 class="text-lg font-medium text-red-700 mb-4">Delete Account</h2>
                <DeleteUserForm class="max-w-xl" />
            </div>
        </div>
    </section>
</template>
