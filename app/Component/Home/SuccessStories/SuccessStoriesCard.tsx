import Image from "next/image";
import "./SuccessStoriesCard.scss";
import Link from "next/link";

interface Props {
  coverPhoto: string;
  title: string;
  createdAt: string;
  id: string;
}

export default function SuccessStoriesCard({
  coverPhoto,
  title,
  id,
  createdAt,
}: Props) {

  const date = new Date(createdAt);

  const formattedDate = `${date.getDate().toString().padStart(2, "0")} 
        ${date.toLocaleString("en-GB", { month: "short" })}, 
        ${date.getFullYear()}`;
  return (
    <Link className="success-card" href={`/success-stories/${id}`}>
      <div className="success-storis-cover">
        <Image src={coverPhoto} alt={title} fill className="cover-img" />
        <div className="overlay"></div>

        <div className="card-content">
          <h5 className="heading-h5 text-white">{title}</h5>
          <p className="text-white">Published on {formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
