import React,{useEffect,useState} from 'react';
import {Box,Button,Stack,TextField,Typography} from "@mui/material";
import {exerciseOption,fetchData} from "../utils/fetchdata";
import HorizontalScrollBar from './horizontalComponent';

const SearchExercises = ({setExercises,bodyPart,setBodyPart}) => {
    const [search, setsearch] = useState("");
    
    const [bodyParts,setBodyParts]=useState([]);
    useEffect(() => {
      const fetchExercisesData = async () =>{
         const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOption);
         setBodyParts(['all',...bodyPartsData])
      }
      fetchExercisesData();
    }, [])
    
    const handleSearch=async()=>{
        if(search){
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOption);
            const searchedExercises = exercisesData.filter(
                (exercise)=>exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
            )
            setsearch("");
            setExercises(searchedExercises);
        }
    }
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
    <Typography fontWeight={700} sx={{fontSize:{lg:"44px",xs:"30px"}}} mb="50px" textAlign="center">
        Awesome Exercises You <br/>  Should Know
     </Typography>
     <Box position="rlative" mb="72px">
        <TextField 
        sx={{
            input:{
            fontWeight:"700",
            border:"none",
            borderRadius:"4px"
        },
        width:{lg:"800px",xs:"350px"},
        backgroundColor:"#fff",
        borderRadius:"40px"
        }}
        height="76px" 
        value={search} 
        onChange={(e)=>setsearch(e.target.value.toLowerCase())} 
        placeholder="search exercises" 
        type="text">
        </TextField>
        <Button onClick={handleSearch} className='search-btn'
        sx={{
            backgroundColor:"#FF2625",
            color:"#fff",
            textTransform:"none",
            width:{lg:"175px",xs:"80px"},
            fontSize:{lg:"20px",xs:"14px"},
            height:"56px",
            position:"absolute",
            
        }}>
            search
            </Button>
        
     </Box>
     <Box sx={{position:"relative",width:"100%",p:"20px" }}>
     <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts>


     </HorizontalScrollBar>
     </Box>
   </Stack>
)
}




export default SearchExercises