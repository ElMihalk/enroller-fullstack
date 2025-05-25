export default function MeetingsList({meetings, onDelete, onSignIn, onSignOut}) {
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
                meetings.map((meeting, index) => <tr key={index}>
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
