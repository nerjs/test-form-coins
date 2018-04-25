const urlData = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';

export const getList = () => {
	return fetch(urlData)
				.then(r => r.json())
}

export const getChange = (current, target, count) => {


	if (!current) return Promise.reject(new Error('Empty current coin'));
	if (!target) return Promise.reject(new Error('Empty target coin'));
	if (!count && count != 0) return Promise.reject(new Error('Empty count coin'));

	count = Number(count.toString().replace(',','.'))
	if (isNaN(count)) return Promise.reject(new Error('count coin must be Number'));



	return getList()
			.then(list => list.filter(val => (val.id == current || val.id == target)))
			.then(arr => {
				if (arr.length < 2) throw new Error('bad Result');

				let res = {};
				arr.forEach(val => {
					res[val.id == current ? 'current' : 'target'] = Number(val.price_usd)
				})

				return res
			})
			.then( res => (res.current / res.target * count))
}