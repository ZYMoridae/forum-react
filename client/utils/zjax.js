import axios from 'axios';

class Zjax {
	request({url, option, successCallback, failureCallback}) {
		if(!url || !option) {
			return
		}
		let default_option = {
			headers: {
				'X-USER-ID': '8193055',
				'X-USER-ACCESS-TOKEN': 'xD8UbywSNjJKZ5y733zh'
			},
			responseType: 'json',
			url: url
		};
		let options = Object.assign({}, option, default_option);
		let _axios = axios(options);
		if(successCallback && typeof successCallback === 'function') {
			_axios.then(successCallback);
		}
		if(failureCallback && typeof failureCallback === 'function') {
			_axios.catch(failureCallback);
		}
	}
}

export default Zjax;