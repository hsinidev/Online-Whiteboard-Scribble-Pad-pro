import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Whiteboard from './components/Whiteboard';
import SeoArticle from './components/SeoArticle';
import { MODAL_TYPE } from './types';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<MODAL_TYPE | null>(null);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const renderModalContent = () => {
    switch (activeModal) {
      case MODAL_TYPE.ABOUT:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">About This Project</h2>
            <p className="text-gray-300 leading-relaxed">
              The <strong>Online Whiteboard & Scribble Pad</strong> is a cutting-edge, minimalist digital canvas designed for instant creativity. Built with performance in mind using React and the HTML5 Canvas API, it offers a lag-free drawing experience without the need for user accounts or downloads.
            </p>
            <p className="text-gray-300 leading-relaxed">
               Whether you are a teacher explaining a concept, a designer sketching a layout, or just someone looking to doodle, this tool provides the freedom you need. We believe in open, accessible web tools that respect user privacy and enhance productivity.
            </p>
          </div>
        );
      case MODAL_TYPE.CONTACT:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">Contact Us</h2>
            <p className="text-gray-300">We value your feedback and suggestions. Feel free to reach out!</p>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 mt-4">
                <p className="mb-3 flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">Website:</span> 
                    <a href="http://doodax.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 hover:underline transition-colors">doodax.com</a>
                </p>
                <p className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">Email:</span> 
                    <a href="mailto:hsini.web@gmail.com" className="text-white hover:text-cyan-400 hover:underline transition-colors">hsini.web@gmail.com</a>
                </p>
            </div>
          </div>
        );
      case MODAL_TYPE.GUIDE:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">User Guide</h2>
            <div className="grid gap-4">
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-bold text-cyan-400 mb-1">1. Drawing</h3>
                    <p className="text-sm text-gray-300">Simply click and drag on the canvas area. Multi-touch is supported for mobile devices.</p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-bold text-cyan-400 mb-1">2. Tools</h3>
                    <p className="text-sm text-gray-300">Use the floating toolbar to change colors or adjust brush thickness using the slider.</p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-bold text-cyan-400 mb-1">3. Actions</h3>
                    <p className="text-sm text-gray-300"><strong>Undo</strong> to fix mistakes, <strong>Clear</strong> to reset, and <strong>Download</strong> to save your work as a PNG.</p>
                </div>
            </div>
          </div>
        );
      case MODAL_TYPE.PRIVACY:
         return (
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">Privacy Policy</h2>
                <p className="text-gray-300">At Online Whiteboard & Scribble Pad, your privacy is our priority.</p>
                <h3 className="text-xl font-bold text-cyan-400 mt-4">Data Collection</h3>
                <p className="text-gray-300">We do not collect, store, or share any personal data. Your drawings are processed entirely within your browser's memory. Nothing is uploaded to our servers.</p>
                <h3 className="text-xl font-bold text-cyan-400 mt-4">Cookies</h3>
                <p className="text-gray-300">We may use local storage simply to remember your preferences (like brush color) locally on your device.</p>
            </div>
         );
      case MODAL_TYPE.TERMS:
         return (
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">Terms of Service</h2>
                <p className="text-gray-300">By using this application, you agree to the following terms:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                    <li>The application is provided "as is" without warranty of any kind.</li>
                    <li>You are responsible for the content you create using this tool.</li>
                    <li>We reserve the right to update the application and these terms at any time.</li>
                </ul>
            </div>
         );
      case MODAL_TYPE.DMCA:
        return (
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white border-b border-cyan-500 pb-2">DMCA Policy</h2>
                <p className="text-gray-300">We respect the intellectual property rights of others. If you believe that material available on our website infringes on your copyright(s), please notify us immediately via email at <a href="mailto:hsini.web@gmail.com" className="text-cyan-400 underline">hsini.web@gmail.com</a>.</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout setActiveModal={setActiveModal} activeModal={activeModal}>
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-gray-800 border border-cyan-500/50 rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[0_0_50px_rgba(6,182,212,0.25)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {renderModalContent()}
            <div className="mt-8 flex justify-end">
                <button 
                onClick={() => setActiveModal(null)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                Close
                </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-6xl mx-auto text-center mb-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] tracking-tight">
          Online Whiteboard <br className="hidden md:block"/> & Scribble Pad
        </h1>
        <p className="mt-6 text-xl text-cyan-100/80 max-w-2xl mx-auto font-light">
          A robust, free, and privacy-focused digital canvas. Sketch ideas, brainstorm solutions, or just doodle in space.
        </p>
      </div>

      <div className="w-full h-[65vh] max-w-[1400px] mx-auto px-2 md:px-6">
          <Whiteboard />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-16 pb-12 px-4">
        <div className="relative bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
            {/* Logic: If closed, max-h is small (approx 2 lines + padding). If open, max-h is huge to fit all content. */}
            <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isArticleExpanded ? 'max-h-[8000px]' : 'max-h-32'}`}>
            <SeoArticle />
            
            {/* Gradient overlay when collapsed */}
            {!isArticleExpanded && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900 pointer-events-none flex items-end justify-center pb-4">
                </div>
            )}
            </div>
            
            <div className="mt-4 flex justify-center relative z-10">
                <button
                onClick={() => setIsArticleExpanded(!isArticleExpanded)}
                className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/25"
                >
                {isArticleExpanded ? (
                    <>Read Less <span className="group-hover:-translate-y-1 transition-transform">↑</span></>
                ) : (
                    <>Read More <span className="group-hover:translate-y-1 transition-transform">↓</span></>
                )}
                </button>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;