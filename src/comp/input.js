import React from 'react';
import TextField from 'material-ui/TextField';

const InputCoin = ({
      input,
      label,
      meta: { touched, error },
      ...custom
    }) => (
      <TextField
      	error={!!(touched && error)}
        label={(touched && error) || label}
        {...input}
        {...custom}
      />
    )


export default InputCoin;