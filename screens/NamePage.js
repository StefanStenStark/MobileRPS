import {Text, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


function NamePage({navigation}) {

    const [nameOfPlayer, setNameOfPlayer] = useState("Stefkalo")
    const [data, setData] = useState([]);


    const save = async () => {
        try {
            await AsyncStorage.setItem('TheKey',data.toString() )
            console.log("Itworkided")
            navigation.navigate("PickGamePage")
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        try {
            getId();
        } catch (error) {
            console.log(error)
        }
    }, []);

    const getId = async () => {
        try {
            const response = await fetch('http://localhost:8080/rock-paper-scissors/auth/token');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        }
    };

    const createPlayer = async () => {
        try {
            await fetch("http://localhost:8080/rock-paper-scissors/user/name", {
                method: "POST",
                headers: {
                    token: data,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: nameOfPlayer})
            })
        } catch (error) {
            console.error(error);
        }
        await save();
    };

    return(

            <View style={styles.body}>

                <Text style={styles.text}>Name page</Text>
                <Text style={styles.text}>{data}</Text>

                <TextInput
                    placeholder={""}
                    style={styles.input}
                    onChangeText={(value) => setNameOfPlayer(value)}/>

                <ButtonComp
                    onPress={createPlayer}
                    title={"create player"}
                    style={styles.button}
                />


            </View>




    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#3f0528",
        margin: 10,
        padding: 10,
    },
    button: {
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }

});

export default NamePage