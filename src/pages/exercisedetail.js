import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {exerciseOption,fetchData, youtubeOptions} from "../utils/fetchdata";
import Detail from "../components/detail";
import ExerciseVideo from "../components/exerciseVideo";
import SimilarExercises from "../components/similarExercise";
const ExerciseDetail = () => {
  const [exerciseDetail,setExerciseDetail] = useState ({});
  const [exerciseVideos,setExerciseVideo] = useState([]);
  const [targetMuscleExercises,setTargetMuscleExercises] = useState([]);
  const [equipmentExercises,setEquipmentExercises] = useState([]);
  const {id} = useParams();
  useEffect(()=>{
     const fetchExercisesData = async () =>{
        const exerciseDbUrl="https://exercisedb.p.rapidapi.com";
        const youtubeSearchUrl="https://youtube-search-and-download.p.rapidapi.com";
        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOption);
      
        setExerciseDetail(exerciseDetailData);

        const exerciseVideosData = await fetchData (`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,youtubeOptions);
        setExerciseVideo(exerciseVideosData.contents)  

        const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOption)
        setTargetMuscleExercises(targetMuscleExerciseData);
        const equipmentExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOption)
        setEquipmentExercises(equipmentExerciseData);
     }
     fetchExercisesData();
  },[id]);
  return (
  <Box> 
    <Detail exerciseDetail={exerciseDetail}/>
    <ExerciseVideo exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
    <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
  </Box>
  )
}

export default ExerciseDetail;