const parseNumber = (num,num2) => {
	if (!num && !num2) return 'Required';
	if (!num) return null;
	if (isNaN(Number(num.toString().replace(',','.')))) return 'not Number';
	return null;
}


export default (values,i,q,w) => {
	console.log('validate',values,i,q,w)
	return {
		leftCount : parseNumber(values.leftCount, values.rightCount),
		rightCount : parseNumber(values.rightCount, values.leftCount),
		leftSelect : values.leftSelect == values.rightSelect ? 'the same coin' : null,
		rightSelect : values.leftSelect == values.rightSelect ? 'the same coin' : null
	}
}