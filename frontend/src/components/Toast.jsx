import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed bottom-0 left-0 right-0 z-50 p-2 bg-green-600 text-white text-center"
      : "fixed bottom-0 left-0 right-0 z-50 p-2 bg-red-600 text-white text-center";

  return (
    <div className={styles}>
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
};

export default Toast;