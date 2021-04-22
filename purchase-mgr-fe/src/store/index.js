import { createStore } from 'vuex'
import { character, user } from '@/network';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';

const KEEPALIVECOMPS = ['Stocks','DemandList','OrderList','SupplierList']

export default createStore({
  state: {
    // 角色信息
    characterInfo: [],
    // 用户信息
    userInfo: {},
    // 用户权限信息
    userCharacter: {},
    // 用户头像
    userAvatSrc: '',
    // 缓存组件
    keepComps: KEEPALIVECOMPS,
    // 过来的界面点击时的account
    fromAccount: ''
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, user) {
      state.userInfo = user;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
    setuserAvatSrc(state, userAvatSrc) {
      state.userAvatSrc = userAvatSrc;
    },
    setKeepComp(state) {
      state.keepComps = KEEPALIVECOMPS
    },
    clearKeepComp(state) {
      state.keepComps = []
    },
    setFromAccount(state, fromAccount) {
      state.fromAccount = fromAccount;
    }
  },
  actions: {
    async getCharacterInfo(store) {
      const res = await character.list();
      result(res)
        .success(({data}) => {
          store.commit('setCharacterInfo', data);
        });
    },

    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);
          store.commit('setUserCharacter', getCharacterInfoById(data.character._id));
        });
    },
    async getuserAvatSrc(store) {
      const _id = store.state.userInfo._id
      const res = await user.userAvat({_id})
      result(res)
        .success(({data}) => {
          store.commit('setuserAvatSrc', data.avatSrc);
        });
    },
  },
  modules: {
  }
})
