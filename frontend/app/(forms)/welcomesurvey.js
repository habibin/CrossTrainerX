import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import { router } from 'expo-router';



export default function WelcomeSurvey() {

  const {user, setUser} = useContext(UserContext);
  const [userData, setUserData] = useState({})

  axios.defaults.headers.patch['Authorization'] = `Bearer ${user}`;

  const send = () => {
    console.log(userData);
    axios.patch('http://localhost:8080/exercises', userData);
    setTimeout(() => router.replace('/dashboard'), 1000);
  }


  return (
    <View style={[styles.container, {backgroundColor:'gray'}]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems:'center', paddingBottom:30}}>
      <Text style={styles.title}>Welcome Survey{'\n'}</Text>

      <View style={styles.surveyBox}>
      <Text>First Name</Text>
      <TextInput
      style={styles.input}
      placeholder='First Name'
      onChangeText={text => setUserData({...userData, firstname:text })}
      value={userData.firstName}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Last Name</Text>
      <TextInput
      style={styles.input}
      placeholder='Last Name'
      onChangeText={text => setUserData({...userData, lastname:text })}
      value={userData.lastName}
      />
      </View>
      
      <View style={styles.surveyBox}>
      <Text>Age</Text>
      <TextInput
      style={styles.input}
      placeholder='Age'
      onChangeText={text => setUserData({...userData, age:Number(text)})}
      value={userData.age}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Gender</Text>
      <TextInput
      style={styles.input}
      placeholder='Gender'
      onChangeText={text => setUserData({...userData, gender:text})}
      value={userData.gender}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Weight (lbs)</Text>
      <TextInput
      style={styles.input}
      placeholder='Weight'
      onChangeText={text => setUserData({...userData, weight:Number(text)})}
      value={userData.weight}
      />
      </View>

      <View style={styles.surveyBox}>
      <Text>Height (inches)</Text>
      <TextInput
      style={styles.input}
      placeholder='Height'
      onChangeText={text => setUserData({...userData, height:Number(text)})}
      value={userData.height}
      />
      </View>

      <View style={styles.surveyBox}>
        <Text>Select fitness track</Text>
      <Picker style={styles.input}
      selectedValue={userData.fitnessTrack}
      onValueChange={(fitnesstrack) => setUserData({...userData, fitnessTrack:fitnesstrack})
      }>
      <Picker.Item label="..." value={null} />
      <Picker.Item label="Strength" value="Strength" />
      <Picker.Item label="Cardio" value="Cardio" />
      <Picker.Item label="Flexibility" value="Flexibility" />
    </Picker>
      </View>

     {userData.fitnessTrack === 'Cardio' ? <View style={styles.surveyBox}>
        <Text>Select secondary fitness track</Text>
      <Picker style={styles.input}
      selectedValue={userData.secondaryTrack}
      onValueChange={(sfitnesstrack) => setUserData({...userData, secondaryTrack:sfitnesstrack})
      }>
      <Picker.Item label="..." value={null} />
      <Picker.Item label="Running" value="Running" />
      <Picker.Item label="Cycling" value="Cycling" />
    </Picker>
      </View>:null}

      {userData.fitnessTrack === 'Flexibility' ? <View style={styles.surveyBox}>
        <Text>Select secondary fitness track</Text>
      <Picker style={styles.input}
      selectedValue={userData.secondaryTrack}
      onValueChange={(sfitnesstrack) => setUserData({...userData, secondaryTrack:sfitnesstrack})
      }>
      <Picker.Item label="..." value={null} />
      <Picker.Item label="Yoga" value="Yoga" />
      <Picker.Item label="Stretching" value="Stretching" />
    </Picker>
      </View>:null}



      <View style={styles.surveyBox}>
      <Text>Difficulty</Text>
      <Picker style={styles.input}
      selectedValue={String(userData.experience)}
      onValueChange={(experience) => setUserData({...userData, experience:Number(experience)})
      }>
      <Picker.Item label="..." value={null} />
      <Picker.Item label="Beginner" value="1" />
      <Picker.Item label="Intermediate" value="2" />
      <Picker.Item label="Advanced" value="3" />
      </Picker>
      </View>

      <View>
      <Pressable
        accessibilityRole="button"
        style={[styles.button]}
        onPress={() => send()}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
        </View>
        </ScrollView>
    </View>
  )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 175,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  surveyBox: {
    marginBottom: 10,
    marginTop: 10,
  },
  scrollView: {
    marginHorizontal: 0,
    width: screenWidth,
  },
});