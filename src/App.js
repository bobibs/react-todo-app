import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import component
import Header from './components/Header';
import Homepage from './pages/Homepage';

const App = () => {
	return (
		<>
			<Header />
			<Homepage />
		</>
	);
};

export default App;
