import Vue from 'vue'
import { ADD_ADDRESS } from '../types'

const state = {
    userAddress: {
        name: '',
        contact: '',
        province: '',
        city: '',
        district: '',
        remark: '',
        detailAddress: '',
    }
}

const mutations = {
    [ADD_ADDRESS] (state, payload) {
        state.userAddress = payload.data;
    }
}

const getters = {
    userAddress: state => state.userAddress
}

const actions = {
    newAddress({commit, state}, data={}) {
        return Vue.$http(`globalUrl.newConsumer@{id:${data.id}}`, {data, method: 'post'})
            .then(v => {
                if (!!v) {
                    let address = v;
                    commit(ADD_ADDRESS, {data: address});
                    return state.userAddress;
                }
            })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}