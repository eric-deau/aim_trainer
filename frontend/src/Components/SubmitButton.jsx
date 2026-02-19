import { useState, useEffect } from 'react'

export default function SubmitButton() {

    async function handleClick() {
        await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "edev", score: 123 })
        });
    }
    return (
        <button onClick={handleClick}>
            Click Me
        </button>
    )

}