'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

// --- Types ---
type ViewMode = 'finder' | 'appStore' | 'minimal' | 'immersive';

interface ProjectWindow2Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

// --- Icons ---
const MoreOptionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="currentColor" />
  </svg>
);

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.667 11.666H5.66699M11.667 5.66602V17.666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.0696 4.83911C19 4.76937 18.9173 4.71405 18.8262 4.67631C18.7352 4.63857 18.6376 4.61914 18.539 4.61914C18.4405 4.61914 18.3429 4.63857 18.2518 4.67631C18.1608 4.71405 18.078 4.76937 18.0084 4.83911L17.3544 5.49311C16.9344 5.29256 16.4625 5.22721 16.0038 5.30606C15.5451 5.38491 15.1221 5.60407 14.7931 5.93336L6.83789 13.8879L11.0806 18.1306L19.0366 10.1769C19.3658 9.84782 19.5848 9.42481 19.6635 8.9661C19.7423 8.50738 19.6768 8.03555 19.4761 7.61561L20.1309 6.96086C20.2715 6.82021 20.3505 6.62948 20.3505 6.43061C20.3505 6.23173 20.2715 6.041 20.1309 5.90036L19.0696 4.83911ZM15.8686 11.2216L11.0806 16.0096L8.95964 13.8879L13.7469 9.10061L15.8686 11.2216ZM17.2321 9.85811L17.9746 9.11561C18.0444 9.04595 18.0997 8.96323 18.1374 8.87219C18.1752 8.78114 18.1946 8.68354 18.1946 8.58498C18.1946 8.48642 18.1752 8.38882 18.1374 8.29778C18.0997 8.20673 18.0444 8.12401 17.9746 8.05436L16.9149 6.99386C16.8452 6.92412 16.7625 6.8688 16.6715 6.83106C16.5804 6.79332 16.4828 6.77389 16.3843 6.77389C16.2857 6.77389 16.1881 6.79332 16.0971 6.83106C16.006 6.8688 15.9233 6.92412 15.8536 6.99386L15.1111 7.73636L17.2321 9.85811Z" fill="currentColor" fillOpacity="0.45" />
    <path d="M4.62207 20.3315L6.21357 14.498L10.4556 18.7408L4.62207 20.3315Z" fill="currentColor" fillOpacity="0.45" />
  </svg>
);

const MusicIcon = () => (
  <svg style={{ marginLeft: '40px' }} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.70039 20.1004C5.20539 20.1004 4.78179 19.9243 4.42959 19.5721C4.07739 19.2199 3.90099 18.796 3.90039 18.3004V5.70039C3.90039 5.20539 4.07679 4.78179 4.42959 4.42959C4.78239 4.07739 5.20599 3.90099 5.70039 3.90039H18.3004C18.7954 3.90039 19.2193 4.07679 19.5721 4.42959C19.9249 4.78239 20.101 5.20599 20.1004 5.70039V18.3004C20.1004 18.7954 19.9243 19.2193 19.5721 19.5721C19.2199 19.9249 18.796 20.101 18.3004 20.1004H5.70039ZM5.70039 18.3004H8.62539V14.2504H8.40039C8.14539 14.2504 7.93179 14.164 7.75959 13.9912C7.58739 13.8184 7.50099 13.6048 7.50039 13.3504V5.70039H5.70039V18.3004ZM15.3754 18.3004H18.3004V5.70039H16.5004V13.3504C16.5004 13.6054 16.414 13.8193 16.2412 13.9921C16.0684 14.1649 15.8548 14.251 15.6004 14.2504H15.3754V18.3004ZM9.97539 18.3004H14.0254V14.2504H13.8004C13.5454 14.2504 13.3318 14.164 13.1596 13.9912C12.9874 13.8184 12.901 13.6048 12.9004 13.3504V5.70039H11.1004V13.3504C11.1004 13.6054 11.014 13.8193 10.8412 13.9921C10.6684 14.1649 10.4548 14.251 10.2004 14.2504H9.97539V18.3004Z" fill="currentColor" fillOpacity="0.45" />
  </svg>
);

const GradientBlur = ({ className = "gradient-blur" }: { className?: string }) => (
  <div className={className}>
    {[...Array(8)].map((_, i) => <div key={i}></div>)}
  </div>
);


// --- Layout Components ---

const FinderLayout = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Column 1: Details (25%) */}
      <div className="w-[25%] min-w-[200px] bg-gray-50 overflow-y-auto border-r border-gray-200 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Title</h3>
            <p className="text-base font-medium text-gray-900">{project.title}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Type</h3>
            <p className="text-sm text-gray-700">{project.subtitle}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</h3>
            <p className="text-xs text-gray-600 leading-relaxed text-justify">{project.description}</p>
          </div>
          <div className="pt-2 space-y-2">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="block w-full px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors text-center shadow-sm">Live Demo</a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors text-center shadow-sm">GitHub</a>
            )}
          </div>
        </div>
      </div>
      {/* Column 2: Features */}
      <div className="w-[30%] min-w-[220px] bg-white overflow-y-auto border-r border-gray-200 p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4 sticky top-0 bg-white pb-2 border-b border-gray-100 z-10">Features</h3>
        <div className="space-y-4">
          {project.features.map((feature, index) => (
            <div key={index} className="pb-4 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl p-1.5 bg-gray-50 rounded-md">{feature.icon}</span>
                <h4 className="text-sm font-semibold text-gray-900">{feature.title}</h4>
              </div>
              <p className="text-xs text-gray-500 ml-11 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Column 3: Stack */}
      <div className="w-[15%] min-w-[150px] bg-gray-50 overflow-y-auto border-r border-gray-200 p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4 sticky top-0 bg-gray-50 pb-2 border-b border-gray-200 z-10">Stack</h3>
        <div className="space-y-2">
          {project.technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-3 group p-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
              <span className="text-xs font-medium text-gray-700">{tech}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Column 4: Preview */}
      <div className="w-[30%] min-w-[250px] bg-white overflow-y-auto p-4 flex flex-col">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4">Preview</h3>
        <div className="space-y-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-100 group">
            <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="300px" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-3">
            <h4 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-2">Project Details</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Contact</span><span className="text-gray-900 font-medium truncate ml-4">{project.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Technologies</span><span className="text-gray-900 font-medium">{project.technologies.length}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Features</span><span className="text-gray-900 font-medium">{project.features.length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppStoreLayout = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <div className="relative w-full h-[400px] shrink-0">
        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 bg-gradient-to-t from-white via-white/80 to-transparent">
          <div className="flex items-end justify-between max-w-4xl mx-auto w-full">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">{project.subtitle}</span>
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">{project.title}</h1>
              <p className="text-lg text-gray-500 font-medium max-w-xl">{project.description}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">GET DEMO</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-gray-100 text-blue-600 text-sm font-bold rounded-full hover:bg-gray-200 transition-all">SOURCE</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto w-full p-8 pb-16 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Version 1.0</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-4 p-3 bg-white w-fit rounded-xl shadow-sm">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <hr className="border-gray-100" />
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Built With</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700">{tech}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const MinimalLayout = ({ project }: { project: Project }) => {
  return (
    <div className="flex h-full bg-white divide-x divide-gray-100">
      <div className="w-1/2 relative h-full bg-gray-100 overflow-hidden group">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
      </div>
      <div className="w-1/2 h-full overflow-y-auto px-12 py-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">{project.subtitle}</span>
            <h1 className="text-4xl font-light text-gray-900 tracking-tight leading-tight">{project.title}</h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-6">
            {project.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-xl shrink-0 opacity-50">{feature.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 flex gap-4">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">View Project</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Code</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Immersive (Progressive Blur) Layout
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';

const SpotlightItem = ({ feature, index, onClick, isDark }: { feature: any, index: number, onClick: () => void, isDark: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group relative flex justify-between items-center p-3 rounded-[20px] cursor-pointer border overflow-hidden ${isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200'}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(${isDark ? '255, 255, 255, 0.1' : '229, 231, 235, 0.4'}, 0.4),
              transparent 80%
            )
          `
        }}
      />
      {/* Border Reveal Layer */}
      <motion.div
        className={`pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100 border ${isDark ? 'border-white/30' : 'border-gray-300'}`}
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">
        <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'} w-4 text-sm font-mono`}>{index + 1}</span>
        <div>
          <p className={`font-semibold transition-colors ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-black'}`}>{feature.title}</p>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
        <MoreOptionsIcon />
      </div>
    </motion.div>
  );
};

const ImmersiveLayout = ({ project }: { project: Project }) => {
  const [isDescriptionModalActive, setIsDescriptionModalActive] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featureListRef = useRef<HTMLDivElement>(null);
  const [songModalTop, setSongModalTop] = useState(0);

  const isDark = project.modalTheme === 'dark';

  // Position calculation
  useEffect(() => {
    const updateModalPosition = () => {
      if (featureListRef.current && contentRef.current) {
        const top = featureListRef.current.offsetTop;
        setSongModalTop(top);
      }
    };
    updateModalPosition();
    window.addEventListener('resize', updateModalPosition);
    return () => window.removeEventListener('resize', updateModalPosition);
  }, [activeFeature]);

  const handleFeatureOpen = (index: number) => setActiveFeature(index);
  const handleFeatureClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveFeature(null);
  };

  return (
    <div className={`w-full h-full overflow-hidden relative font-sans selection:bg-gray-200 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>

      {/* Main Content Layer */}
      <motion.div
        ref={contentRef}
        className={`w-full h-full relative z-10 overflow-y-auto shadow-sm custom-scrollbar ${isDark ? 'bg-[#0f0f11]' : 'bg-white'}`}
        animate={{
          scale: isDescriptionModalActive || activeFeature !== null ? 0.92 : 1,
          opacity: isDescriptionModalActive || activeFeature !== null ? 0.8 : 1,
          borderRadius: isDescriptionModalActive || activeFeature !== null ? 32 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="min-h-full flex flex-col">
          {/* Hero Image */}
          <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden shrink-0 group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>

          {/* Main Info */}
          <div className={`flex-1 p-8 flex flex-col relative ${isDark ? 'bg-[#0f0f11]' : 'bg-white'}`}>
            <div className="mb-6 relative z-10">
              <h1 className={`text-4xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h1>
              <div className={`flex items-center gap-3 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className={`px-2 py-0.5 rounded text-xs border ${isDark ? 'bg-white/10 border-white/10 text-gray-200' : 'text-gray-900 bg-gray-100 border-gray-200'}`}>{project.subtitle}</span>
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`} />
                <span className="whitespace-nowrap">{project.features.length} Features</span>
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`} />
                <span className="whitespace-nowrap">{project.technologies.length} Techs</span>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-auto shrink-0 whitespace-nowrap px-4 py-1.5 text-xs font-bold rounded-full transition-colors shadow-sm ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    TRY IT
                  </a>
                )}
              </div>
            </div>

            {/* Feature List */}
            <motion.div
              ref={featureListRef}
              className={`space-y-2 pr-2 ${project.features.length > 3 ? 'pb-24' : ''}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {project.features.map((feature, index) => (
                <SpotlightItem
                  key={index}
                  feature={feature}
                  index={index}
                  onClick={() => handleFeatureOpen(index)}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          </div>
        </div>
        {/* Backdrop Overlay to close modal */}
        {activeFeature !== null && (
          <div
            className="absolute inset-0 z-50 cursor-pointer"
            onClick={handleFeatureClose}
          />
        )}
      </motion.div>

      {/* Feature Details Modal */}
      <AnimatePresence>
        {activeFeature !== null && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) {
                handleFeatureClose();
              }
            }}
            style={{
              top: songModalTop > 0 ? songModalTop : '40%',
              height: 'auto',
              bottom: 0,
            }}
          >
            <div className={`h-full w-full rounded-t-[40px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative border-t flex flex-col ${isDark ? 'bg-[#18181b] border-white/10' : 'bg-white border-gray-100'}`}>
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full opacity-50 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />

              <div className="mb-8 flex justify-between items-start pt-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.features[activeFeature].title}</h2>
                </motion.div>
                <motion.button
                  onClick={handleFeatureClose}
                  className={`p-3 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="rotate-45"><AddIcon /></div>
                </motion.button>
              </div>

              <motion.div
                className={`space-y-6 relative z-10 overflow-y-auto pr-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className={`text-xl leading-relaxed font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {project.features[activeFeature].description}
                </p>
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                  <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold">Tech Impact</p>
                  <p className="text-sm font-medium">Enabled by robust architecture using {project.technologies.slice(0, 3).join(', ')}.</p>
                </div>
              </motion.div>
              <GradientBlur className="gradient-blur-light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description Modal (Shared Layout Expansion) */}
      <AnimatePresence>
        {isDescriptionModalActive && (
          <motion.div
            layoutId="description-modal-container"
            className={`absolute top-6 right-6 z-30 flex flex-col backdrop-blur-2xl overflow-hidden shadow-2xl border origin-top-right ${isDark ? 'bg-black/90 border-white/10' : 'bg-white/80 border-white/20'}`}
            style={{ width: 380, height: '80%', maxHeight: 600, borderRadius: 30 }}
            initial={{ borderRadius: 30, opacity: 0, scale: 0.9 }}
            animate={{ borderRadius: 30, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          >
            <div className="relative w-full h-full overflow-y-auto">
              {/* Close Button Inside Modal */}
              <motion.button
                onClick={() => setIsDescriptionModalActive(false)}
                className="absolute top-4 left-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md rounded-full shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="rotate-45"><AddIcon /></div>
              </motion.button>

              <div className="h-[45%] relative shrink-0">
                <Image
                  src={project.modalImage || project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <motion.h1
                  layoutId="modal-title"
                  className="absolute bottom-4 left-6 text-3xl font-bold drop-shadow-sm leading-tight text-gray-900"
                >
                  {project.title}
                </motion.h1>
              </div>

              <div className="p-6 space-y-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`flex gap-4 border-b pb-4 ${isDark ? 'border-white/10 text-gray-400' : 'border-gray-200/50 text-gray-500'}`}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Type</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.subtitle}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Stack</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.technologies.length} Techs</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`prose prose-sm max-w-none leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <p>{project.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 pt-2"
                >
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" className={`flex-1 py-3 rounded-xl font-bold text-xs text-center transition-colors shadow-lg ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>VISIT DEMO</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" className={`flex-1 border py-3 rounded-xl font-bold text-xs text-center transition-colors shadow-sm ${isDark ? 'bg-transparent border-white/20 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}>GITHUB</a>}
                </motion.div>
              </div>
              <GradientBlur className="gradient-blur-light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Toggle Button (Floating - Shared Layout Source) */}
      {!isDescriptionModalActive && activeFeature === null && (
        <motion.button
          layoutId="description-modal-container"
          onClick={() => setIsDescriptionModalActive(true)}
          className={`absolute top-6 right-6 z-20 p-3 backdrop-blur-md rounded-full border overflow-hidden shadow-sm ${isDark ? 'bg-black/30 hover:bg-black/50 text-white border-white/20' : 'bg-white/30 hover:bg-white/50 text-gray-900 border-white/40'}`}
          style={{ borderRadius: '50%' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          {/* We hide the content during the morph if needed, or simple keep the icon */}
          <motion.div layoutId="modal-title-icon">
            <AddIcon />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};


// --- Main Component ---

export default function ProjectWindow_2({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow2Props) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  // Default to 'immersive' as requested by the user flow ("VOILA a quoi devrait ressemblé")
  const [viewMode, setViewMode] = useState<ViewMode>('immersive');
  const windowRef = useRef<HTMLDivElement>(null);

  // --- Layout management ---
  useEffect(() => {
    let newPos = { x: 0, y: 0 };
    if (initialPosition) {
      newPos = initialPosition;
    } else if (windowRef.current) {
      const { offsetWidth, offsetHeight } = windowRef.current;
      newPos.x = (window.innerWidth - offsetWidth) / 2;
      newPos.y = (window.innerHeight - offsetHeight) / 3;
    }
    setPosition(newPos);
  }, [initialPosition]);

  // --- Orientation Check ---
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobilePortrait(isMobile && isPortrait);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // --- Drag Logic ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;
        const isMobile = window.innerWidth < 640;
        const dockHeight = isMobile ? 70 : 85;
        const menuBarHeight = 40;

        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
        newY = Math.max(menuBarHeight, Math.min(newY, window.innerHeight - windowHeight - dockHeight));

        setPosition({ x: newX, y: newY });
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, .no-drag')) return;
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className={`bg-white rounded-[30px] overflow-hidden flex flex-col fixed shadow-2xl transition-all duration-300
        ${viewMode === 'appStore' ? 'bg-gray-50' : ''}
        ${viewMode === 'immersive' ? 'bg-black border border-white/10' : 'bg-white'}
      `}
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        // Responsive size adjustment
        width: isMobilePortrait ? '95vw' : '1000px',
        maxWidth: 'min(1200px, 94vw)',
        height: isMobilePortrait ? '85vh' : '650px',
        maxHeight: '90vh',
        boxShadow: viewMode === 'immersive'
          ? '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.8)'
          : '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header */}
      <div
        className={`relative flex items-center gap-4 px-4 py-3 cursor-move z-50 shrink-0
          ${viewMode === 'appStore' || viewMode === 'immersive' ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-gray-100/90 backdrop-blur-md border-b border-gray-200'}
        `}
        onMouseDown={handleHeaderMouseDown}
      >
        {/* Window Controls */}
        <div className="flex gap-2 group cursor-pointer p-1" onClick={onClose}>
          <button className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center hover:bg-[#FF5F56]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center hover:bg-[#FFBD2E]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center hover:bg-[#27C93F]/80 transition-colors" />
        </div>

        {/* View Switcher (Desktop Only) */}


        {/* Title (Finder Mode) */}
        {viewMode === 'finder' && (
          <span className="text-xs font-semibold text-gray-600 flex-1 text-center pr-24 pointer-events-none select-none">{project.title}</span>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative h-full">
        {isMobilePortrait ? (
          // Mobile fallback - reusing Immersive layout for mobile as it fits well
          <ImmersiveLayout project={project} />
        ) : (
          <>
            {viewMode === 'finder' && <FinderLayout project={project} />}
            {viewMode === 'appStore' && <AppStoreLayout project={project} />}
            {viewMode === 'minimal' && <MinimalLayout project={project} />}
            {viewMode === 'immersive' && <ImmersiveLayout project={project} />}
          </>
        )}
      </div>
    </div>
  );
}
