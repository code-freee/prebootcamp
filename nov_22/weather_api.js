var request1=new XMLHttpRequest();
var request2=new XMLHttpRequest();

request1.open('GET','https://restcountries.eu/rest/v2/all',true);


request1.send();


let data1;
//let data2=[];

request1.onload=function()
{
    data1=JSON.parse(this.response);
    console.log(data1[2]['latlng'][0],data1[2]['latlng'][1]);
    for(i in data1)
    {
        //By City Name
        //request2.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+data1[i].name+'&appid=caab7bb0c218a616d23a3e65483601f0',false);
        
        //By City ID
        //request2.open('GET','https://api.openweathermap.org/data/2.5/weather?id='+data1[i].alpha2Code+'&appid=caab7bb0c218a616d23a3e65483601f0',false);
        
        //By Latitudes longitudes
        request2.open('GET','https://api.openweathermap.org/data/2.5/weather?lat='+data1[i].latlng[0]+'&lon='+data1[i]['latlng'][1]+'&appid=caab7bb0c218a616d23a3e65483601f0',false);
        
        request2.send();
        request2.onerror=function()
        {
            console.log('error');
        }
        request2.onload=function()
        {
            
            let tempdata=JSON.parse(request2.response);
            //console.log(tempdata);
            if(tempdata.name!==undefined)
            {
                console.log(tempdata.name+" : "+tempdata.main.temp);
            }
            
        }
    }    
}