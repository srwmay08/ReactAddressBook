var React = require('react');

var BreakfastBar = React.createClass({
	getInitialState: function() {
		return {
			waffleIronCount: 5
		}	
	},
	addIron: function() {
		this.setState({
			waffleIronCount: this.state.waffleIronCount + 1
		});
	},
	render: function() {
		var wIrons = [];
		for (var i = 0; i < this.state.waffleIronCount; i++) {
			wIrons.push(<div className="waffle-ion">waffle {i + 1}</div>);
		}
		
		return (<div>
			{wIrons}
			<button onClick={this.addIron}></button>
			<div className="juicejug">
				<div className="juice">juice</div>
				<div className="jug">in a jug</div>
			</div>
		</div>);
	}
});
	
module.exports = BreakfastBar;