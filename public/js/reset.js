const resetPasswordAPI = async()=>{

	try {
		const link = window.location.href
		const userNewPassword = document.querySelector('#password1').value
		const resetPasswordFetch = await fetch(link, {
		method: 'POST',
		headers: {
		  'newpassword': userNewPassword,
		}
	  })
	  
	
	  
	  return resetPasswordFetch.status
	} catch (error) {
		location.reload();
	}



}






form.addEventListener('submit', async(e) => {
	e.preventDefault()
	const responseStatus = await resetPasswordAPI()

	//handle succesful fetch [[     URL NEED TO BE CHANGE   ]]
	if(responseStatus === 200){
		const link = `${process.env.APP_URL}/users/successful`
		window.location.href = link;
	}
	else{
		location.reload();
	}


    
})