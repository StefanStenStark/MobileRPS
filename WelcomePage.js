import React, {useState} from 'react';
import {ScrollView, TextInput, Text, View, StyleSheet, Pressable} from 'react-native';
import ButtonComp from "./components/ButtonComp";


function WelcomePage() {
    const [gameId, setGameId] = useState("No Game id atm")
    const [players, setPlayers] = useState([])
    const [data, setData] = useState([]);
    const [nameOfPlayer, setNameOfPlayer] = useState("Stefkalo")

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
    };

    const createGame = async () => {
        try {
            await fetch("http://localhost:8080/rock-paper-scissors/games/start", {
                method: "POST",
                headers: {
                    token: data,
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    const getAllGames = async () =>
        fetch("http://localhost:8080/rock-paper-scissors/games", {
            method: "GET"
        })
            .then(response => response.json()).then((allPlayers) => {
            setPlayers(allPlayers)

        })

    const joinGame = async (gameId) =>
        fetch("http://localhost:8080/rock-paper-scissors/games/join/" + gameId, {
            method: "GET",
            headers: {
                token: data,
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(player => {
                console.log(player.id)
                setGameId(player.id)
            })

    return (
        <View style={{flex: 1, padding: 24}}>

            <ButtonComp
                onPress={getId}
                title={"Skapa Id snälla"}
                style={styles.cancelButton}
            />
            <Text>
                {data}
            </Text>

            <TextInput
                placeholder={""}
                style={styles.input}
                onChangeText={(value) => setNameOfPlayer(value)}/>

            <ButtonComp
                onPress={createPlayer}
                title={"Skapa spelare"}
                style={styles.cancelButton}
            />

            <ButtonComp
                onPress={createGame}
                title={"skapa spel"}
                style={styles.cancelButton}
            />

            <ButtonComp
                onPress={getAllGames}
                title={"Visa lista på spel"}
                style={styles.cancelButton}
            />

            <ScrollView>
                {players.map((item) => {
                    return (
                        <View key={item.id}>
                            <Pressable
                                onPress={() => joinGame(item.id)}
                                style={({pressed}) => [
                                    {backgroundColor: pressed ? "#8e8f64" : "#bdcb24"},
                                    styles.button
                                ]}
                            >
                                <Text style={styles.buttonText}>{item.name}</Text>
                            </Pressable>

                        </View>
                    )
                })}
            </ScrollView>


        </View>


    );

};

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
    button: {
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 20
    },
});

