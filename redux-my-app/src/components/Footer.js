/**
 * Created by CoolGuy on 2016/10/8 11:53.
 */
import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name
        }

        return (
            <a href='#' onClick={e => {
                                    e.preventDefault()
                                    this.props.onFilterChange(filter)
                                  }}>
                {name}
            </a>
        )
    }
    showLength(filter){
        return this.props.selectTodos(this.props.todos,filter).length;
    }

    render() {
        return (
            <div>
                <p>
                    Show:
                    {' '}
                    {this.renderFilter('SHOW_ALL', '所有的')},{this.showLength('SHOW_ALL')}
                    {', '}
                    {this.renderFilter('SHOW_COMPLETED', '完成的')},{this.showLength('SHOW_COMPLETED')}
                    {', '}
                    {this.renderFilter('SHOW_ACTIVE', '激活的')},{this.showLength('SHOW_ACTIVE')}
                    .
                </p>

            </div>

        )
    }
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}