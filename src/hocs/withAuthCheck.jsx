import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { checkUserAuthStatus } from '../services/features/user/selectors';
import Preloader from '../components/preloader/preloader';

function WithAuthCheck({ component }) {
  const isAuthChecked = useSelector(checkUserAuthStatus);

  return isAuthChecked ? component : <Preloader />;
}

WithAuthCheck.propTypes = {
  component: PropTypes.node.isRequired,
};

export default WithAuthCheck;
