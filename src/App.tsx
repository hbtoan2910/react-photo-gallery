import { useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  Captions,
  Counter,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/counter.css";
import fetchedData from "./tempdata";
import ImagesModal from "./components/ImagesModal";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";

type ImageItem = {
  id: number;
  download_url: string;
  loaded: boolean;
};

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [preloading, setPreloading] = useState<boolean>(false);
  const [loadedData, setLoadedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentImages, setCurrentImages] = useState<any[]>([]);
  const itemsPerPage = 15;

  const noOfPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const currentImagesOfCurrentPage = (currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return loadedData.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setLoading(true);
    const getDataFromApi = async () => {
      try {
        const result = await fetchedData();
        const designedData = result.map((el) => {
          return { ...el, title: "some demo title", description: "some desc" };
        });
        //console.log(designedData);
        setData(designedData);
      } catch (err) {
        console.error(
          "Error occurred while fetching data from API Endpoint:",
          err instanceof Error ? err.message : err
        );
        throw err;
      } finally {
        setLoading(false);
      }
    };
    getDataFromApi();
  }, []);

  useEffect(() => {
    if (data?.length && !loading) {
      setPreloading(true);

      const preloadImages = async () => {
        const newData = data.map((el: ImageItem) => {
          return new Promise<ImageItem>((resolve) => {
            var image = new Image();
            image.fetchPriority = "high";
            image.crossOrigin = "anonymous";
            image.src = el.download_url;

            image.decode();

            image.onload = () => resolve({ ...el, loaded: true });
            image.onerror = () => resolve({ ...el, loaded: false });
          });
        });

        const newPromise = await Promise.all(newData);
        setLoadedData(newPromise.filter((item) => item.loaded === true));
        setPreloading(false);
      };

      preloadImages();
    }
  }, [data, loading]);

  useEffect(() => {
    if (!loadedData || loadedData.length <= 0) return;
    const finalImgArr = currentImagesOfCurrentPage(currentPage);
    setCurrentImages(finalImgArr);
  }, [loadedData, currentPage]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open Lightbox</button> */}

      <h2>Ryan's photo gallery 2025</h2>
      {noOfPages > 0 ? (
        <Pagination
          noOfPages={noOfPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        ""
      )}

      {loading ? (
        <Spinner type="api-load" />
      ) : preloading ? (
        <Spinner type="preload" />
      ) : (
        <ImagesModal images={currentImages} onImageClick={handleImageClick} />
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        plugins={[Captions, Thumbnails, Counter, Download, Fullscreen, Zoom]}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: 50 } } }}
        zoom={{ zoomInMultiplier: 2, maxZoomPixelRatio: 3 }}
        slides={currentImages.map((item) => ({
          src: item.download_url,
          title: item.title,
          description: item.description,
        }))}
      />
    </>
  );
}

export default App;
