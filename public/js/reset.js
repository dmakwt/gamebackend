
const loaderDiv = document.querySelector('#loader')


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



const linkTokenDeleter= ()=>{
	const windowLink = window.location.href
	const userWordPos = windowLink.search('users/reset/')
	const linkWOtoken = windowLink.slice(0, userWordPos+5);
	const neededLink = `${linkWOtoken}/successful`


	return neededLink
}



form.addEventListener('submit', async(e) => {
	e.preventDefault()
	loaderDiv.className = 'loader'
	const responseStatus = await resetPasswordAPI()

	

	if(responseStatus === 200){
		setTimeout(() => {
			window.location.href = linkTokenDeleter();
		}, 500);
		
	}
	else{
		location.reload();
	}


    
})