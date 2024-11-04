import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../../UseContext/context';

const LoginModal = ({ isOpen, onClose, onLoginSuccess, onSignupClick }) => {
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            if (response) {
                onLoginSuccess();
                navigate('/');
                
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login Error:", err.message);
            setError("An error occurred during login.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div id="login-modal" className="bg-white rounded-lg p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500" aria-label="Close">
                    &times;
                </button>
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 w-full mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 text-white p-2 rounded w-full"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4">
                    Don't have an account?{' '}
                    <button onClick={onSignupClick} className="text-teal-500">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
