
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import Head from 'next/head';
import CommonHeader from '@/components/header';
import CommonFooter from '@/components/footer';

export default function ReachUs() {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [qrData, setQrData] = useState<string>('');
  const [isValidNumber, setIsValidNumber] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsValidNumber(/^\d{8}$/.test(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQrData(mobileNumber);
    setSubmitted(true);
    setMobileNumber('');
  };

  return (
    <div className="container mx-auto">
        <Head>
            <title>Welcome to P&G | Reach Us</title>
            <meta name="description" content="P&G Reach Us" />
            <meta name="keywords" content="P&G" />
            <meta name="author" content="P&G" />
            <link rel="icon" href="/images/P_G_Logo_RGB.svg" />
        </Head>
        <CommonHeader/>
            <>
            <h1 className="text-3xl font-bold dark:text-white">Reach Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="text"
                            value={mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter 8-digit mobile number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                        />
                    </div>
                </div>
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300" type="submit" disabled={!isValidNumber || !mobileNumber}>Generate QR Code</button>
            </form>
            <div className="mt-5">
                {(qrData && submitted) && (
                <>
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span className="font-medium">Success!</span> Your QR code is generated successfully, please scan it.
                    </div>
                    <div className="flex justify-center items-center">
                        <QRCode
                            value={`tel:${qrData}`}
                            logoImage="/images/P_G_Logo_RGB.svg"
                            size={256}
                        />
                    </div>
                </>
                )}
            </div>
        </>
        <CommonFooter/>
    </div>
  );
};
