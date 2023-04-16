import { makeAutoObservable } from 'mobx';

interface StoreProps {
  list: {
      id: number,
      name: string
  }[],
  inputtext:string,
  addText: (name: string) => void,
  delete: (id: number)=> void,
  changeText:(text: string)=>void
}

const store: StoreProps = makeAutoObservable<StoreProps>({
  list: [
    {
      id: 1,
      name: 'huhao'
    }, {
      id: 2,
      name: 'zhaohong'
    },
  ],
  inputtext:"",
  addText:(name:string)=>{
    const newItems = store.list;
    let newId = 1;
    while(newItems.filter(item => item.id === newId).length > 0) {
      newId++;
    }
    const item = {id: newId, name: name, finish: false};
    store.list = [...newItems,item];
  },
  delete:(id:number)=>{
    const newItems = store.list.filter(item=> !(item.id === id));
    store.list = newItems;
  },
  changeText(text:string) {
    store.inputtext = text;
  }
})

export default store