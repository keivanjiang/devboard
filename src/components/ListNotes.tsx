import { useEffect, useState } from 'react'; // React hooks
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { db } from '../firebase'; // Firebase config

function ListNotes() {
  const [notes, setNotes] = useState<any[]>([]); // 🔹 Store notes in state

  useEffect(() => {
    // 🔹 Define and immediately invoke an async function
    const fetchNotes = async () => {
      const notesSnapshot = await getDocs(collection(db, 'notes')); // 🔹 Get all notes
      const notesData = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // 🔹 Convert to array
      setNotes(notesData); // 🔹 Store in state
    };

    fetchNotes(); // 🔹 Call the fetch function
  }, []);

  return (
    <div>
      <h3>Saved Notes</h3>
      {notes.map((note) => (
        <div key={note.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          <pre>{note.content}</pre> {/* 🔹 Display content */}
        </div>
      ))}
    </div>
  );
}

export default ListNotes;
