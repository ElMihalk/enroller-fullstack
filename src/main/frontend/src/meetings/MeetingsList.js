import {useState} from "react";

export default function MeetingsList({meetings, username, onDelete, onSignIn, onSignOut}) {
    const [sign, setSign] = useState(true);
    const [participants, setParticipants] = useState([]);


    async function getParticipants(meeting) {
        const response = await fetch(`api/meetings/${meeting.id}/participants`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const participants = await response.json();
            setParticipants(participants);
        }
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Zapisz</th>
                <th>Wypisz</th>
                <th>Usuń spotkanie</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) =>
                    <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td><button type="button" onClick={() => onSignIn(meeting)}>Zapisz</button></td>
                    <td><button type="button" onClick={() => onSignOut(meeting)}>Wypisz</button></td>
                    <td><button type="button" onClick={() => onDelete(meeting)}>Usuń</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
