import Board from './Board';
import Filter from './Filter';

const Project = () => {
  return (
    <div className='grow z-10 overflow-auto bg-white flex flex-col'>
      <Filter />
      <Board />
    </div>
  );
};

export default Project;
