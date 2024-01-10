import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instagram from '../../assets/logo/instagram.png';
import telegram from '../../assets/logo/telegram.png';
import youtube from '../../assets/logo/youtube.png';
import whatsapp from '../../assets/logo/whatsapp.png';

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=3eabd83bc3c77b5a00e1f7cd19e716a2',
		)
			.then(res => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className="bg-slate-800">
			<footer className="fixed bottom-0 flex h-28 w-full items-center justify-between bg-slate-800 px-20 text-center ">
				<div className="flex  ">
					<div className="text-sm font-semibold leading-6 text-yellow-50">
						UpFood© 2024
					</div>
				</div>
				<div className=" items-center">
					<div className="flex items-center justify-center py-2">
						<Link
							to="/"
							className="text-sm font-semibold leading-6 text-yellow-50 hover:underline "
						>
							upfood.ru@yandex.ru
						</Link>
					</div>
					<div className="flex items-center justify-center">
						<div>
							<Link to="#">
								<img
									className="h-6 rounded-lg px-2 text-base hover:bg-blue-300 "
									src={instagram}
									alt="instagram"
								/>
							</Link>
						</div>
						<div>
							<Link to="#">
								<img
									className="h-6 rounded-lg px-2 text-base hover:bg-blue-300 "
									src={telegram}
									alt="telegram"
								/>
							</Link>
						</div>
						<div>
							<Link to="#">
								<img
									className="h-6 rounded-lg px-2 text-base hover:bg-blue-300 "
									src={youtube}
									alt="youtube"
								/>
							</Link>
						</div>
						<div>
							<Link to="#">
								<img
									className="h-6 rounded-lg px-2 text-base hover:bg-blue-300 "
									src={whatsapp}
									alt="whatsapp"
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className="">
					<div className="text-sm font-semibold leading-6 text-yellow-50 ">
						{city},{' '}
						{new Date().toLocaleDateString('ru', {
							day: 'numeric',
							month: 'long',
						})}
					</div>
					<div className="px-2.5 text-sm font-semibold leading-6 text-yellow-50 ">
						{temperature} градусов, {weather}
					</div>
				</div>
			</footer>
		</div>
	);
};
