import { useState } from "react";
import { useAppContext } from '../../UseContext/context';

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
    const { signup } = useAppContext();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ username, email, password });
            if (password.length < 8) {
                alert('Password must be at least 8 characters long!');
                return; // Exit function if password is too short
            } 
            if (response) {
                alert("Signup successful!");
                onClose();
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup Error:", err.message);
            setError("An error occurred during signup.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div id="signup-modal" className="bg-white rounded-lg p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500" aria-label="Close">
                    &times;
                </button>
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border p-2 w-full mb-4"
                    />
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
                        Sign Up
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account?{' '}
                    <button onClick={onLoginClick} className="text-teal-500">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupModal;
