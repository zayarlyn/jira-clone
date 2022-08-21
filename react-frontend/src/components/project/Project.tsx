import Board from './Board';
import BreadcrumbsAndDetails from './BreadcrumbsAndDetails';
import Filter from './Filter';

const Project = () => {
  return (
    <div className='grow z-10 overflow-auto bg-white flex flex-col'>
      <BreadcrumbsAndDetails/>
      <Filter />
      <Board />
    </div>
  );
};

export default Project;
