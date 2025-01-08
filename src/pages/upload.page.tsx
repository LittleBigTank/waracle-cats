import { Helmet } from "react-helmet";
import UploadForm from '../components/upload-form/upload-form.component';

const UploadPage = () => {
  return (
    <>
      <Helmet>
        <title>Cats - Upload</title>
      </Helmet>
      <main>
        <h2 className='sr-only'>Upload</h2>
        <UploadForm />
      </main>
    </>
  );
}

export default UploadPage;