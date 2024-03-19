import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import {Picker} from '@react-native-picker/picker';
import UserContext from '../contexts/userContext';
import ExerciseContext from '../contexts/ExerciseContext';
import axios from 'axios';
import { Link, router } from 'expo-router';

export default function PostExerciseModal({exercise}){

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {workout, setWorkout} = useContext(ExerciseContext);

  const [selectedDifficulty, setSelectedDifficulty] = useState("2");

  const {user, setUser} = useContext(UserContext);
  axios.defaults.headers.post['Authorization'] = `Bearer ${user}`;

  const submitSurvey = () => {
    var surveyData = null;
    
    if(exercise.type === 'Strength'){
    surveyData = {'exerciseId': exercise.id, 'sets': Number(selectedDifficulty), 'reps':Number(selectedDifficulty), 'weight':Number(selectedDifficulty), 'rest':Number(selectedDifficulty)};
    console.log('surveyData: ' + JSON.stringify(surveyData));
    axios.post('http://localhost:8080/surveys', surveyData);
  }
    else if(exercise.type === 'Flexibility'){
      surveyData = {'exerciseId': exercise.id, 'time': Number(selectedDifficulty), 'difficuly': Number(selectedDifficulty)};
      axios.post('http://localhost:8080/surveys', surveyData);
    }
    else{
      surveyData = {'exerciseId': exercise.id, 'time': Number(selectedDifficulty), 'distance': Number(selectedDifficulty)};
      axios.post('http://localhost:8080/surveys', surveyData);
    }

    setTimeout(() => router.replace('/workout'), 1000);
  }


  return (
    
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={[styles.title, themed.text,{color:'black'}]}>How was the exercise?{'\n'}</Text>

            <View style={styles.surveyBox}>
            <Text style={[themed.text,{color:'black'}]}>Please select difficulty</Text>
            <Picker style={styles.input}
            selectedValue={selectedDifficulty}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedDifficulty(itemValue)
            }>
            <Picker.Item label="Too easy" value="1" />
            <Picker.Item label="Just right" value="2" />
            <Picker.Item label="Too difficult" value="3" />
            </Picker>
            </View>
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable style={[styles.button, themed.button]} onPress={() => {setModalVisible(!modalVisible);submitSurvey()}}>
            <Text style={{color:'white'}}>Submit</Text>
            </Pressable>
            <Link href="/workout" asChild style={[styles.button, themed.button]}>
              <Pressable onPress={() => {setModalVisible(!modalVisible)}}>
              <Text style={{color:'white'}}>Skip</Text>
              </Pressable>
            </Link> 
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        accessibilityRole="button"
        style={[styles.button, themed.button]}
        onPress={() => {setModalVisible(true);setWorkout({...workout, [exercise.id] :true});}}>
        <Text style={[themed.text]}>Complete Exercise</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  }
});
