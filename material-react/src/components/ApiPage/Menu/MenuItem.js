/**
 * Created by CoolGuy on 2016/12/21.
 * 该文件目前被MenuList代替
 */
import React,{Component} from 'react';
import { List } from 'react-virtualized';
// List data as an array of strings
const list = [
    'Brian Vaughn'
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
            style={style}
        >
            {list[index]}
        </div>
    )
}

export default <List
    width={300}
    height={300}
    rowCount={list.length}
    rowHeight={20}
    rowRenderer={rowRenderer}
/>;