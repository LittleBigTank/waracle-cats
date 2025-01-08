import React, { useCallback, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { useSelector } from '../redux/hooks';
import { fetchImages } from '../redux/slices/image-list';

// components
import Cat from '../components/cat/cat.component';
import Loader from '../components/loader/loader.component';

// models
import ImageModel from '../models/image.model';

// images
import { ReactComponent as ErrorSVG } from '../images/error.svg';
import { fetchFavourites } from '../redux/slices/favourite';
import { fetchVotes } from '../redux/slices/vote';

const HomePage = () => {
  const imageList = useSelector((state) => state.imageList);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingError, setLoadingError] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (imageList.payload) {
      return;
    }

    dispatch(fetchImages(0));
    dispatch(fetchFavourites());
    dispatch(fetchVotes());
	}, [dispatch]);

  useEffect(() => {
    setLoadingError(false);
    if (imageList.loading) {
      return;
    }

    if (imageList.error || !imageList.payload) {
      setIsLoading(false);
      setLoadingError(true);
      return;
    }

    setIsLoading(false);
    setHasMore(imageList.payload.more);
    handleScroll();
	}, [imageList]);

  const handleScroll = useCallback(() => {
    const pageBottom = (window.innerHeight + document.documentElement.scrollTop) > (document.documentElement.scrollHeight -20);
    if (!hasMore
        || !pageBottom
        || loadingError
        || isLoading) {
      return;
    }

    setIsLoading(true);
    dispatch(fetchImages(page + 1));
    setPage(page + 1);
  }, [hasMore, isLoading, loadingError]);

  useEffect(() => {
    const listenEvents = ['scroll', 'resize'];
    listenEvents.forEach(function(e) {
      window.addEventListener(e, handleScroll);
    });

    return () => {
      listenEvents.forEach(function(e) {
        window.removeEventListener(e, handleScroll);
      });
    }
  }, [handleScroll]);

  const reloadImages = () => {
    setLoadingError(false);
    setIsLoading(true);
    dispatch(fetchImages(page));
  }

  return (
    <>
      <Helmet>
        <title>Cats</title>
      </Helmet>
      <main>
        <h2 className='sr-only'>Cats List</h2>

        {imageList.payload && imageList.payload.images ?
          imageList.payload.images.length === 0 ?
            <p>No Cats</p> :
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {imageList.payload.images.map((image: ImageModel, i: number) => {
                return (
                  <Cat id={image.id} key={i} />
                );
              })}
            </div>
          : null
        }

        {isLoading
          ? <div className='my-8'><Loader size={60} /></div>
          : null
        }

        {loadingError
          ? <div className='my-4 text-center'>
            <ErrorSVG
              className='cursor-pointer inline-block h-[120px] stroke-red'
              onClick={reloadImages} />
          </div>
          : null
        }
      </main>
    </>
  );
}

export default HomePage;