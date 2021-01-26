

fetch ('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)



    })



})




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#msg1')
const messageTwo=document.querySelector('#msg2')





weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent=('...Loading...')
    console.log(location)


    fetch ('/weather?address='+ location).then((response)=>{

    
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent=(data.error)
            
        }else{

            console.log(data.location)
            console.log(data.weather)
            messageOne.textContent=(data.location)
            messageTwo.textContent=(data.weather)

        }

    })

})




})