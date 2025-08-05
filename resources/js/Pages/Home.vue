<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Login from '@/Pages/Auth/Login.vue';
import Dashboard from '@/Pages/Dashboard.vue';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

</script>


<template>

    <Head title="Welcome" />

    <AppLayout>
        <div v-if="$page.props.auth.user">
            <Dashboard />
        </div>

        <div v-else>
            <Login :canResetPassword="canLogin" status="" />
        </div>
    </AppLayout>
</template>
