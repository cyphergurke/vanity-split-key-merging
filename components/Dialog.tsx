

const Dialog = ({ isOpen, setIsDialogOpen, privateKeyWIF, privQr, vaddress }: any) => {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(privateKeyWIF);
      alert('Private Key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full sm:w-2/3  lg:w-2/5 ">
        <div className=''>
          <div className='text-black text-lg'>
            <label className=' text-lg  font-bold'>
              Private Key WIF:
            </label>
            <div className='flex flex-col justify-center items-center'>
              <input
                className='font-semibold border w-full p-2 rounded-md'
                value={privateKeyWIF}
                disabled
              />
              <img className='ml-auto mr-auto' src={privQr} alt="PrivateKey" />

              <button
                className="bg-green-600 hover:bg-green-800 text-lg p-2 rounded-md"
                onClick={() => handleCopy()}>Copy Private Key to Clipboard</button>
            </div>
          </div>
          <div className='text-black text-lg'>
            <label className=' text-lg font-bold'>
              Bitcoin Address:
            </label>
            <p className='font-semibold'>
              {vaddress}
            </p>
          </div>
        </div>

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
