import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';


export default ({ input, label, meta, list, changeDirection, ...props}) => (
	<FormControl style={{width:'100%'}}>
		<InputLabel htmlFor={input.name} 
				error={!!(meta.touched && meta.error)} >{(meta.touched && meta.error) || label}</InputLabel>
		<Select error={!!(meta.touched && meta.error)} 
				displayEmpty 
				inputProps={{
	              name: input.name,
	              id: input.name,
	            }}
				{...input} 
				{...props} >
			{list.map((coin, i) =>(
				<MenuItem key={coin.id || i} value={coin.id}>{coin.name || coin.id || ''}</MenuItem>
			))}
			
		</Select>
	</FormControl>
)

