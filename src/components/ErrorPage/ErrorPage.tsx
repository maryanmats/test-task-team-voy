import React from "react";
import styles from "./ErrorPage.module.scss";

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div className={styles["error-container"]}>
      <div className={styles["error-card"]}>
        <div className={styles["error-message"]}>{errorMessage}</div>
        <a href="/" className={styles["error-btn"]}>
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
