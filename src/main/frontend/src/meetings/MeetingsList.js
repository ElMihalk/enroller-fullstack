import {useState} from "react";

export default function MeetingsList({meetings, username, onDelete, onSignIn, onSignOut, checkUser}) {


    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnicy</th>
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
                    <td>
                        {
                            meeting.participants.length > 0
                                ? <ul>{meeting.participants.map(p => <li key={p.login}>{p.login}</li>)}</ul>
                                : <em>Brak uczestników</em>
                        }
                    </td>

                    <td>
                        {
                            meeting.participants.some(p => p.login === username)
                                ? <button type="button" onClick={() => onSignOut(meeting)}>Wypisz</button>
                                : <button type="button" onClick={() => onSignIn(meeting)}>Zapisz</button>
                        }
                    </td>

                    <td>
                        {
                            meeting.participants.length === 0
                                &&  (<button type="button" onClick={() => onDelete(meeting)}>Usuń</button>)
                        }
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
