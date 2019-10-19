<template>
    <div>
      <loading :active.sync="isLoading"></loading>
      <table class="table mt-4">
        <thead>
          <th width="100">購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th width="100">應付金額</th>
          <th width="100">是否付款</th>
        </thead>
        <tbody>
         <tr v-for="(item) in sortOrders" :key="item.id"
             v-if="orders.length"
             :class="{'text-secondary': !item.is_paid}"
             >
           <td>{{ item.create_at | date }}</td>
           <td>{{ item.user.email }}</td>
           <td>
               <ul class="list-unstyled">
                   <li v-for="(product, i) in item.products" :key="i"> 
                       {{ product.title }} 
                       數量: {{product.qty}} {{product.unit}}
                   </li>
               </ul>
              
           </td>

           <td class="text-right">
              {{ item.total | currency}}
           </td>           
           <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-warning">尚未啟用</span>
           </td>
               
          </tr> 
            
        </tbody>
      </table>
      <Pagination :pagination="paginations"
                  @renewPage= "getOrders"></Pagination>
    </div>
</template>

<script>
import Pagination from './Pagination'
export default {
    data: function() {
        return{
           orders:{},
           isNew: false,
           paginations: {},
           isLoading: false, 
        };
    },
    components: {
        Pagination
    },
    computed: {
        sortOrders() {
            const vm = this;
            let newOrder = [];
            if(vm.orders.length) {
                newOrder = vm.orders.sort((a,b) => {
                    const aIsPaid = a.is_paid ? 1 : 0;
                    const bIsPaid = b.is_paid ? 1 : 0;
                    return bIsPaid - aIsPaid;

                })
            return newOrder;
            }
        },
    },
    methods: {
        getOrders(page) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
            const vm = this;
            vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                console.log(response.data)
                vm.orders = response.data.orders;
                vm.isLoading = false;
            })
        },

    },
    created() {
        this.getOrders();
    },
}
</script>