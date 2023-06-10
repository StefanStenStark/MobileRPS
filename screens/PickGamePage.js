import {Pressable, Text, View} from "react-native";
import {StyleSheet, ScrollView} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {useEffect, useState} from "react";

function PickGamePage({navigation, route}) {

    const {id} = route.params;
    const [playerId, setPlayerId] = useState("")
    const [players, setPlayers] = useState([])


    useEffect (() => {
        setPlayerId(id)
        showGames();
    }, []);



    const saveGameId = async (gameId) => {
            navigation.navigate("PLayPage", {playerGameIdSend: gameId, playerIdSend: playerId })
    }

    const showGames = () => {
        fetch("http://192.168.1.142:8080/rock-paper-scissors/games", {
            method: "GET"
        })
            .then(response => response.json()).then((allPlayers) => {
            setPlayers(allPlayers)

        })
    }

    const joinGame =  async (theGameId) => {
            const res = await fetch("http://192.168.1.142:8080/rock-paper-scissors/games/join/" + theGameId, {
                method: "GET",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            })
        const data = await res.json();
        await saveGameId(data.id)
    }

    const createGame  = async () => {
            const res = await fetch("http://192.168.1.142:8080/rock-paper-scissors/games/start", {
                method: "POST",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            })
        const data = await res.json();
        await saveGameId(data.id)
    };


    return (
        <View style={styles.body}>
            <ButtonComp
                onPress={createGame}
                title="CreateGame"
                style={styles.button}
            />

            <ButtonComp
                onPress={showGames}
                title="Update game list"
                style={styles.button}
            />
            <View style={styles.gameListBody}>
            <ScrollView>
                {players.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => joinGame(item.id)}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#8e8f64' : '#bdcb24' },
                            styles.listButton
                        ]}
                    >
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    gameListBody: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: "#e8c967"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    listButton: {
        width: 150,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }

});

export default PickGamePage