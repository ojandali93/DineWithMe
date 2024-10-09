import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import { UserProvider } from './src/Context/UserContext';


const RootApp = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);
