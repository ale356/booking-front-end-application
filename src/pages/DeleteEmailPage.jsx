/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Box, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * Represents the Delete Email page component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the Delete Email page.
 */
function DeleteEmailPage() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Custom styled TableCell with bold font.
  const BoldTableCell = styled(TableCell)({
    fontWeight: 'bold',
  });

  useEffect(() => {
    /**
     * Fetches the email data from the server.
     */
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/emails/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmail(data);
      } catch (fetchError) {
        console.error('Error fetching email:', fetchError);
      }
    };

    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      fetchEmail();
    }
  }, [id]);

  /**
   * Handles the deletion of the email from the server.
   */
  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/emails/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful deletion.
        setSuccess('Email successfully deleted.');
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (deleteError) {
      console.error('Error deleting email:', deleteError);
      setError('Failed to delete email. Please try again.');
    }
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  // Display loading message if email data is not yet fetched.
  if (!email) {
    return (
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Loading...
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography
        variant="h4"
        sx={{
          ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3),
        }}
      >
        Delete Email
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="body1" gutterBottom mb={2} mt={2} align="center" fontWeight="bold">
        Are you sure you want to delete the email:
        {' '}
        {email.email}
        ?
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell>Field</BoldTableCell>
              <BoldTableCell>Value</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(email).map(([key, value]) => (
              key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value.toString()}</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteEmailPage;
