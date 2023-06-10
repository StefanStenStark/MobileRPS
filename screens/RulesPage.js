import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {gameInfoUpdate} from "../Fetches";

function RulesPage({navigation}) {

    const goToWelcomePage = () => {
        navigation.navigate("WelcomeRPS")
    }

    return(

            <View style={styles.body}>



                <Text style={styles.text}>
                    Despite its underlying complexity, the game’s rules are straightforward.
                </Text>
                <Text style={styles.text}>
                    Players deliver hand signals representing rock, paper, or scissors,
                    with the outcome determined by these three rules:
                </Text>
                <Text style={styles.text}>
                    Rock wins against scissors.
                </Text>
                <Text style={styles.text}>
                    Scissors win against paper.
                </Text>
                <Text style={styles.text}>

                    Paper wins against rock.
                </Text>

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
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    text: {
        color: "white",
        fontSize: 18,
        alignItems: "center"
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

export default RulesPage