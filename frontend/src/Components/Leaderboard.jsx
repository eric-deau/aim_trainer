import { useState, useEffect } from 'react'
import SubmitButton from './SubmitButton';

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

export default function Leaderboard() {
    const [scores, setScores] = useState();

    async function loadLeaderboard() {
        try {
            const data = await getLeaderboardData();
            const scores_array = [...data.rows];
            scores_array.sort((first, second) => first.score - second.score);
            setScores(scores_array);
        } catch (error) {
            console.error(`Error loading leaderboard: ${error}`);
        }
    }

    useEffect(() => {
        loadLeaderboard();
    }, []);

    return (
        <>
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
            <SubmitButton onSubmitSuccess={loadLeaderboard}></SubmitButton>
        </>
    )
}