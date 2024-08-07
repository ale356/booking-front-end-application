import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { AppointmentContext } from '../contexts/AppointmentContext';

/**
 * Represents the Review component, displaying a summary of appointment details.
 *
 * @component
 * @returns {JSX.Element} The rendered Review component.
 */
export default function Review() {
  const { appointmentData, personalData } = useContext(AppointmentContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Appointment Summary
      </Typography>

      <Grid container spacing={2}>
        {/* Personal Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Personal Details
          </Typography>
          <List disablePadding>
            <ListItem key="first-name" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="First Name" />
              <Typography variant="body2">{personalData.firstName}</Typography>
            </ListItem>
            <ListItem key="last-name" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Last Name" />
              <Typography variant="body2">{personalData.lastName}</Typography>
            </ListItem>
            <ListItem key="email" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Email" />
              <Typography variant="body2">{personalData.email}</Typography>
            </ListItem>
            <ListItem key="mobile-number" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Mobile Number" />
              <Typography variant="body2">{personalData.mobileNumber}</Typography>
            </ListItem>
          </List>
        </Grid>

        {/* Appointment Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Appointment Details
          </Typography>
          <List disablePadding>
            <ListItem key="type-service" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Type of service" />
              <Typography variant="body2">{appointmentData.typeOfService}</Typography>
            </ListItem>
            <ListItem key="date" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Date" />
              <Typography variant="body2">{appointmentData.dateTime.toLocaleDateString()}</Typography>
            </ListItem>
            <ListItem key="time" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Time" />
              <Typography variant="body2">{appointmentData.time}</Typography>
            </ListItem>
            <ListItem key="price" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Price" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {appointmentData.price}
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
