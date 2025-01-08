import { Helmet } from "react-helmet";
import UserForm from '../components/user-form/user-form.component';

const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>Cats - User</title>
      </Helmet>
      <main>
        <h2 className='sr-only'>User</h2>
        <UserForm />
      </main>
    </>
  );
}

export default UserPage;