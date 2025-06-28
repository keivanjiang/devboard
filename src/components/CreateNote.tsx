import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc, addDoc, getDocs, Timestamp, query, orderBy, limit, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";


function CreateNote() {

    const { user } = useAuth(); // 🔹 Get current user
    const [content, setContent] = useState('');
    const notesRef = collection(db, 'notes');
    const [noteId, setNoteId] = useState<string | null>(null);

    // 🧠 On component mount → load the latest note
useEffect(() => {
  const fetchLatestNote = async () => {
    const notesQuery = query(
      collection(db, 'notes'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const snapshot = await getDocs(notesQuery);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      setContent(docSnap.data().content);
      setNoteId(docSnap.id);
    } else {
      // No notes found — clear state to allow a blank slate
      setContent('');
      setNoteId(null);
    }
  };

  fetchLatestNote();
}, []);


// 💾 Save note when content changes
useEffect(() => {
  const saveNote = async () => {
    if (!content.trim()) return;

    if (noteId) {
      await updateDoc(doc(db, 'notes', noteId), { content });
    } else {
      const docRef = await addDoc(collection(db, 'notes'), {
        content,
        createdAt: Timestamp.now(),
      });
      setNoteId(docRef.id); 
    }
  };

  const timeout = setTimeout(saveNote, 500);
  return () => clearTimeout(timeout);
}, [content, noteId]);




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
