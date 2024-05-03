import { Link } from "react-router-dom";
import { BiSolidMessageError } from "react-icons/bi";
import { IoArrowUndoSharp } from "react-icons/io5";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p className={css.error}>
        <BiSolidMessageError />
        Opps! Page not found! Sorry!
      </p>
      <p className={css.message}>
        Please visit out <IoArrowUndoSharp />
        <Link to="/">home page</Link>
      </p>
    </div>
  );
}
