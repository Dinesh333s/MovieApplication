import { Outlet} from 'react-router-dom';
import Menu from '../SignInPageData/Menu';


function RootLayout() {

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;