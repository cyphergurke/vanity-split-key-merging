"use client"

import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { mergeKeys } from '@/utils/keyMerging';
import { QrReader } from "react-qr-reader";
import ReactDOM from 'react-dom';
import QRCode from 'qrcode'
import { z } from 'zod';

import { isValidBitcoinAddress, isValidKey } from '@/utils/validation';
import MergeDialog from './MergeDialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';


const fieldSchemas: any = {
  vaddress: z.string().refine((value) => isValidBitcoinAddress(value), {
    message: 'Invalid Bitcoin address',
  }),
  privkey: z.string().refine((value) => isValidKey(value), {
    message: 'Invalid private key',
  }),
  partialkey: z.string().refine((value) => isValidKey(value), {
    message: 'Invalid partial private key',
  }),
};

const validationSchema = z.object(fieldSchemas);

const KeymergingComponent = ({ vaddress, partialkey }: any) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string } | null>(null);
  const [privateKeyWIF, setPrivateKeyWIF] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [privQr, setPrivQr] = useState('')
  const [formData, setFormData] = useState({
    vaddress: '',
    privkey: '',
    partialkey: '',
  });
  const [qrReaderVaddrOpen, setQrReaderVaddrOpen] = useState(false);
  const [qrReaderPrivOpen, setQrReaderPrivOpen] = useState(false);
  const [qrReaderPartPrivOpen, setQrReaderPartPrivOpen] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (vaddress && partialkey) {
      setFormData({ vaddress: vaddress, partialkey: partialkey, privkey: '' })
    }
  }, [vaddress, partialkey, setFormData])



  const qrReaderRefVaddr = useRef<HTMLDivElement | null>(null);
  const qrReaderRefPartPriv = useRef<HTMLDivElement | null>(null);
  const qrReaderRefPriv = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const result = fieldSchemas[name].safeParse(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (!result.success) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0].message,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };




  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setFormErrors({});
      validationSchema.parse(formData);
      const finalKey = await mergeKeys(
        formData.vaddress, formData.privkey, formData.partialkey
      )
      if (finalKey) {
        setPrivateKeyWIF(finalKey);
        setIsDialogOpen(true)
        const qrcode = await QRCode.toDataURL(finalKey);
        setPrivQr(qrcode)
      } else {
        setFormErrors({privkey: "invalid input"})
        setPrivateKeyWIF("Error: invalid input");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors = error.issues.reduce((acc, currentIssue) => {
          const fieldName = currentIssue.path[0];
          acc[fieldName] = currentIssue.message;
          return acc;
        }, {} as { [key: string]: string });
        setFormErrors(newErrors);
      }
      console.error('Form data is invalid:', error.errors);
    }
  };

  useEffect(() => {
    if (formData.partialkey || formData.privkey || formData.vaddress) {
      if (formData.partialkey && formData.privkey && formData.vaddress) {
        setFormErrors(null);
        setValid(true)
      }
    }
  }, [formData])


  const handleScan = async (name: string, data: any | null, ref: any) => {
    if (data && data.text.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: data.text,
      }));
      if (ref.current) {
        setQrReaderPartPrivOpen(false);
        setQrReaderVaddrOpen(false);
        setQrReaderPrivOpen(false);
        ReactDOM.unmountComponentAtNode(ref.current);
      }
    }
  }

  const openQrReader = (name: string, ref: any) => {
    if (name === 'vaddress' && qrReaderRefVaddr.current) {
      setQrReaderVaddrOpen(true);
    }
    if (name === 'partialkey' && qrReaderRefPartPriv.current) {
      setQrReaderPartPrivOpen(true);
    }
    if (name === 'privkey' && qrReaderRefPriv.current) {
      setQrReaderPrivOpen(true);
    }
    if (ref.current) {
      ReactDOM.render(
        <QrReader
          constraints={{ facingMode: "exact" }}
          scanDelay={30}
          onResult={(data: any) => handleScan(name, data, ref)}
        />,
        ref.current
      );
    }
  };

  const handleCancel = (ref: any) => {
    if (ref.current) {
      ReactDOM.unmountComponentAtNode(ref.current);
    }
    setQrReaderPartPrivOpen(false);
    setQrReaderVaddrOpen(false);
    setQrReaderPrivOpen(false);
  };



  return (
    <div className='flex-col h-full  bg-black  p-10 rounded-lg'>
      <div>
        <h1 className='text-white text-4xl text-center'>Split Key Merging</h1>
        <p className='text-center m-2 text-lg text-white'>
          Merge Split-Keys to get the final Private key of a vanity address.
        </p>
      </div>
      <div className={`${qrReaderVaddrOpen
        && qrReaderRefVaddr.current ? 'flex flex-col justify-center w-full' : ' hidden'}`}>
        <div ref={qrReaderRefVaddr}></div>
        <Button
          className='mx-auto'
          onClick={() => handleCancel(qrReaderRefVaddr)}>
          Cancel
        </Button>
      </div>
      <div className={`${qrReaderPartPrivOpen ? 'flex flex-col justify-center w-full' : ' hidden'}`}>
        <div ref={qrReaderRefPartPriv}></div>
        <Button
          className='mx-auto'
          onClick={() => handleCancel(qrReaderRefPartPriv)}>
          Cancel
        </Button>
      </div>
      <div className={`${qrReaderPrivOpen ? 'flex flex-col justify-center w-full' : ' hidden'}`} >
        <div ref={qrReaderRefPriv}></div>
        <Button
          className='mx-auto'
          onClick={() => handleCancel(qrReaderRefPriv)}>
          Cancel
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className={`${qrReaderVaddrOpen || qrReaderPrivOpen || qrReaderPartPrivOpen
          ? 'hidden' : 'flex flex-col gap-4 text-white'}`}>
          <div className='flex items-center'>
            <Label className='text-lg'>Vanity Address:</Label>
            <button type='button' onClick={() => openQrReader('vaddress', qrReaderRefVaddr)}>
              <AiOutlineQrcode className='ml-2 text-xl text-white' />
            </button>
          </div>

          <Input
            placeholder='Enter your vanity address'
            type='text'
            name='vaddress'
            className={`text-black p-2 rounded-lg ${formErrors && formErrors.vaddress ? 'border-red-400 border-4' : ''
              }`}
            value={formData.vaddress}
            onChange={handleChange}
          />
          {formErrors && formErrors.vaddress && <p className='text-red-300 text-lg text-center '>{formErrors.vaddress}</p>}

          <div className='flex items-center'>
            <Label className='text-center md:text-left lg:text-left text-lg'>Partial Private Key:</Label>
            <button type='button' onClick={() => openQrReader('partialkey', qrReaderRefPartPriv)}>
              <AiOutlineQrcode className='ml-2 text-xl text-white' />
            </button>
          </div>

          <Input
            placeholder="Enter your private key"
            type="text"
            name='partialkey'
            className={`text-black p-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
            value={formData.partialkey}
            onChange={handleChange}
          />
          {formErrors && formErrors.partialkey && <p className='text-red-400 text-lg text-center'>{formErrors.partialkey}</p>}

          <div className='flex items-center'>
            <Label className='text-center md:text-left lg:text-left text-lg'>Private Key:</Label>
            <button type='button' onClick={() => openQrReader('privkey', qrReaderRefPriv)}>
              <AiOutlineQrcode className='ml-2 text-xl text-white' />
            </button>
          </div>

          <Input
            placeholder="Enter your partial private key"
            type="text"
            name='privkey'
            className={`text-black p-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
            value={formData.privkey}
            onChange={handleChange}
          />
          {formErrors && formErrors.privkey && <p className='text-red-400 text-lg text-center'>{formErrors.privkey}</p>}

          <Button
            type="submit"
            disabled={formErrors !== null}
            className="
            bg-green-700 transition-all hover:bg-green-800 rounded-lg p-2 text-2xl">
            Merge
          </Button>
          <MergeDialog
            isOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            privateKeyWIF={privateKeyWIF}
            privQr={privQr}
            vaddress={formData.vaddress}
          />
        </div>
      </form>
    </div>
  );
}

export default KeymergingComponent
