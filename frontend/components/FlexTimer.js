import { StyleSheet, Pressable, Dimensions, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useState, useContext} from 'react';
import Theme from './Themes';
import ThemeContext from '../contexts/ThemeContext';

export default function FlexTimer({exercise}){

    const [hold, setHold] = useState(false);

    const {theme, setTheme} = useContext(ThemeContext);
    const themed = Theme(theme);

    const endHold = () => {
        setHold(false);
    }

    const beginHold = () => {
        setHold(true)
    }

    return(
        <View>
            {hold ? <CountdownCircleTimer
                        isPlaying
                        duration={exercise.duration}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => endHold()}
                    >
                        {({ remainingTime }) => <View style={{alignItems:'center'}}>
                                                <Text style={[styles.text, themed.text]}>Hold</Text>
                                                <Text style={[styles.text, themed.text]}>{remainingTime}</Text>
                                                </View>}
                    </CountdownCircleTimer>:
                    <Pressable style={[styles.button, themed.button]} onPressIn={() => beginHold()}>
                    <Text style={[themed.text, styles.text]}>Begin</Text>
                    </Pressable>}
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
        backgroundColor: 'white',
        margin: 12,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 32
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25
      }
  });