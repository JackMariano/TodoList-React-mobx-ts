import * as React from 'react' 
import { observer } from 'mobx-react'
import store from './Store'
import  Styles  from './App.module.css';

@observer
export default class Todo extends React.Component{
    curDragIndex:number = undefined;
    list : {
        id: number,
        name: string,
    }[]; 
    text: string;
    render() {
        this.list = store.list;
        this.text = store.inputtext;
        return (
        <div className={Styles.fontSize}>
            <input type="text" value = {this.text} onChange={this.onchange}/> <span><button onClick={this.addTask}>添加</button></span>
            {
                this.list.map((item,index)=>
                    <div key = {item.id} draggable = {true} onDragStart={()=>{this.curDragIndex = index}} onDragEnter={()=>{this.changeIndex(index)}}>
                    <li >
                        {item.name} <span><button onClick={()=>this.onclick(item.id)}>删除</button></span> <span><button onClick={()=>this.editId(item.id)}>修改</button></span>
                    </li>   
                    <div>
                        {
                            store.editId === item.id?
                            <div><input type="text" value = {item.name} onChange={(e)=>this.onChangeEdit(item.id, e)} onBlur={this.submitEdit}/> <span><button onClick={this.submitEdit}>提交</button></span></div>
                            :<span/>
                        }
                    </div>
                    </div>
                )
            }
        </div>
        );
    }
    onchange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        store.changeText(e.target.value);
    }

    addTask = ()=>{
        store.addText(this.text);
    }

    onclick = (id:number)=>{
        store.delete(id);
    }

    editId = (id: number)=>{
        store.changeId(id);
    }

    onEdit = (id:number)=>{
        store.changeId(id)
    }
    onChangeEdit = (id :number, e: React.ChangeEvent<HTMLInputElement>) =>{
        store.changeEditText(id, e.target.value);
    }

    submitEdit = ()=>{
        store.changeId(undefined);
    }

    changeIndex = (index:number)=>{
        if(this.curDragIndex === index) return;
        let curList = store.list;
        let newList = this.arrMove(curList, this.curDragIndex, index);
        store.handleDragMove(newList, this.curDragIndex, index);
        this.curDragIndex = index;
    }

    dragEnd = ()=>{
        this.curDragIndex = undefined;
        store.handleDragEnd;
    }

    arrMove = (list:any, from:number, to:number)=>{
        list = [].concat(list);
        let item = list.splice(from, 1)[0];
        list.splice(to , 0, item);
        return list;
    }

}
