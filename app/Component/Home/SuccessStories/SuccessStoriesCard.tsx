import "./SuccessStoriesCard.scss";
interface Props {
  coverPhoto: string;
  title: string;
  createdAt: string;
}
export default function SuccessStoriesCard({
  coverPhoto,
  title,
  createdAt,
}: Props) {
  return (
    <div className="success-card position-relative overflow-hidden rounded shadow-sm">
      {/* Background Image */}
      <img src={coverPhoto} alt={title} className="success-card-img w-100" />

      {/* Gradient Overlay */}
      <div className="success-card-gradient position-absolute top-0 start-0 w-100 h-100"></div>

      {/* Title and Date */}
      <div className="success-card-content position-absolute bottom-0 start-0 p-3 text-white w-100">
        <h5 className="success-card-title mb-1">{title}</h5>
        <p className="success-card-date mb-0">
          Published at {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Read More Button */}
      <button className="success-card-btn btn btn-light position-absolute">
        Read More
      </button>
    </div>
  );
}
