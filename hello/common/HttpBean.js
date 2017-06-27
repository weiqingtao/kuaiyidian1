export async function postHttp(url,formBody=null){
	var fetchOptions = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/x-www-form-urlencoded'
			},
			body:formBody
	     };
	  let response = await fetch('http://192.168.1.157:3000/'+url,fetchOptions);
	  let text = await response.text();
	  return text;
}

export async function getHttp(url){
	let response = await fetch('http://192.168.1.157:3000/'+url);
	if(response.ok){
		//let text = await response.text();
		return response;
	}else{
		alert('网络连接失败');
		return null;
	}
}