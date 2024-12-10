export const Error = ({ error }) => {
  console.log("ahdsif");
  return (
    <div className="w-screen h-screen bg-primary bg-opacity-30 flex items-center justify-center gap-2">
      <div className="text-5xl text-white font-bold">{error.message}</div>
    </div>
  );
};
