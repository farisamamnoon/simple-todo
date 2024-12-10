import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const Notification = ({ isActive, message, onClose }) => {
  return (
    <>
      <div
        className={`fixed right-4 top-8 bg-pink-300/80 rounded-md py-4 pl-8 pr-10 ${
          !isActive && "hidden"
        } transition-all duration-200`}
      >
        {onClose && (
          <div className="absolute top-2 right-2">
            <X size={15} strokeWidth={3} onClick={onClose} />
          </div>
        )}
        {message}
      </div>
    </>
  );
};

export const useNotification = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let timeout;
    if (isActive === true) {
      timeout = setTimeout(() => setIsActive(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isActive]);

  const closeNotification = () => {
    setIsActive(false);
    setMessage("");
  };

  const notify = (message) => {
    setIsActive(true);
    setMessage(message);
  };

  return { isActive, message, notify, closeNotification };
};
