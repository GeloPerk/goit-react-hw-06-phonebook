import React from 'react';
import { Contact } from '../Contact/Contact';

export const Contacts = ({ contacts, deleteContact }) => (
  <>
    {contacts.map(contact => (
      <Contact key={contact.id} contact={contact} deleteContact={deleteContact} />
    ))}
  </>
);