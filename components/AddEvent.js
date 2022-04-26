import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { Alert } from "react-native";
import moment from 'moment';
import {AddEvent} from '../components/addEvent'
export const C = (appointmentDate, appointmentTime, title) => {
  const eventConfig = {
    title: title,
    startDate: moment(`${appointmentDate} ${appointmentTime}`,["YYYY-MM-DD HH:mm","DD-MMMM-YYYY hh:mm A"]).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    // startDate: moment("10-10-2018 17:00","DD-MM-YYYY HH:mm").utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    // and other options
  };
  // console.log(appointmentDate,appointmentTime,title);
  // console.log(eventConfig.startDate);
  
  

  AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then((eventInfo) => {
      // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
      // These are two different identifiers on iOS.
      // On Android, where they are both equal and represent the event id, also strings.
      // when { action: 'CANCELLED' } is returned, the dialog was dismissed
      // console.warn('eventinfo',JSON.stringify(eventInfo));
    })
    .catch((error) => {
      // handle error such as when user rejected permissions
      // console.warn('error',error.message);
      //if no calender is installed in phone
      if(error && error.message && error.message.toLowerCase().includes("no activity found")){
        Alert.alert("Sorry. No Calenders Found.");
      }
  });
}