export const api = async (search, page) => {
  const API_KEY = '36386692-cf20a87c13b3c6a1a4d0b1456';
  const BASE_URL = `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const data = await fetch(BASE_URL);
  const response = await data.json();

  return response;
};
