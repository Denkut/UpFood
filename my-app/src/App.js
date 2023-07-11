import logo from './logo.svg';
import './App.css';

export const App = () => {
	const dateNow = new Date();
	// императивный
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{/* декларативный */}
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				{/* декларативный */}
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				{/* декларативный */}
				<p>{dateNow.getFullYear()}</p>
				{/* декларативный */}
			</header>
		</div>
	);
};
