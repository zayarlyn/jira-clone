import { useState } from 'react';
import toast from 'react-hot-toast';
import Model from './Model';

interface Props {
  msg?: string;
  toastMsg: string;
  onClose: () => void;
  onSubmit: () => Promise<any>;
}

const ConfirmModel = (props: Props) => {
  const { onClose, onSubmit, msg, toastMsg } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onSubmit();
    toast(toastMsg);
    onClose();
  };

  return (
    <Model onClose={onClose} className='max-w-[18rem]'>
      <>
        <span>Are you sure you want to {msg ?? 'delete'}?</span>
        <div className='mt-8 flex justify-center gap-x-6'>
          <button
            onClick={onClose}
            className='btn bg-transparent text-black hover:bg-green-100 active:bg-green-200'
          >
            cancel
          </button>
          <button onClick={handleDelete} className='btn bg-red-600 hover:bg-red-700'>
            {loading ? 'proceeding ... ' : 'Delete'}
          </button>
        </div>
      </>
    </Model>
  );
};

export default ConfirmModel;
