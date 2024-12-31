export const Error = ({ error }) => {
  return (
    <div className="w-screen h-screen bg-primary bg-opacity-30 flex items-center justify-center gap-2">
      <p className="text-xl md:text-4xl lg:text-5xl xl:text-7xl mx-4 text-center text-white font-bold">{error.message}</p>
    </div>
  );
};
