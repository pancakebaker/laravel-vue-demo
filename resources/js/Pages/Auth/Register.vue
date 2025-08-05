<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import PasswordFields from '@/Components/Form/PasswordFields.vue';
import UserFields from '@/Components/Form/UserFields.vue';
import StepProgressBar from '@/Components/StepProgressBar.vue';
import Modal from '@/Components/Modal.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref, nextTick } from 'vue';
import UserService from '@/Services/UserService';
import { stepOneSchema, stepTwoSchema } from '@/Validations/registerSchema';

defineOptions({ layout: AppLayout });

const showErrorModal = ref(false);
const errorMessage = ref('');
const step = ref(1);
const showSuccessModal = ref(false);
const usernameExists = ref(false);
const emailExists = ref(false);
const usernameInput = ref(null);

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

const userService = new UserService(form, { usernameExists, emailExists, debounce: 500 });
userService.watchUsername();
userService.watchEmail();

const scrollToFirstError = (errors) => {
    const firstField = Object.keys(errors)[0];
    const el = document.getElementById(firstField);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const validateStepOne = async () => {
    try {
        await stepOneSchema.validate(form.data(), { abortEarly: false });
        form.clearErrors();
        step.value = 2;
        await nextTick();
        usernameInput.value?.focus();
    } catch (err) {
        const validationErrors = {};
        err.inner.forEach((e) => {
            validationErrors[e.path] = e.message;
        });
        form.setError(validationErrors);
        scrollToFirstError(validationErrors);
    }
};

const validateStepTwo = async () => {
    try {
        await stepTwoSchema.validate(form.data(), { abortEarly: false });

        if (usernameExists.value || emailExists.value) return;

        form.clearErrors();
        try {
            await form.post(route('register'), {
                preserveScroll: true,
                onSuccess: () => {
                    showSuccessModal.value = true;
                },
                onError: (errors) => {
                    errorMessage.value = 'Registration failed. Please check your inputs.';
                    showErrorModal.value = true;
                },
                onFinish: () => form.reset('password', 'password_confirmation'),
            });
        } catch (e) {
            if (e.message?.includes('Network Error')) {
                errorMessage.value = 'Network error. Server might be down.';
            } else {
                errorMessage.value = e.message || 'Something went wrong.';
            }
            showErrorModal.value = true;
        }

    } catch (err) {
        const validationErrors = {};
        err.inner.forEach((e) => {
            validationErrors[e.path] = e.message;
        });
        form.setError(validationErrors);
        scrollToFirstError(validationErrors);
    }
};

const redirectToLogin = () => {
    showSuccessModal.value = false;
    window.location.href = route('login');
};
</script>

<template>

    <Head title="Register" />

    <Modal :show="showSuccessModal" @close="redirectToLogin" maxWidth="sm">
        <div class="p-6 text-center">
            <h3 class="text-lg font-semibold text-gray-800">Registration Successful</h3>
            <p class="text-sm text-gray-600 mt-2">You can now log in with your credentials.</p>
            <div class="mt-4">
                <button @click="redirectToLogin"
                    class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
                    OK
                </button>
            </div>
        </div>
    </Modal>

    <Modal :show="showErrorModal" @close="showErrorModal = false" maxWidth="sm">
        <div class="p-6 text-center">
            <h3 class="text-lg font-semibold text-red-600">Registration failed. Please check your inputs.</h3>
            <p class="text-sm text-gray-600 mt-2">{{ errorMessage }}</p>
            <div class="mt-4">
                <button @click="showErrorModal = false"
                    class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none">
                    Close
                </button>
            </div>
        </div>
    </Modal>

    <StepProgressBar :step="step" :steps="['Personal Information', 'Username / Password']" />


    <form class="space-y-8" @submit.prevent>
        <!-- Step 1 -->
        <div v-if="step === 1">
            <UserFields :form="form" :emailExists="emailExists" />

            <div class="flex justify-end mt-6">
                <PrimaryButton :disabled="form.processing || emailExists"
                    :class="{ 'opacity-25': form.processing || emailExists }" @click="validateStepOne">
                    Next
                </PrimaryButton>
            </div>
        </div>

        <!-- Step 2 -->
        <div v-if="step === 2">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Username / Password</h2>

            <div>
                <InputLabel for="username" value="Username" />
                <TextInput id="username" ref="usernameInput" v-model="form.username" type="text"
                    class="mt-1 block w-full" />
                <InputError :message="form.errors.username" />
                <p v-if="usernameExists" class="text-sm text-red-600 mt-1">
                    This username is already registered.
                </p>
            </div>

            <PasswordFields :form="form" />

            <div class="flex items-center justify-between mt-6">
                <PrimaryButton class="mt-4" @click="step = 1">Back</PrimaryButton>
                <PrimaryButton class="mt-4" :class="{ 'opacity-25': form.processing || usernameExists || emailExists }"
                    :disabled="form.processing || usernameExists || emailExists" @click.prevent="validateStepTwo">
                    <span v-if="form.processing">Registering...</span>
                    <span v-else>Register</span>
                </PrimaryButton>
            </div>
        </div>
    </form>
</template>
