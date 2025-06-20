import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  addDoc, collection, query, getDocs, orderBy, Timestamp,
} from 'firebase/firestore';
import PageTitle from '../components/PageTitle';
import ReactMarkdown from 'react-markdown';

type BlogPost = {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
};

export default function Blog() {
  const { user } = useAuth();
  console.log('Current user:', user);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postsRef = collection(db, 'posts');

  const fetchPosts = async () => {
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    setPosts(data);
  };

  const createPost = async () => {
    if (!title || !content || !user) return;
    await addDoc(postsRef, {
      title,
      content,
      createdAt: Timestamp.now(),
      authorId: user.uid,
    });
    setTitle('');
    setContent('');
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <PageTitle title="Blog" />
      <h1>DevBoard Blog</h1>

      {user && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Create New Post</h3>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
          <textarea
            rows={8}
            placeholder="Write markdown content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginTop: '0.5rem' }}
          />
          <button onClick={createPost} style={{ marginTop: '1rem' }}>Post</button>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        <h2>Recent Posts</h2>
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '2rem' }}>
            <h3>{post.title}</h3>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
