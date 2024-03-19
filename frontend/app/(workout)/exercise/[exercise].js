import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Dimensions, Text, View, Pressable, ImageBackground } from 'react-native';
import {useState, useContext, useEffect} from 'react';
import { Link } from 'expo-router';
import Theme from '../../../components/Themes';
import ThemeContext from '../../../contexts/ThemeContext';
import ExerciseContext from '../../../contexts/ExerciseContext';
import UserContext from '../../../contexts/userContext';
import StrengthTimer from '../../../components/StrengthTimer';
import FlexTimer from '../../../components/FlexTimer';
import PostExerciseModal from '../../../components/PostExerciseModal';
import axios from 'axios';



export default function Page() {
  const exerciseId = useLocalSearchParams();
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const [Exercise, setExercise] = useState(null);
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    axios.get(`http://localhost:8080/exercises/${exerciseId.exercise}`, {
      headers: {
          'authorization': `Bearer ${user}`
      }
      })
      .then(response => response.data)
      .then((data) => {
        console.log(data);
        setExercise(data);
      });
    },[])

  console.log(exerciseId);

  if(!Exercise){
    return null;
  }


  if(Exercise){ 
    console.log(Exercise)   
  return (
    <ImageBackground source={Exercise.type==='Strength' ? require('../../../assets/images/Barbell.png'):require('../../../assets/images/zen.png')} resizeMode="cover">
    <View style={styles.container}>
        <Text style={[styles.title, themed.text]}>{Exercise.name}</Text>
        <View style={[styles.card, themed.card]}>
        <Text style={[styles.text, themed.text]}>{'\n'}How To:</Text>
        <Text style={[styles.text, themed.text]}>{Exercise.description}</Text>
        {Exercise.type == 'Strength' ?
          <StrengthTimer exercise={Exercise}/>:
          <FlexTimer exercise={Exercise} />}
      </View>
      <View>
      <PostExerciseModal exercise={Exercise}/>
      </View>
    </View>
    </ImageBackground>
  );}
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent:'center',
      paddingTop:60,
      width:screenWidth,
      height:screenHeight,
      backgroundColor:'#000000a0'
      },
  
    title: {
      fontSize: 30,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
    },
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      elevation: 3,
      margin: 12,
      borderWidth: 0,
      paddingVertical: 20,
      paddingHorizontal: 20,
      width: screenWidth*.95,
      opacity:.90
    },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 32
  },
});