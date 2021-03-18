import { isAdmin, overBuyer, overStoreman } from '../character';

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