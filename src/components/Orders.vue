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
         <tr v-for="(item) in orders" :key="item.id"
              
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
              <span v-else class="text-warning">未付款</span>
           </td>
               
          </tr> 
            
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
    data: function() {
        return{
           orders:[ {
            "create_at": 1523539834,
            "id": "-L9u2EUkQSoEmW7QzGLF",
            "is_paid": true,
            "message": "這是範例",
            "paid_date": 1523539924,
            "payment_method": "credit_card",
            "products": [
            {
                "id": "L8nBrq8Ym4ARI1Kog4t",
                "product_id": "-L8moRfPlDZZ2e-1ritQ",
                "qty": "3",
                "title":"範例訂單",
                "unit": "個"
            }
            ],
            "total": 100,
            "user": {
            "address": "kaohsiung",
            "email": "test@gmail.com",
            "name": "test",
            "tel": "0912346768"
            },
            "num": 1
      }],
           paginations: {},
           isLoading: false, 
        }
    },
    methods: {
        // getOrders() {
        //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders`
        //     const vm = this;
        //     vm.isLoading = true;
        //     vm.$http.get(api).then((response) => {
        //         console.log(response.data)
        //         vm.orders = response.data.orders;
        //         vm.isLoading = false;
        //     })
        // },

    },
    created() {
        // this.getOrders();
    },
}
</script>