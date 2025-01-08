import { useSelector } from '../../redux/hooks';

// components
import Favourite from '../favourite/favourite.component';
import Vote from '../votes/vote.component';

interface CatProps {
	id: string;
}

const Cat = (props: CatProps) => {
  const image = useSelector((state) => state.imageList.payload!.images).find(x => x.id === props.id);

  return (
    <div>
      <div className={`flex items-center justify-center shadow-md border rounded bg-black h-[602px]`}>
        {image !== undefined ?
          <img src={image.url}
            className={`max-h-[600px]`}
            alt="Cat" />
          : <p className='text-white'>Cat Not Found</p>
        }
      </div>

      {image !== undefined ?
        <div className='p-1'>
          <Vote imageId={image.id} />
          <Favourite imageId={image.id} />
        </div>
        : null
      }
    </div>
  );
}
export default Cat;