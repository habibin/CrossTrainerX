import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Theme from './Themes';
import UserContext from '../contexts/userContext';
import ThemeContext from '../contexts/ThemeContext';
import axios from 'axios';
import { router } from 'expo-router';

export default function DeleteModal({exercise}){

  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);
  const {user, setUser} = useContext(UserContext);
  axios.defaults.headers.delete['Authorization'] = `Bearer ${user}`;

  const deleteExercise = () => {
    console.log(exercise);
    axios.delete(`http://localhost:8080/exercises/${exercise.id}`);
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, themed.text, {color:'black'}]}>Delete {exercise.name} from Fitness Plan?</Text>
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose, themed.button]}
              onPress={() => {setModalVisible(!modalVisible);deleteExercise()}}>
              <Text style={[styles.textStyle, themed.text]}>Confirm</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={[styles.button, styles.buttonClose, themed.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, themed.text]}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        accessibilityRole="button"
        style={[styles.button, styles.buttonOpen, themed.button]}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.textStyle, themed.text]}>⌫ Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
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
});
