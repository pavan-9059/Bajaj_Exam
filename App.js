import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonData, setJsonData] = useState('');  // Holds JSON input from the user
    const [response, setResponse] = useState(null);  // Stores the API response
    const [selectedOptions, setSelectedOptions] = useState([]);  // Dropdown selections

    // Handles form submission and makes a POST request to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonData));
            setResponse(res.data);
        } catch (err) {
            console.error('Error submitting the form', err);
        }
    };

    // Handles changes in the dropdown options
    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="App">
            <h1>Backend Interaction App</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter JSON"
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    rows={5}
                    cols={40}
                />
                <br />
                <button type="submit">Submit</button>
            </form>

            {/* Display the response if it exists */}
            {response && (
                <div>
                    <h2>Response:</h2>
                    <label>Select options to display:</label>
                    <select multiple={true} onChange={handleOptionChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <div>
                        {/* Display numbers if selected */}
                        {selectedOptions.includes('numbers') && (
                            <div>
                                <h3>Numbers:</h3>
                                <p>{response.numbers.join(', ')}</p>
                            </div>
                        )}

                        {/* Display alphabets if selected */}
                        {selectedOptions.includes('alphabets') && (
                            <div>
                                <h3>Alphabets:</h3>
                                <p>{response.alphabets.join(', ')}</p>
                            </div>
                        )}

                        {/* Display highest lowercase alphabet if selected */}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div>
                                <h3>Highest Lowercase Alphabet:</h3>
                                <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
