<template>
    <div>
        <h2>訂單</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products:[],
        }
    },
    methods: {
        getProducts() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
            const vm = this;
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.products = response.data.products;
            })
        }
    },
    created() {
        this.getProducts();
    },
}
</script>