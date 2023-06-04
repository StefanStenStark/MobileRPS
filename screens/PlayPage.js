import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PlayPage({navigation}) {

    const [playerId, setPlayerId] = useState("")
    const [playerGameId, setPlayerGameId] = useState("")

    useEffect(() => {
        try {
            AsyncStorage.getItem("TheKey")
                .then(value => {
                    setPlayerId(value);
                })
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        try {
            AsyncStorage.getItem('GameId')
                .then(value => {
                    setPlayerGameId(value);
                })
        } catch (error) {
            console.log(error)
        }
    }, []);

    const IsIdWorking = () => {
        console.log("Player id: " + playerId)
        console.log("Player gameid: " + playerGameId)
    }

    const Stone = () => {
        fetch("http://localhost:8080/rock-paper-scissors/games/move/" + "ROCK", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage")
    }
    const Scissor = () => {
        fetch("http://localhost:8080/rock-paper-scissors/games/move/" + "SCISSORS", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage")
    }
    const Paper = () => {
        fetch("http://localhost:8080/rock-paper-scissors/games/move/" + "PAPER", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage")
    }
    return(

            <View style={styles.body}>

                <Text style={styles.text}>Sten Sax eller Påse?</Text>

                <ButtonComp
                    onPress={Stone}
                    title={"Stone"}
                    style={styles.button}
                />
                <ButtonComp
                    onPress={Scissor}
                    title={"Scissor"}
                    style={styles.button}
                />
                <ButtonComp
                    onPress={Paper}
                    title={"Paper"}
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

export default PlayPage