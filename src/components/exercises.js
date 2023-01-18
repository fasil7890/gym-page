import React,{useState,useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box,Stack,Typography} from "@mui/material";
import {exerciseOption,fetchData} from "../utils/fetchdata";
import ExerciseCard from './exerciseCard';

const Exercises = ({exercises,setExercises,bodyPart}) => {
  const [currentPage,setCurrentPage] = useState(1);
  const exercisePerPage = 9;
  const indexOfLastExercise = currentPage *exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercise = exercises.slice(indexOfFirstExercise,indexOfLastExercise); 
  const paginate = (e,value)=>  {
    setCurrentPage(value);
    window.scrollTo({top:1800,behaviour:"smooth"})
  }
  useEffect(()=>{
    const fetchExercisesData = async () =>{
      let exercisesData = [];
      if(bodyPart==="all"){
       exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOption);
      }else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exerciseOption);
      }
      setExercises(exercisesData);
    }
    fetchExercisesData();
  },[bodyPart])
  return (
    <Box id="exercises"
    sx={{mt : {lg:"110px"}}}
    mt="50px"
    p="20px">
      <Typography variant='h3' mb="46px">
        Showing Results
      </Typography>
      <Stack direction='row' sx={{gap:{lg:"110px",xs:"50px"}}} flexWrap="wrap" justifyContent="center">
      {exercises.map((exercise,index)=>(
       <ExerciseCard key={index} exercise={exercise}></ExerciseCard>
      ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
       {exercises.lenght>9 && (
        <Pagination 
        color="standard"
        shape="rounded"
        defaultPage={1}
        count={Math.ceil(exercises.lenght/exercisePerPage)}
        page={currentPage}
        onChange={paginate}
        size="large"
        ></Pagination>
       )}
      </Stack>

    </Box>
  )
}

export default Exercises