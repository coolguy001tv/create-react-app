/**
 * Created by CoolGuy on 2016/12/21.
 * 左侧菜单项
 */
import React,{Component} from 'react';
import SortableTree from 'react-sortable-tree';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import MenuItem from './MenuItem';
import { List as VList } from 'react-virtualized';
import "./menu.scss";
let treeData = [{
    title: 'Chicken',
    children: [ { title: 'Egg' } ] },
    {
        title: '菜单2',
        children: [ { title: 'Egg' },{ title: 'Egg' },{ title: 'Egg' },{ title: 'Egg' } ] },
];
// List data as an array of strings
const list = [
    'Brian Vaughn',
    "DingDing",
    "CoolGuy"
    // And so on...
];
function rowRenderer ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
    }) {
    return (
        <div
            key={key}
            style={{border:"1px solid red"}}
        >
            {list[index]} {"Hello"+index}
        </div>
    )
}



class Menu extends Component{
    constructor(props) {
        super(props);

        this.state = {
            treeData: treeData,
            open:false,
        };
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };
    getVList = ()=>{
        return (
            <VList
                width={300}
                height={300}
                rowCount={list.length}
                rowHeight={20}
                rowRenderer={rowRenderer}
            />
        )
    };
    render(){
        let vlist = this.getVList();
        console.log(vlist);
        return (
            <div className="api-left-menu" style={{ height: 400 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    reactVirtualizedListProps={vlist}
                />
                {vlist}

                <ListItem
                    key={2}
                    primaryText="Sent Mail"
                    leftIcon={<FileFolder />}
                />
                <div style={{width:400}}>
                    <Toggle
                        toggled={this.state.open}
                        onToggle={this.handleToggle}
                        labelPosition="right"
                        label="This toggle controls the expanded state of the submenu item."
                    />
                    <br />
                        <List>
                            <Subheader>Nested List Items</Subheader>
                            <ListItem primaryText="Sent mail" leftIcon={<FileFolder />} />
                            <ListItem primaryText="Drafts" leftIcon={<FileFolder />} />
                            <ListItem
                                primaryText="Inbox"
                                leftIcon={<FileFolder />}
                                initiallyOpen={true}
                                primaryTogglesNestedList={true}
                                nestedItems={[
                                    <ListItem
                                      key={1}
                                      primaryText="Starred"
                                      leftIcon={<FileFolder />}
                                    />,
                                    <ListItem
                                      key={2}
                                      primaryText="Sent Mail"
                                      leftIcon={<FileFolder />}
                                      disabled={true}
                                      nestedItems={[
                                        <ListItem key={1} primaryText="Drafts" leftIcon={<FileFolder />} />,
                                      ]}
                                    />,
                                    <ListItem
                                      key={3}
                                      primaryText="Inbox"
                                      leftIcon={<FileFolder />}
                                      open={this.state.open}
                                      onNestedListToggle={this.handleNestedListToggle}
                                      nestedItems={[
                                        <ListItem key={1} primaryText="Drafts" leftIcon={<FileFolder />} />,
                                      ]}
                                />,
                               ]}
                            />
                        </List>
                </div>
            </div>
        )
    }
}

export default Menu;
