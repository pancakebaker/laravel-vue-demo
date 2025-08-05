<script setup>
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import PasswordFields from '@/Components/Form/PasswordFields.vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

// Realtime validation: prevent same password reuse
const isSameAsCurrentPassword = computed(() => {
    return (
        form.current_password &&
        form.password &&
        form.current_password === form.password
    );
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value?.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value?.focus();
            }
        },
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Update Password
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Ensure your account is using a long, random password to stay
                secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" />

                <PasswordInput id="current_password" v-model="form.current_password" required
                    autocomplete="new-password" class="mt-1 block w-full pr-10" />

                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <!-- Password Fields -->
            <PasswordFields :form="form" passwordLabel="New Password" />
            <InputError v-if="isSameAsCurrentPassword" class="text-red-600 text-sm"
                message="New password must be different from the current password." />

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing || isSameAsCurrentPassword">Save</PrimaryButton>

                <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                    <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
