var React = require('react');
var ReactDom = require('react-dom');

var AddBookItem = React.createClass({
    render: function() {
        return (
            <li>
                {this.props.item}<button type="button" onClick={this.props.handleDelete.bind(this, this.props.item)}>Delete</button>
            </li>
        );
    }
});

var AddBookList = React.createClass({
    render: function() {
        var handleDelete = this.props.handleDelete;
        return (
            <ul className="ab-list">
                {
                    this.props.items.map(function(item) {
                    return <AddBookItem item={item} handleDelete={handleDelete} />
                })}
            </ul>
        );
    }
});

var AddBookForm = React.createClass({
    clearAll: function() {
        this.refs.newAdd.getDOMNode().focus();
        this.props.clearAll();
    },
    render: function() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <input ref="newAdd" type="text" name="new-add" id="new-add" value={this.props.text} onChange={this.props.handleChange} />
                <input ref="newAddress" type="text" name="new-address" id="new-address" value={this.props.address} />
                <button type="submit">Add</button>
                <button type="button" onClick={this.clearAll}>Delete all</button>
            </form>
        );
    }
});

var AddBookApp = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            text: ''
        }
    },
    handleSubmit: function(event) {
        event.preventDefault();
        var combine = this.state.text + " " + this.state.address
        var newItems = this.state.items.concat([this.state.text]);
        var newText = '';

        this.setState({
            items: newItems,
            text: newText
        });
    },
    handleChange: function(event) {
        this.setState({
            text: event.target.value,
            address: event.target.value,
        });
    },
    handleDelete: function(itemToRemove) {
        var newItems = this.state.items.filter(function(item) {
            return item !== itemToRemove;
        });

        this.setState({
            items: newItems
        });
    },
    clearAll: function() {
        this.setState(this.getInitialState());
    },
    render: function() {
        return (
            <div className="ab-app">
                <AddBookForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} clearAll={this.clearAll} text={this.state.text} />
                <AddBookList items={this.state.items} handleDelete={this.handleDelete} />
            </div>
        );
    }
});

ReactDom.render(<AddBookApp />, document.getElementById('app'));