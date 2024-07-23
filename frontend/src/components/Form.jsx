import * as React from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';
import '../styles/form.css';

export default function Form({ route, method }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setisLoading] = React.useState(false);

  const navigate = useNavigate();

  const name = method === 'login' ? 'login' : 'register';

  async function handleSubmit(e) {
    e.preventDefault();

    setisLoading(true);
    try {
      const res = await api.post(route, { username, password });
      console.log(res);
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        console.log('in if');
        navigate('/');
      } else {
        ('else');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{name}</h1>
      <input
        id="username"
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Choose a Username..."
      />
      <input
        id="password"
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a Password..."
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <button disabled={isLoading} className="form-button" type="submit">
          {name}
        </button>
      )}
    </form>
  );
}
