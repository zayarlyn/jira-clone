import Board from './Board';
import Details from './Details';

import Filter from './Filter';

const Project = () => {
  return (
    <div className='flex grow flex-col'>
      <Details />
      <Filter />
      <Board />
    </div>
  );
};

export default Project;
