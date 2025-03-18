
import { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
      <div className="bg-nexus-primary p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl text-nexus-cyan mb-6 text-center">Time Nexus Portal</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-nexus-light mb-2">
              Temporal Agent Identifier
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-nexus-dark border border-nexus-accent rounded focus:outline-none focus:border-nexus-cyan text-white"
              placeholder="Enter your identifier"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-nexus-cyan text-nexus-dark py-2 rounded hover:bg-nexus-cyan/90 transition-colors"
          >
            Access Time Stream
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
