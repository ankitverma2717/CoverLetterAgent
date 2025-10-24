'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, FileText, Sparkles, LogIn, Download, User as UserIcon, LogOut, CheckCircle, ChevronDown, KeyRound, Rocket, FileInput } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type User = {
    name: string;
    email: string;
};

type ResumeFile = {
    id: number;
    file: File;
    name: string;
    number: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// --- MODAL COMPONENTS ---

const ApiKeyModal = ({ onSave, onCancel }: { onSave: (apiKey: string) => void, onCancel: () => void }) => {
    const [apiKey, setApiKey] = useState('');
    const instructions = [
        { text: "Go to Google AI Studio", link: "https://aistudio.google.com/" },
        { text: "Click on 'Get API Key' in the top left corner." },
        { text: "Create a new project or select an existing one." },
        { text: "Copy the generated API key and paste it below." }
    ];

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/20 max-w-2xl w-full flex flex-col animate-fade-in">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-100">Enter Your Gemini API Key</h2>
                    <button onClick={onCancel} className="p-1 rounded-full hover:bg-gray-700 transition"><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">How to get your API Key:</h3>
                    <ul className="space-y-2 mb-6">
                        {instructions.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                                            {item.text}
                                        </a>
                                    ) : (
                                        item.text
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Paste your Gemini API Key here"
                        className="w-full p-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-gray-200"
                    />
                </div>
                <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
                    <button onClick={onCancel} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                    <button onClick={() => onSave(apiKey)} disabled={!apiKey.trim()} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50">
                        Save API Key
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileDropdown = ({ user, onLogout, onUpdateApiKey }: { user: User, onLogout: () => void, onUpdateApiKey: () => void }) => {
    const permissions = [
        "View your basic profile information (name, email)",
        "Create new Google Docs documents on your behalf",
        "View and download files from your Google Drive (that this app creates)"
    ];

    const [apiKey, setApiKey] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setApiKey(localStorage.getItem('gemini_api_key') || '');
        }
    }, []);

    return (
        <div className="absolute top-14 right-0 w-80 bg-gray-800 border border-purple-500/30 rounded-xl shadow-2xl text-white z-20 animate-fade-in-down">
            <div className="p-4 border-b border-gray-700">
                <p className="font-semibold text-lg truncate">{user.name}</p>
                <p className="text-sm text-gray-400 truncate">{user.email}</p>
            </div>
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-md font-semibold text-gray-200 mb-3">Gemini API Key</h3>
                <div className="text-sm text-gray-400 mb-3">
                    {apiKey ? `Key ending in ...${apiKey.slice(-4)} is being used.` : 'No API Key set.'}
                </div>
                <button
                    onClick={onUpdateApiKey}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-500/50"
                >
                    <KeyRound className="w-5 h-5" />
                    Update API Key
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-200 mb-3">Permissions Granted</h3>
                <ul className="space-y-2">
                    {permissions.map((permission, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{permission}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/50"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

const PreviewModal = ({ content, onConfirm, onCancel, isCreating }: { content: string, onConfirm: () => void, onCancel: () => void, isCreating: boolean }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/20 max-w-3xl w-full max-h-[90vh] flex flex-col animate-fade-in">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-100">Preview Cover Letter</h2>
                <button onClick={onCancel} className="p-1 rounded-full hover:bg-gray-700 transition"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ whiteSpace: 'pre-wrap' }}>
                {content.replace(/\[H1\]|\[H2\]|\[H3\]|\[B\]|\[P\]|\[GREETING\]|\[CLOSING\]|\[DATE\]/g, '')}
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
                <button onClick={onCancel} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Cancel & Edit</button>
                <button onClick={onConfirm} disabled={isCreating} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center gap-2">
                    {isCreating ? 'Creating...' : 'Confirm & Create Document'}
                </button>
            </div>
        </div>
    </div>
);

const DocumentViewerModal = ({ docId, onClose, userName, companyName }: { docId: string, onClose: () => void, userName: string, companyName: string }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : '';
    const previewUrl = `${API_URL}/api/v1/document/${docId}/download?token=${token}`;

    const handleDownload = async () => {
        const cleanUserName = userName.replace(/ /g, '_');
        const cleanCompanyName = companyName.replace(/ /g, '_');
        const fileName = `${cleanUserName}_${cleanCompanyName}_CoverLetter.pdf`;

        try {
            const response = await fetch(previewUrl);
            if (!response.ok) throw new Error('Network response was not ok.');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download the PDF. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/20 w-full max-w-4xl h-[90vh] flex flex-col animate-fade-in">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-100">Document Created Successfully</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/50">
                            <Download className="w-5 h-5" />
                            Download PDF
                        </button>
                        <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Close</button>
                    </div>
                </div>
                <div className="flex-1 p-4 bg-gray-900/50 rounded-b-xl">
                    <iframe src={previewUrl} className="w-full h-full border-2 border-gray-700 rounded-lg" title="PDF Preview"></iframe>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function CoverLetterApp() {
    // State for Cover Letter feature
    const [resumes, setResumes] = useState<ResumeFile[]>([]);
    const [jobDescription, setJobDescription] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [isCreatingDoc, setIsCreatingDoc] = useState(false);
    const [docId, setDocId] = useState('');
    const [showDocViewer, setShowDocViewer] = useState(false);
    const [companyName, setCompanyName] = useState('');

    // State for Resume Crafting feature
    const [showResumeCrafter, setShowResumeCrafter] = useState(false);
    const [mainResume, setMainResume] = useState<File | null>(null);
    const [targetJobDescription, setTargetJobDescription] = useState('');
    const [isCrafting, setIsCrafting] = useState(false);

    // Shared State
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);


    // --- Helper & Auth Functions ---
    const getAuthToken = (): string | null => { if (typeof window !== 'undefined') { return localStorage.getItem('jwt_token'); } return null; };
    const getApiKey = (): string | null => { if (typeof window !== 'undefined') { return localStorage.getItem('gemini_api_key'); } return null; };

    const parseJwt = (token: string): User | null => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            return { name: payload.name, email: payload.sub };
        } catch (e) {
            console.error("Failed to parse JWT", e);
            return null;
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            localStorage.setItem('jwt_token', tokenFromUrl);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        const storedToken = getAuthToken();
        if (storedToken) {
            const userData = parseJwt(storedToken);
            if (userData) {
                setUser(userData);
                if (!getApiKey()) {
                    setShowApiKeyModal(true);
                }
            } else {
                localStorage.removeItem('jwt_token');
                setUser(null);
            }
        }
        setIsAuthLoading(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSaveApiKey = (apiKey: string) => {
        localStorage.setItem('gemini_api_key', apiKey);
        setShowApiKeyModal(false);
    };

    const handleLogin = () => { window.location.href = `${API_URL}/oauth2/authorization/google`; };
    const handleLogout = () => { localStorage.removeItem('jwt_token'); localStorage.removeItem('gemini_api_key'); setUser(null); setIsProfileOpen(false); };
    const createAuthHeaders = (): HeadersInit => { const token = getAuthToken(); if (!token) { throw new Error("No authentication token found. Please log in again."); } return { 'Authorization': `Bearer ${token}` }; };

    // --- Cover Letter Feature Handlers ---
    const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); if (e.type === "dragenter" || e.type === "dragover") setDragActive(true); else if (e.type === "dragleave") setDragActive(false); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.length) handleFiles(Array.from(e.dataTransfer.files)); };
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.length) handleFiles(Array.from(e.target.files)); };
    const handleFiles = (files: File[]) => { const pdfFiles = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')); if (resumes.length + pdfFiles.length > 10) return alert('Maximum 10 resumes allowed'); const newResumes = pdfFiles.map((file, i) => ({ id: Date.now() + i, file, name: file.name, number: resumes.length + i + 1 })); setResumes(p => [...p, ...newResumes]); };
    const removeResume = (id: number) => { const renumbered = resumes.filter(r => r.id !== id).map((r, i) => ({ ...r, number: i + 1 })); setResumes(renumbered); };

    const handleGenerateContent = async () => {
        const apiKey = getApiKey();
        if (!user || resumes.length === 0 || !jobDescription.trim() || !apiKey) { return alert('Please log in, upload a resume, paste a job description, and set your API key.'); }
        setIsLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('resumes', resumes[0].file);
        formData.append('jobDescription', jobDescription);
        formData.append('apiKey', apiKey);
        try {
            const headers = createAuthHeaders();
            const response = await fetch(`${API_URL}/api/v1/cover-letter/generate-content`, { method: 'POST', body: formData, headers: headers });
            if (!response.ok) throw new Error(await response.text() || 'Failed to generate content.');
            const result = await response.json();
            const lines = result.content.split('\n');
            let foundHiringManager = false;
            let extractedCompanyName = '';
            for (const line of lines) { if (line.trim().startsWith('[H3]Hiring Manager')) { foundHiringManager = true; continue; } if (foundHiringManager && line.trim().startsWith('[H3]')) { extractedCompanyName = line.trim().substring(4).trim(); break; } }
            setCompanyName(extractedCompanyName || 'Company');
            setPreviewContent(result.content);
            setShowPreview(true);
        } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred.'); } finally { setIsLoading(false); }
    };

    const handleConfirmAndCreate = async () => {
        setIsCreatingDoc(true);
        setError(null);
        try {
            const headers = { ...createAuthHeaders(), 'Content-Type': 'application/json' };
            const response = await fetch(`${API_URL}/api/v1/cover-letter/create-document`, { method: 'POST', headers: headers, body: JSON.stringify({ content: previewContent, title: `Cover Letter - ${companyName}` }), });
            if (!response.ok) throw new Error(await response.text() || 'Failed to create document.');
            const result = await response.json();
            if (result.documentId) { setDocId(result.documentId); setShowDocViewer(true); setShowPreview(false); } else { throw new Error("Failed to get document ID from server."); }
        } catch (err) {  setError(err instanceof Error ? err.message : 'An unknown error occurred.'); } finally { setIsCreatingDoc(false); }
    };

    const handleMainResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
            setMainResume(file);
        } else {
            alert('Please select a PDF file.');
        }
    };

    const handleCraftResume = async () => {
        if (!mainResume || !targetJobDescription.trim()) { alert('Please upload your main resume and provide a target job description.'); return; }
        const apiKey = getApiKey();
        if (!apiKey) { setShowApiKeyModal(true); return; }
        setIsCrafting(true);
        setError(null);
        const formData = new FormData();
        formData.append('resume', mainResume);
        formData.append('jobDescription', targetJobDescription);
        formData.append('apiKey', apiKey);
        try {
            const headers = createAuthHeaders();
            const response = await fetch(`${API_URL}/api/v1/resume/craft`, { method: 'POST', headers, body: formData });
            if (!response.ok) { throw new Error(await response.text() || 'Failed to craft resume.'); }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${user?.name?.replace(/ /g, '_') || 'Resume'}_Project.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred.'); } finally { setIsCrafting(false); }
    };


    if (isAuthLoading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl animate-pulse">Loading CoverCraft AI...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {showApiKeyModal && <ApiKeyModal onSave={handleSaveApiKey} onCancel={() => setShowApiKeyModal(false)} />}
            {showPreview && (<PreviewModal content={previewContent} onConfirm={handleConfirmAndCreate} onCancel={() => setShowPreview(false)} isCreating={isCreatingDoc} />)}
            {showDocViewer && (<DocumentViewerModal docId={docId} onClose={() => setShowDocViewer(false)} userName={user?.name || 'Candidate'} companyName={companyName} />)}

            <header className="bg-gray-800/50 backdrop-blur-md shadow-lg border-b border-purple-500/20 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CoverCraft AI</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowResumeCrafter(prev => !prev)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            {showResumeCrafter ? <FileText className="w-4 h-4"/> : <Rocket className="w-4 h-4"/>}
                            {showResumeCrafter ? 'Cover Letter Generator' : 'Craft a Resume'}
                        </button>
                        <div className="relative" ref={profileRef}>
                            {user ? (
                                <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-3 px-4 py-2 bg-gray-700/50 rounded-full hover:bg-gray-700 transition-colors">
                                    <UserIcon className="w-6 h-6 bg-purple-500 text-white rounded-full p-0.5" />
                                    <span className="text-gray-200 font-medium">{user.name}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <button onClick={handleLogin} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50">
                                    <LogIn className="w-5 h-5" />
                                    Login with Google
                                </button>
                            )}
                            {isProfileOpen && user && <ProfileDropdown user={user} onLogout={handleLogout} onUpdateApiKey={() => setShowApiKeyModal(true)} />}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {showResumeCrafter ? (
                    // --- RESUME CRAFTER UI (NEW) ---
                    <div className="animate-fade-in">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Resume Crafter</h2>
                            <p className="text-gray-400">Transform your existing resume for a new role.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 flex flex-col">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-2">1. Upload Your Main Resume</h2>
                                    <p className="text-sm text-gray-400">The AI will use this as a base.</p>
                                </div>
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-xl cursor-pointer hover:bg-purple-500/5 hover:border-purple-500 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FileInput className="w-12 h-12 mb-3 text-purple-400"/>
                                        <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">PDF only</p>
                                    </div>
                                    <input type="file" className="hidden" accept=".pdf,application/pdf" onChange={handleMainResumeChange} />
                                </label>
                                {mainResume && (
                                    <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-200 truncate">{mainResume.name}</p>
                                        <button onClick={() => setMainResume(null)} className="p-1 hover:bg-red-500/20 rounded-full transition-colors"><X className="w-4 h-4 text-red-400"/></button>
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 flex flex-col">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-2">2. Target Job Description</h2>
                                    <p className="text-sm text-gray-400">Paste the new job you&apos;re applying for.</p>
                                </div>
                                <textarea value={targetJobDescription} onChange={(e) => setTargetJobDescription(e.target.value)} placeholder="Paste the Node.js job description here..." className="flex-1 w-full p-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-gray-200 placeholder-gray-500" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button onClick={handleCraftResume} disabled={!user || !mainResume || !targetJobDescription.trim() || isCrafting} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all flex items-center gap-2">
                                <Rocket className="w-5 h-5" />
                                {isCrafting ? 'Crafting Resume...' : 'Craft & Download for Overleaf'}
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- COVER LETTER UI (EXISTING) ---
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 flex flex-col">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-2">Job Description</h2>
                                    <p className="text-sm text-gray-400">Paste the job posting you're applying for</p>
                                </div>
                                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="flex-1 w-full p-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-gray-200 placeholder-gray-500" />
                                <div className="mt-4 text-sm text-gray-400">{jobDescription.length} characters</div>
                            </div>
                            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 flex flex-col">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-2">Your Resumes</h2>
                                    <p className="text-sm text-gray-400">Upload up to 10 resumes (PDF only)</p>
                                </div>
                                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all mb-4 ${dragActive ? 'border-purple-400 bg-purple-500/10' : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/5'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                                    <p className="text-gray-200 font-medium mb-1">Drag & drop your resumes here</p>
                                    <p className="text-sm text-gray-500 mb-3">or</p>
                                    <label className="inline-block">
                                        <input type="file" multiple accept=".pdf,application/pdf" onChange={handleFileInput} className="hidden" />
                                        <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 cursor-pointer transition-all inline-block shadow-lg hover:shadow-purple-500/50">Browse Files</span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">{resumes.length} / 10 resumes uploaded</p>
                                </div>
                                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                    {resumes.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p>No resumes uploaded yet</p>
                                        </div>
                                    ) : (
                                        resumes.map((resume) => (
                                            <div key={resume.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all">
                                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">{resume.number}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-200 truncate">{resume.name}</p>
                                                    <p className="text-xs text-gray-400">{(resume.file.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button onClick={() => removeResume(resume.id)} className="flex-shrink-0 p-1 hover:bg-red-500/20 rounded-full transition-colors" title="Remove"><X className="w-4 h-4 text-red-400 hover:text-red-300" /></button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button onClick={handleGenerateContent} disabled={!user || resumes.length === 0 || !jobDescription.trim() || isLoading} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                {isLoading ? 'Generating Preview...' : 'Generate Cover Letter'}
                            </button>
                        </div>
                    </div>
                )}
                {!user && <p className="text-center text-purple-400 mt-4">Please log in to generate a cover letter.</p>}
                {error && <p className="text-center text-red-400 mt-4">Error: {error}</p>}
            </main>
        </div>
    );
}
