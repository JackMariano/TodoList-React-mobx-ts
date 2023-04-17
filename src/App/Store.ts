import { makeAutoObservable } from 'mobx';

interface StoreProps {
  list: {
      id: number,
      name: string
  }[],
  inputtext:string,
  editText: string,
  editId: number,
  curIndex: number,
  addText: (name: string) => void,
  delete: (id: number) => void,
  changeText: (text: string) => void,
  changeId: (id: number) => void,
  changeEditText: (id: number,name: string) => void,
  handleDragMove: (list:{id: number, name: string}[], from:number, to:number) => void,
  handleDragEnd: ()=>void,
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
  editText:"",
  editId: undefined,
  curIndex: undefined,
  addText:(name:string) => {
    const newItems = store.list;
    let newId = 1;
    while(newItems.filter(item => item.id === newId).length > 0) {
      newId++;
    }
    const item = {id: newId, name: name, finish: false};
    store.list = [...newItems,item];
    store.inputtext = "";
  },
  delete:(id:number) => {
    const newItems = store.list.filter(item=> !(item.id === id));
    store.list = newItems;
  },
  changeText:(text:string) => {
    store.inputtext = text;
  },
  changeId:(id:number) => {
    store.editId = id;
  },
  changeEditText:(id:number,name: string) => {
    const newItems = store.list;
    let list: {id: number; name: string}[] = [];
        newItems.forEach(item => {
            if(item.id === id) {
                list.push({
                    id,name
                });
            } else {
                list.push(item);
            }
        })
        store.list = list;
  },
  handleDragMove:(list:{id: number, name: string}[], from: number, to:number) => {
    store.curIndex = to;
    store.list = list;
  },
  handleDragEnd() {
    store.curIndex = undefined;
  },
})

export default store