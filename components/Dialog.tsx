
const Dialog = ({ isOpen, setIsDialogOpen, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-2/3 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {children}

        <div className="flex   justify-center items-center">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsDialogOpen(false)}
          >
          Close
        </button>
          </div>
      </div>
    </div>
  );
};

export default Dialog;
