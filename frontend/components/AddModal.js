import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, Pressable, Dimensions, View, ScrollView} from 'react-native';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';
import UserContext from '../contexts/userContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router } from 'expo-router';

export default function AddModal(){

  

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);

  const initialState = {}
  const [exercise, setExercise] = useState(initialState);

  const {user, setUser} = useContext(UserContext);
  axios.defaults.headers.post['Authorization'] = `Bearer ${user}`;

  const add = () => {
    axios.post('http://localhost:8080/exercises', exercise);
    setTimeout(() => router.replace('/editplan'), 1000);
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
        <ScrollView style={styles.centeredView} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, themed.text, {color:'black'}]}>Add New Exercise</Text>
            <TextInput
              style={styles.input}
              onChangeText={currentName => setExercise({...exercise, name:currentName })}
              value={exercise.name}
              placeholder="Exercise Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={currentDesc => setExercise({...exercise, description:currentDesc })}
              value={exercise.description}
              placeholder="Description of Exercise"
            />
            <Picker
            style={styles.picker}
            selectedValue={exercise.type}
            onValueChange={currentType => setExercise({...exercise, type:currentType })}>
            <Picker.Item label="..." value={null} />
            <Picker.Item label="Strength" value="Strength" />
            <Picker.Item label="Yoga or Stretch" value="Flexibility" />
            <Picker.Item label="Cardio" value="Cardio" />
            </Picker>
            {exercise.type === 'Strength' ? (<View>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Push" value="Push" />
                                              <Picker.Item label="Pull" value="Pull" />
                                              <Picker.Item label="Legs" value="Legs" />
                                              </Picker>
                                              {exercise.secondaryType === 'Push' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Chest" value="Chest" />
                                              <Picker.Item label="Shoulders" value="Shoulders" />
                                              <Picker.Item label="Triceps" value="Triceps" />
                                              </Picker>:null}
                                              {exercise.secondaryType === 'Pull' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Back" value="Back" />
                                              <Picker.Item label="Biceps" value="Biceps" />
                                              <Picker.Item label="Deltoids" value="Deltoids" />
                                              </Picker>:null}
                                              {exercise.secondaryType === 'Legs' ? <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.muscleGroup}
                                              onValueChange={currentMG => setExercise({...exercise, muscleGroup:currentMG })}>
                                              <Picker.Item label="Select Muscle Group" value={null} />
                                              <Picker.Item label="Calves" value="Calves" />
                                              <Picker.Item label="Glutes" value="Glutes" />
                                              <Picker.Item label="Hamstrings" value="Hamstrings" />
                                              <Picker.Item label="Quads" value="Quads" />
                                              </Picker>:null}
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentEquip => setExercise({...exercise, equipment:currentEquip })}
                                                value={exercise.equipment}
                                                placeholder="Equipment"
                                              />
                                              <View style={{alignItems:'center'}}>
                                              <Text>Reps:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentReps => setExercise({...exercise, reps:Number(currentReps) })}
                                                value={exercise.reps}
                                                placeholder="Number of Reps"
                                              />
                                              </View>
                                              <View style={{alignItems:'center'}}>
                                              <Text>Sets:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentSets => setExercise({...exercise, sets:Number(currentSets) })}
                                                value={exercise.sets}
                                                placeholder="Number of Sets"
                                              />
                                              </View>
                                              <View style={{alignItems:'center'}}>
                                              <Text>Weight:</Text>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentWeight => setExercise({...exercise, weight:Number(currentWeight)})}
                                                value={exercise.weight}
                                                placeholder="Weight(lbs)"
                                              />
                                              </View>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.weightClass}
                                              onValueChange={currentWC => setExercise({...exercise, weightClass:Number(currentWC)})}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Bodyweight" value='1' />
                                              <Picker.Item label="Dumbbell" value="2" />
                                              <Picker.Item label="Barbell" value="3" />
                                              </Picker>
                                              <TextInput
                                                style={styles.input}
                                                onChangeText={currentRest => setExercise({...exercise, rest:Number(currentRest) })}
                                                value={exercise.rest}
                                                placeholder="Rest Time(Seconds)"
                                              />
                                              </View>):null}
            {exercise.type === 'Cardio' ? (<View>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Running" value="Running" />
                                              <Picker.Item label="Cycling" value="Cycling" />
                                              </Picker>
                                              <View>
                                              <Text>Duration(minutes):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDuration => setExercise({...exercise, duration:Number(currentDuration) })}
                                              value={exercise.duration}
                                              placeholder="Duration(minutes)"
                                              />
                                              </View>
                                              <View>
                                              <Text>Distance(miles):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDistance => setExercise({...exercise, distance:Number(currentDistance) })}
                                              value={exercise.distance}
                                              placeholder="Distance(miles)"
                                              />
                                              </View>
                                            </View>):null}
            {exercise.type === 'Flexibility' ? (<View>
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.secondaryType}
                                              onValueChange={currentSType => setExercise({...exercise, secondaryType:currentSType })}>
                                              <Picker.Item label="..." value={null} />
                                              <Picker.Item label="Yoga" value="Yoga" />
                                              <Picker.Item label="Stretching" value="Stretching" />
                                              </Picker>
                                              <Text>Duration(seconds):</Text>
                                              <TextInput
                                              style={styles.input}
                                              onChangeText={currentDuration => setExercise({...exercise, duration:Number(currentDuration) })}
                                              value={exercise.duration}
                                              placeholder="Duration(seconds)"
                                              />
                                              <Picker
                                              style={styles.picker}
                                              selectedValue={exercise.difficulty}
                                              onValueChange={currentDiff => setExercise({...exercise, difficulty:Number(currentDiff) })}>
                                              <Picker.Item label="Select Difficulty" value={null} />
                                              <Picker.Item label="Beginner" value="1" />
                                              <Picker.Item label="Intermediate" value="2" />
                                              <Picker.Item label="Advanced" value="3" />
                                              </Picker>
                                              </View>):null}                                              
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose, themed.button]}
              onPress={() => {setModalVisible(!modalVisible); add()}}>
              <Text style={[styles.textStyle, themed.text]}>Add</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose, themed.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, themed.text]}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Pressable
        accessibilityRole="button"
        style={[styles.button, styles.buttonOpen, themed.button]}
        onPress={() => {setModalVisible(true); setExercise(initialState)}}>
        <Text style={styles.textStyle}>+Add New Exercise</Text>
      </Pressable>
    </View>
  );
};

const screenWidth = (Dimensions.get('window').width) * .75

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: screenWidth,
    height:'auto',
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
    margin:3
  },
  buttonOpen: {
    backgroundColor: 'black',
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
  picker: {
    width: 150,
    margin: 2
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 35,
    width: 175,
    margin: 5,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  rowContainer: {
    flexDirection:'row'
  }
});