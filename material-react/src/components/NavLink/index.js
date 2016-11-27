/**
 * Created by CoolGuy on 2016/11/27.
 */
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
    render() {
        return <Link {...this.props} activeClassName="bold">{this.props.children}</Link>
    }
})
