import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaUndo } from "react-icons/fa";
import LoadingScreen from "./LoadingScreen";



// ... existing imports ...

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [dragX, setDragX] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  // Removed fixed timer, now controlled by LoadingScreen callback

  const getFeed = async () => {
    // ... same logic ...
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ... handleSendRequest stays same ...
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  // ... onSwipe stays same ...
  const onSwipe = (direction, userId) => {
    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else {
      handleSendRequest("ignored", userId);
    }
  };

  if (!feed || showSplash) return <LoadingScreen onComplete={() => setShowSplash(false)} />;

  if (feed.length <= 0)
    return (
      <div className="flex h-screen overflow-hidden bg-black text-white relative items-center justify-center">

        {/* Stacked RANDOMDEV watermark */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
          {["RANDOMDEV", "RANDOMDEV", "RANDOMDEV", "RANDOMDEV", "RANDOMDEV"].map((word, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[clamp(80px,12vw,160px)] font-black uppercase tracking-tighter leading-none"
              style={{
                color: "rgba(255,255,255,0.05)",
                fontFamily: "'Space Grotesk', sans-serif",
                marginLeft: i % 2 === 0 ? "0px" : "-60px",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Subtle green center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,120,70,0.15) 0%, transparent 80%)",
          }}
        />

        {/* Centered message */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
            <FaUndo className="text-2xl text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white font-space tracking-tight">That's everyone!</h1>
          <p className="text-zinc-500 font-poppins text-sm max-w-xs">
            You've seen all the developers. Check back later for more connections.
          </p>
        </div>
      </div>
    );


  // We only render the top 2 cards for performance and stacking effect
  const visibleCards = feed.slice(0, 2).reverse();

  return (
    <div className="flex bg-black h-screen overflow-hidden text-white">
      {/* Main Feed Column */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">

        {/* ── RANDOMDEV Watermark Text Background ── */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
          {["RANDOMDEV", "RANDOMDEV", "RANDOMDEV", "RANDOMDEV", "RANDOMDEV"].map((word, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[clamp(80px,12vw,160px)] font-black uppercase tracking-tighter leading-none"
              style={{
                color: "rgba(255,255,255,0.05)",
                fontFamily: "'Space Grotesk', sans-serif",
                marginLeft: i % 2 === 0 ? "0px" : "-60px",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Subtle radial green glow in center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,120,70,0.18) 0%, transparent 80%)",
          }}
        />

        {/* ── Card Stack ── */}
        <div className="relative w-full max-w-sm h-[600px] flex flex-col items-center justify-center z-10">
          <AnimatePresence>
            {feed.map((user, index) => {
              if (index > 1) return null;

              const isFront = index === 0;
              return (
                <Card
                  key={user._id}
                  user={user}
                  isFront={isFront}
                  onSwipe={(dir) => onSwipe(dir, user._id)}
                  setDragX={isFront ? setDragX : undefined}
                />
              );
            }).reverse()}
          </AnimatePresence>
        </div>

        {/* ── Action Buttons ── moved inside UserCard */}

      </div>
    </div>
  );
};

// Sub-component for individual card with animation logic
const Card = ({ user, isFront, onSwipe, setDragX }) => {
  const x = useMotionValue(0);
  // ... (keep usage of hooks) ...
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const interestedOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    // ... (keep existing logic) ...
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  const handleDrag = (event, info) => {
    if (setDragX) setDragX(info.offset.x);
  }

  return (
    <motion.div
      style={{
        width: "100%",
        maxWidth: 310,
        height: 530,
        x: isFront ? x : 0,
        y: isFront ? 0 : 0,
        rotate: isFront ? rotate : 0,
        zIndex: isFront ? 10 : 0,
        position: "absolute",
        cursor: isFront ? "grab" : "default",
      }}
      animate={{
        scale: 1,
        marginTop: isFront ? 0 : -20,
        opacity: 1,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      whileTap={{ cursor: "grabbing" }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className=" shadow-2xl overflow-hidden cursor-grab"
    >
      {/* Visual Overlay for Swipe Direction */}
      {isFront && (
        <>
          <motion.div
            style={{ opacity: interestedOpacity }}
            className="absolute top-8 left-8 z-20 border-4 border-green-500  px-4 py-1 transform -rotate-12 bg-black/20 backdrop-blur-sm"
          >
            <span className="text-green-500 font-bold text-2xl tracking-widest font-geometric">LIKE</span>
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 z-20 border-4 border-red-500  px-4 py-1 transform rotate-12 bg-black/20 backdrop-blur-sm"
          >
            <span className="text-red-500 font-bold text-2xl tracking-widest font-geometric">NOPE</span>
          </motion.div>
        </>
      )}

      <UserCard
        user={user}
        onLike={isFront ? () => onSwipe("right") : undefined}
        onPass={isFront ? () => onSwipe("left") : undefined}
      />
    </motion.div>
  );
};

export default Feed;