<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import UserFields from '@/Components/Form/UserFields.vue';
import { ref } from 'vue';
import UserService from '@/Services/UserService';

const emailExists = ref(false);
const user = usePage().props.auth.user;
const userId = user.id;

const form = useForm({
    first_name: user.first_name || '',
    middle_name: user.middle_name || '',
    surname: user.surname || '',
    username: user.username || '',
    mobile_number: user.mobile_number || '',
    email: user.email || '',
});

const userService = new UserService(form, {
    emailExists,
    userId,
    debounce: 500,
});

userService.watchEmail();

const submit = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
    });
};
</script>


<template>
    <form @submit.prevent="submit" class="space-y-6">
        <div>
            <InputLabel for="username" value="Username" />
            <TextInput id="username" v-model="form.username" type="text"
                class="mt-1 block w-full bg-gray-100 cursor-not-allowed" readonly />
            <InputError :message="form.errors.username" class="mt-2" />
        </div>
        <UserFields :form="form" :emailExists="emailExists" />


        <div class="flex justify-end">
            <PrimaryButton :class="{ 'opacity-25': form.processing || emailExists }" :disabled="form.processing || emailExists">Save</PrimaryButton>
        </div>
    </form>
</template>
