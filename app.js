let input=document.getElementById("input");
let searchBtn=document.getElementById("search");
let api="4b07ca88-7b49-4460-bc6b-3271c138fb72";
let notFound=document.querySelector('.not-found');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
    e.preventDefault();  //to prevent word refresh and all...
    //clear data
    audioBox.innerHTML='';
    notFound.innerText='';
    defBox.innerText='';


    //get input data
    let word=input.value;

    //call API get data
    if(word===''){
        alert("Please type your word!");
    }
    getData(word);

})
// 4b07ca88-7b49-4460-bc6b-3271c138fb72
async function getData(word){
    loading.style.display='block';
    //Ajax API call
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api}`);
    const data=await response.json();


    
    //if empty
    if(!data.length){
        loading.style.display='none';
        notFound.innerText="No Result Found.."
        return;
    }
    //if result not matched...show suggestions
    if(typeof data[0]==='string'){
        loading.style.display='none';
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?'
        notFound.appendChild(heading);

        data.forEach(element =>{
            let suggestions=document.createElement('span');
            suggestions.classList.add('suggested');
            suggestions.innerText=element;
            notFound.appendChild(suggestions);
        })
        return;
    }

    //result found
    loading.style.display='none';
    let defination= data[0].meta['app-shortdef'].def[0];
    defBox.innerText=defination;
    //sound
    const soundName=data[0].hwi.prs[0].sound.audio;
        if(soundName){
            //if sound file available
            renderSound(soundName);
        }
    console.log(data)

}

function renderSound(soundName){
    //https://media.merriam-webster.com/
    let subfolder= soundName.charAt(0);
    let soundSrc= `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${api}`;

    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);

}