import Vue from 'vue';


//在 vue 的原形下建立 bus event 事件
Vue.prototype.$bus = new Vue();

    // 位置: AlertMessage.vue
    // 自定義名稱 'messsage:push' 顯示錯誤訊息
    // message(string): 傳入參數
    // status: 樣式，預設值為 warning    
    // vm.$bus.$emit('message:push', message, status = '樣式');

