import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { fetchVotes, setVote } from '../../redux/slices/vote';

// helpers
import { isRejected } from '../../helpers/function.helper';

// components
import Loader from '../loader/loader.component';

// models
import DispatchResponseInterface from '../../models/interfaces/DispatchResponse.interface';

// images
import { ReactComponent as VoteDownSVG } from '../../images/vote-down.svg';
import { ReactComponent as VoteUpSVG } from '../../images/vote-up.svg';
import { ReactComponent as ErrorSVG } from '../../images/error.svg';

interface VotesProps {
	imageId: string;
}

const Votes = (props: VotesProps) => {
  const user = useSelector((state) => state.user.payload!);
  const votes = useSelector((state) => state.votes);
  const [voteCountUser, setVoteCountUser] = React.useState<number | null>(null);
  const [voteCountTotal, setVoteCountTotal] = React.useState<number | null>(null);
  const [loadingError, setLoadingError] = React.useState<boolean>(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setLoadingError(false);
    
    if (votes.loading) {
      return;
    }
  
    if (votes.error || !votes.payload) {
      console.log(votes.error);
      setLoadingError(true);
      return;
    }
  
    const allVotes = votes.payload!.filter(x => x.imageId === props.imageId) || [];
    const userVote = allVotes.find(x => x.userId === user.id);
    setVoteCountTotal(allVotes.reduce((sum, v) => sum + v.value, 0));
    setVoteCountUser(userVote?.value ?? 0);
  }, [votes, props, user]);

  const clickUpVote = () => {
    setVoteCountTotal(null);

    dispatch(setVote({imageId: props.imageId, userId: user.id, value: voteCountUser! + 1}))
    .then((data: DispatchResponseInterface) => {
      if (isRejected(data.type))
        setLoadingError(true);
    });
  }
  
  const clickDownVote = () => {
    setVoteCountTotal(null);

    dispatch(setVote({imageId: props.imageId, userId: user.id, value: voteCountUser! -1}))
    .then((data: DispatchResponseInterface) => {
      if (isRejected(data.type))
        setLoadingError(true);
    });
  }

  const reload = () => {
    setLoadingError(false);
    setVoteCountTotal(null);
    dispatch(fetchVotes());
  }

  return (
    <div className='float-left'>
      {!loadingError
        ? voteCountTotal !== null
          ? <>
              <VoteUpSVG className='inline-block cursor-pointer stroke-dark-blue h-6 -mt-1'
                onClick={clickUpVote} />
              <div className='inline-block px-1 leading-5'>
                <span>{voteCountTotal}</span>
              </div>
              <VoteDownSVG className='inline-block cursor-pointer stroke-dark-blue h-6 -mt-1'
                onClick={clickDownVote} />
            </>
          : <div className='inline-block px-1'><Loader size={20} /></div>
        : <ErrorSVG
            className='cursor-pointer stroke-red h-6'
            onClick={reload} />
      }
    </div>
  );
}
export default Votes;