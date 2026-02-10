import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const success = login(email, password);

        if (success) {
            navigate('/builder');
        } else {
            setError('Email หรือ Password ไม่ถูกต้อง');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Login
                </h1>

                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-sm text-red-500 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </div>

                <p className="text-xs text-center text-gray-400 mt-6">
                    admin@gmail.com / 123456
                </p>
            </div>
        </div>
    );
}