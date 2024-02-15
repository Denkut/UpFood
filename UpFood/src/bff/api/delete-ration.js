export const deleteRation = async rationId =>
	fetch(`http://localhost:3005/rations/${rationId}`, {
		method: 'DELETE',
	}).catch(error => console.log('Ошибка удаления рациона ', error));
