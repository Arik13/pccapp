<template>
    <v-row>
        <v-col>
            <template>
                <v-flex xs12 sm8 offset-sm4>
                    <v-btn @click="selectComponent('login-form')">Login</v-btn>
                    <v-btn @click="selectComponent('signup-form')">Signup</v-btn>
                </v-flex>
            </template>
            <template>
                <v-flex xs12 sm4 offset-sm4>
                    <component v-bind:is="currentComponent"></component>
                </v-flex>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default {
    data() {
        return {
            currentComponent: 'login-form',
        }
    },
    components: {
        'login-form': LoginForm,
        'signup-form': SignupForm,
    },
    methods: {
        selectComponent(component) {
            this.currentComponent = component;
        }
    }

}
</script>