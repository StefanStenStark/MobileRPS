import {Text, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";


function NamePage({navigation}) {

    const [nameOfPlayer, setNameOfPlayer] = useState("Stefkalo")
    const [playerId, setPlayerId] = useState("")
    useEffect (() => {
        getId();
    }, []);
    const getId = async () => {
        try {
            const response = await fetch('http://192.168.1.142:8080/rock-paper-scissors/auth/token');
            const json = await response.json();
            await setPlayerId(json);
        } catch (error) {
            console.error(error);
        }

    };
    const createPlayer = async () => {
        try {
            await fetch("http://192.168.1.142:8080/rock-paper-scissors/user/name", {
                method: "POST",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: nameOfPlayer})
            })
        } catch (error) {
            console.error(error);
        }
            navigation.navigate("PickGamePage", {id: playerId})
    };
    return(
            <View style={styles.body}>

                <Text style={styles.text}>Name please</Text>
                <TextInput
                    placeholder={""}
                    style={styles.input}
                    onChangeText={(value) => setNameOfPlayer(value)}/>

                <ButtonComp
                    onPress={createPlayer}
                    title={"Select name"}
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
        width: 200,
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