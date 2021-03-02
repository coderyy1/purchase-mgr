import store from '@/store';


export const isAdmin = () => {
  const uc = store.state.userCharacter;

  return uc.name === 'admin';
}

export const overBuyer = () => {
  const uc = store.state.userCharacter;

  return (uc.name === 'admin' || uc.name === 'buyer');
}

export const overStoreman = () => {
  const uc = store.state.userCharacter;

  return (uc.name === 'admin' || uc.name === 'storeman');
}

export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state;

  const one = characterInfo.find((item) => {
    return item._id === id;
  });

  return one || {
    title: '无角色信息'
  };

};