import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function CreateNote() {

    const { user } = useAuth(); // 🔹 Get current user
    const [content, setContent] = useState('');
    const notesRef = collection(db, 'notes');
    const [noteId, setNoteId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const saveNote = async () => {
            const noteId = 'default-note';
            const noteDoc = doc(notesRef, noteId);
            await setDoc(noteDoc, { content });
        };

        if (content !== '') {
            saveNote();
        }
    }, [content]);


    if (!user) return null; // 🔹 Don't show if not logged in

    return (

        <div>
            <textarea
                name="notebox"
                id="note"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <p>{content}</p>
        </div>
    );


}


export default CreateNote;
