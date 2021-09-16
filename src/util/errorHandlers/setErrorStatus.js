import store from '../../redux/store';
import { setStatus } from '../../redux/actions/actions';

const setErrorStatus = (status) => {
    store.dispatch(setStatus(status));
}

export default setErrorStatus