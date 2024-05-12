"use client"

import { toast } from "sonner"
import { DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription, Dialog } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import Image from "next/image";

const MergeDialog = ({ isOpen, setIsDialogOpen, privateKeyWIF, privQr, vaddress }: any) => {

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!dialogRef?.current?.contains(event.target as Node)) {
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
    <Dialog open={isOpen} >
      <DialogContent
        className="flex flex-col justify-center w-[90%] md:max-w-[475px] lg:max-w-[475px] mx-auto"
        ref={dialogRef}
      >
        <DialogHeader>
          <DialogTitle>Merge</DialogTitle>
          <DialogDescription>
            Import the Private Key into your Wallet.
          </DialogDescription>
        </DialogHeader>
        <Label className=' text-lg  font-bold'>
          Private Key WIF:
        </Label>
        <p className='font-semibold text-wrap break-words w-full p-2 '>
          {privateKeyWIF}
        </p>
        <Image width={200} height={200} className='ml-auto mr-auto' src={privQr} alt="Private Key" />
        <Button
          className="bg-green-600 hover:bg-green-800 text-md   "
          onClick={() => handleCopy()}>
          Copy Private Key to Clipboard
        </Button>
        <Label className=' text-lg font-bold'>
          Bitcoin Address:
        </Label>
        <p className='font-semibold text-wrap break-words'>
          {vaddress}
        </p>
        <DialogFooter>
          <Button className="mx-auto" onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MergeDialog;
