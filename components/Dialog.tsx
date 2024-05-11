import { DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner"
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const Dialog = ({ isOpen, setIsDialogOpen, privateKeyWIF, privQr, vaddress }: any) => {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(privateKeyWIF);
      toast('Private Key copied to clipboard', {
        description: 'This is not a save practice',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Merge</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full sm:w-2/3  lg:w-2/5 ">
            <div className=''>
              <div className='text-black text-lg'>
                <Label className=' text-lg  font-bold'>
                  Private Key WIF:
                </Label>
                <div className='flex flex-col justify-center items-center'>
                  <input
                    className='font-semibold border w-full p-2 rounded-md'
                    value={privateKeyWIF}
                    disabled
                  />
                  <img className='ml-auto mr-auto' src={privQr} alt="PrivateKey" />

                  <Button
                    className="bg-green-600 hover:bg-green-800 text-lg p-2 rounded-md"
                    onClick={() => handleCopy()}>Copy Private Key to Clipboard</Button>
                </div>
              </div>
              <div className='text-black text-lg'>
                <Label className=' text-lg font-bold'>
                  Bitcoin Address:
                </Label>
                <p className='font-semibold'>
                  {vaddress}
                </p>
              </div>
            </div>

            <div className="flex   justify-center items-center">
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

export default Dialog;
