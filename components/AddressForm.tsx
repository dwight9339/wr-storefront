import { FormEvent, useState } from "react";
import { useRegion } from "../providers/RegionProvider";
import styles from "../styles/AddressForm.module.scss";

interface FieldProps {
  label: string;
  type: string;
  value: any;
  updater: (val: any) => void;
  props?: any;
}

interface AddressFormProps {
  onSubmit: (address: any) => void;
}

const Field = ({
  label,
  type,
  value,
  updater,
  props
}: FieldProps) => {
  const update = (e: FormEvent<HTMLInputElement>) => {
    updater(e.currentTarget.value);
  }

  return (
    <div className={styles.fieldContainer}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={update}
        {...props}
      />
    </div>
  )
}

const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [street1, setStreet1] = useState<string>();
  const [street2, setStreet2] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [zip, setZip] = useState<string>();

  const { userRegion } = useRegion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      email,
      street1,
      street2,
      city,
      state,
      country,
      zip
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field 
        label="Email"
        type="email"
        value={email}
        updater={setEmail}
        props={{
          required: true
        }}
      />
      <div className={styles.fieldSet}>
        <Field 
          label="First Name"
          type="text"
          value={firstName}
          updater={setFirstName}
          props={{
            required: true
          }}
        />
        <Field 
          label="Last Name"
          type="text"
          value={lastName}
          updater={setLastName}
          props={{
            required: true
          }}
        />
      </div>
      <Field 
        label="Street Address"
        type="text"
        value={street1}
        updater={setStreet1}
        props={{
          required: true
        }}
      />
      <Field 
        label="Apartment, suite, etc"
        type="text"
        value={street2}
        updater={setStreet2}
      />
      <Field 
        label="City"
        type="text"
        value={city}
        updater={setCity}
        props={{
          required: true
        }}
      />
      <div className={styles.fieldSet}>
        <Field 
          label="State/Province"
          type="text"
          value={state}
          updater={setState}
          props={{
            required: true
          }}
        />
        <div className={styles.selectField}> 
          <label>Country</label>
          <select
            onChange={(e) => setCountry(e.currentTarget.value)}
          >
            <>
              {
                userRegion && 
                userRegion.countries.slice()
                  .sort((a, b) => a.display_name > b.display_name ? 1 : -1)
                  .map(({ iso_2, display_name }, i) => {
                    return (
                      <option key={i} value={iso_2}>{display_name}</option>
                    )
                  })
              }
            </>
          </select>
        </div>
      </div>
      <Field 
        label="ZIP Code"
        type="text"
        value={zip}
        updater={setZip}
        props={{
          required: true
        }}
      />
      <div className={styles.submitButton}>
        <input
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  )
}

export default AddressForm;