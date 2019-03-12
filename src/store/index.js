import Vue from 'vue'
import Vuex from 'vuex'

// import cart from './modules/cart'
// import products from './modules/products'
import table from './modules/table/index'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    table
    // cart,
    // products
  }
})
