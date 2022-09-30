import { useState } from 'react';
import Model from './Model';

interface Props {
  onClose: () => void;
  onSubmit: () => Promise<any>;
}

const ConfirmModel = (props: Props) => {
  const { onClose, onSubmit } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(true);
    onClose();
  };

  return (
    <Model onClose={onClose} className='max-w-[18rem]'>
      <>
        <span>Are you sure you want to delete?</span>
        <div className='flex justify-center gap-x-6 mt-8'>
          <button onClick={onClose} className='btn bg-transparent text-black hover:bg-green-100'>
            cancel
          </button>
          <button onClick={handleDelete} className='btn bg-red-600 hover:bg-red-700'>
            Delete
          </button>
        </div>
      </>
    </Model>
  );
};

export default ConfirmModel;
