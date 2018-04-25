import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


export default class CountList extends React.Component {

	change() {
		this.props.change(Number(this.input.value))
	}

	render() {

		return (<React.Fragment>
					<TextField type="number" defaultValue={10} inputRef={(input)=>{this.input = input}} />
		
					<Button variant="raised" 
						size="small" 
						color="primary" 
						onClick={() => this.change()} >
							select
					</Button>
				</React.Fragment>)
	}
}
