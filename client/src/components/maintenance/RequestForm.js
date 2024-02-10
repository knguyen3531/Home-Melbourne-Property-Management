import React, { useState } from 'react';

function RequestForm() {
  const [request, setRequest] = useState({
    title: '',
    description: '',
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to your API
    console.log('Submitting request:', request);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={request.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={request.description} onChange={handleChange} />
      </label>
      {/* Add other input fields as necessary */}
      <button type="submit">Submit Request</button>
    </form>
  );
}

export default RequestForm;
