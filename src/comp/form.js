import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from 'material-ui/Grid';
import Input from './input';
import Select from './select';
import Button from 'material-ui/Button';
import Arrow from 'react-icons/lib/fa/arrow-circle-right';
import { CircularProgress } from 'material-ui/Progress';
import validate from './validate'

const style = {
	backgroundColor: 'rgba(200,200,200,.3',
	boxShadow: '0 0 4px #000',
	borderRadius:5,
	margin: 5,
	textAlign: 'center'
}

const styleField = {
	width: '100%'
}

const propsI = {
	xs : 11,
	sm : 5,
	md : 2
}


const Form = ({
		handleSubmit, 
		isLoad, 
		direction, 
		changeDirection, 
		leftLabel, 
		rightLabel, 
		coinList }) => (
			<form  onSubmit={handleSubmit} >
				<Grid container justify="center" alignContent="center" spacing={16}  alignItems="center">
					<Grid item style={style} {...propsI}>
						<Field disabled={isLoad} 
								onFocus={()=>changeDirection(true)} 
								name="leftCount" 
								component={Input} 
								label={leftLabel} 
								style={styleField} />
					</Grid>
					<Grid item style={style} {...propsI}>
						<Field disabled={isLoad} 
								onFocus={()=>changeDirection(true)} 
								name="leftSelect" 
								component={Select} 
								label="coin" 
								list={coinList} 
								value="bitcoin" 
								style={styleField} />
					</Grid>
					<Grid item xs={11} md={1}>
						<Arrow size={30} fill="#3b5a9a" style={{
									margin: '5px auto',
									display: 'flex',
									cursor: 'pointer',
									transition: '.3s',
									transform: `rotate(${direction ? 0 : 180}deg)`
								}} 
								onClick={()=>changeDirection(!direction)} />
					</Grid>
					<Grid item style={style} {...propsI}>
						<Field disabled={isLoad} 
								onFocus={()=>changeDirection(false)} 
								name="rightSelect" 
								component={Select} 
								label="coin" 
								list={coinList} 
								style={styleField} />
					</Grid>
					<Grid item style={style} {...propsI}>
						<Field disabled={isLoad} 
								onFocus={()=>changeDirection(false)} 
								name="rightCount" 
								component={Input} 
								label={rightLabel} 
								style={styleField} />
					</Grid>
					<Grid item style={style} {...propsI}>
						<input
				        	id="raised-button-submit"
				        	type="submit" 
				        	style={{display:'none'}} />

				      <label htmlFor="raised-button-submit">
							<Button disabled={isLoad} 
								variant="raised" 
								size="small" 
								color="secondary" 
								component="span" 
								fullWidth >
								{isLoad ? <CircularProgress size={20} style={{marginRight:5}} />  : null }
									select
							</Button>
				      </label>

					</Grid>
				</Grid>
			</form>
		)

export default reduxForm({
	form : 'coins',
	validate
})(Form)