import * as React from 'react';
import { observer } from 'mobx-react';
import store from './Store';
import Styles from './App.module.css';

@observer
export default class Todo extends React.Component {
  static onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    store.changeText(e.target.value);
  };

  static onEdit = (id:number) => {
    store.changeId(id);
  };

  static onChangeEdit = (id :number, e: React.ChangeEvent<HTMLInputElement>) => {
    store.changeEditText(id, e.target.value);
  };

  static onclick = (id:number) => {
    store.delete(id);
  };

  static editId = (id: number) => {
    store.changeId(id);
  };

  static submitEdit = () => {
    store.changeId(undefined);
  };

  static arrMove = (list:{ id: number, name: string }[], from:number, to:number) => {
    const newlist = [].concat(list);
    const item = newlist.splice(from, 1)[0];
    newlist.splice(to, 0, item);
    return newlist;
  };

  curDragIndex:number = undefined;

  list:{ id: number, name: string }[];

  text: string;

  addTask = () => {
    store.addText(this.text);
  };

  changeIndex = (index:number) => {
    if (this.curDragIndex === index) return;
    const curList = store.list;
    const newList = Todo.arrMove(curList, this.curDragIndex, index);
    store.handleDragMove(newList, this.curDragIndex, index);
    this.curDragIndex = index;
  };

  dragEnd = () => {
    this.curDragIndex = undefined;
    store.handleDragEnd();
  };

  render() {
    this.list = store.list;
    this.text = store.inputtext;
    return (
      <div className={Styles.fontSize}>
        <input type="text" value={this.text} onChange={(e) => Todo.onChange(e)} />
        <span><button type="submit" onClick={this.addTask}>添加</button></span>
        {
        this.list.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => { this.curDragIndex = index; }}
            onDragEnter={() => { this.changeIndex(index); }}
            onDragEnd={this.dragEnd}
          >
            <li>
              {item.name}
              <span><button type="submit" onClick={() => Todo.onclick(item.id)}>删除</button></span>
              <span><button type="submit" onClick={() => Todo.editId(item.id)}>修改</button></span>
            </li>
            <div>
              {
                            store.editId === item.id
                              ? (
                                <div>
                                  <input type="text" value={item.name} onChange={(e) => Todo.onChangeEdit(item.id, e)} onBlur={Todo.submitEdit} />
                                  <span><button type="submit" onClick={Todo.submitEdit}>提交</button></span>
                                </div>
                              )
                              : <span />
                        }
            </div>

          </div>
        ))
            }
      </div>
    );
  }
}
