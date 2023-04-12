import React, { useEffect } from 'react';
import { Container, Title, ContactList } from './App.styled';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  addContact,
  deleteContact,
  setFilter,
  setContactsList,
} from './contactsSlice/contactsSlice';
// дллдл
function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(setContactsList(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddNewContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const filterContacts = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      <Container>
        {/* <Title>Phonebook</Title> */}
        <ContactsForm addNewContact={handleAddNewContact} />
      </Container>
      <Container>
        <Title>Contacts</Title>
        <Filter findByFilter={handleFilterChange} value={filter} />
        <ContactList>
          <Contacts
            contacts={filterContacts()}
            deleteContact={handleDeleteContact}
          />
        </ContactList>
      </Container>
    </>
  );
}

export default App;