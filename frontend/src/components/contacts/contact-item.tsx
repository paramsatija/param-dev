import React from 'react';

interface Contact {
  name: string;
  email: string;
}

const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h4 className="font-medium">{contact.name}</h4>
          <p className="text-sm text-gray-600">{contact.email}</p>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          Contact
        </button>
      </div>
    </div>
  );
};

export default ContactItem;

