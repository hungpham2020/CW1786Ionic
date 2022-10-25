import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRoute, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddTrip from './components/Trips/AddTrip';
import { initDB } from "react-indexed-db"
import { DbConfig } from './components/DbConfig';
import ViewAllTrips from './components/Trips/ViewAllTrips';
import TripDetail from './components/Trips/TripDetail';
import AddExpense from './components/Expenses/AddExpense';
import ViewAllExpenses from './components/Expenses/ViewAllExpenses';
import Editrip from './components/Trips/EditTrip';

setupIonicReact();

initDB(DbConfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <IonRoute exact path="/"  render={() => <AddTrip/>} />
        <IonRoute exact path="/viewAllTrips" render={() => <ViewAllTrips />} />
        <IonRoute exact path="/detail/:id" render={() =><TripDetail/>} />
        <IonRoute exact path="/add/expense/:id" render={() => <AddExpense />} />
        <IonRoute exact path="/viewAllExpenses/:id" render={() => <ViewAllExpenses />} />
        <IonRoute exact path="/editTrip/:id" render={() => <Editrip />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
