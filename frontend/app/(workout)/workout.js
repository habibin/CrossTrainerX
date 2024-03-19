import { StyleSheet, Dimensions, Text, View, Pressable} from 'react-native';
import Animated, { FadeIn } from    'react-native-reanimated';
import Exercises from '../../components/Exercise';
import {useContext, useState, useEffect} from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import ExerciseContext from '../../contexts/ExerciseContext';
import UserContext from '../../contexts/userContext';
import axios from 'axios';
import { Link } from 'expo-router';


export default function WorkoutScreen() {
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);
  const {user, setUser} = useContext(UserContext);
  const [exerciseList, setExercises] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/current_workout', {
      headers: {
          'authorization': `Bearer ${user}`
      }
      })
      .then(response => response.data)
      .then((data) => {
        console.log(data);
        setExercises(data);
      });
    },[])

    if(workout.intro){
      var newWorkout = workout;
      if(exerciseList){
        for(const exercise in exerciseList.exercises){
              newWorkout[exercise] = false;
            }
            newWorkout["intro"] = false;
            newWorkout["workoutId"] = exerciseList.id;
            newWorkout["workoutComplete"] = false;
            newWorkout["exercises"] = exerciseList.exercises;
            setWorkout(newWorkout);    
      }
    }

  return (
    <View style={styles.container}>
    {workout.intro ?  (<Animated.View style={[styles.container, themed.container]} entering={FadeIn.duration(1000)}>
                      <Text style={[styles.title, themed.text]}>Let's Workout {workout.intro}</Text>
                      </Animated.View>): <Exercises exercises={workout.exercises}/>}
    </View>
    
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  },
  title: {
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    margin: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32
  },
});