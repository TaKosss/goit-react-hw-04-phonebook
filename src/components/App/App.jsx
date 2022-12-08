import React from 'react';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { useLocalStorage } from '../../utils/localStorage';

import { Body, Wrap, Title } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', '');
  const [filter, setFilter] = useState('');

  const hasContact = ({ name }) => {
    contacts.find(contact => contact.name.toLowerCase() === name);
  };

  const contactFormHandler = (values, { resetForm }) => {
    if (!hasContact) {
      return Notiflix.Notify.failure(`${values.name} is already in contacts.`);
    }
    setContacts(prevState => {
      const id = nanoid();
      const contact = { ...values, id };
      return [...prevState, contact];
    });

    resetForm();
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    if (!filter) return [...contacts];

    const contactToLowerCase = filter.toLowerCase();
    return [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(contactToLowerCase)
    );
  };

  const onDeleteContact = contactId => {
    setContacts(prevContacts =>
      [...prevContacts].filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Body>
      <Wrap>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={contactFormHandler} />
        <Title>Contacts</Title>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={onDeleteContact}
        />
      </Wrap>
    </Body>
  );
};

export default App;
