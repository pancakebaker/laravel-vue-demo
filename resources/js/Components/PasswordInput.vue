<script setup>
import { ref, watch, computed } from 'vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    id: String,
    modelValue: String,
    required: Boolean,
    autocomplete: String,
    class: String,
    name: String,
    placeholder: String,
    showStrength: {
        type: Boolean,
        default: false,
    },
});


const emit = defineEmits(['update:modelValue']);

const show = ref(false);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, val => internalValue.value = val);
watch(internalValue, val => emit('update:modelValue', val));

// --- Password Strength Logic ---
const strength = computed(() => {
    const value = internalValue.value || '';
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
});

const strengthLabel = computed(() => {
    if (strength.value <= 2) return 'Weak';
    if (strength.value === 3 || strength.value === 4) return 'Medium';
    return 'Strong';
});

const strengthColor = computed(() => {
    if (strength.value <= 2) return 'bg-red-500';
    if (strength.value === 3 || strength.value === 4) return 'bg-yellow-400';
    return 'bg-green-500';
});
</script>

<template>
    <div class="relative">
        <TextInput :id="id" :type="show ? 'text' : 'password'" :class="class" :name="name" :required="required"
            :autocomplete="autocomplete" :placeholder="placeholder" v-model="internalValue" />
        <button type="button" @click="show = !show" class="absolute inset-y-0 right-2 flex items-center text-gray-500"
            tabindex="-1">
            <svg v-if="show" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.964 9.964 0 012.638-6.825m3.067 1.633A3 3 0 0112 15a3 3 0 010-6 3 3 0 013 3m2.121 2.121A10.02 10.02 0 0121 12a10.02 10.02 0 01-3.879 7.879m0 0L3 3" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        </button>
    </div>

    <!-- Strength Meter -->
    <div v-if="showStrength && internalValue" class="mt-2">
        <div class="h-2 rounded-full w-full bg-gray-200">
            <div class="h-2 rounded-full transition-all duration-300" :class="strengthColor"
                :style="{ width: `${(strength / 5) * 100}%` }"></div>
        </div>
        <p class="mt-1 text-sm text-gray-600">Strength: {{ strengthLabel }}</p>
    </div>
</template>
