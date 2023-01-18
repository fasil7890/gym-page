export const exerciseOption =  {
    method: 'GET',
   
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': 'b515290915msh92b6ce43f2e62a3p1dc798jsn6a1f6c6ba028',
    }
  };


  export const youtubeOptions = {
    method: 'GET',
    
   
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': 'b515290915msh92b6ce43f2e62a3p1dc798jsn6a1f6c6ba028',
    }
  };



export const fetchData = async (url,options)=>{
const response = await fetch(url,options);
const data = await response.json();
return data;
}