<template>
    <v-card>
        <v-card-title>
            Login
        </v-card-title>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="true"
                >
                <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Login
                </v-btn>
            </v-form>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            email: "",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                v => (v.length >= 6) || 'E-mail must be 6 or more characters',
            ],
            password: "",
            passwordRules: [
            ]
        }
    },
    methods: {
        submitForm() {
            var loginData = {
                email: this.email,
                password: this.password,
            };
            this.$store.dispatch('login', loginData);
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.submitForm();
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>