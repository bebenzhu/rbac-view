import {} from './table.js';

// state
const state = {
  tableElement:{},//列表元素
  headers: [],//对象数组，记录表头数据
  data:[]//存放列表数据对象数组
}

// getters
const getters = {
  getTableElement: state=>{
    return state.tableElement;
  },
  getHeaders: state =>{
    return state.headers;
  },
  getData: state =>{
    return state.data;
  }
}

// actions
const actions = {
  addTableElement: (context, tableElement)=>{
    context.commit('setTableElement',tableElement);
  },
  addHeaders: (context, headers)=>{
    context.commit('setHeaders',headers);
  },
  addData: (context, data)=>{
    context.commit('setData',data);
  }
}

// mutations
const mutations = {
  setTableElement: (state, tableElement)=>{
    state.tableElement = tableElement;
  },
  setHeaders: (state, headers)=>{
    state.headers = headers;
  },
  setData: (state, data)=>{
    state.data = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
