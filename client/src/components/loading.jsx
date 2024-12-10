export const Loading = () => {
  return (
    <div className="w-screen h-screen bg-pink-300/50 bg-opacity-30 flex items-center justify-center gap-2">
      <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
    </div>
  );
};
