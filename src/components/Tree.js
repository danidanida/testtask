import React, {PureComponent} from 'react';
import {Treebeard} from 'react-treebeard';

const data = [
            {name: 'Name 1',
            children: [
                {
                    name: 'Name 2',
                    children: [
                        { name: 'Name 3' },
                        { name: 'Name 4' }
                    ]
                }
            ]
        },
        {
            name: 'Name 5',
            children: [
                { name: 'Name 6' }
            ]
        }
    ];


export class Tree extends PureComponent {
    constructor(props){
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    async componentDidMount() {
        const URL = '/api/regions'; 
        const response = await fetch(URL);
        //console.log(response)
        const data = await response.json()
        const formatedData = data.sort(this.changeData)
        this.setState({data:formatedData})
    }

    changeData (a, b) {
        if ( a.path < b.path ){
          return -1;
        }
        if ( a.path > b.path ){
          return 1;
        }
        return 0;
      }

    render(){
        const {data} = this.state;
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
            />
        );
    }
}
export default Tree