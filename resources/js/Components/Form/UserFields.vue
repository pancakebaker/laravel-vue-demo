<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';

defineProps({
    form: Object,
    emailExists: Boolean
});
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Name</h2>
            <div class="grid gap-4 md:grid-cols-3">
                <div>
                    <InputLabel for="first_name" value="First Name" />
                    <TextInput id="first_name" type="text" class="mt-1 block w-full" v-model="form.first_name" required
                        autocomplete="given-name" />
                    <InputError class="mt-2" :message="form.errors.first_name" />
                </div>
                <div>
                    <InputLabel for="middle_name" value="Middle Name" />
                    <TextInput id="middle_name" type="text" class="mt-1 block w-full" v-model="form.middle_name"
                        autocomplete="additional-name" />
                    <InputError class="mt-2" :message="form.errors.middle_name" />
                </div>
                <div>
                    <InputLabel for="surname" value="Surname" />
                    <TextInput id="surname" type="text" class="mt-1 block w-full" v-model="form.surname" required
                        autocomplete="family-name" />
                    <InputError class="mt-2" :message="form.errors.surname" />
                </div>
            </div>
        </div>

        <!-- Contact Section -->
        <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div>
                    <InputLabel for="email" value="Email" />
                    <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
                        autocomplete="email" />
                    <InputError class="mt-2" :message="form.errors.email" />
                    <p v-if="emailExists" class="text-sm text-red-600 mt-1">
                        This email is already registered.
                    </p>
                </div>
                <div>
                    <InputLabel for="mobile_number" value="Mobile Number" />
                    <TextInput id="mobile_number" type="text" class="mt-1 block w-full" v-model="form.mobile_number"
                        required autocomplete="tel" />
                    <InputError class="mt-2" :message="form.errors.mobile_number" />
                    <small class="text-gray-500">
                        Must be a valid PH mobile number (e.g., 09171234567 or +639171234567)
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>
