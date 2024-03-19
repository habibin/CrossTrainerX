import React, { useContext } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import ThemeContext from "../contexts/ThemeContext";

export default function ThemeSwitcher(){
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    
    <View style={[styles.container]}>
      
      <Pressable style={[styles.button,{backgroundColor:'black'}]} onPress={() => setTheme("default")} accessibilityRole="button">

      </Pressable>
      <Pressable style={[styles.button,{backgroundColor:'white'}]} onPress={() => setTheme("light")} accessibilityRole="button">

      </Pressable>
      <Pressable style={[styles.button,{backgroundColor:'royalblue'}]} onPress={() => setTheme("blue")} accessibilityRole="button">

      </Pressable>
      <Pressable style={[styles.button,{backgroundColor:'mistyrose'}]} onPress={() => setTheme("pink")} accessibilityRole="button">

      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        elevation: 3,
        backgroundColor: 'white',
        margin:5,
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 2,
        width:30,
        height:30
      }
})

