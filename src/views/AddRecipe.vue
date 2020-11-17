<template>
    <div>
        <AlterRecipe page="ADD" ref="alterRecipe"></AlterRecipe>
    </div>
</template>

<script>
    import AlterRecipe from '../components/AlterRecipe'
    export default {
        components: {
            AlterRecipe
        },
        beforeRouteLeave (to, from, next) {
            if (to.name == "EditRecipe") {
                next();
            } else {
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
    }
</script>