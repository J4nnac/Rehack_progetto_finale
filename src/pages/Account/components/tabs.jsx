/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { TabView, TabPanel } from 'primereact/tabview';
import Favourites from './favourites';
import Reviews from './reviews';
import { useContext} from 'react';
import SessionContext from '../../../context/SessionContext';
import ProfileAccount from './profileAccount';



export default function Tabs({ user }) {
    const { session } = useContext(SessionContext);

    return (
        <div className="">
            <TabView>
                <TabPanel header="Profilo" leftIcon="bi bi-person-gear fs-4 me-2">
                    <ProfileAccount />
                </TabPanel>
                <TabPanel header="Preferiti" leftIcon="bi bi-suit-heart-fill fs-4 me-2">
                    <Favourites />
                </TabPanel>
                <TabPanel header="Reviews" leftIcon="bi bi-person-lines-fill fs-4 me-2">
                    <Reviews user={user} />
                </TabPanel>
            </TabView>
        </div>
    )
}
