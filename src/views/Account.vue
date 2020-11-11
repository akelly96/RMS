<template>
    <div>
        <UserCredentials section="accountSettings"></UserCredentials>
    </div>
</template>

<script>
import UserCredentials from '../components/UserCredentials.vue'
import { mapState } from 'vuex'
export default {
    name: 'Account',
    components: {
        UserCredentials
    },
    computed: {
        ...mapState([
            'loggedIn'
        ])
    },
    beforeMount() {
        if (!this.loggedIn) {
            this.$router.replace("/");
        }
    }

}
</script>

<style scoped>

</style>