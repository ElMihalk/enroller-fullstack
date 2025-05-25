import {useState} from "react";

export default function MeetingsList({meetings, username, onDelete, onSignIn, onSignOut, checkUser}) {


    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnictwo</th>
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
