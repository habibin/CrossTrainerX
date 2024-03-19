import { StyleSheet, Pressable, TextInput, Text, View} from 'react-native';
import React, {useContext} from 'react';
import UserContext from '../contexts/userContext';
import { router } from 'expo-router';
import ThemeContext from '../contexts/ThemeContext';
import Theme from '../components/Themes';


export default function LoginScreen() {

  const {user, setUser} = useContext(UserContext);
  const {theme, setTheme} = useContext(ThemeContext);
  const themed = Theme(theme);


  const setToken = () => {
    console.log(text);
      setUser(text);
      console.log("token set: " + user);
      setTimeout(() => router.replace('/dashboard'), 1000);
  }
  
  const [text, onChangeText] = React.useState('');

  return (
    <View style={[styles.container, themed.container]}>
      <Text style={[styles.title, themed.text]}>Please Enter Your Auth Token:{'\n'}</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
        <Pressable style={[styles.button, themed.button]} onPress={() => setToken()}>
          <Text style={[styles.text, themed.text]}>Login</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
