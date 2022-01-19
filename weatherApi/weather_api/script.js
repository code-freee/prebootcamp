function checkweather(btn)
{
    let latlng=btn.value.split(',').map(str=>str.trim());    
    let apik="8f70b482378ecf5e0297cb14c03db251";
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latlng[0]+'&lon='+latlng[1]+'&appid='+apik)   
    .then((resp)=>{
        return resp.json();
    })
    .then((weatherobj)=>{
        
        let temp=weatherobj.main.temp-273.15;

        let weatherstr='Weather of '+latlng[2]+':'+'\nSky : '+weatherobj.weather[0].description+'\nTemperature : '+temp.toFixed(2)+' °K'+'\nPressure : '+weatherobj.main.pressure+' hPa'+'\nHumidity : '+weatherobj.main.humidity+' %'+'\nWind Speed : '+weatherobj.wind.speed+' m/s';

        alert(weatherstr);
    })
   .catch((err)=>{
       alert('Error : '+JSON.stringify(err));
   })
}


document.body.style.backgroundColor='#433d3c';
let container=document.createElement('div');
container.className='container';
document.body.append(container);

let rowdiv=document.createElement('div');
rowdiv.className='row';

let column=document.createElement('div');
column.className='rowDiv';

let carddiv=document.createElement('div');
carddiv.className='innerDiv';

let cardhdr=document.createElement('h1');

let cardimg=document.createElement('img');
cardimg.className='img';

let cardbody=document.createElement('div');
cardbody.className='card-body';

let p=document.createElement('h3');

let btn=document.createElement('button');
btn.className='btn';
btn.type='button';
btn.textContent=`Click for weather`;
btn.setAttribute('onclick', 'checkweather(this)');

let br=document.createElement('br');


//getting all countries from restcountries api
fetch('https://restcountries.com/v3.1/all')
.then((resp)=>{
    return resp.json();
})
.then((countries)=>{
    let rowdiv1=rowdiv.cloneNode(false);      
    container.append(rowdiv1);  
    countries.forEach((country)=>
    {
        console.log(country)
        let column1=column.cloneNode(false);

        let carddiv1=carddiv.cloneNode(false);        
        let cardhdr1=cardhdr.cloneNode(false);
        cardhdr1.innerText=country.name.common;
        let cardimg1=cardimg.cloneNode(false);
        cardimg1.src=country.flags.png;
        let p1=p.cloneNode(false);
        p1.innerText='Capital : '+country.capital;
        let p2=p.cloneNode(false);
        p2.innerText='Region : '+country.region;
        let p3=p.cloneNode(false);
        p3.innerText='Country Code : '+country.alpha3Code;
        p4=p.cloneNode(false);
        p4.innerText='Latlng : ( '+country.latlng[0]+' , '+country.latlng[1]+' )';
        let btn1=btn.cloneNode(true);
        btn1.value=country.latlng[0]+','+country.latlng[1]+','+country.name.common;
        

        carddiv1.append(cardhdr1,br.cloneNode(false),cardimg1,br.cloneNode(false),p1,p2,p3,p4,btn1);
        column1.append(carddiv1);
        rowdiv1.append(column1);
    });    
})