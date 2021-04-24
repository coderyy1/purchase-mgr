import { isAdmin, overBuyer, overStoreman } from '../character';
import store from '@/store'

// 仅有管理员可操作
export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {
      const res = isAdmin();

      if(!res && value) {
        // el.style.display = 'none';
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

// 采购人员 + 管理员 能操作
export const buyerDirectives = (app) => {
  app.directive('over-buyer', {
    mounted(el, { value = true }) {
      const res = overBuyer();

      if(!res && value) {
        // el.style.display = 'none';
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

// 仓库人员 + 管理员 能操作
export const storemanDirectives = (app) => {
  app.directive('over-storeman', {
    mounted(el, { value = true }) {
      const res = overStoreman();

      if(!res && value) {
        // el.style.display = 'none';
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

// 采购人员能修改自己提交的 + 管理员能操作所有的
export const buyerSelfDirectives = (app) => {
  app.directive('buyer-self', {
    mounted(el, { value }) {
      const chara = store.state.userInfo.character.title
      const account = store.state.userInfo.account
      if(chara === '管理员') {
        return
      }
      if(chara === '采购人员' && account === value) {
        return
      }


        // el.style.display = 'none';
      el.parentNode && el.parentNode.removeChild(el);
    }
  });
}