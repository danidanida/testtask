import React, {PureComponent} from 'react';
import {Treebeard} from 'react-treebeard';

const data = [ ];


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
        console.log(data)
       // const formatedData = data.sort(this.changeData)
       const formatedData = this.modifyData(data)
        console.log(formatedData)
        this.setState({data:formatedData})
    }

    /*changeData (a, b) {
        if ( a.path < b.path ){
          return -1;
        }
        if ( a.path > b.path ){
          return 1;
        }
        return 0;
      } */ 
       modifyData (arrayOfObjects) {
        let data = [
                   {name:  'Name',
                   toggled:true,
                   children: [
                       {
                           name: 'Name',
                           toggled:true,
                           children: [
                               { name: 'Name',
                               toggled:true,
                                },
                               { name: 'Name',
                               toggled:true,
                                }
                           ]
                       }
                   ]
               },
               {
                   name: 'Name',
                   toggled:true,
                   children: [
                       { name: 'Name' }
                   ]
               }
           ];
       
       data[0].name = arrayOfObjects[0].name 
       data[1].name = arrayOfObjects[1].name  
       data[0].children[0].name = arrayOfObjects[2].name
       data[0].children[0].children[0].name = arrayOfObjects[3].name  
       data[0].children[0].children[1].name = arrayOfObjects[4].name
       data[1].children[0].name = arrayOfObjects[5].name 
       
         return data
         
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


/* 
const serverData = [
        { id: 1, path: '1', name: 'Region A' },
        { id: 2, path: '2', name: 'Region B' },
        { id: 3, path: '1.3', name: 'Station 1' },
        { id: 4, path: '1.3.4', name: 'Section 1' },
        { id: 5, path: '1.3.5', name: 'Section 2' },
        { id: 6, path: '2.6', name: 'Station 10' },
      ];
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


function changeData (a, b) {
        if ( a.path < b.path ){
          return -1;
        }
        if ( a.path > b.path ){
          return 1;
        }
        return 0;
      }

      function reGroupArray(arr, size) {
   var newArr = []
   for (var i = 0; i <= Math.ceil(arr.length / size); i++) {
 
       var j = 0;
       if (i !== 0) {
           j = j + size;
           size = size + size;
       }
 
       newArr[i] = arr.slice(j, size);
 
   }
 
   return newArr;
}
var formatedData = serverData.sort(changeData)
console.log(formatedData)
 mapedArray = formatedData.map(el => el.path.split(".")) 
for (i=0; i <mapedArray.length; i++) {
if (mapedArray[i].length == 1) {mapedArray[i].id = "parent"}
  else if (mapedArray[i].length == 2) {mapedArray[i].id = "child"}
  else  {mapedArray[i].id = "grandchild"}
}
console.log( mapedArray)
console.log(serverData.length)
console.log(data.length)  */


/* 

function modifyData (arrayOfObjects) {
 let data = [
            {name: 'NAME',
            children: [
                {
                    name: 'NAME',
                    grandchildren: [
                        { name: 'NAME' },
                        { name: 'NAME' }
                    ]
                }
            ]
        },
        {
            name: 'NAME',
            children: [
                { name: 'NAME' }
            ]
        }
    ];

let sortedData = arrayOfObjects.sort(changeData)
for (i=0; i < sortedData.length; i++) {
data.replace(/NAME/g,(sortedData[i].name)) }
  console.log(data)
}

  modifyData(serverData)
*/

/* 
function modifyData (arrayOfObjects) {
 let data = [
            {name:  'Name',
            children: [
                {
                    name: 'Name',
                    grandchildren: [
                        { name: 'Name' },
                        { name: 'Name' }
                    ]
                }
            ]
        },
        {
            name: 'Name',
            children: [
                { name: 'Name' }
            ]
        }
    ];

data[0].name = arrayOfObjects[0].name 
data[1].name = arrayOfObjects[1].name  
data[0].children[0].name = arrayOfObjects[2].name
data[0].children[0].grandchildren[0].name = arrayOfObjects[3].name  
data[0].children[0].grandchildren[1].name = arrayOfObjects[4].name
data[1].children[0].name = arrayOfObjects[5].name 

  return data
  
}

  console.log(modifyData(serverData))

*/ 

/* 

const serverData = [
        { id: 1, path: '1', name: 'Region A' },
        { id: 2, path: '2', name: 'Region B' },
        { id: 3, path: '1.3', name: 'Station 1' },
        { id: 4, path: '1.3.4', name: 'Section 1' },
        { id: 5, path: '1.3.5', name: 'Section 2' },
        { id: 6, path: '2.6', name: 'Station 10' },
      ];

function modifyData () {
  const newArr = [];
serverData.forEach(el => {
  if (el.path.length===1)
  newArr.push({name: el.name, children: [] })
});
serverData.forEach(el => {
  if (el.path.length===3) 
    newArr[Number(el.path[0])-1].children.push({name: el.name, path: el.path, grandchildren: [] })
}  
serverData.forEach(el => {
 if (el.path.length===5) 
  newArr[Number(el.path[0])].children.forEach(dad => {
    if (dad.path[3] === el.path[3]) {dad.grandchildren.push({name: el.name })}
  });
                   }                    
}
modifyData () 

*/ 