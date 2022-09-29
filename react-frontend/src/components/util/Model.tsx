import { motion } from 'framer-motion';

interface Props {
  children: JSX.Element;
  className?: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
}

const Model = (props: Props) => {
  const { onClose, onSubmit, children: ModelBody, className } = props;
  return (
    <div
      onClick={onClose}
      className='fixed top-0 left-0 w-screen h-screen bg-[#0d67cc40] overflow-auto z-10 grid place-items-center'
    >
      <motion.div
        className={`rounded-[4px] bg-white p-6 w-[90%] my-8 ${className ?? 'max-w-[31rem]'}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {ModelBody}
        {onSubmit && (
          <div className='flex justify-end mt-8 gap-x-3'>
            <button
              onClick={onClose}
              className='px-3 py-1 rounded-[3px] text-c-text-1 hover:bg-c-4'
            >
              cancel
            </button>
            <button onClick={onSubmit} className='btn'>
              Create
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Model;
