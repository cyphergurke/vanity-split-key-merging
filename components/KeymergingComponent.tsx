"use client"

import { mergeKeys } from '@/utils/keyMerging';
import { isValidBitcoinAddress, isValidKey } from '@/utils/validation';
import React, { useState } from 'react';
import { z } from 'zod';

export const validationSchema = z.object({
  address: z.string().refine((value) => isValidBitcoinAddress(value), {
    message: 'Invalid Bitcoin address',
  }),
  privkey: z.string().refine((value) => isValidKey(value), {
    message: 'Invalid private key',
  }),
});

const KeymergingComponent = () => {
  const [privateKeyWIF, setPrivateKeyWIF] = useState<string>();
  const [formData, setFormData] = useState({
    address: '',
    privkey: '',
    partialkey: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      // Validate the form data against the schema
      validationSchema.parse(formData);
      onMerging(formData)
      // If validation passes, proceed with your form submission logic
      console.log('Form data is valid:', formData);
    } catch (error: any) {
      // If validation fails, update the formErrors state
      setFormErrors(error.errors);
      console.error('Form data is invalid:', error.errors);
    }
  };

  const onMerging = (formData: any) => {
    console.log('onMerging');
    const finalKey = mergeKeys(
      formData.address, formData.privkey, formData.partialkey
    )
    if (finalKey) {
      setPrivateKeyWIF(finalKey);
    } else {
      setPrivateKeyWIF("Error: invalid input");
    }
  }
  return (
    <div className='flex-col bg-gray-400'>
     
      {formErrors && (
        <ul>
          {Object.values(formErrors).map((error, index) => (
            <li key={index}>error</li>
          ))}
        </ul>
      )}

      {/* Your submit button */}
      <form onSubmit={handleSubmit}>
        <div className='flex-col m-5'>

        <input
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          value={formData.privkey}
          onChange={handleChange}
          />
        <input
          type="text"
          value={formData.partialkey}
          onChange={handleChange}
        />
        <button type="submit">Merge</button>
          </div>
      </form>
      <div>
        Output Private Key WIF: <span>{privateKeyWIF}</span>
      </div>
      <div>
        Output Bitcoin Address: <span>{formData.address}</span>
      </div>
    </div>
  );
}

export default KeymergingComponent


/*
const [pubAddress, setPubAddress] = useState('1btcxcVyqf8jfkscQmYPBGRurZQG8PMtb');
const [partialPriv, setPartialPriv] = useState('Kyc35db3dauFrVLSDYWgmrqAQCEcPf1Xnkv9QbGWYboE3FkV7rMv');
const [priv, setPriv] = useState('KzNCSsMnhf34GBt91tSbgDAC2YKt6cuX2XDiRzZtC487koBUHh5N'); */

/* const onMerging = () => {
  console.log('onMerging');
  const finalKey = mergeKeys(pubAddress, priv, partialPriv)
  if (finalKey) {
    setPrivateKeyWIF(finalKey);
  } else {
    setPrivateKeyWIF("Error: invalid input");
  }
}
const validateAddress = (address: string) => {
  const validAddr = isValidBitcoinAddress(address)
  console.log( address, validAddr);
}; */