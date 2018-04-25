import Select from './select';
import Grid from 'material-ui/Grid';
import React from 'react';
import Form from './form';
import { initialize, change } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import CountList from './count_list';
import { getList, getChange } from './get-data'
import { connect } from 'react-redux';

class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			direction : true,
			load : true,
			leftLabel : 'count',
			rightLabel : 'count',
			error : null
		}

		this._list = [];

		// props.initForm()
		this.changeDirection = this.changeDirection.bind(this)
		this.getChange = this.getChange.bind(this)
		this.cleaneError = this.cleaneError.bind(this)
		this.getList = this.getList.bind(this)
	}

	componentDidMount() {
		this.getList()
	}

	getList(count=10) {
		this.setState({load:true})
		getList()
			.then(list => {
				this._list = count ? list.filter((v,i)=>(i<count)) : list;
				this.setState({ load : false})
			})
			.catch(err=>this.setState({error:err.message, load: false}))

	}

	changeDirection(type) {
		if (type == this.state.direction) return;

		this.setState({
			direction : type,
			leftLabel : type ? 'count' : 'result',
			rightLabel : !type ? 'count' : 'result',
		})
	}

	getChange(values) {
		let current = this.state.direction ? values.leftSelect : values.rightSelect,
			target = !this.state.direction ? values.leftSelect : values.rightSelect,
			count = this.state.direction ? values.leftCount : values.rightCount,
			targetName = this.state.direction ? 'rightLabel' : 'leftLabel';

		this.setState({
			load : true,
			[targetName] : 'load...'
		})

		getChange(current, target, count)
			.then( result => {

				this.setState({
					load : false,
					[targetName] : 'result'
				})

				this.props.changeResult(this.state.direction ? 'rightCount' : 'leftCount', result)
			})
			.catch(err => {
				this.setState({
					error : err.message,
					load : false
				})
			})
	}

	cleaneError() {
		this.setState({
					error : null
				})
	}


	render() {
		return (
			<div className="Root">
				<hr style={{marginBottom:20}}/>
				<Form isLoad={this.state.load}
					direction={this.state.direction} 
					changeDirection={this.changeDirection} 
					leftLabel={this.state.leftLabel} 
					rightLabel={this.state.rightLabel} 
					coinList={this._list}  
					onSubmit={this.getChange} />
				<hr style={{marginBottom:20}}/>
				<CountList change={this.getList} />

				<Dialog aria-labelledby="simple-dialog-title" onClose={this.cleaneError} open={!!this.state.error}>
					<Paper elevation={4} >
						<div className="error-dialog" 
							style={{
								margin: '10px 20px',
								color: '#ae1818'
							}} >
							{this.state.error}
						</div>
					</Paper>
				</Dialog>
			</div>
		);
	}
}

export default connect(
		state => ({...state.change}),
		disp => ({
			getList : () => disp({type : '@get:list'}),
			initForm : () => disp(initialize('coins',{
				fi : 0,
				si : 0
			})),
			changeResult : (name, count) => disp(change('coins',name, count))
		})
	)(Root)