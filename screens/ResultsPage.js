import {StyleSheet, Text, View} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {gameInfoUpdate} from "../Fetches";


function ResultsPage({navigation}) {

    const [winOrLose, setWinOrLose] = useState(false)
    const [playerId, setPlayerId] = useState("")
    const [playerGameId, setPlayerGameId] = useState("")

    useEffect(() => {
        try {
            AsyncStorage.getItem("TheKey")
                .then(value => {
                    setPlayerId(value);
                    console.log(playerId)
                })
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        try {
            AsyncStorage.getItem("TheKey")
                .then(value => {
                    setPlayerGameId(value);
                    console.log(playerGameId)
                })
        } catch (error) {
            console.log(error)
        }
    }, []);


    const goToWelcomePage = () => {
        navigation.navigate("WelcomeRPS")
    }

    function updateGameStatus(){
        if(winOrLose){
            console.log(winOrLose)
            gameInfoUpdate(playerId, playerGameId)
                .then(response => response.json())
                .then(game => {

                    if (game.move !== null){
                        if (game.opponentMove !== null){
                            if (game.move === game.opponentMove) {
                                console.log("Draw")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowDraw(true)
                                clearInterval(interval)

                            }
                            else if ((game.move === "ROCK" && game.opponentMove === "PAPER") || (game.move === "PAPER" && game.opponentMove === "SCISSORS") || (game.move === "SCISSORS" && game.opponentMove === "ROCK")) {
                                console.log("Lose!!")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowLose(true)
                                clearInterval(interval)

                            }
                            else {
                                console.log("Win!!")
                                setWinOrLose(false)
                                setShowWaitingForMove(false)
                                setShowWin(true)
                                clearInterval(interval)

                            }
                        }
                    }else if (game.opponentName !== null) {
                        console.log("No name of oponent.. still ok right!?! ")
                    }
                })
        }

    }


    return(

                <View style={styles.body}>

                    <Text style={styles.text}>ResultsPage</Text>

                    <ButtonComp
                        onPress={goToWelcomePage}
                        title={"ok"}
                        style={styles.button}
                    />
                </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgba(61,13,84,0.87)',
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
    cancelButton: {
        borderWidth: 1,
        borderColor: "#3f0528",
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
});

export default ResultsPage
