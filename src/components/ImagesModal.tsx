import "./ImagesModal.css";

const ImagesModal = (props) => {
  return (
    <>
      <div className="images-container">
        {props.images &&
          props.images.map((img, index) => (
            <div
              key={img.id}
              className="image-box"
              onClick={() => props.onImageClick(index)}
            >
              <img key={img.id} src={img.download_url} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ImagesModal;
