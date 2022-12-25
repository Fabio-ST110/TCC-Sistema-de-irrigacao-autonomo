import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/login.js';
import Main from '../screens/main.js';

const screens = {
    Login: {
        screen: Login
    },
    Menu: {
        screen: Main
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);