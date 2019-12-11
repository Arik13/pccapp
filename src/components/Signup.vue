<template>
    <v-card>
        <v-card-title>
            Sign Up
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
                    :rules="screenNameRules"
                    v-model="screenName"
                    label="Screen Name"
                    required
                ></v-text-field>

                <v-text-field
                    :rules="[validatePassword]"
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>

                <v-text-field
                    :rules="[validateConfirmPassword]"
                    v-model="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    required
                ></v-text-field>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Sign Up
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
            ],
            screenName: "",
            screenNameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            password: "",
            passwordConfirm: "",
        }
    },
    methods: {
        submitForm() {
            var signUpData = {
                email: this.email,
                screenName: this.screenName,
                password: this.password,
            };
            this.$store.dispatch('signup', signUpData);

        },
        validatePassword() {
            return true;
        },
        validateConfirmPassword() {
            return true;
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.submitForm();
                this.reset();
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    }
}
</script>