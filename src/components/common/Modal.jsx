const Modal = ({ isOpen, onClose, title, children }) => {
 
    // MODAL CLOSED
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        justify-center
        items-center
        z-50
      "
      onClick={onClose}
    >
      {/* MODAL BOX */}
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-xl
          shadow-lg
          p-6
          animate-modal
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-red-500
              text-xl
              cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div>{children}</div>
      </div>

      {/* ANIMATION */}
      <style>{`
        .animate-modal {
          animation: modalScale 0.2s ease;
        }

        @keyframes modalScale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
