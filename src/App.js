import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Live Message Capturing</h1>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    style={{ marginRight: '10px', padding: '10px', width: '300px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Send</button>
            </form>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((msg, index) => (
                    <li key={index} style={{ margin: '5px 0', padding: '10px', border: '1px solid #ccc' }}>
                        {msg}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
