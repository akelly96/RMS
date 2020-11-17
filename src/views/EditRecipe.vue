<template>
    <div>
        <AlterRecipe page="EDIT" ref="alterRecipe"></AlterRecipe>
    </div>
</template>

<script>
    import AlterRecipe from '../components/AlterRecipe'
    export default {
        components: {
            AlterRecipe
        },
        beforeRouteLeave (to, from, next) {
            let isDirty = this.$refs.alterRecipe.isDirty();
            if (isDirty) {
                const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
                if (answer) {
                    next();
                } else {
                    next(false);
                }
            } else {
                next();
            }
        }
    }
</script>