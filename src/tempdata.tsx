// const temp_static_data = [
//   {
//     id: 1,
//     src: "https://picsum.photos/id/16/2000/1220",
//     title: "Beach with rocks",
//     description: "some desc",
//   },
//   {
//     id: 2,
//     src: "https://picsum.photos/id/17/2000/1220",
//     title: "Small path with lawn in both sides",
//     description: "some desc",
//   },
//   {
//     id: 3,
//     src: "https://picsum.photos/id/20/2000/1220",
//     title: "Phone, laptop and books",
//     description: "some desc",
//   },
//   {
//     id: 4,
//     src: "https://picsum.photos/id/16/2000/1220",
//     title: "Beach with rocks",
//     description: "some desc",
//   },
//   {
//     id: 5,
//     src: "https://picsum.photos/id/17/2000/1220",
//     title: "Small path with lawn in both sides",
//     description: "some desc",
//   },
//   {
//     id: 6,
//     src: "https://picsum.photos/id/20/2000/1220",
//     title: "Phone, laptop and books",
//     description: "some desc",
//   },
// ];

interface ApiData {
  id: number;
  author: string;
  download_url: string;

  title: string; //this is extra data, will add later
  description: string; //this is extra data, will add later
}

const fetchedData = async (): Promise<ApiData[]> => {
  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

    if (!API_ENDPOINT) {
      throw new Error("API endpoint is not defined");
    }

    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(
      "Error occurred while fetching data from API Endpoint:",
      err instanceof Error ? err.message : err
    );
    throw err;
  }
};
// export default data;
export default fetchedData;
