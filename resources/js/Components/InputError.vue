<script setup>
defineProps({
    message: {
        type: [String, Array],
        default: '',
    },
});
</script>

<template>
    <div v-show="message">
        <p v-if="typeof message === 'string'" class="text-sm text-red-600">
            {{ message }}
        </p>
        <div v-else>
            <p v-for="(msg, index) in message.filter(Boolean)" :key="index" class="text-sm text-red-600">
                {{ msg }}
            </p>
        </div>
    </div>
</template>
