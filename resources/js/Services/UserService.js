import { watch } from 'vue';
import axios from 'axios';

export default class UserService {
    constructor(form, options = {}) {
        this.form = form;
        this.usernameExists = options.usernameExists;
        this.emailExists = options.emailExists;
        this.userId = options.userId ?? null;
        this.debounceTime = options.debounce ?? 500;
        this.timers = {};
    }

    watchUsername() {
        watch(() => this.form.username, async (value) => {
            clearTimeout(this.timers.username);
            if (!value) return this.usernameExists.value = false;

            this.timers.username = setTimeout(async () => {
                try {
                    const response = await axios.get('/api/check-username', {
                        params: { username: value }
                    });
                    this.usernameExists.value = response.data.exists;
                } catch (error) {
                    console.error('Username check failed:', error);
                    this.usernameExists.value = false;
                }
            }, this.debounceTime);
        });
    }

    watchEmail() {
        watch(() => this.form.email, async (value) => {
            clearTimeout(this.timers.email);
            if (!value) return this.emailExists.value = false;

            this.timers.email = setTimeout(async () => {
                try {
                    const response = await axios.get('/api/check-email', {
                        params: {
                            email: value,
                            ...(this.userId && { ignore_id: this.userId }),
                        },
                    });
                    this.emailExists.value = response.data.exists;
                } catch (error) {
                    console.error('Email check failed:', error);
                    this.emailExists.value = false;
                }
            }, this.debounceTime);
        });
    }

    scrollToFirstError(errors) {
        const firstField = Object.keys(errors)[0];
        const el = document.getElementById(firstField);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    async validateStep(schema, onSuccess, onError) {
        try {
            await schema.validate(this.form.data(), { abortEarly: false });

            if (this.usernameExists?.value || this.emailExists?.value) return;

            this.form.clearErrors();
            onSuccess?.();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((e) => {
                validationErrors[e.path] = e.message;
            });
            this.form.setError(validationErrors);
            this.scrollToFirstError(validationErrors);
            onError?.(validationErrors);
        }
    }
}
