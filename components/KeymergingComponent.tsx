"use client"

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import QrReader from './QrReader';
import KeyMergingForm from './KeyMergingForm';
import { mergeKeys } from '@/utils/keyMerging';
import QRCode from 'qrcode';
import MergeDialog from './MergeDialog';
import { isValidBitcoinAddress, isValidKey } from '@/utils/validation';

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

const Keymerging = ({ vaddress, partialkey }: any) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [privateKeyWIF, setPrivateKeyWIF] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [privQr, setPrivQr] = useState('');
  const [formData, setFormData] = useState({
    vaddress: '',
    privkey: '',
    partialkey: '',
  });
  const [qrReaderField, setQrReaderField] = useState<string | null>(null);

  useEffect(() => {
    if (vaddress && partialkey) {
      setFormData({ vaddress, partialkey, privkey: '' });
    }
  }, [vaddress, partialkey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const result = fieldSchemas[name].safeParse(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => {
      const updatedErrors = { ...prev };

      if (!result.success) {
        updatedErrors[name] = result.error.issues[0].message;
      } else {
        delete updatedErrors[name]; // Remove the key if there's no error
      }

      return updatedErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormErrors({});
      validationSchema.parse(formData);
      const finalKey = await mergeKeys(
        formData.vaddress, formData.privkey, formData.partialkey
      );
      if (finalKey) {
        setPrivateKeyWIF(finalKey);
        setIsDialogOpen(true);
        const qrcode = await QRCode.toDataURL(finalKey);
        setPrivQr(qrcode);
      } else {
        setFormErrors({ privkey: "invalid input" });
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

  const handleScan = (data: any) => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        [qrReaderField!]: data,
      }));
      setQrReaderField(null);
    }
  };

  const handleCancel = () => {
    setQrReaderField(null);
  };

  return (
    <div className='flex-col h-full  bg-black  p-10 rounded-lg'>
      <div>
        <h1 className='text-white text-4xl text-center'>Split Key Merging</h1>
        <p className='text-center m-2 text-lg text-white'>
          Merge Split-Keys to get the final Private key of a vanity address.
        </p>
      </div>
      {qrReaderField && (
        <QrReader onScan={handleScan} onCancel={handleCancel} />
      )}
      {!qrReaderField && (
        <KeyMergingForm
          formData={formData}
          formErrors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          openQrReader={setQrReaderField}
        />
      )}
      <MergeDialog
        isOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        privateKeyWIF={privateKeyWIF}
        privQr={privQr}
        vaddress={formData.vaddress}
      />
    </div>
  );
};

export default Keymerging;
