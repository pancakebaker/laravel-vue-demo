<script setup>
defineProps({
    step: {
        type: Number,
        required: true,
    },
    steps: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between mb-2 text-sm font-medium text-gray-700">
            <template v-for="(label, index) in steps" :key="index">
                <div :class="{ 'text-indigo-600 font-semibold': step === index + 1 }">
                    {{ index + 1 }}. {{ label }}
                </div>
            </template>
        </div>
        <div class="relative w-full h-2 bg-gray-200 rounded-full">
            <div class="absolute h-2 bg-indigo-600 rounded-full transition-all duration-300"
                :style="{ width: (step / steps.length) * 100 + '%' }" />
        </div>
    </div>
</template>
