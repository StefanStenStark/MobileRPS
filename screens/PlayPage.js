import {Image, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";

function PlayPage({navigation, route}) {

    const {playerGameIdSend, playerIdSend} = route.params;

    const [playerId, setPlayerId] = useState("")
    const [playerGameId, setPlayerGameId] = useState("")

    useEffect(() => {
                setPlayerId(playerIdSend);
                setPlayerGameId(playerGameIdSend);
    }, []);

    const Stone = () => {
        fetch("http://192.168.1.142:8080/rock-paper-scissors/games/move/" + "ROCK", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage", {sendGameIdToResult: playerGameId, sendPlayerIdToResult: playerId})
    }
    const Scissor = () => {
        fetch("http://192.168.1.142:8080/rock-paper-scissors/games/move/" + "SCISSORS", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage", {sendGameIdToResult: playerGameId, sendPlayerIdToResult: playerId})
    }
    const Paper = () => {
        fetch("http://192.168.1.142:8080/rock-paper-scissors/games/move/" + "PAPER", {
            method: "POST",
            headers: {
                token: playerId,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        })
        navigation.navigate("ResultsPage", {sendGameIdToResult: playerGameId, sendPlayerIdToResult: playerId})
    }
    return(
            <View style={styles.body}>

                <View style={styles.bodyTop}>
                <Image
                    style={styles.stretch}
                    source={require('../assets/Rock.png')}
                />
                <ButtonComp
                    onPress={Stone}
                    title={"Rock"}
                    style={styles.button}
                />
                </View>
                <View style={styles.bodyMid}>
                    <Image
                        style={styles.stretch}
                        source={require('../assets/Paper.png')}
                    />
                    <ButtonComp
                        onPress={Paper}
                        title={"Paper"}
                        style={styles.button}
                    />
                </View>
                <View style={styles.bodyBot}>
                    <Image
                        style={styles.stretch}
                        source={require('../assets/Scissor.png')}
                    />
                    <ButtonComp
                        onPress={Scissor}
                        title={"Scissor"}
                        style={styles.button}
                    />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        borderWidth: 2,
        borderColor: "#e8c967"
    },
    bodyMid: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        borderWidth: 10,
        borderColor: "#e8c967"
    },
    bodyTop: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        borderTopWidth: 10,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: "#e8c967"
    },
    bodyBot: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: "#e8c967"

    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    button: {
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    stretch: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        borderRadius: 35
    }

});

export default PlayPage