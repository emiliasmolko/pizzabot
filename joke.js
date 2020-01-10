let rp = require('request-promise')
function main(params){
	const options = {
	uri: "http://api.icndb.com/jokes/random",
	json: true
	}
	return rp(options).then(res => {return {response:res}})
	
	//return {response:{value:{joke:"Testowy"}}}
	
}