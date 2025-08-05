<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

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
</template>
