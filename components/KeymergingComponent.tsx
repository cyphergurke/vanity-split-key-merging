"use client"

import { mergeKeys } from '@/utils/keyMerging';
import { isValidBitcoinAddress, isValidKey } from '@/utils/validation';
import React, { useState } from 'react';
import { z } from 'zod';
import Dialog from './Dialog';
import QRCode from 'qrcode'
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

const KeymergingComponent = () => {
  const [privateKeyWIF, setPrivateKeyWIF] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [privQr, setPrivQr] = useState('')
  const [formData, setFormData] = useState({
    vaddress: '',
    privkey: '',
    partialkey: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
        [name]: result.error.issues[0].message, // Assuming we take the first error message
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
      // Validate the form data against the schema
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
        setPrivateKeyWIF("Error: invalid input");
      }
    } catch (error: any) {
      // If validation fails, update the formErrors state
      if (error instanceof z.ZodError) {
        // Transform ZodError into a more friendly format for rendering
        const newErrors = error.issues.reduce((acc, currentIssue) => {
          // Assuming the path is always an array with at least one element
          const fieldName = currentIssue.path[0]; // This gets the field name
          acc[fieldName] = currentIssue.message; // Sets the error message for the field
          return acc;
        }, {} as { [key: string]: string });
        setFormErrors(newErrors);
      }
      console.error('Form data is invalid:', error.errors);
    }
  };

  const generateQRCodes = (qrstr: string) => {
    const qrcode = QRCode.toDataURL(qrstr);
    return qrcode;
  }


  return (
    <div className='flex-col h-full  bg-black opacity-70 p-10 rounded-lg'>
      <div>
        <h1 className='text-white text-4xl text-center'>Split Key Merging</h1>
        <p className='text-center mt-2 text-lg text-white'>
          Merge Split-Keys to get the final Private key of a vanity address.
        </p>
      </div>

      {/* Your submit button */}
      <form onSubmit={handleSubmit} className="">
        <div className='flex flex-col m-5 gap-4 text-white'>
          <Label className=' text-lg'>Vanity Address:</Label>
          <Input
            type="text"
            name='vaddress'
            className={`text-black p-2 m-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
            value={formData.vaddress}
            onChange={handleChange}
          />
          {formErrors && formErrors.vaddress && <p className='text-red-300 text-2xl text-center '>{formErrors.vaddress}</p>}
          <Label className=' text-lg'>Private Key:</Label>
          <Input
            type="text"
            name='privkey'
            className={`text-black p-2 m-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
            value={formData.privkey}
            onChange={handleChange}
          />
          {formErrors && formErrors.privkey && <p className='text-red-400 text-xl text-center'>{formErrors.privkey}</p>}
          <Label className=' text-lg'>Partial Private Key:</Label>
          <Input
            type="text"
            name='partialkey'
            className={`text-black p-2 m-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
            value={formData.partialkey}
            onChange={handleChange}
          />
          {formErrors && formErrors.partialkey && <p className='text-red-400 text-xl text-center'>{formErrors.partialkey}</p>}

          {/*           <Button
            type="submit"
            className={`
            bg-green-700 transition-all hover:bg-green-800 rounded-lg p-2 text-2xl
            ${formErrors
                && formErrors.partialkey
                || formErrors.privkey
                || formErrors.vaddress ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Merge
          </Button> */}
          <Dialog
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
