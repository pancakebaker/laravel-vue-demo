// resources/js/Services/UserService.js
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
}
