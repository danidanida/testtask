import React, {
    PureComponent
} from 'react';
import {
    Treebeard
} from 'react-treebeard';

const data = [];


export class Tree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data
        };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        const {
            cursor,
            data
        } = this.state;
        if (cursor) {
            this.setState(() => ({
                cursor,
                active: true
            }));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({
            cursor: node,
            data: Object.assign({}, data)
        }));
    }
    async componentDidMount() {
        const URL = '/api/regions';
        const response = await fetch(URL);
        //console.log(response)
        const data = await response.json()
        console.log(data)
        const formatedData = this.formatData(data)
        console.log(formatedData)
        this.setState({
            data: formatedData
        })
    }

     formatData (serverData) {
        var data = {name: "", toggled:true, children:[]}
      let newArray = [];
      
      for (let i=0; i < serverData.length; i++) {
        serverData[i].path = serverData[i].path.split(".")
      }
       serverData.forEach(el => {
         if (el.path.length === 1) { // grandpa 
           newArray.push({name: el.name, children: []})
         }
       
         if (el.path.length === 2) { // parent
           newArray[Number(el.path[0])-1].children.push({name: el.name, children: []}) 
         }
         if (el.path.length === 3) { // children
           newArray[Number(el.path[0])-1].children[Number(el.path[0])-1].children.push({name: el.name, children: []}) 
         } 
       }) 
       data.children = newArray
      return data
      }

    render() {
        const {
            data
        } = this.state;
        return ( <
            Treebeard data = {
                data
            }
            onToggle = {
                this.onToggle
            }
            />
        );
    }
}
export default Tree


