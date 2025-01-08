import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { fetchFavourites, addFavourite, removeFavourite } from '../../redux/slices/favourite';

// helpers
import { isRejected } from '../../helpers/function.helper';

// components
import Loader from '../loader/loader.component';

// models
import DispatchResponseInterface from '../../models/interfaces/DispatchResponse.interface';

// images
import { ReactComponent as HeartSVG } from '../../images/heart.svg';
import { ReactComponent as ErrorSVG } from '../../images/error.svg';

interface FavouriteProps {
	imageId: string;
}

const Favourite = (props: FavouriteProps) => {
  const user = useSelector((state) => state.user.payload!);
  const favourites = useSelector((state) => state.favourites);
  const [favouriteId, setFavouriteId] = React.useState<number | null>(null);
  const [loadingError, setLoadingError] = React.useState<boolean>(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setLoadingError(false);

    if (favourites.loading) {
      return;
    }
  
    if (favourites.error || !favourites.payload) {
      setLoadingError(true);
      return;
    }
  
    const favouriteObj = favourites.payload!.find(x => x.imageId === props.imageId && x.userId === user.id);
    setFavouriteId(favouriteObj ? favouriteObj.id : -1);
  }, [props, user, favourites]);

  const clickRemove = () => {
    setFavouriteId(null);

    dispatch(removeFavourite(favouriteId!))
    .then((data: DispatchResponseInterface) => {
      if (isRejected(data.type))
        setLoadingError(true);
    });
  }

  const clickAdd = () => {
    setFavouriteId(null);

    dispatch(addFavourite({imageId: props.imageId, userId: user.id}))
    .then((data: DispatchResponseInterface) => {
      if (isRejected(data.type))
        setLoadingError(true);
    });
  }

  const reload = () => {
    setLoadingError(false);
    setFavouriteId(null);
    dispatch(fetchFavourites());
  }

  return (
    <div className='float-right'>
      {!loadingError
        ? favouriteId !== null
          ? favouriteId > 0
            ? <HeartSVG
                className='cursor-pointer stroke-red fill-red h-6'
                onClick={clickRemove} />
            : <HeartSVG
                className='cursor-pointer stroke-dark-blue h-6'
                onClick={clickAdd} />
          : <Loader size={20} />
        : <ErrorSVG
            className='cursor-pointer stroke-red h-6'
            onClick={reload} />
      }
    </div>
  );
}
export default Favourite;