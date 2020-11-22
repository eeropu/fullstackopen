import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from './../reducers/filterReducer'

const Filter = (props) => (
    <div>
        Filter: <input type='text' value={props.filter} onChange={e => props.setFilter(e.target.value)}/>
    </div>
)

const mapStateToProps = (state) => ({
    filter: state.filter
})

const mapDispatchToProps = {
    setFilter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)