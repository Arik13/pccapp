<template>
    <v-row>
        <p>
            Screen Name: {{ screenName }}<br>
            Email: {{ email }}<br>
        </p>
    </v-row>
</template>

<script>
export default {
    computed: {
        screenName() {
            if (!this.$store.getters.user) return;
            return this.$store.getters.user.screenName;
        },
        email() {
            if (!this.$store.getters.user) return;
            return this.$store.getters.user.email;
        },
    }
}
</script>