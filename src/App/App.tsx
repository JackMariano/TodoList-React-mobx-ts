import * as React from 'react' 
import { observer } from 'mobx-react'
import store from './Store'
import  Styles  from './App.module.css';


@observer
export default class Todo extends React.Component{
    list : {
        id: number,
        name: string,
    }[]; 
    text: string;
    render() {
        this.list = store.list;
        this.text = store.inputtext;
        return (
        <div className={Styles.todolist}>
            <input type="text" value = {this.text} onChange={this.onchange}/> <span><button onClick={this.addTask}>添加</button></span>
            {
                this.list.map(item=>
                    <div>
                    <li>
                        {item.name}
                    </li>   <span><button onClick={()=>this.onclick(item.id)}>删除</button></span>
                    </div>
                )
            }
            
        </div>
        );
    }
    onchange = (e:any)=>{
        store.changeText(e.target.value);
    }

    addTask = ()=>{
        store.addText(this.text);
        store.changeText("");
    }

    onclick = (id:number)=>{
        store.delete(id);
    }
}
