import React from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface KeyMergingFormProps {
    formData: any;
    formErrors: { [key: string]: string } | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    openQrReader: (field: string) => void;
}

const KeyMergingForm: React.FC<KeyMergingFormProps> = ({
    formData,
    formErrors,
    onChange,
    onSubmit,
    openQrReader,
}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-white">
            <div className='flex items-center'>
                <Label className='text-lg'>Vanity Address:</Label>
                <button type='button' onClick={() => openQrReader('vaddress')}>
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
                onChange={onChange}
            />
            {formErrors && formErrors.vaddress && <p className='text-red-300 text-lg text-center '>{formErrors.vaddress}</p>}

            <div className='flex items-center'>
                <Label className='text-center md:text-left lg:text-left text-lg'>Partial Private Key:</Label>
                <button type='button' onClick={() => openQrReader('partialkey')}>
                    <AiOutlineQrcode className='ml-2 text-xl text-white' />
                </button>
            </div>
            <Input
                placeholder="Enter your partial private key"
                type="text"
                name='partialkey'
                className={`text-black p-2 rounded-lg ${formErrors && formErrors.partialkey ? 'border-red-400 border-4' : ''}`}
                value={formData.partialkey}
                onChange={onChange}
            />
            {formErrors && formErrors.partialkey && <p className='text-red-400 text-lg text-center'>{formErrors.partialkey}</p>}

            <div className='flex items-center'>
                <Label className='text-center md:text-left lg:text-left text-lg'>Private Key:</Label>
                <button type='button' onClick={() => openQrReader('privkey')}>
                    <AiOutlineQrcode className='ml-2 text-xl text-white' />
                </button>
            </div>
            <Input
                placeholder="Enter your private key"
                type="text"
                name='privkey'
                className={`text-black p-2 rounded-lg ${formErrors && formErrors.privkey ? 'border-red-400 border-4' : ''}`}
                value={formData.privkey}
                onChange={onChange}
            />
            {formErrors && formErrors.privkey && <p className='text-red-400 text-lg text-center'>{formErrors.privkey}</p>}

            { }
            <Button
                type="submit"
                disabled={Object.keys(formErrors || {}).length > 0}
                className="bg-green-700 transition-all hover:bg-green-800 rounded-lg p-2 text-2xl"
            >
                Merge {JSON.stringify(Object.keys(formErrors || {}).values)}
            </Button>
        </form>
    );
};

export default KeyMergingForm;
