import axios from 'axios';
import { API_URL } from '../../utils/api';

export const getMovies = async (mood, genreList = []) => {
	let url = API_URL + '/movies/?moods=' + mood;
	const genreString = genreList.reduce((acc, value) => (acc + value.toLowerCase() + ','), '');
	const genreParam = genreString.slice(0,-1);
	if (genreParam !== '') {
		url = url + '&genres='+ genreParam;
	}
	console.log('Get movies URL: ', url);
	try {
		const response = await axios.get(url);
		return response.data.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getMusic = async (mood, genreList = []) => {
	let url = API_URL + '/musics/?moods=' + mood;
	const genreString = genreList.reduce((acc, value) => (acc + value.toLowerCase() + ','), '');
	const genreParam = genreString.slice(0,-1);
	if (genreParam !== '') {
		url = url + '&genres='+ genreParam;
	}
	console.log('Get music URL: ', url);
	try {
		const response = await axios.get(url);
		return response.data.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};
