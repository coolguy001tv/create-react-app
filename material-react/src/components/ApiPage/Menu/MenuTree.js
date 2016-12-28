/**
 * Created by CoolGuy on 2016/12/23.
 * 该文件目前被MenuList代替
 */
import React,{Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import $ from 'jquery';
//require("jstree");
import "./menu.scss";
class MenuTree extends Component{
    componentDidMount() {
        $("#tree").jstree();
        $('#tree2').jstree({
            'core' : {
                'data' : [
                    { "text" : "Root node", "children" : [
                        { "text" : "Child node 1" },
                        { "text" : "Child node 2" }
                    ]
                    }
                ]
            },
            "plugins" : ["dnd","wholerow"]
        });
        $("#tree3").jstree({
            "core" : { "check_callback" : true }, // so that modifying operations work
            "plugins" : ["dnd","wholerow"],
            "dnd":{
                copy:false,
                is_draggable:function(node){
                    console.log();
                    return true;
                }
            }
        });

    }
    render(){
        return (
            <div className="menu-tree" style={{width:200}}>
                {/* <div id="tree">
                    <ul>
                        <li>Hello</li>
                        <li>externals<ul>
                            <li>Child node 1</li>
                            <li>Child node 2</li>
                        </ul></li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                    </ul>
                </div>

                <div id="tree2">

                </div>*/}
                <div id="tree3">

                    <ul>
                        <li><ListItem primaryText="1" /></li>
                        <li><ListItem primaryText="2" /></li>
                        <li><ListItem primaryText="3" /></li>
                        <li><ListItem primaryText="4" /></li>
                        <li><ListItem primaryText="5" /></li>
                        <li><ListItem primaryText="6" /></li>
                    </ul>


                </div>
                <div style={{marginTop:80}}>
                    <List>
                        <ListItem primaryText="Sent mail" style={{height:30}}/>
                        <ListItem primaryText="Sent mail"  style={{height:30}}/>
                    </List>

                </div>
            </div>
        )
    }
}

export default MenuTree;