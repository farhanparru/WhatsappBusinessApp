// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaperclip, FaSmile, FaMicrophone } from 'react-icons/fa';
import profilePic from '../src/assets/prifile.avif'; // Placeholder profile image
import axios from 'axios';

const WhatsAppUI = () => {
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Store messages here

  const contacts = [
    { number: '9072937703', name: 'Farhan', profile: profilePic, status: 'Online', time: '10:00 AM' },
    { number: '7025769330', name: 'Shanifa', profile: profilePic, status: 'Offline', time: '9:30 AM' },
    { number: '8330036507', name: 'Nassef', profile: profilePic, status: 'Online', time: '8:45 AM' },
    { number: '9895639688', name: 'Mahroof', profile: profilePic, status: 'Online', time: '8:45 AM' },
  ];

  // Function to fetch messages for the selected recipient
  const fetchMessages = async () => {
    if (!selectedRecipient) return;

    try {
      const response = await axios.get(`https://demo.invenro.com/api/getMessages`, {
        params: { recipient_number: selectedRecipient.number },
      });
      const fetchedMessages = response.data.messages; // Adjust based on your API response structure
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages when the selected recipient changes
  useEffect(() => {
    fetchMessages();
  }, [selectedRecipient]);

  

  const sendMessage = async () => {
    if (!selectedRecipient || !message.trim()) return;

    // Add the new message to the messages array
    const newMessage = {
      sender: 'me',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]); // Update messages state
    setMessage(''); // Clear the message input after sending

    try {
      await axios.post('https://demo.invenro.com/api/sendmessage', {
        recipient_number: selectedRecipient.number,
        message_body: message,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4">
        <div className="flex items-center mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
        </div>

        {/* Contacts List */}
        <ul className="space-y-4">
          {contacts.map((contact, index) => (
            <li
              key={index}
              onClick={() => setSelectedRecipient(contact)}
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                selectedRecipient?.name === contact.name ? 'bg-gray-200' : ''
              }`}
            >
              <img
                src={contact.profile}
                alt={contact.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.status}</p>
              </div>
              <div className="text-sm text-gray-400">{contact.time}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-teal-600 text-white flex items-center">
          {selectedRecipient && (
            <>
              <img
                src={selectedRecipient.profile}
                alt={selectedRecipient.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <p className="font-semibold text-lg">{selectedRecipient.name}</p>
            </>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 bg-gray-200 overflow-y-auto">
          {/* Render messages */}
          {messages.length > 0 ? (
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${msg.sender === 'me' ? 'bg-teal-600 text-white' : 'bg-white text-gray-800'}`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs text-gray-500 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Select a contact to start chatting</p>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-300 flex items-center">
          <FaPaperclip className="text-gray-500 mr-4 cursor-pointer" />
          <FaSmile className="text-gray-500 mr-4 cursor-pointer" />
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none"
          />
          <FaMicrophone className="text-teal-600 ml-4 cursor-pointer" onClick={sendMessage} />
          <button onClick={sendMessage} className="ml-2 text-teal-600">Send</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppUI;
