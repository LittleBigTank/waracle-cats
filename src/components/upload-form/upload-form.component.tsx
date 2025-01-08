import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../redux/slices/image-list';

// helpers
import { isRejected } from '../../helpers/function.helper';

// components
import Loader from '../loader/loader.component';

// models
import DispatchResponseInterface from '../../models/interfaces/DispatchResponse.interface';

const UploadForm = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isSending, setIsSending] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);
  const allowedTypes = ['image/jpeg'];
  const dispatch = useDispatch<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    if (!file) {
      setMessage('Please select a file');
      setIsError(true);
      return;
    }

    setMessage('');
    setIsError(false);

    if (allowedTypes.indexOf(file.type) < 0) {
      setMessage('Invalid file type');
      setIsError(true);
      return;
    }

    setIsSending(true);
    dispatch(uploadImage(file!))
      .then((data: DispatchResponseInterface) => {
        setIsSending(false);

        if (isRejected(data.type)) {
          setMessage('Uploaded failed');
          setIsError(true);
        } else {
          setMessage('Uploaded successfully');
          setIsError(false);
        }
      });
  }

  return (
    <div className='form-wrapper inline-block border py-12 px-6 rounded mt-4 sm:px12'>
      <div className='inline-block'>
        <p className='mb-2'>Please upload your photo as <span className='whitespace-nowrap'>a jpg</span></p>

        <div className='text-left mb-4'>
          <label
            htmlFor='file'
            className='block text-sm'
            >File</label>

          <div className='border bg-white p-2 rounded sm:rounded-r-none'>
            <input 
              id="file"
              type="file"
              className='w-[230px] overflow-hidden md:w-[360px]'
              onChange={handleFileChange}
              accept=".jpg,.jpeg" />
          </div>
        </div>
      </div>

      {isSending
        ? <div className='sm:inline-block w-[67px]'><Loader size={30} /></div>
        : <button
            className='block sm:inline-block mx-auto text-white bg-dark-blue p-2 rounded border hover:bg-white hover:text-dark-blue sm:rounded-l-none'
            onClick={onSubmit}>
              <span className='block py-[3px]'>Submit</span>
          </button>
      }

      {message ?
        <p className={isError ? 'text-red' : undefined}>
          {message}
        </p>
        : null }
    </div>
  );
}
export default UploadForm;