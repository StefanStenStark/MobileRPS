import {Pressable, StyleSheet, Text} from "react-native";

function ButtonComp({onPress,color,style,title}) {
    return <Pressable
        onPress={onPress}
        style={({pressed}) => [
            {backgroundColor: pressed ? "#831477" : color},
            styles.button,
            {...style}
        ]}
    >
        <Text style={styles.buttonText}>
            {title}
        </Text>
    </Pressable>;
}
ButtonComp.defaultProps = {
    color: "#d0bacd"
}

const styles = StyleSheet.create({
    buttonText: {
        color: "white",
        fontSize: 20
    },
    button: {
        flexDirection: "row",
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
});

export default ButtonComp

