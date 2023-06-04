import RulesPage from "./screens/RulesPage";
import LorePage from "./screens/LorePage";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import WelcomeRPS from "./screens/WelcomeRPS";
import NamePage from "./screens/NamePage";
import PickGamePage from "./screens/PickGamePage";
import PlayPage from "./screens/PlayPage";
import ResultsPage from "./screens/ResultsPage";

const Stack = createStackNavigator();

function StackNav() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"WelcomeRPS"}
                    component={WelcomeRPS}
                    options={{headerShown: false}}
                    initialParams={{ RemoveThisId: ""}}/>
                <Stack.Screen
                    name={"RulesPage"}
                    component={RulesPage}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name={"LorePage"}
                    component={LorePage}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name={"NamePage"}
                    component={NamePage}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name={"PickGamePage"}
                    component={PickGamePage}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name={"PLayPage"}
                    component={PlayPage}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name={"ResultsPage"}
                    component={ResultsPage}
                    options={{headerShown: false}}/>



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav