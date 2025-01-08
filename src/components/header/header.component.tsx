import { Link } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';

// images
import { ReactComponent as UserSVG } from '../../images/user.svg';
import { ReactComponent as UploadSVG } from '../../images/upload.svg';

// css
import "./header.component.scss";

const Header = () => {
  const user = useSelector((state) => state.user.payload!);

  return (
    <header>
      <Link to='/'><h1>CATS</h1></Link>

      <div className='user-panel'>
        <div className='mb-1'>
          <Link to='/user'>
            <UserSVG className='inline-block' stroke='#fff' />
            {user.id}
          </Link>
        </div>

        <div>
          <Link to='/upload'>
            <UploadSVG className='inline-block' stroke='#fff' />
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;