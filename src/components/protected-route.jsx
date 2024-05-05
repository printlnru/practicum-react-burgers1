import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProtectedRouteElement = ({ element }) => {
    const {login} = useSelector(store => store.auth);
    // const [isUserLoaded, setUserLoaded] = useState(false);

    // const init = async () => {
    //     await getUser();
    //     setUserLoaded(true);
    // };

    // useEffect(() => {
    //     init();
    // }, []);

    return login ? element : <Navigate to="/login" replace />;
}