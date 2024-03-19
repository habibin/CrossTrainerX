import { StyleSheet, Pressable, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { useContext } from 'react';
import Theme from '../../components/Themes';
import ThemeContext from '../../contexts/ThemeContext';
import ExerciseContext from '../../contexts/ExerciseContext';
import UserContext from '../../contexts/userContext';


export default function DashboardScreen() {
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);
  const {user, setUser} = useContext(UserContext);
  return (
  <ImageBackground source={require('../../assets/images/dashboard.png')} resizeMode="cover" style={{ width: '100%', height: '100%'}}>
  <View style={[styles.container]}>
    <Text style={[styles.title]}>Dashboard</Text>

    {workout.workoutComplete ? <View style={[styles.button, themed.button]}><Text style={[styles.text, themed.text]}>Workout Complete</Text></View>:
                              <Link href='/workout' asChild style={[styles.button, themed.button]}><Pressable><Text style={themed.text}>Start Workout</Text></Pressable></Link>}

    <View style={styles.rowContainer}>
      <View style={[styles.card_template, themed.card]}>
        <Text style={[styles.text, themed.text]}>Today's Workout:</Text>
        <Text style={{fontSize:80}}>🏋🏽‍♂️</Text>
        <Text style={[styles.text, themed.text]}>{'\n'}Chest</Text>
      </View>
      <View style={[styles.card_template, themed.card]}>
        <Text style={[styles.text, themed.text]}>Calories Burned:</Text>
        <Text style={{fontSize:80}}>🔥</Text>
        <Text style={[styles.text, themed.text]}>{'\n'}953</Text>
            
      </View>
    </View>

    <View style={styles.rowContainer}>
    <View style={[styles.card_template, themed.card]}>
      <Text style={[styles.text, themed.text]}>Your Stats</Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color:'limegreen'}]}>Avg Workout Time:</Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color:'limegreen'}]}>54 min </Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color:'skyblue'}]}>Longest Workout:</Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color:'skyblue'}]}>93 min</Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color: 'darksalmon'}]}>Grip Strength:</Text>
      <Text style={[styles.text, themed.text,{fontSize:14, color: 'darksalmon'}]}>64 psi</Text>
    </View>
    <View style={[styles.card_template, themed.card]}>
    <Text style={[styles.text, themed.text]}>Workouts Completed:</Text>
    <Text style={[styles.text, themed.text,{fontSize:80}]}>10</Text>
        
    </View>
    </View>
    <View style={[styles.rowContainer,{margin:20}]}>
    <Link style={styles.button} href="/editplan" asChild>
      <Pressable style={themed.button}>
        <Text style={[themed.text,styles.text]}>Fitness Plan</Text>
      </Pressable>
    </Link>
    <Link style={styles.button} href="/profile" asChild>
      <Pressable style={themed.button}>
        <Text style={[themed.text,styles.text]}>Profile</Text>
      </Pressable>
    </Link>
    </View>
                            
  </View>
  </ImageBackground>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: screenWidth,
    paddingTop: 50
    
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    color: 'white',
    letterSpacing: 0.25,
    fontFamily:'Poppins',
  },
  text: {
    fontSize: 16,
    flexWrap:'wrap'
    
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal:3
  },
  card_template:{
    width: screenWidth * .45,
    height:screenHeight * .3,
    margin: 3,
    elevation: 3,
    borderRadius: 15,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    flexDirection:'column',
    paddingVertical: 15,
    paddingHorizontal:5,
    alignItems:'center',
    opacity:.90,
    borderWidth:1
  },
});