"use client"

import { useState, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Fingerprint } from "lucide-react"

type AnimationState = "sleep" | "lockscreen" | "unlocking" | "desktop"

const easeApple = [0.25, 0.1, 0.25, 1]
const easeAppleOut = [0.16, 1, 0.3, 1]

interface MacLoginSequenceProps {
  children: ReactNode;
}

export default function MacLoginSequence({ children }: MacLoginSequenceProps) {
  const [state, setState] = useState<AnimationState>("sleep")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Sleep -> Lock Screen (after 1s)
    const wakeTimer = setTimeout(() => {
      setState("lockscreen")
    }, 1000)

    return () => clearTimeout(wakeTimer)
  }, [])

  useEffect(() => {
    if (state === "lockscreen") {
      // Start unlock after 2s on lock screen
      const unlockTimer = setTimeout(() => {
        setState("unlocking")
      }, 2000)

      return () => clearTimeout(unlockTimer)
    }
  }, [state])

  useEffect(() => {
    if (state === "unlocking") {
      // Progress bar animation
      const startTime = Date.now()
      const duration = 800

      const animateProgress = () => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)

        if (newProgress < 100) {
          requestAnimationFrame(animateProgress)
        } else {
          // Transition to desktop
          setTimeout(() => setState("desktop"), 200)
        }
      }

      requestAnimationFrame(animateProgress)
    }
  }, [state])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Background Wallpaper - Light Mode */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          // Using a light, aesthetic gradient wallpaper for "Light Mode"
          backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80')`,
        }}
        initial={{ scale: 1.1, filter: "blur(30px)" }}
        animate={{
          scale: state === "desktop" ? 1 : 1.1,
          filter: state === "desktop" ? "blur(0px)" : "blur(30px)",
          opacity: state === "sleep" ? 0 : 1,
        }}
        transition={{
          duration: state === "desktop" ? 1.2 : 0.8,
          ease: easeAppleOut,
        }}
      />

      {/* Light overlay for lock screen */}
      <motion.div
        className="absolute inset-0 bg-white/20 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: state === "lockscreen" || state === "unlocking" ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: easeApple }}
      />

      {/* Lock Screen Content */}
      <AnimatePresence>
        {(state === "lockscreen" || state === "unlocking") && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6, ease: easeAppleOut }}
          >
            {/* User Avatar */}
            <motion.div
              className="relative mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeAppleOut, delay: 0.1 }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-200 p-[3px] shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center overflow-hidden border border-black/5">
                  <span className="text-4xl font-semibold text-gray-700">RB</span>
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white shadow-lg" />
            </motion.div>

            {/* User Name */}
            <motion.h1
              className="text-gray-900 text-2xl font-semibold mb-1 tracking-tight"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: easeAppleOut, delay: 0.2 }}
            >
              Romain Bouchez
            </motion.h1>

            {/* Progress Bar (during unlocking) */}
            {state === "unlocking" && (
              <motion.div
                className="w-48 h-1 bg-black/10 rounded-full overflow-hidden mt-3 mb-4"
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: easeApple }}
              >
                <motion.div
                  className="h-full bg-black/80 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </motion.div>
            )}

            {/* Touch ID hint (only on lock screen, not during unlock) */}
            {state === "lockscreen" && (
              <motion.div
                className="flex items-center gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <Fingerprint className="w-4 h-4 text-gray-800/70" />
                  <span className="text-gray-800/70 text-sm font-medium">
                    Touch ID or Enter Password
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Desktop Content */}
      <AnimatePresence>
        {state === "desktop" && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleep State - White/Light Gray in this case or still black? 
          Usually "Sleep" is black. But to match the light theme, maybe starts black then fades to login? 
          Let's keep it black for the actual "Sleep" effect, or it looks weird. 
          Real Macs go black when sleeping.
      */}
      <motion.div
        className="absolute inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: state === "sleep" ? 1 : 0 }}
        transition={{ duration: 0.8, ease: easeApple }}
      />
    </div>
  )
}
