import React, { useState } from "react";
import contact from "../../assets/icons/contact.png";
import chatprofile from '../../assets/icons/chatprofile.png';
import { FiVideo } from "react-icons/fi";
import { MdOutlineCall, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import send from '../../assets/icons/send.png';
import './Footer.css';

function Footer() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Unified array for all messages
  const [currentMessage, setCurrentMessage] = useState(""); // Input field value
  const [image, setImage] = useState(null); // State to store the selected image

  // Function to handle sending user messages
  const handleSendMessage = () => {
    if (currentMessage.trim() || image) {
      // Add user message to the messages array
      const userMessage = {
        type: "user",
        text: currentMessage,
        image: image ? URL.createObjectURL(image) : null, // If image exists, store its URL
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Generate bot reply
      const botReply = generateBotResponse(currentMessage);

      // Add bot reply after a delay
      setTimeout(() => {
        const botMessage = { type: "bot", text: botReply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 500);

      // Clear input field and image after sending message
      setCurrentMessage("");
      setImage(null);
    }
  };

  const generateBotResponse = (message) => {
    // Define simple bot reply logic
    if (message.toLowerCase().includes("help")) {
      return "Sure! How can I assist you?";
    }
    if (message.toLowerCase().includes("info")) {
      return "We provide support for various services. Let us know your query.";
    }
    return "Sorry, I didn't quite get that. Can you clarify?";
  };

  // Handle file input (image upload)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the selected file in the state
    }
  };

  return (
    <div className="footer-container flex relative mt-20">
      {/* Footer Heading */}
      <div className="footer-heading font-Manrope absolute sm:left-1/2 top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center">
        <h1>Version 1.0.1 | Copyright Reserved By RADS4VETS © 2024</h1>
      </div>

      {/* Contact Icon */}
      <div
        className="footer-contact-container absolute bottom-4 bg- right-4 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsChatboxOpen(!isChatboxOpen)}
      >
        <img src={contact} alt="footerContact" className="w-8 h-8" />
      </div>

      {/* Chatbox */}
      {isChatboxOpen && (
        <div className="chatbox-container h-96 absolute bottom-16 right-4 w-80 bg-white shadow-lg border rounded-lg flex flex-col">
          {/* Chatbox Header */}
          <div
            className="flex justify-between px-4 mt-3 border-b py-3 place-content-center"
            style={{ fontFamily: "Manrope" }}
          >
            <div className='flex gap-3 place-content-center '>
              <img src={chatprofile} alt="" className='w- h-8 rounded-full' />
              <h1 className='place-content-center'>Olivia Rice</h1>
            </div>
            <div className='gap-3 flex place-content-center '>
              <FiVideo />
              <MdOutlineCall />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chatbox-messages h-52  flex-1 overflow-y-scroll p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 ${message.type === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`px-3 py-2 rounded-lg inline-block ${message.type === "user"
                      ? "bg-[#CBEA7B80] text-black"
                      : "bg-white text-black border"
                    }`}
                >
                  {message.text}
                </span>
                {/* If the message has an image, display it */}
                {message.image && (
                  <div className="text-right mt-2">
                    <img
                      src={message.image}
                      alt="user uploaded"
                      className="max-w-xs rounded-md inline-block"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex place-content-center items-center gap-4 p-2">
            {/* Left side with icons */}
            <div className="flex gap-2 items-center">
              <img
                src={send}
                alt="send icon"
                onClick={handleSendMessage}
                className="w-6 h-5 cursor-pointer"
              />
              {/* Add photo icon */}
              <label>
                <MdOutlineAddPhotoAlternate className="text-xl cursor-pointer" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <MdOutlineKeyboardVoice className="text-xl cursor-pointer" />
            </div>

            {/* Input field */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="w-full border rounded-xl px-3 py-2 pr-10 focus:outline-none" // Added pr-10 for space on the right side
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <span role="img" aria-label="emoji">😊</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
