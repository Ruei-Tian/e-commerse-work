<template>
    <div>
       <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
          </h6>
          <ul class="nav flex-column mb-2">
              <li class="nav-item" @click.prevent="visibility = 'product'">
                <router-link to="/admin/products" class="nav-link" 
                :class="{'active': visibility == 'product'}">
                <i class="fas fa-box-open"></i>
                  產品列表
                </router-link>
              </li>   
              <li class="nav-item" @click.prevent=" visibility = 'order'">
                <router-link to="/admin/orders" class="nav-link"
                :class="{'active': visibility == 'order'}">
                <i class="fas fa-clipboard-list mx-1"></i>
                  訂單列表
                </router-link>
              </li> 
              <li class="nav-item" @click.prevent=" visibility = 'coupon'">
                <router-link to="/admin/coupons" class="nav-link"
                :class="{'active': visibility == 'coupon'}">
                <i class="fas fa-ticket-alt"></i>
                  優惠券
                </router-link>
              </li>                      
          </ul>
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>模擬功能</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
          </h6>
          <ul class="nav flex-column mb-2">
              <li class="nav-item" >
                <router-link to="/Customer_order" class="nav-link">
                <i class="fas fa-shopping-cart"></i>
                  模擬訂單
                </router-link>
              </li>              
          </ul>
                     
        </nav>   
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      visibility: 'product'
    };
  }
}
</script>