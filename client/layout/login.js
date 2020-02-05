import { connect } from 'react-redux';
import Login from '@/assets/components/Login';
import UserAction from '@/store/actions/user';

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit() {
      dispatch(UserAction.userLogin());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
