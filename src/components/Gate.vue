<template>
    <v-row>
        <!-- Login -->
        <v-col>
            <login></login>
        </v-col>
        <!-- Signup -->
        <v-col>
            <signup></signup>
        </v-col>
    </v-row>
</template>

<script>
import Login from './Login';
import Signup from './Signup';

export default {
    components: {
        'login': Login,
        'signup': Signup,
    }

}
</script>