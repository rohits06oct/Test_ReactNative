import {AppRegistry} from 'react-native';
import App from './App.tsx';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('app-root'),
});
