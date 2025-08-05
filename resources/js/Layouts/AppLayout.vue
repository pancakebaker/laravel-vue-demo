<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const user = computed(() => usePage().props.auth?.user);
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-[1312px] mx-auto px-4 py-4 flex items-center justify-between">
                <div>
                    <Link href="/">
                    <ApplicationLogo class="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>
                <nav class="space-x-4">
                    <template v-if="!user">
                        <Link href="/register" class="text-gray-700 hover:text-indigo-600">Register</Link>
                        <Link href="/login" class="text-gray-700 hover:text-indigo-600">Login</Link>
                    </template>

                    <template v-else>
                        <Link href="/logout" method="post" as="button" class="text-gray-700 hover:text-indigo-600">
                        Logout</Link>
                    </template>
                </nav>

            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-grow w-full max-w-[1312px] mx-auto px-4 py-8">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-100 text-center py-6">
            <div class="max-w-[1312px] mx-auto text-sm text-gray-600">
                &copy; {{ new Date().getFullYear() }} MyApp. All rights reserved.
            </div>
        </footer>
    </div>
</template>
