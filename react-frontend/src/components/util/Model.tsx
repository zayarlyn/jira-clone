import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface Props {
  children: JSX.Element;
  className?: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
}

const Model = (props: Props) => {
  const { onClose, onSubmit, isLoading, children: ModelBody, className } = props;

  return createPortal(
    <div
      onClick={onClose}
      className='fixed top-0 left-0 z-20 grid h-screen w-screen place-items-center overflow-auto bg-[#0d67cc40]'
    >
      <motion.div
        className={`my-8 w-[90%] rounded-[4px] bg-white p-6 ${className ?? 'max-w-[31rem]'}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {ModelBody}
        {onSubmit && (
          <div className='mt-8 flex justify-end gap-x-3'>
            <button onClick={onClose} className='rounded-[3px] px-3 py-1 text-c-1 hover:bg-c-3'>
              cancel
            </button>
            <button onClick={onSubmit} className='btn'>
              {isLoading ? 'creating ...' : 'Create'}
            </button>
          </div>
        )}
      </motion.div>
    </div>,
    document.getElementById('portal') as Element
  );
};

export default Model;
