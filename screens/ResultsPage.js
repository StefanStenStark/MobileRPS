import {StyleSheet, Text, View} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";


function ResultsPage({navigation, route}) {

    const {sendGameIdToResult, sendPlayerIdToResult} = route.params;
    const [result, setResult] = useState("")
    const [waitingTime, setWaitingTime] = useState(1)
    const [resultForButton, setResultForButton] = useState("Waiting")
    const [playerId, setPlayerId] = useState("")
    const [playerGameId, setPlayerGameId] = useState("")
    const [haveAResult, setHaveAResult] = useState(false)
    const interval = setInterval(updateGameStatus, 500);
    useEffect(() => {
        setPlayerId(sendPlayerIdToResult);
        setPlayerGameId(sendGameIdToResult);
        setHaveAResult(true)
    }, []);
    const goToWelcomePage = () => {
        if (resultForButton === "Play again" || resultForButton === "Do not want to wait." ){
            navigation.navigate("PickGamePage", {id: playerId})
        }else{
            if (waitingTime === 1){
                setResultForButton("Still waiting..")
                setWaitingTime(waitingTime + 1)
            }
            else if (waitingTime === 2){
                setResultForButton("Waiting still.")
                setWaitingTime(waitingTime + 1)
            }
            if (waitingTime >= 3){
                setResultForButton("Do not want to wait.")
            }
        }
    }
    function updateGameStatus(){
        if(haveAResult){
            setResult("Waiting for opponent..")
                fetch("http://192.168.1.142:8080/rock-paper-scissors/games/" + playerGameId,
                    {
                        method: 'GET',
                        headers: {
                            token: playerId,
                            "Content-Type": "application/json"
                        },
                    })
                .then(response => response.json())
                .then(game => {
                    if (game.move !== null){
                        if (game.opponentMove !== null){
                            if (game.move === game.opponentMove) {
                                setResult("Draw")
                                clearInterval(interval)
                                setHaveAResult(false)
                            }
                            else if ((game.move === "ROCK" && game.opponentMove === "PAPER") || (game.move === "PAPER" && game.opponentMove === "SCISSORS") || (game.move === "SCISSORS" && game.opponentMove === "ROCK")) {
                                setResult("Lose")
                                clearInterval(interval)
                                setHaveAResult(false)
                            }
                            else {
                                setResult("Win")
                                clearInterval(interval)
                                setHaveAResult(false)
                            }
                        }
                    }else if (game.opponentName !== null) {
                        console.log("No name of oponent.. still ok right!?! ")
                    }
                })
        }
        if (result === "Win" ||result === "Lose" || result === "Draw" ){
            setResultForButton("Play again")
        }
    }
    return(
                <View style={styles.body}>
                    <Text style={styles.text}>{result}</Text>
                    <ButtonComp
                        onPress={goToWelcomePage}
                        title={resultForButton}
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
        color: "rgba(48,73,114,0.87)",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
});

export default ResultsPage
