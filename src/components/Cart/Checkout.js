import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (e) => e.trim() === "";
const isLength = (e) => e.trim().length === 5;

const Checkout = (props) => {
  const [forminputisvalid, setforuminputisvalid] = useState({
    name: true,
    street: true,
    postcode: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postcodRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const entername = nameRef.current.value;
    const enterstreet = streetRef.current.value;
    const enterpostcod = postcodRef.current.value;
    const entercity = cityRef.current.value;

    const enternameisvalid = !isEmpty(entername);
    const enterstreetisvalid = !isEmpty(enterstreet);
    const enterpostcodeisvalid = !isEmpty(enterpostcod);
    const entercityisvalid = isLength(entercity);
    setforuminputisvalid({
      name: enternameisvalid,
      street: enterstreetisvalid,
      postcode: enterpostcod,
      city: entercityisvalid,
    });
    const allenter =
      enternameisvalid &&
      enterstreetisvalid &&
      enterpostcodeisvalid &&
      entercityisvalid;

    if (!allenter) {
      return;
    }

    props.onConfirm({
      name:entername,
      street:enterstreet,
      postcode:enterpostcod,
      city:entercity
    })
  };

  const nameControlClasses = `${classes.control} ${
    forminputisvalid.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    forminputisvalid.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    forminputisvalid.postcode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    forminputisvalid.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameRef} />
        {!forminputisvalid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetRef} />
        {!forminputisvalid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="code">Postal Code</label>
        <input id="code" type="number" ref={postcodRef} />
        {!forminputisvalid.postcode && <p>Please enter a valid postcode!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityRef} />
        {!forminputisvalid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
