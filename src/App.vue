<template>
    <div id="app">
        <index v-if="isShowHeader"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import index from './components/index';
    import css from './assets/css/common.css';

    export default {
        name: 'App',
        isShowHeader: false,
        components: {
            index
        },
        created() {
            this.init();
        },
        watch: {
            $route(e) {

                if (this.$route.name == null) {
                    this.isShowHeader = false;
                }

                if (e.name != 'login' &&  e.name != '404' && e.name != 'managelogin' && e.name != 'frontregister' && this.$route.name != 'select') {
                    this.isShowHeader = true;
                } else {
                    this.isShowHeader = false;
                }
            }
        }
        ,
        methods: {
            init() {

                if (this.$route.name == null) {
                    this.isShowHeader = false;
                }

                if (this.$route.name != 'login' && this.$route.name != 'select' && this.$route.name != 'notFound' && this.$route.name != 'managelogin' && this.$route.name != 'frontregister') {
                    this.isShowHeader = true;
                } else {
                    this.isShowHeader = false;
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        width: 100%;
    }
</style>

