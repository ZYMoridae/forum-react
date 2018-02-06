import axios from 'axios';

class Zjax {
	request({url, option, successCallback, failureCallback}) {
		if(!url || !option) {
			return
		}
		let default_option = {
			headers: {
				'X-USER-ID': '9709750',
				'X-USER-ACCESS-TOKEN': 'kjLyAqTENoUUxXMxaDKS'
			},
			responseType: 'json',
			url: url
		};
		let _axios = axios(Object.assign({}, option, default_option));
		if(successCallback && typeof successCallback === 'function') {
			_axios.then(successCallback);
		}
		if(failureCallback && typeof failureCallback === 'function') {
			_axios.catch(failureCallback);
		}
		return _axios
	}
}

export default Zjax;