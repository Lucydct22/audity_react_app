import "./renderArtist.scss";
import AlbumImg4 from "../../../../../../../assets/img/albums/4.jpg";
import { Link } from "react-router-dom";

const RenderArtist = () => {
  return (
    <div className="artist-carousel__container">
      <section className="artist-carousel__container--section">
        <div className="artist-carousel__container--section__thumbnail">
          <img src={AlbumImg4} alt="IMG" />
        </div>
        <Link
          className="artist-carousel__container--section__description"
          to={"#"}
        >
          La Rosalia
        </Link>
        <Link className="artist-carousel__container--section__details" to={"#"}>
          80,165,532 Fans
        </Link>
      </section>
      <section className="artist-carousel__container--section">
        <div className="artist-carousel__container--section__thumbnail">
          <img src={AlbumImg4} alt="IMG" />
        </div>
        <Link
          className="artist-carousel__container--section__description"
          to={"#"}
        >
          La Rosalia
        </Link>
        <Link className="artist-carousel__container--section__details" to={"#"}>
          80,165,532 Fans
        </Link>
      </section>
      <section className="artist-carousel__container--section">
        <div className="artist-carousel__container--section__thumbnail">
          <img src={AlbumImg4} alt="IMG" />
        </div>
        <Link
          className="artist-carousel__container--section__description"
          to={"#"}
        >
          La Rosalia
        </Link>
        <Link className="artist-carousel__container--section__details" to={"#"}>
          80,165,532 Fans
        </Link>
      </section>
      <section className="artist-carousel__container--section">
        <div className="artist-carousel__container--section__thumbnail">
          <img src={AlbumImg4} alt="IMG" />
        </div>
        <Link
          className="artist-carousel__container--section__description"
          to={"#"}
        >
          La Rosalia
        </Link>
        <Link className="artist-carousel__container--section__details" to={"#"}>
          80,165,532 Fans
        </Link>
      </section>
    </div>
  );
};

export default RenderArtist;
