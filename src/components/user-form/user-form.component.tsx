import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { setUser } from '../../redux/slices/user';

const UserForm = () => {
  const user = useSelector((state) => state.user.payload!);
  const [userId, setUserId] = React.useState<string>(user.id.substring(1));
  const [message, setMessage] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();

  const focusInput = () => {
    inputRef.current!.focus();
  }

  const onChange = (userId: string) => {
    if (userId.length > 4) {
      userId = userId.substring(0, 4);
    }

    setUserId(userId);
  }

  const onSubmit = () => {
    if (userId.length !== 4 || parseInt(userId).toString().length !== 4) {
      setMessage('User Id must be four digits');
      setIsError(true);
      return;
    }

    setMessage('');
    setIsError(false);

    // no loader as it's not calling an API
    dispatch(setUser(`W${userId}`));
    setMessage('Successfully updated');
  }

  return (
    <div className='form-wrapper inline-block border p-12 rounded mt-4'>
      <div className='inline-block'>
        <p className='mb-2'>Your user id is <span className='whitespace-nowrap'>four digits</span></p>

        <div className='text-left mb-4'>
          <label
            htmlFor='userId'
            className='block text-sm'
            >User Id</label>

          <div className='border bg-white p-2 rounded sm:rounded-r-none'>
            <span
              className='inline-block pr-1 cursor-default'
              onClick={focusInput}
              >W</span>
            <input
              id='userId'
              type='number'
              value={userId}
              onChange={(e) => onChange(e.target.value)}
              size={12}
              autoFocus
              ref={inputRef} />
          </div>
        </div>
      </div>

      <button
        className='block sm:inline-block mx-auto text-white bg-dark-blue p-2 rounded border hover:bg-white hover:text-dark-blue sm:rounded-l-none'
        onClick={onSubmit}
        >Submit</button>

      {message ?
        <p className={isError ? 'text-red' : undefined}>
          {message}
        </p>
        : null }
    </div>
  );
}
export default UserForm;