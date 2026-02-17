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
      <div className="flex h-screen overflow-hidden bg-black text-white relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#073127]/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] text-center p-4 z-10">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full mb-4 border border-white/20 shadow-xl">
            <FaUndo className="text-4xl text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white font-geometric mb-2">That's everyone!</h1>
          <p className="text-gray-400 font-poppins text-lg">Check back later for more developers.</p>
        </div>
      </div>
    );

  // We only render the top 2 cards for performance and stacking effect
  const visibleCards = feed.slice(0, 2).reverse();

  return (
    <div className="flex bg-black h-screen overflow-hidden text-white">
      {/* Main Feed Column */}
      <div className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">

        {/* Animated Background Decor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#073127]/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

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

        {/* Buttons for explicit actions */}
        <div className="flex gap-8 mt-8 z-20">
          <button
            onClick={() => onSwipe("left", feed[0]._id)}
            className="w-16 h-16 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-lg text-red-500 hover:bg-red-500/20 hover:scale-110 transition-all cursor-pointer"
          >
            <FaTimes className="text-3xl" />
          </button>
          <button
            onClick={() => onSwipe("right", feed[0]._id)}
            className="w-16 h-16 bg-[#073127] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#0a4d3a] hover:scale-110 transition-all cursor-pointer shadow-emerald-900/50"
          >
            <FaHeart className="text-3xl" />
          </button>
        </div>
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
        maxWidth: 300, // Reduced from 340
        height: 480,   // Reduced from 520
        x: isFront ? x : 0,
        y: isFront ? 0 : 0,
        rotate: isFront ? rotate : 0,
        zIndex: isFront ? 10 : 0,
        position: "absolute",
        cursor: isFront ? "grab" : "default",
      }}
      animate={{
        scale: isFront ? 1 : 0.95,
        marginTop: isFront ? 0 : -20,
        opacity: isFront ? 1 : 0.5
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      whileTap={{ cursor: "grabbing" }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-3xl shadow-2xl overflow-hidden cursor-grab"
    >
      {/* Visual Overlay for Swipe Direction */}
      {isFront && (
        <>
          <motion.div
            style={{ opacity: interestedOpacity }}
            className="absolute top-8 left-8 z-20 border-4 border-green-500 rounded-lg px-4 py-1 transform -rotate-12 bg-black/20 backdrop-blur-sm"
          >
            <span className="text-green-500 font-bold text-2xl tracking-widest font-geometric">LIKE</span>
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 z-20 border-4 border-red-500 rounded-lg px-4 py-1 transform rotate-12 bg-black/20 backdrop-blur-sm"
          >
            <span className="text-red-500 font-bold text-2xl tracking-widest font-geometric">NOPE</span>
          </motion.div>
        </>
      )}

      <UserCard user={user} />
    </motion.div>
  );
};

export default Feed;