import { StyleSheet, Pressable, Dimensions, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useState, useContext} from 'react';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';

export default function StrengthTimer({exercise}){

    console.log('exercise: ' + exercise);

    const weight = exercise.weight;
    const reps = exercise.reps;
    const [set, setSet] = useState(exercise.sets);
    const [rest, setRest] = useState(false);

    const {theme, setTheme} = useContext(ThemeContext);
    const themed = Theme(theme);

    const endRest = () => {
        setRest(false);
    }

    const beginRest = () => {
        if(set > 0){setSet(set-1);setRest(true);}
    }

    return(
        <View style={styles.card}>
            <Text style={[themed.text]}>Weight: {weight} Lbs</Text>
            <Text style={[themed.text]}>Sets Left: {set}</Text>
            <Text style={[themed.text]}>Reps: {reps}</Text>
            <View style={{paddingTop:15}}>
            {rest ? <CountdownCircleTimer
                        isPlaying
                        duration={exercise.rest}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => endRest()}
                    >
                        {({ remainingTime }) => <View style={{alignItems:'center'}}>
                                                <Text style={[styles.text, themed.text]}>Rest</Text>
                                                <Text style={[styles.text, themed.text]}>{remainingTime}</Text>
                                                </View>}
                    </CountdownCircleTimer>:
                    <Pressable style={[styles.button, themed.button]} onPressIn={() => beginRest()}>
                    <Text style={[themed.text, styles.text]}>Complete Set</Text>
                    </Pressable>}
            </View>
        </View>
    )

}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        paddingBottom: 10,
        paddingTop: 30,
        paddingHorizontal: 32,
        width:screenWidth*.95,
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
      text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25
      }
  });