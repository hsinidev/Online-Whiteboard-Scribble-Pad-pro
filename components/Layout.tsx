import React from 'react';
import { MODAL_TYPE } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  setActiveModal: (modal: MODAL_TYPE | null) => void;
  activeModal: MODAL_TYPE | null;
}

const Star: React.FC<{ size: number; top: string; left: string; delay: string, duration: string, opacity: number }> = ({ size, top, left, delay, duration, opacity }) => {
  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    top,
    left,
    opacity,
    animationDelay: delay,
    animationDuration: duration,
  };
  return <div className="absolute bg-white rounded-full star" style={style}></div>;
};

const GalaxyBackground: React.FC = () => {
    // Created more layers for depth
    const starsLayer1 = Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 1.5 + 0.5;
        return (
            <Star
                key={`s1-${i}`}
                size={size}
                top={`${Math.random() * 100}%`}
                left={`${Math.random() * 100}%`}
                delay={`${Math.random() * 60}s`}
                duration={`${Math.random() * 100 + 100}s`}
                opacity={Math.random() * 0.5 + 0.3}
            />
        );
    });
    
    const starsLayer2 = Array.from({ length: 150 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
            <Star
                key={`s2-${i}`}
                size={size}
                top={`${Math.random() * 100}%`}
                left={`${Math.random() * 100}%`}
                delay={`${Math.random() * 100}s`}
                duration={`${Math.random() * 150 + 150}s`}
                opacity={Math.random() * 0.4 + 0.1}
            />
        );
    });

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0B0F19]">
            <style>{`
                @keyframes move-stars {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-2000px); }
                }
                @keyframes pulse-nebula {
                    0% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.1); }
                    100% { opacity: 0.2; transform: scale(1); }
                }
                .star {
                    animation: move-stars linear infinite;
                }
                .nebula-1 {
                    background: radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%);
                    animation: pulse-nebula 15s infinite ease-in-out;
                }
                .nebula-2 {
                    background: radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
                    animation: pulse-nebula 20s infinite ease-in-out reverse;
                }
            `}</style>
            <div className="absolute inset-0 nebula-1"></div>
            <div className="absolute inset-0 nebula-2"></div>
            {starsLayer1}
            {starsLayer2}
        </div>
    );
};


const Layout: React.FC<LayoutProps> = ({ children, setActiveModal }) => {
    const navLinks = [
        { name: 'About', type: MODAL_TYPE.ABOUT },
        { name: 'Contact', type: MODAL_TYPE.CONTACT },
        { name: 'Guide', type: MODAL_TYPE.GUIDE },
        { name: 'Privacy Policy', type: MODAL_TYPE.PRIVACY },
        { name: 'Terms of Service', type: MODAL_TYPE.TERMS },
        { name: 'DMCA', type: MODAL_TYPE.DMCA },
    ];

  return (
    <div className="min-h-screen text-white flex flex-col relative font-sans">
      <GalaxyBackground />
      <header className="w-full z-20 p-4 backdrop-blur-[2px]">
        <nav className="flex justify-center items-center flex-wrap gap-x-8 gap-y-3 max-w-5xl mx-auto bg-gray-900/40 px-8 py-3 rounded-full border border-white/5 shadow-lg">
            {navLinks.map(link => (
                <button 
                    key={link.name}
                    onClick={() => setActiveModal(link.type)}
                    className="text-gray-400 hover:text-cyan-300 transition-all duration-300 text-sm font-medium tracking-wide hover:scale-105 uppercase"
                >
                    {link.name}
                </button>
            ))}
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center py-12 px-4 w-full z-10">
        {children}
      </main>

      <footer className="w-full text-center py-6 px-4 text-sm text-gray-500 z-20 bg-black/20 backdrop-blur-md border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <span>&copy; {new Date().getFullYear()} Online Whiteboard. All rights reserved.</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="flex items-center gap-1">
                Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-[#FFD700] hover:text-white hover:underline transition-colors">HSINI MOHAMED</a>
            </span>
            <span className="hidden md:inline text-gray-700">|</span>
            <div className="flex gap-4">
                <a href="http://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">doodax.com</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;