import React from 'react'

let curDragIndex:any = null;

interface StateType {
    list: {name:string}[];
    curMoveItem: any;
}

function arrMove(arr:any, fromIndex:any, toIndex:any){
    arr = [].concat(arr);
    let item = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex , 0, item);
    return arr;
}

export default class App extends React.Component<any,StateType> {
    constructor(props:any) {
        super(props);
        this.state = {
          list: [{name: 'title'},{name: 'name'},{name: 'code'},{name: 'email'}],
          curMoveItem: null
        }
    }
  
    handleDragMove = (data: {name:string}[], from: any, to: any) => {
      this.setState({
        curMoveItem: to,
        list: data
      })
    }
  
    handleDragEnd = ()=>{
      this.setState({
        curMoveItem: null
      })
    }

    onChange= (from:any, to:any)=>{
        if(from === to) return;
        let curValue = this.state.list;
        let newValue = arrMove(curValue, from, to);
        this.handleDragMove(newValue,from,to);
    }
  
    render() {
        return (
            <div>
                <h3>react-drag-sort</h3>
                <ul>
                    {
                        this.state.list.map((item,index)=>
                            <li draggable={true} 
                                onDragStart={()=>{curDragIndex = index}}  
                                onDragEnter={()=>{this.onChange(curDragIndex, index); curDragIndex=index}} 
                                onDragEnd={()=>{curDragIndex=null; this.handleDragEnd()}}
                            >
                                {item.name}
                            </li>    
                        )
                    }
                </ul>
            </div>
        )
    }
  }