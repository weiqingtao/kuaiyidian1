import { StackNavigator } from 'react-navigation';
import Index from '../index'
import Login from '../users/Login'

export default  Router = StackNavigator({
  index: { screen: Index },
  login:{screen:Login},
});