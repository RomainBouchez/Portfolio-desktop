"use client";

import React, { useState, useEffect, useRef } from 'react';

// SVG components for cleanliness
const MoreOptionsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="white" />
    </svg>
);

const AddIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.667 11.666H5.66699M11.667 5.66602V17.666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EditIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.0696 4.83911C19 4.76937 18.9173 4.71405 18.8262 4.67631C18.7352 4.63857 18.6376 4.61914 18.539 4.61914C18.4405 4.61914 18.3429 4.63857 18.2518 4.67631C18.1608 4.71405 18.078 4.76937 18.0084 4.83911L17.3544 5.49311C16.9344 5.29256 16.4625 5.22721 16.0038 5.30606C15.5451 5.38491 15.1221 5.60407 14.7931 5.93336L6.83789 13.8879L11.0806 18.1306L19.0366 10.1769C19.3658 9.84782 19.5848 9.42481 19.6635 8.9661C19.7423 8.50738 19.6768 8.03555 19.4761 7.61561L20.1309 6.96086C20.2715 6.82021 20.3505 6.62948 20.3505 6.43061C20.3505 6.23173 20.2715 6.041 20.1309 5.90036L19.0696 4.83911ZM15.8686 11.2216L11.0806 16.0096L8.95964 13.8879L13.7469 9.10061L15.8686 11.2216ZM17.2321 9.85811L17.9746 9.11561C18.0444 9.04595 18.0997 8.96323 18.1374 8.87219C18.1752 8.78114 18.1946 8.68354 18.1946 8.58498C18.1946 8.48642 18.1752 8.38882 18.1374 8.29778C18.0997 8.20673 18.0444 8.12401 17.9746 8.05436L16.9149 6.99386C16.8452 6.92412 16.7625 6.8688 16.6715 6.83106C16.5804 6.79332 16.4828 6.77389 16.3843 6.77389C16.2857 6.77389 16.1881 6.79332 16.0971 6.83106C16.006 6.8688 15.9233 6.92412 15.8536 6.99386L15.1111 7.73636L17.2321 9.85811Z" fill="white" fillOpacity="0.45" />
        <path d="M4.62207 20.3315L6.21357 14.498L10.4556 18.7408L4.62207 20.3315Z" fill="white" fillOpacity="0.45" />
    </svg>
);

const MusicIcon = () => (
    <svg style={{ marginLeft: '40px' }} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.70039 20.1004C5.20539 20.1004 4.78179 19.9243 4.42959 19.5721C4.07739 19.2199 3.90099 18.796 3.90039 18.3004V5.70039C3.90039 5.20539 4.07679 4.78179 4.42959 4.42959C4.78239 4.07739 5.20599 3.90099 5.70039 3.90039H18.3004C18.7954 3.90039 19.2193 4.07679 19.5721 4.42959C19.9249 4.78239 20.101 5.20599 20.1004 5.70039V18.3004C20.1004 18.7954 19.9243 19.2193 19.5721 19.5721C19.2199 19.9249 18.796 20.101 18.3004 20.1004H5.70039ZM5.70039 18.3004H8.62539V14.2504H8.40039C8.14539 14.2504 7.93179 14.164 7.75959 13.9912C7.58739 13.8184 7.50099 13.6048 7.50039 13.3504V5.70039H5.70039V18.3004ZM15.3754 18.3004H18.3004V5.70039H16.5004V13.3504C16.5004 13.6054 16.414 13.8193 16.2412 13.9921C16.0684 14.1649 15.8548 14.251 15.6004 14.2504H15.3754V18.3004ZM9.97539 18.3004H14.0254V14.2504H13.8004C13.5454 14.2504 13.3318 14.164 13.1596 13.9912C12.9874 13.8184 12.901 13.6048 12.9004 13.3504V5.70039H11.1004V13.3504C11.1004 13.6054 11.014 13.8193 10.8412 13.9921C10.6684 14.1649 10.4548 14.251 10.2004 14.2504H9.97539V18.3004Z" fill="white" fillOpacity="0.45" />
    </svg>
);

const GradientBlur = () => (
    <div className="gradient-blur">
        {[...Array(8)].map((_, i) => <div key={i}></div>)}
    </div>
);


export const MusicPlayerUI = () => {
    const [isArtistModalActive, setIsArtistModalActive] = useState(false);
    const [isSongModalActive, setIsSongModalActive] = useState(false);
    const [songModalTop, setSongModalTop] = useState(0);
    const [songModalTransform, setSongModalTransform] = useState('translateY(0px)');

    const contentRef = useRef<HTMLDivElement>(null);
    const songOpenRef = useRef<HTMLDivElement>(null);

    const anyModalActive = isArtistModalActive || isSongModalActive;

    useEffect(() => {
        const updateSongModalPosition = () => {
            if (songOpenRef.current && contentRef.current) {
                const top = songOpenRef.current.getBoundingClientRect().top - contentRef.current.offsetTop - 2;
                setSongModalTop(top);
            }
        };

        updateSongModalPosition();
        window.addEventListener('resize', updateSongModalPosition);

        return () => {
            window.removeEventListener('resize', updateSongModalPosition);
        };
    }, []);

    const handleArtistToggle = () => {
        setIsArtistModalActive(!isArtistModalActive);
    };

    const handleSongOpen = () => {
        if (songOpenRef.current && contentRef.current) {
            const distanceY = window.innerHeight - songOpenRef.current.getBoundingClientRect().bottom + contentRef.current.offsetTop - 390;
            setSongModalTransform(`translateY(${distanceY}px)`);
        }
        setIsSongModalActive(true);
    };

    const handleSongClose = () => {
        setSongModalTransform('translateY(0px)');
        setIsSongModalActive(false);
    };

    return (
        <main className="text-white min-h-screen bg-black flex items-center justify-center p-4">
            <div className="content-wrapper bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl relative w-[380px] h-[800px]">
                <div ref={contentRef} className={`content w-full h-full relative z-10 transition-transform duration-500 ease-out ${anyModalActive ? 'active scale-95 opacity-80' : ''}`}>
                    <div className="main-content h-full flex flex-col">
                        <div className="photo-wrapper relative h-2/3 w-full overflow-hidden">
                            <img className="photo w-full h-full object-cover" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" alt="Album cover" />
                            <img className="photo absolute inset-0 w-full h-full object-cover opacity-60" style={{ filter: 'brightness(1.5) saturate(1) blur(48px)', zIndex: '-1' }} src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" alt="" />
                        </div>
                        <div className="main-info p-6 flex-1 flex flex-col bg-neutral-900/80 backdrop-blur-md">
                            <div className="title-container mb-6">
                                <h1 className="text-3xl font-bold mb-2">Cowboy Carter</h1>
                                <div className="title-info flex items-center gap-2 text-sm text-gray-400">
                                    <p className="light">Country</p>
                                    <div className="divider w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <p className="light">27 songs</p>
                                    <div className="divider w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <p className="light">2024</p>
                                </div>
                            </div>
                            <div className="songs space-y-4">
                                <div ref={songOpenRef} className="song flex justify-between items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors border border-white/10" onClick={handleSongOpen}>
                                    <p className="bold font-semibold">American Requiem</p>
                                    <div className="end flex items-center gap-3">
                                        <MoreOptionsIcon />
                                        <p className="light text-sm text-gray-400">5:25</p>
                                    </div>
                                </div>
                                <div className="song flex justify-between items-center p-2 rounded-lg hover:bg-white/5 border border-white/10"><p className="bold font-semibold">Blackbiird</p><p className="light text-sm text-gray-400">2:11</p></div>
                                <div className="song flex justify-between items-center p-2 rounded-lg hover:bg-white/5 border border-white/10"><p className="bold font-semibold">16 Carriages</p><p className="light text-sm text-gray-400">3:47</p></div>
                                <div className="song flex justify-between items-center p-2 rounded-lg hover:bg-white/5 border border-white/10"><p className="bold font-semibold">Protector</p><p className="light text-sm text-gray-400">3:04</p></div>
                            </div>
                        </div>
                    </div>

                    <div className={`song-modal absolute inset-x-0 bg-neutral-800 rounded-t-3xl p-6 transition-all duration-500 ease-out z-20 ${isSongModalActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`} style={{ top: `${songModalTop}px`, height: 'calc(100% - 100px)' }}>
                        <div className="song mb-6 border-b border-white/10 pb-4">
                            <div className="flex justify-between items-center mb-1">
                                <p className="bold font-bold text-xl">American Requiem</p>
                                <div className="end flex items-center gap-3">
                                    <div onClick={handleSongClose} className="cursor-pointer p-1 hover:bg-white/10 rounded-full rotate-45"><AddIcon /></div>
                                    <p className="light text-sm text-gray-400">5:25</p>
                                </div>
                            </div>
                        </div>
                        <div className="song-modal-info space-y-6 overflow-y-auto max-h-[calc(100%-80px)] pr-2">
                            <div className="song-credits flex flex-col gap-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <EditIcon />
                                    <p className="light">Beyoncé, Raphael Saadiq <u>& 10 more</u></p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MusicIcon />
                                    <p className="light ml-0">Beyoncé, Jon Batiste <u>& 6 more</u></p>
                                </div>
                            </div>
                            <p className="bold text-gray-200 leading-relaxed font-medium">‘AMERIICAN REQUIEM’ opens ‘COWBOY CARTER’ – Beyoncés eighth studio album and the second part of her trilogy project that began with the release of ‘RENAISSANCE’ in 2022.</p>
                            <p className="bold text-gray-300 leading-relaxed text-sm">The song “American Requiem” sets the stage by calling out the systemic racism that continues to oppress 60 years after the Civil Rights Movement.“Nothing really ends/ for things to stay the same, they have to change again/ Hello, my old friend/ You changed your name but not the way you play pretend/ American Requiem/ Them big ideas are buried here/ Amen.”</p>
                        </div>
                        <GradientBlur />
                    </div>

                    <div className={`modal absolute inset-0 z-30 flex flex-col transition-all duration-500 ease-out ${isArtistModalActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ display: isSongModalActive ? 'none' : 'flex' }}>
                        <div className="toggle absolute top-6 right-6 z-40 cursor-pointer p-2 bg-black/50 rounded-full backdrop-blur-md rotate-45 hover:bg-black/70 transition-colors" onClick={handleArtistToggle}>
                            <AddIcon />
                        </div>
                        <div className="modal-content w-full h-full bg-neutral-900 overflow-y-auto">
                            <div className="photo-wrapper relative h-1/2 w-full">
                                <h1 className="absolute bottom-6 left-6 text-4xl font-bold z-10 text-shadow-lg">Beyoncé</h1>
                                <img className="photo w-full h-full object-cover" src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" alt="Beyoncé" />
                                <img className="photo absolute inset-0 w-full h-full object-cover opacity-50" style={{ filter: 'brightness(1.5) saturate(1) blur(48px)', zIndex: '-1' }} src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" alt="" />
                            </div>
                            <div className="info p-8 space-y-6">
                                <div className="info-top flex justify-between items-center text-sm text-gray-400 border-b border-gray-800 pb-4">
                                    <div className="info-top-left flex items-center gap-3">
                                        <p className="genre light font-medium text-white">Pop</p>
                                        <div className="divider w-1 h-1 bg-gray-600 rounded-full"></div>
                                        <p className="light">38 songs</p>
                                    </div>
                                    <p className="light">7M listeners</p>
                                </div>
                                <p className="bold text-gray-300 leading-relaxed">
                                    Beyoncé Giselle Knowles-Carter is an American singer, songwriter, and businesswoman. Nicknamed "Queen Bey", she is regarded as a prominent cultural figure of the 21st century. Throughout her two-decade career, Beyoncé has been recognized for her distinctive vocal range, live performances, and songwriting.
                                </p>
                            </div>
                        </div>
                        <GradientBlur />
                        <div className="shade absolute inset-0 bg-black/20 pointer-events-none"></div>
                    </div>
                </div>

                {/* Floating Add Button for Artist Modal */}
                {!anyModalActive && (
                    <div className="absolute top-6 right-6 z-20 cursor-pointer p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors" onClick={handleArtistToggle}>
                        <AddIcon />
                    </div>
                )}
            </div>
        </main>
    );
};
