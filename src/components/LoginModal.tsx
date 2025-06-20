import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
      console.log('Attempting login...');

    try {
    const result = await signInWithEmailAndPassword(auth, email, password);
          console.log('Login result:', result.user);

      onClose(); // Close modal after successful login
    } catch (err: any) {
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <div style={modalBgStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={{ float: 'right' }}>✖</button>
        <h2>Login to DevBoard</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleLogin} style={buttonStyle}>Sign In</button>
      </div>
    </div>
  );
}

// 💅 Quick inline styles (replace with CSS or styled-components later)
const modalBgStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: '#fff',
  padding: '2rem',
  borderRadius: 10,
  width: 320,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  margin: '0.5rem 0',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  background: '#333',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};
