import {Component} from "react";

class FilterItems extends Component{
    render() {
        return (
            <input
                type="text"
                placeholder="Search todos"
                onChange={ e => this.props.filterItems(e.target.value)}
            />
        )

    }
}

export default FilterItems;