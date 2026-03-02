import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, X, FileText, Image as ImageIcon, Download } from "lucide-react";
import { BASE_URL, AVATARS } from "../utils/constants";
import { getSocket } from "../utils/socket";

const Chat = () => {
    const currentUser = useSelector((state) => state.user);
    const { targetUserId } = useParams(); // set when coming from /chat/:id

    const [connections, setConnections] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const fileInputRef = useRef(null);

    /* ── Fetch connections on mount ── */
    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/connections`, { withCredentials: true })
            .then((res) => {
                const data = res.data.data || [];
                setConnections(data);
                // Auto-select if navigated from /chat/:targetUserId
                if (targetUserId) {
                    const match = data.find((c) => c._id === targetUserId);
                    if (match) setSelectedUser(match);
                }
            })
            .catch(console.error);
    }, [targetUserId]);

    /* ── Socket setup ── */
    useEffect(() => {
        socketRef.current = getSocket();

        socketRef.current.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socketRef.current.on("error", (err) => {
            console.error("Socket error:", err);
        });

        return () => {
            socketRef.current?.off("receiveMessage");
            socketRef.current?.off("error");
        };
    }, []);

    /* ── Open chat with a selected connection ── */
    useEffect(() => {
        if (!selectedUser) return;

        setMessages([]);
        setLoadingHistory(true);

        // Join socket room
        socketRef.current?.emit("joinChat", { targetUserId: selectedUser._id });

        // Load message history via REST
        axios
            .get(`${BASE_URL}/chat/${selectedUser._id}`, { withCredentials: true })
            .then((res) => setMessages(res.data.data || []))
            .catch(console.error)
            .finally(() => setLoadingHistory(false));
    }, [selectedUser]);

    /* ── Auto-scroll to latest message ── */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* ── Send message ── */
    const sendMessage = async () => {
        if ((!inputText.trim() && !selectedFile) || !selectedUser || isUploading) return;

        let fileUrl = "";
        let fileType = "none";

        if (selectedFile) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", selectedFile);
            try {
                const res = await axios.post(`${BASE_URL}/upload`, formData, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fileUrl = res.data.fileUrl;
                fileType = selectedFile.type.startsWith("image/") ? "image" : "document";
            } catch (err) {
                console.error("File upload failed:", err);
                setIsUploading(false);
                return; // Stop message send if upload fails
            }
        }

        socketRef.current?.emit("sendMessage", {
            targetUserId: selectedUser._id,
            text: inputText.trim(),
            fileUrl,
            fileType,
        });

        setInputText("");
        setSelectedFile(null);
        setIsUploading(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (iso) =>
        new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white font-space overflow-hidden">

            {/* ── SIDEBAR: Connections ── */}
            <div className="w-72 flex-shrink-0 bg-[#111111] border-r border-white/5 flex flex-col">

                <div className="p-5 border-b border-white/5">
                    <h2 className="text-lg font-bold tracking-tight text-white">Messages</h2>
                    <p className="text-xs text-zinc-500 mt-0.5 font-poppins">Your connections</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {connections.length === 0 ? (
                        <div className="p-6 text-center text-zinc-600 text-sm font-poppins">
                            No connections yet.
                        </div>
                    ) : (
                        connections.map((conn) => {
                            const isActive = selectedUser?._id === conn._id;
                            return (
                                <button
                                    key={conn._id}
                                    onClick={() => setSelectedUser(conn)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
                    ${isActive
                                            ? "bg-green-500/10 border-l-2 border-green-400"
                                            : "hover:bg-white/5 border-l-2 border-transparent"
                                        }`}
                                >
                                    <img
                                        src={AVATARS[conn.avatar] ?? AVATARS[0]}
                                        alt={conn.firstName}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className={`font-semibold text-sm truncate ${isActive ? "text-green-400" : "text-white"}`}>
                                            {conn.firstName} {conn.lastName}
                                        </p>
                                        <p className="text-xs text-zinc-500 truncate font-poppins">
                                            {conn.skills?.slice(0, 2).join(", ") || "Developer"}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* ── MAIN CHAT PANEL ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-[#111111] border-b border-white/5 flex-shrink-0">
                            <img
                                src={AVATARS[selectedUser.avatar] ?? AVATARS[0]}
                                alt={selectedUser.firstName}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-bold text-sm text-white tracking-tight">
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </p>
                                <p className="text-xs text-green-400 font-poppins">Connected</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-3">
                            {loadingHistory ? (
                                <div className="flex justify-center pt-10">
                                    <svg className="animate-spin h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-600 font-poppins text-sm gap-2">
                                    <span className="text-3xl">💬</span>
                                    <p>No messages yet. Say hello!</p>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => {
                                        const isMine = msg.senderId?.toString() === currentUser?._id?.toString();
                                        return (
                                            <motion.div
                                                key={msg._id || i}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm font-poppins leading-relaxed flex flex-col gap-2
                            ${isMine
                                                            ? "bg-green-500 text-black rounded-br-sm"
                                                            : "bg-[#1e1e1e] text-white border border-white/5 rounded-bl-sm"
                                                        }`}
                                                >
                                                    {msg.fileUrl && msg.fileType === "image" && (
                                                        <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                                                            <img
                                                                src={msg.fileUrl}
                                                                alt="Attachment"
                                                                className="rounded-xl max-w-full h-auto max-h-64 object-contain shadow-sm"
                                                            />
                                                        </a>
                                                    )}
                                                    {msg.fileUrl && msg.fileType === "document" && (
                                                        <a
                                                            href={msg.fileUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${isMine
                                                                    ? "border-black/10 bg-black/5 hover:bg-black/10"
                                                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                }`}
                                                        >
                                                            <div className={`p-2 rounded-lg ${isMine ? "bg-black/10" : "bg-white/10"}`}>
                                                                <FileText size={20} className={isMine ? "text-black" : "text-white"} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-sm truncate">Document</p>
                                                                <p className={`text-xs ${isMine ? "text-black/60" : "text-zinc-400"}`}>Click to download</p>
                                                            </div>
                                                            <Download size={18} className={isMine ? "text-black/50" : "text-zinc-500"} />
                                                        </a>
                                                    )}
                                                    {msg.text && <p>{msg.text}</p>}
                                                    <p className={`text-[10px] mt-1 ${isMine ? "text-black/60 text-right" : "text-zinc-500"}`}>
                                                        {msg.createdAt ? formatTime(msg.createdAt) : ""}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-[#111111] border-t border-white/5 flex-shrink-0 flex flex-col gap-2">
                            {/* File Preview */}
                            <AnimatePresence>
                                {selectedFile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: 10, height: 0 }}
                                        className="flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] border border-white/10 rounded-xl w-fit"
                                    >
                                        <div className="p-2 bg-white/5 rounded-lg text-green-400">
                                            {selectedFile.type.startsWith("image/") ? <ImageIcon size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div className="flex flex-col min-w-0 max-w-xs">
                                            <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                                            <p className="text-xs text-zinc-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button
                                            onClick={clearFile}
                                            className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors ml-2"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-3 bg-[#1e1e1e] hover:bg-white/5 text-zinc-400 hover:text-white border border-white/5 rounded-xl transition-colors flex-shrink-0"
                                    title="Attach File"
                                    disabled={isUploading}
                                >
                                    <Paperclip size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={isUploading ? "Uploading..." : "Type a message… (Enter to send)"}
                                    disabled={isUploading}
                                    className="flex-1 bg-[#1e1e1e] text-white text-sm font-poppins placeholder:text-zinc-600 px-4 py-3 rounded-xl border border-white/5 outline-none focus:border-green-500/50 transition-colors"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={(!inputText.trim() && !selectedFile) || isUploading}
                                    className="bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold px-5 py-3 rounded-xl transition-colors text-sm flex-shrink-0 flex items-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Empty state */
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 font-poppins gap-3">
                        <span className="text-5xl">💬</span>
                        <p className="text-lg font-semibold text-zinc-400">Select a connection to start chatting</p>
                        <p className="text-sm">Your messages are end-to-session.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Chat;
