import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [sign, setSign] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {

        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const newMeeting = await response.json();
            const nextMeetings = [...meetings, newMeeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }

    }
    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`api/meetings/${meeting.id}`, {
            method: 'DELETE',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
            });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);
        }
    }

    async function signToMeeting(meeting) {
        const response = await fetch(`api/meetings/${meeting.id}/participants`, {
            method: 'POST',
            body: JSON.stringify({login: username}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            setMeetings(prev =>
                prev.map(m =>
                    m.id === meeting.id
                        ? { ...m, participants: [...m.participants, { login: username }] }
                        : m
                )
            );
        }
    }

    async function signOutMeeting(meeting) {
        const response = await fetch(`api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            setMeetings(prev =>
                prev.map(m =>
                    m.id === meeting.id
                        ? {
                            ...m,
                            participants: m.participants.filter(p => p.login !== username)
                        }
                        : m
                )
            );
        }
    }

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

    async function checkPresence(meeting) {
        setSign(false);
        getParticipants(meeting);
        participants.forEach((participant) =>
        {
            if (participant.login == username){
                setSign(true);
            }
        }
        )
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onDelete={handleDeleteMeeting} onSignIn={signToMeeting}
                              onSignOut={signOutMeeting} checkUser={checkPresence}/>}
        </div>
    )
}
