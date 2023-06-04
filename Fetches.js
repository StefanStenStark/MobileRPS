
export const gameInfoUpdate = (token, gameId) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/" + gameId,
        {
            method: 'GET',
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
        })