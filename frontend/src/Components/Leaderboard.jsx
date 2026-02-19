import { useState, useEffect } from 'react'

const ENDPOINT = "http://127.0.0/1:5000/"

async function getLeaderboardData() {

    try {
        const response = await fetch("/api/leaderboard");
    
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching leaderboard data: ${error}`);
    }
    
}


export default function Leaderboard(props) {
    const [scores, setScores] = useState();

    useEffect(() => {
        getLeaderboardData()
            .then((data) => {
                console.log(`data: ${JSON.stringify(data)}`);
                var player_score_obj = {};
                data.rows.map((player) => {
                    if (!player_score_obj.hasOwnProperty(player.username)) {
                        player_score_obj[player.username] = 0;
                    }
                    player_score_obj[player.username] += parseInt(player.score);
                });
                var scores_array = [];
                for (var key in player_score_obj) {
                    scores_array.push({
                        username: key,
                        score: player_score_obj[key]
                    })
                };
                scores_array.sort((first, second) => first.score <= second.score);
                setScores(scores_array);
            }).catch((err) => console.error(`Error: ${err}`));
    }, []);

    return (
        <table align="center">
        <thead>
            <tr>
            <th> Position </th>
            <th> Username </th>
            <th> Score </th>
            </tr>
        </thead>
        <tbody>
            {scores &&
            scores.map((score, index) => {
                return (
                <tr key={score.username}>
                    <td> {index + 1} </td>
                    <td> {score.username} </td>
                    <td> {score.score} </td>
                </tr>
                )
            })}
        </tbody>
        </table>
    )
}