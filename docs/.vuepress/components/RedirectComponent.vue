<template></template>
<script>
export default {
    created() {
        const redirectionMapping = this.$site.themeConfig.redirectionMapping;

        if (redirectionMapping) {
            let path = this.$route.fullPath;

            if (path.substr(0, 2) === '/?') {
                path = [path.slice(0, 1), 'index.html', path.slice(1)].join(''); // insert index.html into path
            }

            const newUrl = redirectionMapping[path];
            if (newUrl) {
                this.$router.replace(newUrl);
                return;
            }
        }
    }
}
</script>
