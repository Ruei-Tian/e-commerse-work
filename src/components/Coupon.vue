<template>
    <div>
      <loading :active.sync="isLoading"></loading>
      <div class="text-right">
          <button class="btn btn-primary mt-5" @click="openModal(true)">建立新優惠券</button>
      </div>
      <table class="table mt-4">
          <thead>
            <tr>
             <th>名稱</th>
             <th width="120">折扣百分比</th>
             <th width="120">到期日</th>
             <th width="120">是否啟用</th>
             <th width="150">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,key) in coupons" :key="key">
             <td>{{ item.title }}</td>
             <td>{{ item.percent }}%</td>
             <td>{{ item.due_date | date}}</td>
             <td>
                 <span v-if="item.is_enabled" class="text-success">啟用</span>
                 <span v-else>未啟用</span>
             </td>
             <td>
                <button class="btn btn-outline-primary btn-sm mr-2" @click="openModal(false, item)">編輯</button>
                <button class="btn btn-danger btn-sm mr-2" @click="openDelCounponModal(item)">刪除</button>     
             </td>
            </tr>

          </tbody>
      </table>
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>編輯優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input v-model="tempCoupon.title" type="text" class="form-control" id="title"
                            placeholder="請輸入標題">
                    </div>
                    <div class="form-group">
                            <label for="coupon_code">優惠碼</label>
                            <input v-model="tempCoupon.code" type="text" class="form-control" id="coupon_code"
                            placeholder="請輸入優惠碼">
                    </div>
                    <div class="form-group">
                            <label for="due_date">到期日</label>
                            <input v-model="due_date" type="date" class="form-control" id="due_date">
                    </div>           
                    <div class="form-group">
                        <label for="percent">折扣百分比</label>
                            <input v-model="tempCoupon.percent" type="number" class="form-control" id="percent"
                            placeholder="請輸入折扣">
                    </div>                                
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            v-model="tempCoupon.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
                </div>
                </div>
            </div>
          </div>  
     <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除優惠券</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="delCoupon()"
                >確認刪除</button>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import $ from 'jquery';


export default {
    props : {
        config: Object,
    },
    data() {
        return{
           coupons:[],
           tempCoupon: {
            title: '',
            is_enabled: 0,
            percent: 100,
            due_date: 0,
            code: '',
           } ,
           isNew: false,
           due_date: new Date(),
           isLoading: false, 
        }
    },
    watch: {
        due_date() {
            const vm = this;
            const timestamp = Math.floor(new Date(vm.due_date) / 1000);
            vm.tempCoupon.due_date = timestamp;
        }
    },
    methods: {
        openModal(isNew, item) {
            const vm = this;
            $('#couponModal').modal('show');
            vm.isNew = isNew;
            if(vm.isNew) {
                vm.tempCoupon = {};
            } else {
                vm.tempCoupon = Object.assign({}, item);
                const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
                // console.log(dateAndTime,vm.tempCoupon.due_date * 1000,new Date(vm.tempCoupon.due_date * 1000).toISOString());                
                vm.due_date = dateAndTime[0];
                
            }
        },
        updateCoupon() {
           const vm = this;
            if (vm.isNew) {
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
                this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
                console.log(response, vm.tempCoupon);
                $('#couponModal').modal('hide');
                this.getCoupons();
                });
            } else {
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
                this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
                console.log(response);
                $('#couponModal').modal('hide');
                this.getCoupons();
                });
            }
        },
        getCoupons() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response);
                vm.coupons = response.data.coupons;
                vm.isLoading = false;
            })
        },
        openDelCounponModal(item) {
            const vm = this;
            $('#delCouponModal').modal('show');
            vm.tempCoupon = Object.assign({}, item)
        },
        delCoupon() {
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            this.$http.delete(api).then((response) => {
            $('#delCouponModal').modal('hide');
            this.getCoupons();    
            })
        }

    },
    created() {
       this.getCoupons();
    },
}
</script>