
export const gameInfoUpdate = (token, gameId) =>
    fetch("http://192.168.1.142:8080/rock-paper-scissors/games/" + gameId,
        {
            method: 'GET',
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
        })