import { useState } from "react";
import styles from "./styles.module.css";
import { useEffect } from "react";
import HashLoadingSpinner from "../loader/hashLoader";
const FormModal = ({ setShowForm ,formData,setFormData}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [inputError, setInputError] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTicketBook = () => {
    const validFormData = validateForm();
    if (!validFormData) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("🎉  Your ticket has been booked");
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    }, 2000);
  };
  const validateForm = () => {
    const error = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!formData.email) {
      error.email = "Please enter email";
    } else if (!regex.test(formData.email)) {
      error.email = "Invalid email";
    }
    if (!formData.name) {
      error.name = "Pease enter name";
    }
    if (!formData.noOfSeats) {
      error.noOfSeats = "Please enter total seat no";
    }
    setInputError(error);

    return Object.keys(error).length === 0;
  };

 
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        
        {loading ? (
          <HashLoadingSpinner loading={loading} />
        ) : success ? (
          <h1 className={styles.success}>{success}</h1>
        ) : (
          <div className={styles.modal__form__container}>
            <span className={styles.cancel} onClick={() => setShowForm(false)}>
              &#10005;
            </span>

            <h1 className={styles.modal__heading}>Buy Movie Ticket</h1>
            <div></div>
            <div>
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />{" "}
              <br />
              {inputError?.name && (
                <div className={styles.error}>{inputError.name}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label> <br />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />{" "}
              <br />
              {inputError?.email && (
                <div className={styles.error}>{inputError.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="movie">Movie Name</label> <br />
              <input
                type="text"
                id="movie"
                name="movie"
                disabled
                value={formData.movieName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="ticket">No of Tickets</label> <br />
              <input
                type="number"
                min={1}
                max={10}
                id="ticket"
                name="noOfSeats"
                value={formData.noOfSeats}
                onChange={handleInputChange}
              />{" "}
              <br />
              {inputError?.noOfSeats && (
                <div className={styles.error}>{inputError.noOfSeats}</div>
              )}
            </div>
            <div>
              <button className={styles.btn__book} onClick={handleTicketBook}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
