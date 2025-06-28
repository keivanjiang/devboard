// src/components/ListNotes.tsx
import { useState, useEffect } from 'react'; // 🔹 React hooks
import { db } from '../firebase'; // 🔹 Firebase config
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; // 🔹 Firestore methods

type Note = { id: string; content: string }; // 🔹 Basic Note type

export default function ListNotes() {
  const [notes, setNotes] = useState<Note[]>([]); // 🔹 Store saved notes
  const [currentIndex, setCurrentIndex] = useState(0); // 🔹 Track visible note

  useEffect(() => {
    async function fetchNotes() {
      const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const arr = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      setNotes(arr);

      const stored = localStorage.getItem('currentNoteIndex');
      if (stored !== null && !isNaN(+stored) && +stored < arr.length) {
        setCurrentIndex(+stored);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentNoteIndex', currentIndex.toString());
  }, [currentIndex, notes.length]);

  function prevNote() {
    if (currentIndex > 0) setCurrentIndex(ci => ci - 1);
  }

  function nextNote() {
    if (currentIndex < notes.length - 1) setCurrentIndex(ci => ci + 1);
  }

  if (notes.length === 0) return <p>No notes yet.</p>;

  return (
    <div>
      <button onClick={prevNote}>←</button>
      <button onClick={nextNote}>→</button>
      <pre style={{ border: '1px solid #ccc', padding: '1rem' }}>
        {notes[currentIndex].content}
      </pre>
    </div>
  );
}
