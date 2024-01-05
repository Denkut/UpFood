import { /*Route,*/ Routes } from 'react-router-dom';
// import { Authorization, Main, Registration } from './pages';
// import { Footer, Header } from './components';

export const App = () => {
	return (
		<div>
			{/* <Header /> */}
			<div>
				<Routes>
					{/* <Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} /> */}
					{/* // 			<Route path="/users" element={<Users />} />
		// 			<Route path="/post" element={<Post />} />
		// 			<Route path="/post/:id" element={<Post />} />
		// 			<Route path="/post/:id/edit" element={<Post />} /> */}
					{/* // 			<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />  */}
				</Routes>
			</div>
			{/* <Footer /> */}
			{/* <Modal /> */}
		</div>
	);
};
