import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import DashboardScreen from '../(dashboard)/dashboard'
import EditPlanScreen from '../(workout)/editplan'
import NavScreen from '../nav'
import ProfileScreen from '../(profile)/profile'

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen}/>
      <Tab.Screen name="Workouts" component={EditPlanScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
      <Tab.Screen name="Dev" component={NavScreen}/>
    </Tab.Navigator>
  );
}
