export default function Theme(theme){
    if(theme == 'default'){
        return ({
            container:{
                backgroundColor:'black'
            },
            text:{
                fontFamily:'Poppins',
                color:'white'
                },
            button:{
                backgroundColor:'mediumblue'
            },
            card:{
                backgroundColor:'dimgray'
            }
        })
    }
    else if(theme == 'pink'){
        return({
            container:{
                backgroundColor: 'mistyrose'
            },
            text:{
            fontFamily:'Poppins',
            color:'indianred'
            },
            button:{
                backgroundColor:'linen'
            },
            card:{
                backgroundColor:'pink'
            }
        })
    }
    else if(theme == 'blue'){
        return({
            container:{
                backgroundColor: 'royalblue'
            },
            text:{
            fontFamily:'Poppins',
            color:'white'
            },
            button:{
                backgroundColor:'mediumblue'
            },
            card:{
                backgroundColor:'cornflowerblue'
            }
        })
    }
    else if(theme == 'light'){
        return({
            container:{
                backgroundColor: 'white'
            },
            text:{
            fontFamily:'Poppins',
            color:'black'
            },
            button:{
                backgroundColor:'lightblue'
            },
            card:{
                backgroundColor:'lightslategray'
            }
        })
    }
}